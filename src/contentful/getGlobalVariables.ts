import { contentfulClient } from "src/contentful/client";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  isTypeGlobalVariables,
  TypeGlobalVariablesFields,
  type TypeGlobalVariablesSkeleton,
  type TypeGlobalVariablesWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface GlobalVariables {
  id: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

const _globalVariablesTypeValidation: ContentfulTypeCheck<
  GlobalVariables,
  TypeGlobalVariablesFields,
  "id"
> = true;

type GlobalVariablesEntry = TypeGlobalVariablesWithoutUnresolvableLinksResponse;

export function parseContentfulGlobalVariables(
  globalVariables?: GlobalVariablesEntry,
): GlobalVariables | null {
  if (!globalVariables || !isTypeGlobalVariables(globalVariables)) {
    return null;
  }

  return {
    id: globalVariables.sys.id,
    email: globalVariables.fields.email,
    instagramUrl: globalVariables.fields.instagramUrl,
    facebookUrl: globalVariables.fields.facebookUrl,
    twitterUrl: globalVariables.fields.twitterUrl,
  };
}

interface FetchGlobalVariables {
  preview: boolean;
}

export async function fetchGlobalVariables({
  preview,
}: FetchGlobalVariables): Promise<GlobalVariables | null> {
  const contentful = contentfulClient({ preview });

  const globalVariables =
    await contentful.withoutUnresolvableLinks.getEntries<TypeGlobalVariablesSkeleton>(
      {
        content_type: "globalVariables",
        "fields.id": "global-variables",
        include: 10,
        limit: 1000,
      },
    );

  return parseContentfulGlobalVariables(globalVariables.items[0]);
}
