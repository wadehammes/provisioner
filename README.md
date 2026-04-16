# Provisioner

Provisioner agency website built with **Next.js**, **TypeScript**, **CSS Modules**, and **Contentful**.

## Prerequisites / recommendations

- **[ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#how-to-install-zsh-on-many-platforms)** — recommended shell.
- **[Oh My Zsh](https://ohmyz.sh/)** (optional) — themes and plugins for ZSH.

## Development setup

### Runtime versions ([asdf](https://asdf-vm.com/guide/getting-started.html))

Tool versions live in [`.tool-versions`](./.tool-versions). Install the Node.js plugin (and any others listed there), then:

```bash
asdf install
```

### Install dependencies

This repo uses **pnpm** ([`package.json`](./package.json) `packageManager` field enforces the version).

```bash
pnpm install
```

### Environment variables

1. Install the [Vercel CLI](https://vercel.com/docs/cli) if you do not already have it.
2. From the repo root, run **`vercel link`** and connect this repository to the **Provisioner** Vercel project (you need access to that team/project).
3. Pull env vars for local development:

```bash
vercel env pull
```

That produces **`.env.local`** (gitignored). If you cannot access the Vercel project, ask a teammate who has access to share the required variable **names** (see **`.env.sample`** if present, or `env` in [`next.config.ts`](./next.config.ts))—never commit secrets.

### Dev server

```bash
pnpm dev
```

The app serves at **http://localhost:7777** by default (see [`package.json`](./package.json) `dev` script).

To work against **Contentful preview** content, enable draft mode via the draft API (see [`docs/handbook/patterns.md`](./docs/handbook/patterns.md)) after configuring preview credentials.

## Development and deployment

Deployment is via **[Vercel](https://vercel.com/)** for this repository. Pull requests typically receive **Preview** deployments; production follows your team’s promotion process from the default branch.

### Default branch is **`staging`**

Develop on feature branches cut from **`staging`**. Open PRs into **`staging`**; CI runs [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) (`tsc`, Biome, Jest).

### Production releases

Tags **`v*`** trigger [`.github/workflows/release.yml`](./.github/workflows/release.yml) (push tag to `main`, create GitHub Release with changelog). To cut a release from `staging`:

1. Check out **`staging`** and pull the latest.
2. Use the Makefile (tag must start with `v`):

```bash
make release tag=vX.Y.Z
```

See [`Makefile`](./Makefile) for details.

### Regenerating Contentful types

When content types change in Contentful:

```bash
pnpm types:contentful
```

Requires **`CONTENTFUL_SPACE_ID`** and **`CONTENTFUL_CMA_TOKEN`** (see script in [`package.json`](./package.json)). Then fix any parser or type errors until **`pnpm tsc:ci`** passes.

### Adding new environment keys

**Vercel first:** add the variable in the Vercel project for each environment that needs it (Preview, Production, Development). Builds read from Vercel for deployed environments.

Then update the repo:

1. **[`next.config.ts`](./next.config.ts)** — add the key under **`env`** when it must be exposed to the client bundle (mirror existing entries).
2. **`.env.local`** — your local value (not committed).
3. **`.env.sample`** — document the key name only (no secrets), if the repo tracks that file.
4. Run **`vercel env pull`** after dashboard changes so local files stay in sync.

### Managing package updates

1. Branch: `git checkout -b package-updates-YYYY-MM-DD`.
2. Upgrade selectively: `pnpm up --interactive` (or targeted `pnpm add` / `pnpm up <pkg>`).
3. Run **`pnpm tsc:ci`**, **`pnpm lint:ci`**, **`pnpm test:ci`**, and smoke-test Preview.
4. Open a PR for review.

### Testing

**Jest** + **Testing Library**. Example specs live next to components (e.g. `StartYourProjectForm.component.spec.tsx`). Use **`import { render, screen, … } from "test-utils"`** (see root [`test-utils.tsx`](./test-utils.tsx)), aligned with the Rhythm marketing repo. Page object bases live under [`src/tests/`](./src/tests/).

## Linting and formatting

This project uses **[Biome](https://biomejs.dev/)** for lint and format.

- CI-style check: `pnpm lint:ci`
- Auto-fix where possible: `pnpm lint:fix`
- Format write: `pnpm biome:fix`

Typecheck: `pnpm tsc:ci`

## Provisioner handbook

The **handbook** lives under [`docs/handbook/`](./docs/handbook/). It is the canonical place for architecture, Contentful integration, App Router patterns, CI/env, and source layout. Read it when onboarding, touching an unfamiliar area, or opening a PR and you want to match existing patterns.

The handbook is **markdown only**. Keep it **in sync with the codebase**—when architecture or conventions change, update the relevant `docs/handbook/*.md` in the same change or a quick follow-up.

**Entry point:** [`docs/handbook/README.md`](./docs/handbook/README.md) — overview and index.

**Agents / automation:** use the task map in [`docs/handbook/llms.md`](./docs/handbook/llms.md) for custom GPTs or other tools.

### Suggested reading order

- **New to the project:** [architecture.md](./docs/handbook/architecture.md), then [conventions.md](./docs/handbook/conventions.md), then skim [patterns.md](./docs/handbook/patterns.md).
- **Adding or changing UI:** [components.md](./docs/handbook/components.md) + [conventions.md](./docs/handbook/conventions.md).
- **CMS (Contentful):** [contentful.md](./docs/handbook/contentful.md).
- **Pages, metadata, draft mode:** [patterns.md](./docs/handbook/patterns.md).
- **CI, env, CSP, `next.config`:** [platform.md](./docs/handbook/platform.md).
- **Sitemaps:** [distribution.md](./docs/handbook/distribution.md).
- **Finding modules under `src/`:** [source-layout.md](./docs/handbook/source-layout.md).

### What each document covers

| Document | Purpose |
|----------|---------|
| [**architecture.md**](./docs/handbook/architecture.md) | Stack, **directory map**, App Router + Contentful **data flow**, config entry points. |
| [**conventions.md**](./docs/handbook/conventions.md) | TypeScript, React, **Biome**, CSS Modules, **testing**, accessibility. |
| [**contentful.md**](./docs/handbook/contentful.md) | **Generated types**, getters, parsers, **`isType*`** guards, **Rich Text**, client. |
| [**components.md**](./docs/handbook/components.md) | Component / `src/ui` layout, naming, tests, links. |
| [**patterns.md**](./docs/handbook/patterns.md) | **Server components**, **`generateMetadata`**, **draft mode**, React Query, forms. |
| [**platform.md**](./docs/handbook/platform.md) | **GitHub CI**, **`pnpm` scripts**, **`next.config`** (env, redirects, CSP), draft APIs, **`src/proxy.ts`**. |
| [**distribution.md**](./docs/handbook/distribution.md) | **Sitemap** generation (`make sitemap`, `src/lib/generateSitemap.ts`). |
| [**source-layout.md**](./docs/handbook/source-layout.md) | **`src/`** module map. |
| [**llms.md**](./docs/handbook/llms.md) | **Task → chapter** map and copy-paste blurb for agents. |

### Relationship to this README

This README focuses on **machine setup**, **deploy/release**, **Contentful codegen**, **env keys**, **package upgrades**, and **Biome/tsc commands**. Deeper rules (why parsers use certain guards, how draft mode threads through getters) belong in the handbook. When you add a recurring workflow everyone should follow, add a short pointer here and put the full explanation under `docs/handbook/`.

## Other resources

- [Next.js documentation](https://nextjs.org/docs)
- [Contentful CDA](https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/)
- [pnpm](https://pnpm.io/)
- [Biome](https://biomejs.dev/)
