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
