# Architecture

Map of the Provisioner agency site: technologies, top-level folders, and how Contentful content reaches the browser.

## Tech stack

- **Framework**: **Next.js 16** with the **App Router**. Routes and layouts live under [`src/app/`](../../src/app/).
- **UI**: React 19, TypeScript.
- **CMS**: **Contentful**. Content types are generated into [`src/contentful/types/`](../../src/contentful/types/); fetchers and parsers live in [`src/contentful/`](../../src/contentful/).
- **Client data**: **TanStack React Query** for mutations and client state that talks to route handlers / external APIs ([`src/hooks/mutations/`](../../src/hooks/mutations/), [`src/app/providers.tsx`](../../src/app/providers.tsx)).
- **Styling**: **CSS Modules** (`.module.css`) plus global styles under [`src/styles/`](../../src/styles/).
- **Tooling**: **pnpm** (see [`package.json`](../../package.json) `packageManager`), **Biome** for lint and format, **Jest** for tests.

## Directory map

### [`src/app/`](../../src/app/)

Next.js routes, layouts, and **Route Handlers** under `app/api/`.

- **Pages**: e.g. [`page.tsx`](../../src/app/page.tsx) (home), [`[slug]/page.tsx`](../../src/app/[slug]/page.tsx) (CMS pages), [`case-studies/`](../../src/app/case-studies/), [`start-your-project/`](../../src/app/start-your-project/).
- **API**: [`app/api/draft/route.ts`](../../src/app/api/draft/route.ts), [`disable-draft/route.ts`](../../src/app/api/disable-draft/route.ts), Resend/HubSpot handlers under `app/api/`.
- **Root layout**: [`layout.tsx`](../../src/app/layout.tsx) — metadata defaults, draft banner, `Providers`, Google Analytics (when configured).

Pages that need CMS data typically **async server components** that call getters in `src/contentful/` (see [patterns.md](patterns.md)).

### [`src/components/`](../../src/components/)

Feature and layout UI: one folder per area (e.g. `Hero`, `Navigation`, `CaseStudy`). See [components.md](components.md).

Shared primitives live under [`src/ui/`](../../src/ui/) and leaf-styled controls under [`src/components/LeafButton/`](../../src/components/LeafButton/), etc.

### [`src/contentful/`](../../src/contentful/)

- **Client**: [`client.ts`](../../src/contentful/client.ts) — delivery vs preview clients.
- **Getters**: `getPages`, `getWork`, `getCaseStudies`, `getNavigation`, etc.
- **Parsers**: `parse*.ts` plus [`parseSections.ts`](../../src/contentful/parseSections.ts), [`image.ts`](../../src/contentful/image.ts), [`richText.tsx`](../../src/contentful/richText.tsx).
- **Types**: [`types/`](../../src/contentful/types/) — **generated**; run `pnpm types:contentful` after CMS schema changes.

Details: [contentful.md](contentful.md).

### [`src/api/`](../../src/api/) and [`src/app/api/`](../../src/app/api/)

- [`src/api/urls.ts`](../../src/api/urls.ts) and [`helpers.ts`](../../src/api/helpers.ts) — shared fetch helpers used from hooks.
- Route handlers under `src/app/api/` implement server endpoints (forms, webhooks, draft toggles).

### [`src/lib/`](../../src/lib/)

Build-time helpers such as [`generateSitemap.ts`](../../src/lib/generateSitemap.ts) (used from pages and Makefile-driven scripts). See [distribution.md](distribution.md).

### [`src/proxy.ts`](../../src/proxy.ts)

Request-header helpers (pathname, UTM). **There is no root `middleware.ts` wired to this file today**—do not assume it runs on every request until middleware imports it. See [platform.md](platform.md).

### [`src/hooks/`](../../src/hooks/), [`src/providers/`](../../src/providers/)

Custom hooks and React providers (e.g. URL params).

### [`src/tests/`](../../src/tests/)

Jest page objects and shared test utilities.

## Data flow (high level)

1. A **server component** in `src/app/.../page.tsx` calls a **getter** (e.g. `fetchPage`, `fetchWork`) with `{ preview }` from **`draftMode()`** when needed.
2. The getter uses **`contentfulClient({ preview }).withoutUnresolvableLinks.getEntries`** (or similar) with a **skeleton** type from `src/contentful/types/`.
3. **Parsers** normalize entries into plain app types (images, Rich Text, nested links) using **`isType*`** guards where links can be unresolved or polymorphic.
4. The page passes parsed data into **components** as props; client islands use hooks + Route Handlers where required.

## Config and quality gates

- **[`next.config.ts`](../../next.config.ts)** — image remote patterns (Contentful hosts), redirects, security headers / CSP. Env vars are **not** exposed via `next.config`; see [platform.md](platform.md).
- **[`biome.json`](../../biome.json)** — lint and format rules.
- **[`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)** — PR checks into `staging`: `tsc:ci`, `lint:ci`, `test:ci`.

Branching and releases are described in the root [README.md](../../README.md).
