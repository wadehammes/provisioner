# Patterns

Cross-cutting patterns for **App Router** pages: fetching, metadata, draft preview, and client mutations.

## Server components and data fetching

Route **`page.tsx`** files under [`src/app/`](../../src/app/) are **async server components** by default.

Typical flow:

1. Read **`draftMode()`** from `next/headers` when the page should support Contentful preview.
2. Call **getters** from `src/contentful/` with `{ preview: draft.isEnabled }` (or `preview: false` for static-only paths).
3. Pass parsed results into presentational components as props.

**Example references**: [`src/app/page.tsx`](../../src/app/page.tsx), [`src/app/[slug]/page.tsx`](../../src/app/[slug]/page.tsx), [`src/app/case-studies/[slug]/page.tsx`](../../src/app/case-studies/[slug]/page.tsx).

## Metadata

Use **`generateMetadata`** in `page.tsx` (or layout) for per-route SEO, as in [`src/app/[slug]/page.tsx`](../../src/app/[slug]/page.tsx). The root layout sets **site-wide defaults** in [`src/app/layout.tsx`](../../src/app/layout.tsx).

Keep titles/descriptions aligned with Contentful fields when the CMS owns copy.

## Draft mode and preview

- **Enable**: [`src/app/api/draft/route.ts`](../../src/app/api/draft/route.ts) — validates **`previewSecret`** against **`CONTENTFUL_PREVIEW_SECRET`**, enables draft mode, redirects to `redirect` query or `/`.
- **Disable**: [`src/app/api/disable-draft/route.ts`](../../src/app/api/disable-draft/route.ts).
- **UI**: [`ExitDraftModeLink`](../../src/components/ExitDraftModeLink/ExitDraftModeLink.component.tsx) and the draft banner in the root layout.

Getters must pass **`preview: true`** into **`contentfulClient`** when draft mode is on so the preview API token is used.

## Client state and forms

- **TanStack Query**: configured in [`src/app/providers.tsx`](../../src/app/providers.tsx). Mutations live under [`src/hooks/mutations/`](../../src/hooks/mutations/) and call into [`src/api/urls.ts`](../../src/api/urls.ts) or **`fetch`** to **`/api/...`** route handlers as established per feature.
- **Forms**: **`react-hook-form`** appears in larger flows (e.g. start-your-project). Follow existing validation + toast patterns in those components.

## Constants and env

- Runtime **`process.env.*`** keys that must reach the browser need to be listed under **`env`** in [`next.config.ts`](../../next.config.ts). Server-only secrets should **not** be exposed there.
- Shared literals (slugs excluded from build, etc.) live in [`src/utils/constants.ts`](../../src/utils/constants.ts) where the project already centralizes them.

## Styling third-party widgets

Global Swiper / Toastify imports are wired from [`src/app/layout.tsx`](../../src/app/layout.tsx) and [`src/styles/`](../../src/styles/). When adding a new global CSS dependency, prefer importing once at the layout level.

**Swiper tweaks** belong in **[`src/styles/swiper.css`](../../src/styles/swiper.css)** (imported alongside other globals). That file chains Swiper’s class names—for example RTL uses an extra **`swiper-rtl`** class on the same container, so “base” selectors (two classes deep) **must precede** RTL variants (three classes deep) everywhere in that file; otherwise **`pnpm lint:css`** fails with **`no-descending-specificity`**. If you need shared properties across both tiers, duplicate them into **one rule per tier** (base prev/next, then RTL‑swapped next/prev) instead of repeating weaker selectors **after** stronger ones later in the file.
