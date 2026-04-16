# Distribution (sitemaps)

How XML sitemaps are produced for this site.

## Build-time sitemap

- **`pnpm build`** runs **`next build`** then **`make sitemap`** ([`Makefile`](../../Makefile)), which executes [`scripts/make_sitemap.js`](../../scripts/make_sitemap.js).
- **Generation helpers**: [`src/lib/generateSitemap.ts`](../../src/lib/generateSitemap.ts) — `generateSitemap`, `outputSitemap`, and the **`SitemapItem`** shape.

## Route-driven sitemap data

Some routes call **`outputSitemap`** during **`generateStaticParams`** (or related build logic) so slugs discovered from Contentful end up in **`public/`** XML files—see usages of **`outputSitemap`** under [`src/app/`](../../src/app/).

## Canonical site URL

`generateSitemap` uses a fixed **production base** (`https://www.provisioner.agency` in [`generateSitemap.ts`](../../src/lib/generateSitemap.ts)). If the canonical domain changes, update that module and verify **`metadataBase`** / env helpers stay consistent ([`src/utils/helpers.ts`](../../src/utils/helpers.ts) `envUrl`).
