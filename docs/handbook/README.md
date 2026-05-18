# Provisioner site handbook

This is the **Provisioner site handbook**: how the app is structured, how we write code, how Contentful feeds the UI, and where to look when debugging or adding a feature.

Skim the index, bookmark what you need, and come back when you touch that area. **Keep these docs aligned with the repo**—when behavior changes, update the matching page here (or in the same PR) so the next person is not misled.

**For tools and LLMs:** **[llms.md](llms.md)** has a compact **task → chapter** map and a short copy-paste instruction blurb.

## How to read this handbook

1. **Orientation** — [architecture.md](architecture.md): stack, folders, and how data gets from Contentful to the screen.
2. **Day-to-day coding** — [conventions.md](conventions.md): TypeScript, React, CSS (Biome + Stylelint), tests.
3. **CMS work** — [contentful.md](contentful.md): generated types, getters, parsers, guards, Rich Text.
4. **UI structure** — [components.md](components.md): folders, naming, tests.
5. **App patterns** — [patterns.md](patterns.md): App Router pages, metadata, draft mode, data fetching.
6. **Operations** — [platform.md](platform.md): CI, env, `next.config`, CSP, draft APIs, `src/proxy.ts`.
7. **Sitemaps** — [distribution.md](distribution.md): build-time sitemap output.
8. **Where things live** — [source-layout.md](source-layout.md): `src/app`, `src/components`, `src/contentful`, hooks, API routes.

## Index of docs

| File | What it covers |
|------|----------------|
| [architecture.md](architecture.md) | Tech stack, directory map, data flow, key config. Start here. |
| [conventions.md](conventions.md) | TypeScript, Biome, Stylelint/CSS, Modules, testing, accessibility. |
| [contentful.md](contentful.md) | Generated types, getters, parsers, `isType*` guards, Rich Text, client. |
| [components.md](components.md) | Component folder layout, naming, tests, links. |
| [patterns.md](patterns.md) | Server components, `generateMetadata`, draft mode, TanStack Query usage. |
| [platform.md](platform.md) | GitHub CI, `pnpm` scripts, `next.config` (env, redirects, CSP, headers). |
| [distribution.md](distribution.md) | Sitemap generation during `pnpm build`. |
| [source-layout.md](source-layout.md) | Module map under `src/` and related folders. |
| [llms.md](llms.md) | Task-to-chapter routing; copy-paste blurb for agents. |

## Development setup

Machine setup (Node, pnpm, Vercel CLI, first `pnpm dev`) lives in the root **[README.md](../../README.md)** so we do not duplicate it. After you can run the app locally, use this handbook when you change the codebase.
