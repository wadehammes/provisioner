import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import type { TypeQuoteSkeleton } from "src/contentful/types";

export interface QuoteType {
  quote: Document | null;
  name?: string;
  title?: string;
}

export type QuoteEntry =
  | Entry<TypeQuoteSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export function parseContentfulQuote(entry: QuoteEntry): QuoteType | null {
  if (!entry) {
    return null;
  }

  return {
    quote: entry.fields.quote,
    name: entry.fields.name,
    title: entry.fields.title,
  };
}
