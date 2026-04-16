# Source layout

Quick map of **`src/`** and related top-level folders.

| Path | Role |
|------|------|
| [`src/app/`](../../src/app/) | App Router layouts, pages, route handlers (`app/api/...`). |
| [`src/components/`](../../src/components/) | Feature UI (Hero, CaseStudy, Navigation, forms, …). |
| [`src/ui/`](../../src/ui/) | Shared UI primitives (button, text field, …). |
| [`src/contentful/`](../../src/contentful/) | CMS client, getters, parsers, generated `types/`, Rich Text. |
| [`src/api/`](../../src/api/) | Client-side API helpers (`urls.ts`, `helpers.ts`). |
| [`src/hooks/`](../../src/hooks/) | Custom hooks; mutations under `hooks/mutations/`. |
| [`src/providers/`](../../src/providers/) | React context providers (e.g. URL params). |
| [`src/lib/`](../../src/lib/) | Build-time / server utilities (sitemap generation). |
| [`src/utils/`](../../src/utils/) | Shared helpers and constants (`helpers.ts`, `constants.ts`). |
| [`src/styles/`](../../src/styles/) | Global CSS and Swiper overrides. |
| [`src/icons/`](../../src/icons/) | SVG assets (often imported as React components via SVGR). |
| [`src/tests/`](../../src/tests/) | Jest base page object and shared test helpers. |
| [`src/proxy.ts`](../../src/proxy.ts) | Request header helpers (see [platform.md](platform.md)). |
| [`scripts/`](../../scripts/) | Node scripts invoked from Makefile / package.json. |

**Tests** for a component usually sit **next to** that component (`*.spec.tsx`, `*.po.tsx`).
