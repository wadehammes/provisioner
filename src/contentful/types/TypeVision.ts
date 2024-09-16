import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeVisionFields {
  entryTitle?: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  copy: EntryFieldTypes.RichText;
  enableIndexing?: EntryFieldTypes.Boolean;
  metaDescription?: EntryFieldTypes.Symbol;
}

export type TypeVisionSkeleton = EntrySkeletonType<TypeVisionFields, "vision">;
export type TypeVision<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVisionSkeleton, Modifiers, Locales>;
