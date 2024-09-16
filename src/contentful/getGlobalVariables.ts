import type { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import type { TypeGlobalVariablesSkeleton } from "src/contentful/types";

export interface GlobalVariables {
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

type GlobalVariablesEntry = Entry<
  TypeGlobalVariablesSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

export function parseContentfulGlobalVariables(
  globalVariables: GlobalVariablesEntry,
): GlobalVariables | null {
  if (!globalVariables) {
    return null;
  }

  return {
    email: globalVariables.fields.email,
    instagramUrl: globalVariables.fields.instagramUrl,
    facebookUrl: globalVariables.fields.facebookUrl,
    twitterUrl: globalVariables.fields.twitterUrl,
  };
}

// A function to fetch global variables.
// Optionally uses the Contentful content preview.
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
        // biome-ignore lint/style/useNamingConvention: Contentful standards
        content_type: "globalVariables",
        "fields.id": "global-variables",
        include: 10,
        limit: 1000,
      },
    );

  return parseContentfulGlobalVariables(globalVariables.items[0]);
}
