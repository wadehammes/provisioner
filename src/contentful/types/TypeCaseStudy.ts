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
  introVideo?: EntryFieldTypes.Symbol;
  media: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<"Branding" | "Marketing" | "Sales">
  >;
  tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  clientUrl?: EntryFieldTypes.Symbol;
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

export function isTypeCaseStudy<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeCaseStudy<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "caseStudy";
}

export type TypeCaseStudyWithoutLinkResolutionResponse =
  TypeCaseStudy<"WITHOUT_LINK_RESOLUTION">;
export type TypeCaseStudyWithoutUnresolvableLinksResponse =
  TypeCaseStudy<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeCaseStudyWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCaseStudy<"WITH_ALL_LOCALES", Locales>;
export type TypeCaseStudyWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCaseStudy<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeCaseStudyWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCaseStudy<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
