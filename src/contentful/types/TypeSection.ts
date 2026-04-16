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

export function isTypeSection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypeSection<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "section";
}

export type TypeSectionWithoutLinkResolutionResponse =
  TypeSection<"WITHOUT_LINK_RESOLUTION">;
export type TypeSectionWithoutUnresolvableLinksResponse =
  TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeSectionWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSection<"WITH_ALL_LOCALES", Locales>;
export type TypeSectionWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSection<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeSectionWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSection<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
