import type { Document } from "@contentful/rich-text-types";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeSection,
  TypeSectionFields,
  type TypeSectionWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Section {
  header?: Document | undefined;
  content:
    | TypeSectionWithoutUnresolvableLinksResponse["fields"]["content"]
    | undefined;
}

const _sectionTypeValidation: ContentfulTypeCheck<Section, TypeSectionFields> =
  true;

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
