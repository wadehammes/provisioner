# Contentful integration

How **generated types**, **getters**, **parsers**, and **type guards** work together for the Provisioner site.

## Generated types

Definitions and **`isType*`** guards live in [`src/contentful/types/`](../../src/contentful/types/). They are produced by **`cf-content-types-generator`** and must **not** be edited by hand.

- **Regenerate**: `pnpm types:contentful` (requires `CONTENTFUL_SPACE_ID`, `CONTENTFUL_CMA_TOKEN`, and a sourced env file—see root [README.md](../../README.md)).
- After CMS schema changes: regenerate, then fix parsers/components until **`pnpm tsc:ci`** is clean.

Exports are re-exported from [`types/index.ts`](../../src/contentful/types/index.ts) for convenient imports.

## Client

[`src/contentful/client.ts`](../../src/contentful/client.ts) exports **`contentfulClient({ preview })`**, returning either the **delivery** or **preview** SDK client. Getters should use this factory instead of constructing ad hoc clients.

Preview tokens and **`CONTENTFUL_PREVIEW_SECRET`** are documented in [platform.md](platform.md) (draft routes).

## Getters

Async functions that call **`getEntries`** / similar on **`contentfulClient({ preview }).withoutUnresolvableLinks`** with a typed skeleton (e.g. `TypePageSkeleton`).

Examples: [`getPages.ts`](../../src/contentful/getPages.ts), [`getWork.ts`](../../src/contentful/getWork.ts), [`getCaseStudies.ts`](../../src/contentful/getCaseStudies.ts), [`getNavigation.ts`](../../src/contentful/getNavigation.ts).

They return **raw entry shapes** (with link resolution per client chain); parsers turn those into app-facing types.

## Parsers

Files like [`parseQuote.ts`](../../src/contentful/parseQuote.ts), [`parseStat.ts`](../../src/contentful/parseStat.ts), [`parseSections.ts`](../../src/contentful/parseSections.ts) map entries → plain objects for React.

Patterns in this repo:

- Early return **`null`** when the entry is missing or fails **`isTypeXxx(entry)`**.
- **`ContentfulTypeCheck`** from [`helpers.ts`](../../src/contentful/helpers.ts) — a compile-time const (`_fooValidation = true`) to keep parsed shapes aligned with Contentful field definitions.
- **`ExtractSymbolType`** / **`ExtractArrayItemType`** for symbol unions and category arrays.
- **Images**: [`parseContentfulContentImage`](../../src/contentful/image.ts) normalizes assets; pass through **`undefined`** for missing assets.

## Type guards (`isType*`)

Use generated **`isTypeCaseStudy`**, **`isTypePage`**, **`isTypeQuote`**, **`isTypeStat`**, **`isTypeModules`**, etc., whenever a field can be:

- an unresolved link,
- a different content type than expected, or
- optional.

**Narrow before** accessing `.fields` on linked entries. Prefer guards over casting.

## Sections and modules (this project)

- **Sections** — parsed in [`parseSections.ts`](../../src/contentful/parseSections.ts); tied to page `sections` in Contentful. Linked **modules** entries are validated with **`isTypeModules`** inside that parser.

## Rich Text

[`src/contentful/richText.tsx`](../../src/contentful/richText.tsx) wraps **`@contentful/rich-text-react-renderer`** for consistent typography. Reuse **`RichText`** (or the same options pattern) when rendering Contentful Rich Text documents.

## Adding a new CMS-driven surface (checklist)

1. Confirm the content type in Contentful; run **`pnpm types:contentful`**.
2. Add or extend a **getter** if new queries are needed.
3. Add a **parser** (and **`ContentfulTypeCheck`**) producing a stable app type.
4. Use **`isType*`** guards on every linked entry field before parsing nested data.
5. Wire the parsed type into a **server component** (or client component props) under `src/components/` or `src/app/`.
