import { contentfulClient } from "src/contentful/client";
import {
  type Page,
  parseContentfulPageForNavigation,
} from "src/contentful/getPages";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import { type Cta, parseContentfulCta } from "src/contentful/parseCta";
import {
  isTypeCta,
  isTypeNavigation,
  isTypePage,
  TypeNavigationFields,
  type TypeNavigationSkeleton,
  type TypeNavigationWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type NavigationEntry = TypeNavigationWithoutUnresolvableLinksResponse;

export interface NavigationType {
  id: string;
  navigationItems: Partial<Page | null>[];
  navigationCta?: Cta | null;
}

const _navigationTypeValidation: ContentfulTypeCheck<
  NavigationType,
  TypeNavigationFields,
  "id"
> = true;

export function parseContentfulNavigation(
  navigationEntry?: NavigationEntry,
): NavigationType | null {
  if (!navigationEntry || !isTypeNavigation(navigationEntry)) {
    return null;
  }

  const navigationCta = navigationEntry.fields.navigationCta;
  return {
    id: navigationEntry.sys.id,
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
