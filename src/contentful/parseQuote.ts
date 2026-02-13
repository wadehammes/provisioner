import type { Document } from "@contentful/rich-text-types";
import {
  isTypeQuote,
  type TypeQuoteWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface QuoteType {
  quote: Document | null;
  name?: string;
  title?: string;
}

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
