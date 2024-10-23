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
