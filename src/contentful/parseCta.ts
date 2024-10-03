import type { Entry } from "contentful";
import type { TypeCtaSkeleton } from "src/contentful/types";

export interface Cta {
  id: string;
  ctaText: string;
  ctaPageLink?: string;
  ctaExternalLink?: string;
}

export type CtaEntry =
  | Entry<TypeCtaSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export function parseContentfulCta(cta: CtaEntry): Cta | null {
  if (!cta) {
    return null;
  }

  return {
    id: cta.sys.id,
    ctaText: cta.fields.ctaText,
    ctaPageLink: cta.fields.ctaPageLink?.fields.slug,
    ctaExternalLink: cta.fields.ctaExternalLink,
  };
}
