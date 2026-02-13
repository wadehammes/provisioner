import type { Document } from "@contentful/rich-text-types";
import {
  isTypeSection,
  type TypeSectionWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Section {
  header: Document | undefined;
  content:
    | TypeSectionWithoutUnresolvableLinksResponse["fields"]["content"]
    | undefined;
}

export type SectionEntry =
  | TypeSectionWithoutUnresolvableLinksResponse
  | undefined;

export function parseContentfulSection(section: SectionEntry): Section | null {
  if (!section || !isTypeSection(section)) {
    return null;
  }

  return {
    header: section.fields.header,
    content: section.fields.content,
  };
}
