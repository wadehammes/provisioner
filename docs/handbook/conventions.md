# Conventions

House style for TypeScript, React, CSS, and tests so the repo reads consistently. When in doubt, mirror a nearby file that already matches the pattern and run **`pnpm lint:ci`** before you push. For edits to plain **`.css`** files (global styles, third‑party tweaks), run **`pnpm lint:css`** as well—Biome does not cover those files.

## TypeScript

- Prefer **arrow functions** for components and most helpers.
- **`if` / loops always use `{}`** — no single-line bodies without braces.
- Avoid **`any`** and avoid **non-null assertions (`!`)**; use guards, optional chaining, and `??`.
- **Components**: typed props, no `React.FC`; `export const Name = (props: Props) => { ... }`.
- **Imports**: use the **`src/...`** path alias for app code (see [source-layout.md](source-layout.md)). Co-located **CSS Modules** use relative imports (e.g. `./Name.module.css`).
- **Contentful**: use generated types under `src/contentful/types/` and **`isType*`** guards when narrowing linked entries or optional embeds (see [contentful.md](contentful.md)).

## React / JSX

- Prefer **explicit branches** for conditional UI (`condition ? <A /> : null`) over `condition && <A />` when falsy values could leak into the DOM.
- **`classnames`** (imported as `classNames`) for conditional classes; prefer object form for toggles.
- Use **`next/link`** for internal navigation and **`next/image`** (or shared media components) for raster images where appropriate, with meaningful **`alt`** text.

## Formatting and linting

**Biome** is the linter/formatter for JS/TS/JSON and related files ([`biome.json`](../../biome.json)). **Stylelint** lints **`*.css`** ([`stylelint.config.ts`](../../stylelint.config.ts)), including CSS Modules next to components and globals under **`src/styles/`**.

| Command | Purpose |
|---------|---------|
| `pnpm lint:ci` | CI-style Biome check (GitHub reporter in CI). |
| `pnpm lint:fix` | Fix what Biome can auto-fix. |
| `pnpm biome:fix` | Format write for the tree. |
| `pnpm lint:css` | Stylelint over all **`*.css`** files. |
| `pnpm lint:css:fix` | Stylelint with `--fix` where rules support it. |
| `pnpm tsc:ci` | Strict TypeScript, no emit. |

## CSS

- **CSS Modules** next to components: `Name.component.tsx` + `Name.module.css`.
- Prefer design tokens from [`src/styles/variables.css`](../../src/styles/variables.css) and globals from [`src/styles/globals.css`](../../src/styles/globals.css) where the project already defines them. Custom properties are validated by Stylelint against **`variables.css`** (see config).
- Keep selectors readable; avoid very deep nesting when a flat class reads clearer.
- **Specificity order (Stylelint `no-descending-specificity`):** through the stylesheet, avoid placing a **less** specific selector *after* a **more** specific one when they can target the same element—later rules might not behave the way source order suggests. Prefer **ascending specificity** (weaker selectors first, stronger overrides after). When one rule mixes many selectors at different strengths, split into separate rule sets grouped by specificity, or duplicate shared declarations across tiers rather than repeating weak selectors later in the file after strong ones.
- Third‑party overrides (e.g. Swiper) live under **`src/styles/`**; see [patterns.md — Styling third-party widgets](patterns.md#styling-third-party-widgets).

## Testing

- **Jest** + **Testing Library**; specs live next to components (e.g. `*.spec.tsx`).
- **Custom render**: import from **`"test-utils"`** (alias to root [`test-utils.tsx`](../../test-utils.tsx)), matching the Rhythm marketing repo. [`src/tests/testUtils.tsx`](../../src/tests/testUtils.tsx) re-exports that module for existing `src/tests/testUtils` imports.
- **Page objects** (e.g. [`src/tests/basePageObject.po.ts`](../../src/tests/basePageObject.po.ts), feature `*.po.tsx`) hold selectors and setup; keep **assertions and `screen` queries** in the spec file unless the project already does otherwise for a given component.

## Accessibility

- Interactive controls should be keyboard reachable; prefer React Aria primitives where the codebase already uses them (`src/ui/`, leaf components).
- Images need useful **`alt`** text (empty alt only when decorative).
