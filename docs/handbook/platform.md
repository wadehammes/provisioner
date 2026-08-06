# Platform, CI, and environment

CI, scripts, environment variables, security headers, draft preview, and **`src/proxy.ts`**.

## Continuous integration

Pull requests targeting **`staging`** run [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml):

1. Checkout (full history).
2. **pnpm** via **pnpm/action-setup**; **Node** version from [`.tool-versions`](../../.tool-versions).
3. **`pnpm install`**
4. **`pnpm tsc:ci`**
5. **`pnpm lint:ci`**
6. **`pnpm test:ci`**
7. **`pnpm knip:ci`**

Run the same locally before pushing when possible.

## Package scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Next dev server on **port 7777** (see root README). |
| `pnpm build` | Production build + **`make sitemap`**. |
| `pnpm start` | Serve production build on port 7777. |
| `pnpm tsc:ci` / `pnpm lint:ci` / `pnpm test:ci` / `pnpm knip:ci` | Quality gates (Biome matches CI today). |
| `pnpm knip` | Find unused exports/files locally ([`knip.json`](../../knip.json)). |
| `pnpm lint:css` | Stylelint over **`*.css`** (run locally when you change CSS; not in CI yet). |
| `pnpm lint:fix` / `pnpm biome:fix` | Biome fixes / format. |
| `pnpm types:contentful` | Regenerate `src/contentful/types` (needs Contentful CMA env). |

Full list: [`package.json`](../../package.json).

## Cursor hooks

Agent sessions use project hooks in [`.cursor/hooks.json`](../../.cursor/hooks.json) (see [`.cursor/hooks/README.md`](../../.cursor/hooks/README.md)): handbook routing at session start, CSS/TS guardrails on edits, handbook sync nudges, and a drift check at stop. Shared hook scripts and [`.cursor/rules/provisioner-handbook.mdc`](../../.cursor/rules/provisioner-handbook.mdc) are committed; local Cursor state under `.cursor/` stays gitignored.

## pnpm and `pnpm-workspace.yaml`

The repo is a **single package** (not a monorepo), but [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml) is still used for **`allowBuilds`** (skip native builds for packages like **`sharp`**). That file **must** include a **`packages`** entry—typically **`"."`** for the repo root—or **`pnpm install`** fails with **`packages field missing or empty`** (common on Vercel and some pnpm versions). Version is pinned via **`packageManager`** in **`package.json`** (`pnpm@11.4.0`); use **`corepack enable`** locally if pnpm is not on PATH.

## Environment variables

Next.js reads server-only variables from **`.env.local`** / Vercel at runtime. Only names prefixed with **`NEXT_PUBLIC_`** are inlined into the client bundle. See **[`.env.sample`](./.env.sample)** for the full list (no secret values).

**Deployed values** live in the **Vercel project** for this repository. After changing dashboard env vars, run **`vercel env pull`** (or update `.env.local` manually) so local dev matches.

When adding a key:

1. Add it in **Vercel** for the right environments (Preview / Production / Development).
2. Use a **`NEXT_PUBLIC_`** prefix only when client components must read it (today: reCAPTCHA site key).
3. Document the name in **[`.env.sample`](./.env.sample)**; keep real values in **`.env.local`** (gitignored).

| Variable | Scope |
|----------|--------|
| `ENVIRONMENT` | Server — canonical URLs, robots, production redirects |
| `CONTENTFUL_*` (except CMA) | Server — Contentful delivery/preview + draft secret |
| `CONTENTFUL_CMA_TOKEN` | Server — type generation script only |
| `RESEND_*`, `HUBSPOT_*` | Server — Route Handlers |
| `GA_MEASUREMENT_ID` | Server — root layout analytics |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client — reCAPTCHA widgets in forms |

**Vercel rename:** if the project still has `RECAPTCHA_SITE_KEY`, add **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`** with the same value (or rename in the dashboard) before removing the old name. Until then, [`next.config.ts`](../../next.config.ts) copies the legacy name into **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`** for the client bundle.

## Redirects, headers, and CSP

[`next.config.ts`](../../next.config.ts) defines **redirects** (including production-only rules), **cache headers**, and **Content-Security-Policy** / related security headers. If you add a new third-party script or frame source, update CSP in the same change.

## Google Analytics

[`src/app/layout.tsx`](../../src/app/layout.tsx) mounts **`GoogleAnalytics`** from **`@next/third-parties/google`** when **`GA_MEASUREMENT_ID`** is set (server-only env var).

## Draft preview API

- **Enable draft**: [`src/app/api/draft/route.ts`](../../src/app/api/draft/route.ts) — `previewSecret` must match **`CONTENTFUL_PREVIEW_SECRET`**.
- **Disable draft**: [`src/app/api/disable-draft/route.ts`](../../src/app/api/disable-draft/route.ts).

Never commit secrets; rotate preview secret in Vercel if it leaks.

## `src/proxy.ts`

[`src/proxy.ts`](../../src/proxy.ts) sets **`x-pathname`** and optional **`x-utmCampaign`** on the request for downstream use. **Next.js middleware is not present in this repo**, so this module is only effective if something imports it into **`middleware.ts`** (or similar). Treat it as **library code** until wired.
