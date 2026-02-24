import { contentfulClient } from "src/contentful/client";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  parseContentfulSection,
  type Section,
} from "src/contentful/parseSections";
import {
  isTypePage,
  TypePageFields,
  type TypePageSkeleton,
  type TypePageWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type PageEntry = TypePageWithoutUnresolvableLinksResponse;

export interface Page {
  id: string;
  pageTitle: string;
  navigationTitle: string;
  slug: string;
  sections?: (Section | null)[];
  enableIndexing: boolean;
  metaDescription: string;
  updatedAt: string;
}

const _pageTypeValidation: ContentfulTypeCheck<
  Page,
  TypePageFields,
  "updatedAt" | "id"
> = true;

export function parseContentfulPage(pageEntry?: PageEntry): Page | null {
  if (!pageEntry || !isTypePage(pageEntry)) {
    return null;
  }

  return {
    id: pageEntry.sys.id,
    pageTitle: pageEntry.fields.pageTitle,
    navigationTitle:
      pageEntry.fields.navigationTitle || pageEntry.fields.pageTitle,
    slug: pageEntry.fields.slug,
    enableIndexing: pageEntry.fields?.enableIndexing ?? true,
    sections:
      pageEntry?.fields?.sections?.map((section) =>
        parseContentfulSection(section),
      ) ?? [],
    updatedAt: pageEntry.sys.updatedAt,
    metaDescription: pageEntry.fields.metaDescription,
  };
}

export function parseContentfulPageForNavigation(
  pageEntry?: PageEntry,
): Partial<Page | null> {
  if (!pageEntry) {
    return null;
  }

  return {
    slug: pageEntry.fields.slug,
    navigationTitle: pageEntry.fields.navigationTitle,
  };
}

interface FetchPagesOptions {
  preview: boolean;
}

export async function fetchPages({
  preview,
}: FetchPagesOptions): Promise<Page[]> {
  const contentful = contentfulClient({ preview });

  const pageResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
      content_type: "page",
      include: 10,
      limit: 1000,
    });

  return pageResult.items.map(
    (pageEntry) => parseContentfulPage(pageEntry) as Page,
  );
}

interface FetchPageOptions {
  slug: string;
  preview: boolean;
}

export async function fetchPage({
  slug,
  preview,
}: FetchPageOptions): Promise<Page | null> {
  const contentful = contentfulClient({ preview });

  const pagesResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
      content_type: "page",
      "fields.slug": slug,
      include: 10,
    });

  return parseContentfulPage(pagesResult.items[0]);
}
