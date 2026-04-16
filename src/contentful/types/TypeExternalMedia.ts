import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeExternalMediaFields {
  entryTitle?: EntryFieldTypes.Symbol;
  url: EntryFieldTypes.Symbol;
}

export type TypeExternalMediaSkeleton = EntrySkeletonType<
  TypeExternalMediaFields,
  "externalMedia"
>;
export type TypeExternalMedia<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeExternalMediaSkeleton, Modifiers, Locales>;

export function isTypeExternalMedia<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeExternalMedia<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "externalMedia";
}

export type TypeExternalMediaWithoutLinkResolutionResponse =
  TypeExternalMedia<"WITHOUT_LINK_RESOLUTION">;
export type TypeExternalMediaWithoutUnresolvableLinksResponse =
  TypeExternalMedia<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeExternalMediaWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeExternalMedia<"WITH_ALL_LOCALES", Locales>;
export type TypeExternalMediaWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeExternalMedia<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeExternalMediaWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeExternalMedia<
  "WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES",
  Locales
>;
