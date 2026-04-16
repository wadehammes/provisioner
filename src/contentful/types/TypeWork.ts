import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeCaseStudySkeleton } from "./TypeCaseStudy";

export interface TypeWorkFields {
  entryTitle?: EntryFieldTypes.Symbol;
  projectName?: EntryFieldTypes.Symbol;
  projectSubhead?: EntryFieldTypes.Symbol;
  client: EntryFieldTypes.Symbol;
  id: EntryFieldTypes.Symbol;
  featuredMedia?: EntryFieldTypes.AssetLink;
  projectDescription?: EntryFieldTypes.RichText;
  caseStudy?: EntryFieldTypes.EntryLink<TypeCaseStudySkeleton>;
  projectExternalUrl?: EntryFieldTypes.Symbol;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<"Branding" | "Marketing" | "Sales">
  >;
  cursorIcon?: EntryFieldTypes.Symbol;
  priority?: EntryFieldTypes.Integer;
  addToFeaturedCarousel?: EntryFieldTypes.Boolean;
}

export type TypeWorkSkeleton = EntrySkeletonType<TypeWorkFields, "work">;
export type TypeWork<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeWorkSkeleton, Modifiers, Locales>;

export function isTypeWork<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeWork<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "work";
}

export type TypeWorkWithoutLinkResolutionResponse =
  TypeWork<"WITHOUT_LINK_RESOLUTION">;
export type TypeWorkWithoutUnresolvableLinksResponse =
  TypeWork<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeWorkWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeWork<"WITH_ALL_LOCALES", Locales>;
export type TypeWorkWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeWork<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeWorkWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeWork<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
