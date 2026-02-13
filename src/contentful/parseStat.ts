import { ExtractSymbolType } from "src/contentful/helpers";
import {
  isTypeStat,
  TypeStatFields,
  type TypeStatWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface StatType {
  caption: string;
  increaseDecrease?: ExtractSymbolType<TypeStatFields["increaseDecrease"]>;
  unit: string;
  value: string;
}

export type StatEntry = TypeStatWithoutUnresolvableLinksResponse | undefined;

export function parseContentfulStat(entry: StatEntry): StatType | null {
  if (!entry || !isTypeStat(entry)) {
    return null;
  }

  return {
    caption: entry.fields.caption,
    increaseDecrease: entry.fields.increaseDecrease,
    unit: entry.fields.unit,
    value: entry.fields.value,
  };
}
