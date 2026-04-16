import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeVisionFields {
  entryTitle?: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  excerpt?: EntryFieldTypes.RichText;
  copy: EntryFieldTypes.RichText;
  category?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  enableIndexing?: EntryFieldTypes.Boolean;
  metaDescription?: EntryFieldTypes.Symbol;
  socialImage?: EntryFieldTypes.AssetLink;
}

export type TypeVisionSkeleton = EntrySkeletonType<TypeVisionFields, "vision">;
export type TypeVision<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVisionSkeleton, Modifiers, Locales>;

export function isTypeVision<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeVision<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "vision";
}

export type TypeVisionWithoutLinkResolutionResponse =
  TypeVision<"WITHOUT_LINK_RESOLUTION">;
export type TypeVisionWithoutUnresolvableLinksResponse =
  TypeVision<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeVisionWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVision<"WITH_ALL_LOCALES", Locales>;
export type TypeVisionWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVision<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeVisionWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVision<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
