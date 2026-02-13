import type { ExtractSymbolType } from "src/contentful/helpers";
import {
  isTypeModules,
  type TypeModulesFields,
  type TypeModulesWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Module {
  module: ExtractSymbolType<TypeModulesFields["module"]>;
}

export type ModuleEntry =
  | TypeModulesWithoutUnresolvableLinksResponse
  | undefined;

export function parseContentfulModule(module: ModuleEntry): Module | null {
  if (!module || !isTypeModules(module)) {
    return null;
  }

  return {
    module: module.fields.module,
  };
}
