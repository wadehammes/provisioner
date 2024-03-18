import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeCaseStudyFields {
  entryTitle?: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  enableIndexing?: EntryFieldTypes.Boolean;
  metaDescription: EntryFieldTypes.Symbol;
}

export type TypeCaseStudySkeleton = EntrySkeletonType<
  TypeCaseStudyFields,
  "caseStudy"
>;
export type TypeCaseStudy<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeCaseStudySkeleton, Modifiers, Locales>;
