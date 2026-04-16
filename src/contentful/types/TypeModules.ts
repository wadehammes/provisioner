import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeModulesFields {
  entryTitle?: EntryFieldTypes.Symbol;
  module: EntryFieldTypes.Symbol<"Contact Form" | "Newsletter Form">;
}

export type TypeModulesSkeleton = EntrySkeletonType<
  TypeModulesFields,
  "modules"
>;
export type TypeModules<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeModulesSkeleton, Modifiers, Locales>;

export function isTypeModules<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeModules<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "modules";
}

export type TypeModulesWithoutLinkResolutionResponse =
  TypeModules<"WITHOUT_LINK_RESOLUTION">;
export type TypeModulesWithoutUnresolvableLinksResponse =
  TypeModules<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeModulesWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeModules<"WITH_ALL_LOCALES", Locales>;
export type TypeModulesWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeModules<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeModulesWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeModules<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
