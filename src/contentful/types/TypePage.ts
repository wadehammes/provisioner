import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeSectionSkeleton } from "./TypeSection";

export interface TypePageFields {
  entryTitle: EntryFieldTypes.Symbol;
  pageTitle: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  navigationTitle: EntryFieldTypes.Symbol;
  sections?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeSectionSkeleton>
  >;
  enableIndexing: EntryFieldTypes.Boolean;
  metaDescription: EntryFieldTypes.Symbol;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(entry: unknown): entry is TypePage<Modifiers, Locales> {
  const candidate = entry as {
    sys?: { contentType?: { sys?: { id?: string } } };
  };
  return candidate.sys?.contentType?.sys?.id === "page";
}

export type TypePageWithoutLinkResolutionResponse =
  TypePage<"WITHOUT_LINK_RESOLUTION">;
export type TypePageWithoutUnresolvableLinksResponse =
  TypePage<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypePageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<"WITH_ALL_LOCALES", Locales>;
export type TypePageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypePageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
