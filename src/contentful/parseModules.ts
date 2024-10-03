import type { Entry } from "contentful";
import type { TypeModulesSkeleton } from "src/contentful/types";

export interface Module {
  module: "Contact Form" | "Newsletter Form";
}

export type ModuleEntry =
  | Entry<TypeModulesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  | undefined;

export function parseContentfulModule(module: ModuleEntry): Module | null {
  if (!module) {
    return null;
  }

  return {
    module: module.fields.module,
  };
}
