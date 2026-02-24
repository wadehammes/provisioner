import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeCta,
  TypeCtaFields,
  type TypeCtaWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Cta {
  id: string;
  ctaText: string;
  ctaPageLink?: string;
  ctaExternalLink?: string;
}

const _ctaTypeValidation: ContentfulTypeCheck<Cta, TypeCtaFields, "id"> = true;

export type CtaEntry = TypeCtaWithoutUnresolvableLinksResponse | undefined;

export function parseContentfulCta(cta: CtaEntry): Cta | null {
  if (!cta || !isTypeCta(cta)) {
    return null;
  }

  return {
    id: cta.sys.id,
    ctaText: cta.fields.ctaText,
    ctaPageLink: cta.fields.ctaPageLink?.fields.slug,
    ctaExternalLink: cta.fields.ctaExternalLink,
  };
}
