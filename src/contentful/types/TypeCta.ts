import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeCtaFields {
  entryTitle?: EntryFieldTypes.Symbol;
  ctaText: EntryFieldTypes.Symbol;
  ctaPageLink?: EntryFieldTypes.EntryLink<TypePageSkeleton>;
  ctaExternalLink?: EntryFieldTypes.Symbol;
}

export type TypeCtaSkeleton = EntrySkeletonType<TypeCtaFields, "cta">;
export type TypeCta<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCtaSkeleton, Modifiers, Locales>;
