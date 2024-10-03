import type { Entry } from "contentful";
import type { TypeStatSkeleton } from "src/contentful/types";

export interface StatType {
  caption: string;
  increaseDecrease?: "Increase" | "Decrease";
  unit: string;
  value: string;
}

export type StatEntry =
  | Entry<TypeStatSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export function parseContentfulStat(entry: StatEntry): StatType | null {
  if (!entry) {
    return null;
  }

  return {
    caption: entry.fields.caption,
    increaseDecrease: entry.fields.increaseDecrease,
    unit: entry.fields.unit,
    value: entry.fields.value,
  };
}
