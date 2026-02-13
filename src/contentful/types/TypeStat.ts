import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeStatFields {
  entryTitle?: EntryFieldTypes.Symbol;
  value: EntryFieldTypes.Symbol;
  unit: EntryFieldTypes.Symbol;
  increaseDecrease?: EntryFieldTypes.Symbol<"Decrease" | "Increase">;
  caption: EntryFieldTypes.Symbol;
}

export type TypeStatSkeleton = EntrySkeletonType<TypeStatFields, "stat">;
export type TypeStat<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeStatSkeleton, Modifiers, Locales>;

export function isTypeStat<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeStat<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "stat";
}

export type TypeStatWithoutLinkResolutionResponse =
  TypeStat<"WITHOUT_LINK_RESOLUTION">;
export type TypeStatWithoutUnresolvableLinksResponse =
  TypeStat<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeStatWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStat<"WITH_ALL_LOCALES", Locales>;
export type TypeStatWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStat<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeStatWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStat<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
