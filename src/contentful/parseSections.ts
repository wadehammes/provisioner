import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { TypeModulesSkeleton, TypeSectionSkeleton } from "src/contentful/types";

export interface Section {
  header: Document | undefined;
  content:
    | Entry<TypeModulesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
    | undefined;
}

export type SectionEntry =
  | Entry<TypeSectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export function parseContentfulSection(section: SectionEntry): Section | null {
  if (!section) {
    return null;
  }

  return {
    header: section.fields.header,
    content: section.fields.content,
  };
}
