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
  excerpt?: EntryFieldTypes.RichText;
  copy: EntryFieldTypes.RichText;
  category?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  enableIndexing?: EntryFieldTypes.Boolean;
  metaDescription?: EntryFieldTypes.Symbol;
  socialImage?: EntryFieldTypes.AssetLink;
}

export type TypeVisionSkeleton = EntrySkeletonType<TypeVisionFields, "vision">;
export type TypeVision<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVisionSkeleton, Modifiers, Locales>;
