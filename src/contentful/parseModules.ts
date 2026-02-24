import type {
  ContentfulTypeCheck,
  ExtractSymbolType,
} from "src/contentful/helpers";
import {
  isTypeModules,
  type TypeModulesFields,
  type TypeModulesWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface Module {
  module: ExtractSymbolType<TypeModulesFields["module"]>;
}

const _moduleTypeValidation: ContentfulTypeCheck<
  Module,
  TypeModulesFields,
  "module"
> = true;

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
