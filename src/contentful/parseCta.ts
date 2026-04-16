import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeCta,
  isTypePage,
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

  const pageLink = cta.fields.ctaPageLink;

  return {
    id: cta.sys.id,
    ctaText: cta.fields.ctaText,
    ctaPageLink:
      pageLink && isTypePage(pageLink) ? pageLink.fields.slug : undefined,
    ctaExternalLink: cta.fields.ctaExternalLink,
  };
}
