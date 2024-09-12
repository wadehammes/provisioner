import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeGlobalVariablesFields {
  entryTitle?: EntryFieldTypes.Symbol;
  id: EntryFieldTypes.Symbol;
  email?: EntryFieldTypes.Symbol;
  instagramUrl?: EntryFieldTypes.Symbol;
  twitterUrl?: EntryFieldTypes.Symbol;
  facebookUrl?: EntryFieldTypes.Symbol;
}

export type TypeGlobalVariablesSkeleton = EntrySkeletonType<
  TypeGlobalVariablesFields,
  "globalVariables"
>;
export type TypeGlobalVariables<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeGlobalVariablesSkeleton, Modifiers, Locales>;
