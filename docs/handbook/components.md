# Components

How UI is organized under `src/components/`, `src/ui/`, and how we test it.

## Folder layout

- **Feature components**: [`src/components/<Name>/`](../../src/components/) — typically `Name.component.tsx`, `Name.module.css`, and optional `*.spec.tsx` / `*.po.tsx`.
- **Primitives**: [`src/ui/`](../../src/ui/) — reusable controls (buttons, fields) shared across flows.
- **Leaf / marketing-specific primitives**: e.g. [`LeafButton`](../../src/components/LeafButton/), [`LeafInput`](../../src/components/LeafInput/) when the design system differentiates them from `src/ui/`.

There is **no `pnpm scaffold`** script wired in `package.json` today; an optional shell helper lives at [`scripts/scaffold_component.sh`](../../scripts/scaffold_component.sh). New folders otherwise follow the naming above by convention.

## Naming

- Prefer **`.component.tsx`** for the main React export in a feature folder.
- Keep **one primary component file** per folder unless the feature is large enough to justify split files (hooks, parsing helpers).

## CSS Modules

Import as `import styles from "./Name.module.css"` and reference **`styles.className`**. Prefer **`classNames`** for conditional classes (see [conventions.md](conventions.md)).

## Links and media

- Internal routes: **`next/link`**.
- External URLs: **`Link`** with `href` set appropriately, or anchors when the design intentionally uses plain links—match nearby patterns.
- Video / animated media: see existing **`react-player`**, **Swiper**, and **`AnimatedMedia`** usage before adding a new dependency.

## Testing

- Colocate **`* .spec.tsx`** with the component when adding coverage.
- Use **page objects** (`*.po.tsx`) for repeated selectors and setup; see [conventions.md → Testing](conventions.md#testing).

## Exports

Import from the **concrete module path** (e.g. `src/components/Hero/Hero.tsx` or `Hero.component.tsx`). Avoid new barrel **`index.ts`** files unless the repo already uses one in that area.
