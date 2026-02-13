import { contentfulClient } from "src/contentful/client";
import {
  isTypeGlobalVariables,
  type TypeGlobalVariablesSkeleton,
  type TypeGlobalVariablesWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

export interface GlobalVariables {
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

type GlobalVariablesEntry = TypeGlobalVariablesWithoutUnresolvableLinksResponse;

export function parseContentfulGlobalVariables(
  globalVariables?: GlobalVariablesEntry,
): GlobalVariables | null {
  if (!globalVariables || !isTypeGlobalVariables(globalVariables)) {
    return null;
  }

  return {
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
