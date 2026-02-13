import { contentfulClient } from "src/contentful/client";
import {
  type Page,
  parseContentfulPageForNavigation,
} from "src/contentful/getPages";
import { type Cta, parseContentfulCta } from "src/contentful/parseCta";
import {
  isTypeCta,
  isTypeNavigation,
  isTypePage,
  type TypeNavigationSkeleton,
  type TypeNavigationWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type NavigationEntry = TypeNavigationWithoutUnresolvableLinksResponse;

export interface NavigationType {
  navigationItems: Partial<Page | null>[];
  navigationCta: Cta | null;
}

export function parseContentfulNavigation(
  navigationEntry?: NavigationEntry,
): NavigationType | null {
  if (!navigationEntry || !isTypeNavigation(navigationEntry)) {
    return null;
  }

  const navigationCta = navigationEntry.fields.navigationCta;
  return {
    navigationCta:
      navigationCta && isTypeCta(navigationCta)
        ? parseContentfulCta(navigationCta)
        : null,
    navigationItems: navigationEntry.fields.navigationItems.map((page) =>
      page && isTypePage(page) ? parseContentfulPageForNavigation(page) : null,
    ),
  };
}

interface FetchNavigationOptions {
  id: string;
  preview: boolean;
}

export async function fetchNavigation({
  id,
  preview,
}: FetchNavigationOptions): Promise<NavigationType | null> {
  const contentful = contentfulClient({ preview });

  const NavigationResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeNavigationSkeleton>(
      {
        content_type: "navigation",
        "fields.id": id,
        include: 10,
      },
    );

  return parseContentfulNavigation(NavigationResult.items[0]);
}
