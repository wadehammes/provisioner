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
