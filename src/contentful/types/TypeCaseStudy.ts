import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeQuoteSkeleton } from "./TypeQuote";
import type { TypeStatSkeleton } from "./TypeStat";

export interface TypeCaseStudyFields {
  entryTitle?: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  pageIntroTitle?: EntryFieldTypes.Symbol;
  pageDescription?: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  situation?: EntryFieldTypes.RichText;
  challenge?: EntryFieldTypes.RichText;
  vision?: EntryFieldTypes.RichText;
  results?: EntryFieldTypes.RichText;
  stats?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeStatSkeleton>>;
  quote?: EntryFieldTypes.EntryLink<TypeQuoteSkeleton>;
  featuredMedia: EntryFieldTypes.AssetLink;
  media: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<"Branding" | "Marketing" | "Sales">
  >;
  tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  enableIndexing?: EntryFieldTypes.Boolean;
  pageTitle: EntryFieldTypes.Symbol;
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
