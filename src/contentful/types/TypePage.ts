import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeSectionSkeleton } from "./TypeSection";

export interface TypePageFields {
  entryTitle: EntryFieldTypes.Symbol;
  pageTitle: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  navigationTitle: EntryFieldTypes.Symbol;
  sections?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeSectionSkeleton>
  >;
  enableIndexing: EntryFieldTypes.Boolean;
  metaDescription: EntryFieldTypes.Symbol;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;
