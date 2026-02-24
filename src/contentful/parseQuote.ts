import type { Document } from "@contentful/rich-text-types";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeQuote,
  TypeQuoteFields,
  type TypeQuoteWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface QuoteType {
  quote: Document | null;
  name?: string;
  title?: string;
}

const _quoteTypeValidation: ContentfulTypeCheck<QuoteType, TypeQuoteFields> =
  true;

export type QuoteEntry = TypeQuoteWithoutUnresolvableLinksResponse | undefined;

export function parseContentfulQuote(entry: QuoteEntry): QuoteType | null {
  if (!entry || !isTypeQuote(entry)) {
    return null;
  }

  return {
    quote: entry.fields.quote,
    name: entry.fields.name,
    title: entry.fields.title,
  };
}
