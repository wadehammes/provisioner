import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeModulesSkeleton } from "./TypeModules";

export interface TypeSectionFields {
  entryTitle?: EntryFieldTypes.Symbol;
  header?: EntryFieldTypes.RichText;
  content: EntryFieldTypes.EntryLink<TypeModulesSkeleton>;
}

export type TypeSectionSkeleton = EntrySkeletonType<
  TypeSectionFields,
  "section"
>;
export type TypeSection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSectionSkeleton, Modifiers, Locales>;
