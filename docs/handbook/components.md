# Components

How UI is organized under `src/components/`, `src/ui/`, and how we test it.

## Folder layout

- **Feature components**: [`src/components/<Name>/`](../../src/components/) — typically `Name.component.tsx`, `Name.module.css`, and optional `*.spec.tsx` / `*.po.tsx`.
- **Primitives**: [`src/ui/`](../../src/ui/) — reusable controls (e.g. [`Button`](../../src/ui/Button/Button.component.tsx) on **Base UI**) shared across flows. Form fields: [`LeafInput`](../../src/components/LeafInput/LeafInput.component.tsx) / [`LeafTextArea`](../../src/components/LeafInput/LeafTextArea.component.tsx) (**Base UI** `Field` + `Input`).
- **Leaf / marketing-specific primitives**: e.g. [`LeafButton`](../../src/components/LeafButton/), [`LeafInput`](../../src/components/LeafInput/) when the design system differentiates them from `src/ui/`.

There is **no scaffold script** in [`package.json`](../../package.json). Copy an existing sibling folder (see Cursor **`enforce-component-template`**) or run [`scripts/scaffold_component.sh`](../../scripts/scaffold_component.sh) manually—it generates **`Name.component.tsx`**, **`Name.module.css`**, and **`Name.spec.tsx`** (CSS Modules only, not styled-components). New folders otherwise follow the naming above by convention.

## Naming

- Prefer **`.component.tsx`** for the main React export in a feature folder.
- Keep **one primary component file** per folder unless the feature is large enough to justify split files (hooks, parsing helpers).

## CSS Modules

Import as `import styles from "./Name.module.css"` and reference **`styles.className`**. Prefer **`classNames`** for conditional classes (see [conventions.md](conventions.md)).

## Links and media

- Internal routes: **`next/link`**.
- External URLs: **`Link`** with `href` set appropriately, or anchors when the design intentionally uses plain links—match nearby patterns.
- Video / animated media: see existing **`react-player`**, **Swiper**, and **`AnimatedMedia`** usage before adding a new dependency.
- Scroll-in motion (e.g. [`AnimatedCaseStudyCard`](../../src/components/CaseStudyCard/AnimatedCaseStudyCard.component.tsx)): **CSS transitions** + **`react-intersection-observer`**—not GSAP. Wrap SVGR icons in a **`<div>` / `<span>`** for CSS module classes (see [`Footer`](../../src/components/Footer/Footer.component.tsx)) to avoid hydration mismatches on `<svg className>`.

### Home hero

- **Component**: [`Hero.tsx`](../../src/components/Hero/Hero.tsx) — server component (no load-in animation); pairs with global [`.hero` / `.page-header`](../../src/styles/globals.css) and [`Hero.module.css`](../../src/components/Hero/Hero.module.css).
- **Spacing**: title → CTA uses **`flex` `gap`** on **`styles.pageHeader`** (with global **`page-header`**), not **`margin-top`** on the button row. **`heroH1`** adds **`padding-bottom`** so the global **`strong`** underline ([`globals.css`](../../src/styles/globals.css)) does not sit in the same visual band as the CTA.
- **Tablet (~600px–1099px)**: module overrides avoid vertically centering in a tall min-height block (`min-height: auto`, top-aligned flex, extra **`padding-block`**, larger header **`gap`**, slightly looser **`heroH1`** **`line-height`**) so the headline is not cramped under the nav.

### Case study detail (`/case-studies/[slug]`)

- **Template**: [`CaseStudy.component.tsx`](../../src/components/CaseStudy/CaseStudy.component.tsx) — hero title, then **lead media** (optional intro video + **first** `media` asset), then the three columns (**Situation** / **Challenge** / **Vision**) with thin stroke icons from [`src/icons/CaseStudy*.icon.svg`](../../src/icons/) (wrapped in **`<span>`** for CSS Modules), then remaining gallery items (stats / quote embeds keep their original indices in the full `media` array).

### Case study index (`/case-studies`)

- **Page**: [`CaseStudiesPage.component.tsx`](../../src/components/CaseStudiesPage/CaseStudiesPage.component.tsx) maps [`fetchCaseStudies`](../../src/contentful/getCaseStudies.ts) results; entries **without `featuredMedia`** are skipped.
- **Card wrapper**: [`AnimatedCaseStudyCard`](../../src/components/CaseStudyCard/AnimatedCaseStudyCard.component.tsx) + [`AnimatedCaseStudyCard.module.css`](../../src/components/CaseStudyCard/AnimatedCaseStudyCard.module.css) own enter visibility (`opacity` / `transform` on the card link when **`inView`**).
- **Grid styles**: [`CaseStudiesPage.module.css`](../../src/components/CaseStudiesPage/CaseStudiesPage.module.css) — do **not** set **`opacity: 0`** on **`.caseStudiesList li`**; that hid the whole card after GSAP was removed. Keep list layout only (`grid`, `perspective`, etc.).

## Testing

- Colocate **`* .spec.tsx`** with the component when adding coverage.
- Use **page objects** (`*.po.tsx`) for repeated selectors and setup; see [conventions.md → Testing](conventions.md#testing).

## Exports

Import from the **concrete module path** (e.g. `src/components/Hero/Hero.tsx` or `Hero.component.tsx`). Avoid new barrel **`index.ts`** files unless the repo already uses one in that area.
