import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeModulesFields {
  entryTitle?: EntryFieldTypes.Symbol;
  module: EntryFieldTypes.Symbol<"Contact Form" | "Newsletter Form">;
}

export type TypeModulesSkeleton = EntrySkeletonType<
  TypeModulesFields,
  "modules"
>;
export type TypeModules<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeModulesSkeleton, Modifiers, Locales>;
