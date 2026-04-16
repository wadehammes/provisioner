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

Run the same locally before pushing when possible.

## Package scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Next dev server on **port 7777** (see root README). |
| `pnpm build` | Production build + **`make sitemap`**. |
| `pnpm start` | Serve production build on port 7777. |
| `pnpm tsc:ci` / `pnpm lint:ci` / `pnpm test:ci` | Quality gates (match CI). |
| `pnpm lint:fix` / `pnpm biome:fix` | Biome fixes / format. |
| `pnpm types:contentful` | Regenerate `src/contentful/types` (needs Contentful CMA env). |

Full list: [`package.json`](../../package.json).

## Environment variables and `next.config.ts`

[`next.config.ts`](../../next.config.ts) **`env`** block lists names exposed to the **client bundle**. Server-only values should stay off that list unless intentionally public.

**Deployed values** live in the **Vercel project** for this repository. After changing dashboard env vars, run **`vercel env pull`** (or update `.env.local` manually) so local dev matches.

When adding a key:

1. Add it in **Vercel** for the right environments (Preview / Production / Development).
2. Add to **`next.config.ts` → `env`** if the browser or shared client code must read it.
3. Document the name in **`.env.sample`** (no secrets); keep real values in **`.env.local`** (gitignored).

Notable groups today: **Contentful** (space, delivery + preview keys, preview secret), **Resend**, **reCAPTCHA**, **HubSpot**, **Google Analytics** id, etc.—inspect `env` in `next.config.ts` for the authoritative list.

## Redirects, headers, and CSP

[`next.config.ts`](../../next.config.ts) defines **redirects** (including production-only rules), **cache headers**, and **Content-Security-Policy** / related security headers. If you add a new third-party script or frame source, update CSP in the same change.

## Google Analytics

[`src/app/layout.tsx`](../../src/app/layout.tsx) mounts **`GoogleAnalytics`** from **`@next/third-parties/google`** when **`GA_MEASUREMENT_ID`** is configured via `next.config` env wiring.

## Draft preview API

- **Enable draft**: [`src/app/api/draft/route.ts`](../../src/app/api/draft/route.ts) — `previewSecret` must match **`CONTENTFUL_PREVIEW_SECRET`**.
- **Disable draft**: [`src/app/api/disable-draft/route.ts`](../../src/app/api/disable-draft/route.ts).

Never commit secrets; rotate preview secret in Vercel if it leaks.

## `src/proxy.ts`

[`src/proxy.ts`](../../src/proxy.ts) sets **`x-pathname`** and optional **`x-utmCampaign`** on the request for downstream use. **Next.js middleware is not present in this repo**, so this module is only effective if something imports it into **`middleware.ts`** (or similar). Treat it as **library code** until wired.
