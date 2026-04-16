# Conventions

House style for TypeScript, React, CSS, and tests so the repo reads consistently. When in doubt, mirror a nearby file that already matches the pattern and run **`pnpm lint:ci`** before you push.

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

**Biome** is the single linter/formatter ([`biome.json`](../../biome.json)).

| Command | Purpose |
|---------|---------|
| `pnpm lint:ci` | CI-style check (GitHub reporter in CI). |
| `pnpm lint:fix` | Fix what Biome can auto-fix. |
| `pnpm biome:fix` | Format write for the tree. |
| `pnpm tsc:ci` | Strict TypeScript, no emit. |

## CSS

- **CSS Modules** next to components: `Name.component.tsx` + `Name.module.css`.
- Prefer design tokens / globals from [`src/styles/globals.css`](../../src/styles/globals.css) where the project already defines them.
- Keep selectors readable; avoid very deep nesting when a flat class reads clearer.

## Testing

- **Jest** + **Testing Library**; specs live next to components (e.g. `*.spec.tsx`).
- **Custom render**: import from **`"test-utils"`** (alias to root [`test-utils.tsx`](../../test-utils.tsx)), matching the Rhythm marketing repo. [`src/tests/testUtils.tsx`](../../src/tests/testUtils.tsx) re-exports that module for existing `src/tests/testUtils` imports.
- **Page objects** (e.g. [`src/tests/basePageObject.po.ts`](../../src/tests/basePageObject.po.ts), feature `*.po.tsx`) hold selectors and setup; keep **assertions and `screen` queries** in the spec file unless the project already does otherwise for a given component.

## Accessibility

- Interactive controls should be keyboard reachable; prefer React Aria primitives where the codebase already uses them (`src/ui/`, leaf components).
- Images need useful **`alt`** text (empty alt only when decorative).
