import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeComponentGridMediaSkeleton } from "./TypeComponentGridMedia";

export interface TypeCaseStudyFields {
  entryTitle?: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  pageTitle: EntryFieldTypes.Symbol;
  pageDescription?: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  copy: EntryFieldTypes.RichText;
  media: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  gridMedia?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeComponentGridMediaSkeleton>
  >;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<"Branding" | "Marketing" | "Sales">
  >;
  tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  enableIndexing?: EntryFieldTypes.Boolean;
  metaDescription: EntryFieldTypes.Symbol;
  socialImage: EntryFieldTypes.AssetLink;
}

export type TypeCaseStudySkeleton = EntrySkeletonType<
  TypeCaseStudyFields,
  "caseStudy"
>;
export type TypeCaseStudy<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCaseStudySkeleton, Modifiers, Locales>;
