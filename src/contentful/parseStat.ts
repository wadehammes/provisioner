import { ContentfulTypeCheck, ExtractSymbolType } from "src/contentful/helpers";
import {
  isTypeStat,
  TypeStatFields,
  type TypeStatWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface StatType {
  id: string;
  caption: string;
  increaseDecrease?: ExtractSymbolType<TypeStatFields["increaseDecrease"]>;
  unit: string;
  value: string;
}

const _statTypeValidation: ContentfulTypeCheck<StatType, TypeStatFields, "id"> =
  true;

export type StatEntry = TypeStatWithoutUnresolvableLinksResponse | undefined;

export function parseContentfulStat(entry: StatEntry): StatType | null {
  if (!entry || !isTypeStat(entry)) {
    return null;
  }

  return {
    id: entry.sys.id,
    caption: entry.fields.caption,
    increaseDecrease: entry.fields.increaseDecrease,
    unit: entry.fields.unit,
    value: entry.fields.value,
  };
}
