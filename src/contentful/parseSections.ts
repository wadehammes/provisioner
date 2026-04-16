import type { Document } from "@contentful/rich-text-types";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeModules,
  isTypeSection,
  type TypeModulesWithoutUnresolvableLinksResponse,
  TypeSectionFields,
  type TypeSectionWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Section {
  header?: Document | undefined;
  content: TypeModulesWithoutUnresolvableLinksResponse | undefined;
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

  const linkedModule = section.fields.content;

  return {
    header: section.fields.header,
    content:
      linkedModule && isTypeModules(linkedModule) ? linkedModule : undefined,
  };
}
