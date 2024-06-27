import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeComponentGridMediaFields {
  entryTitle?: EntryFieldTypes.Symbol;
  media: EntryFieldTypes.AssetLink;
  gridPlacement?: EntryFieldTypes.Symbol<
    "Full Width" | "Half Width" | "Quarter Width" | "Third Width"
  >;
}

export type TypeComponentGridMediaSkeleton = EntrySkeletonType<
  TypeComponentGridMediaFields,
  "componentGridMedia"
>;
export type TypeComponentGridMedia<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeComponentGridMediaSkeleton, Modifiers, Locales>;
