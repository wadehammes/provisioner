# Handbook routing (for tools and LLMs)

Choose **which markdown file to read first**. Paths below are relative to **`docs/handbook/`**.

## Task → chapter

| Task or question | Read first |
|------------------|------------|
| Stack, folders, Contentful → UI data flow | [architecture.md](architecture.md) |
| TypeScript / React / Biome / CSS / tests | [conventions.md](conventions.md) |
| Generated types, getters, parsers, `isType*`, Rich Text | [contentful.md](contentful.md) |
| Component folders, naming, tests | [components.md](components.md) |
| App Router pages, metadata, draft mode, React Query | [patterns.md](patterns.md) |
| CI, scripts, `next.config`, env, CSP, draft APIs, `proxy.ts` | [platform.md](platform.md) |
| Sitemaps, `make sitemap`, `generateSitemap` | [distribution.md](distribution.md) |
| Where a file category lives under `src/` | [source-layout.md](source-layout.md) |

## Outside this folder

| Task | Location |
|------|----------|
| Install Node/pnpm, Vercel CLI, first run | Repo root **[README.md](../../README.md)** |

## Suggested instruction blurb (copy-paste)

```text
Before substantive edits, read docs/handbook/README.md and the chapter that matches the task (see docs/handbook/llms.md for a task→chapter map). When your change affects behavior, setup, or conventions, update the relevant docs/handbook/*.md in the same PR or an immediate follow-up so the handbook stays accurate.
```
