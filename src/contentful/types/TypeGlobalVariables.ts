import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeGlobalVariablesFields {
  entryTitle?: EntryFieldTypes.Symbol;
  id: EntryFieldTypes.Symbol;
  email?: EntryFieldTypes.Symbol;
  instagramUrl?: EntryFieldTypes.Symbol;
  twitterUrl?: EntryFieldTypes.Symbol;
  facebookUrl?: EntryFieldTypes.Symbol;
}

export type TypeGlobalVariablesSkeleton = EntrySkeletonType<
  TypeGlobalVariablesFields,
  "globalVariables"
>;
export type TypeGlobalVariables<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeGlobalVariablesSkeleton, Modifiers, Locales>;

export function isTypeGlobalVariables<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeGlobalVariables<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "globalVariables";
}

export type TypeGlobalVariablesWithoutLinkResolutionResponse =
  TypeGlobalVariables<"WITHOUT_LINK_RESOLUTION">;
export type TypeGlobalVariablesWithoutUnresolvableLinksResponse =
  TypeGlobalVariables<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeGlobalVariablesWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGlobalVariables<"WITH_ALL_LOCALES", Locales>;
export type TypeGlobalVariablesWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGlobalVariables<
  "WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES",
  Locales
>;
export type TypeGlobalVariablesWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGlobalVariables<
  "WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES",
  Locales
>;
