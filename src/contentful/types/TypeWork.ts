import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeCaseStudySkeleton } from "./TypeCaseStudy";

export interface TypeWorkFields {
  entryTitle?: EntryFieldTypes.Symbol;
  projectName?: EntryFieldTypes.Symbol;
  projectSubhead?: EntryFieldTypes.Symbol;
  client: EntryFieldTypes.Symbol;
  id: EntryFieldTypes.Symbol;
  featuredMedia?: EntryFieldTypes.AssetLink;
  projectDescription?: EntryFieldTypes.RichText;
  caseStudy?: EntryFieldTypes.EntryLink<TypeCaseStudySkeleton>;
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<"Branding" | "Marketing" | "Sales">
  >;
  cursorIcon?: EntryFieldTypes.Symbol;
  priority?: EntryFieldTypes.Integer;
  addToFeaturedCarousel?: EntryFieldTypes.Boolean;
}

export type TypeWorkSkeleton = EntrySkeletonType<TypeWorkFields, "work">;
export type TypeWork<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeWorkSkeleton, Modifiers, Locales>;
