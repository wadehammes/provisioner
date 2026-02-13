import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeQuoteFields {
  entryTitle?: EntryFieldTypes.Symbol;
  quote: EntryFieldTypes.RichText;
  name?: EntryFieldTypes.Symbol;
  title?: EntryFieldTypes.Symbol;
}

export type TypeQuoteSkeleton = EntrySkeletonType<TypeQuoteFields, "quote">;
export type TypeQuote<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeQuoteSkeleton, Modifiers, Locales>;

export function isTypeQuote<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeQuote<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "quote";
}

export type TypeQuoteWithoutLinkResolutionResponse =
  TypeQuote<"WITHOUT_LINK_RESOLUTION">;
export type TypeQuoteWithoutUnresolvableLinksResponse =
  TypeQuote<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeQuoteWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeQuote<"WITH_ALL_LOCALES", Locales>;
export type TypeQuoteWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeQuote<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeQuoteWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeQuote<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
