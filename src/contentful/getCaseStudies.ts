import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import {
  ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import { TypeCaseStudySkeleton } from "src/contentful/types";

type CaseStudyEntry = Entry<
  TypeCaseStudySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

// Our simplified version of a Case Study.
// We don't need all the data that Contentful gives us.
export interface CaseStudy {
  categories: string[];
  enableIndexing: boolean;
  media: (ContentImage | null)[];
  metaDescription: string;
  pageDescription: string;
  pageTitle: string;
  pageIntroTitle: string;
  slug: string;
  socialImage: ContentImage | null;
  tags: string[];
  title: string;
  updatedAt: string;
  results: Document | null;
  situation: Document | null;
  vision: Document | null;
  challenge: Document | null;
}

// A function to transform a Contentful case study
// into our own Case Study object.
export function parseContentfulCaseStudy(
  caseStudyEntry?: CaseStudyEntry,
): CaseStudy | null {
  if (!caseStudyEntry) {
    return null;
  }

  return {
    categories: caseStudyEntry.fields.categories ?? [],
    enableIndexing: caseStudyEntry.fields?.enableIndexing ?? true,
    media:
      caseStudyEntry.fields.media.map((m) => parseContentfulContentImage(m)) ??
      [],
    metaDescription: caseStudyEntry.fields.metaDescription,
    pageDescription: caseStudyEntry.fields.pageDescription ?? "",
    pageTitle: caseStudyEntry.fields.pageTitle ?? "",
    pageIntroTitle: caseStudyEntry.fields.pageIntroTitle ?? "",
    slug: caseStudyEntry.fields.slug,
    socialImage: parseContentfulContentImage(caseStudyEntry.fields.socialImage),
    tags: caseStudyEntry.fields.tags ?? [],
    title: caseStudyEntry.fields.title,
    updatedAt: caseStudyEntry.sys.updatedAt,
    results: caseStudyEntry.fields.results ?? null,
    situation: caseStudyEntry.fields.situation ?? null,
    challenge: caseStudyEntry.fields.challenge ?? null,
    vision: caseStudyEntry.fields.vision ?? null,
  };
}

// A function to fetch all case studies.
// Optionally uses the Contentful content preview.
interface FetchCaseStudyOptions {
  preview: boolean;
}

export async function fetchCaseStudies({
  preview,
}: FetchCaseStudyOptions): Promise<CaseStudy[]> {
  const contentful = contentfulClient({ preview });

  const caseStudyResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeCaseStudySkeleton>(
      {
        // biome-ignore lint/style/useNamingConvention: Contentful standards
        content_type: "caseStudy",
        include: 10,
        limit: 1000,
      },
    );

  return caseStudyResult.items.map(
    (caseStudyEntry) => parseContentfulCaseStudy(caseStudyEntry) as CaseStudy,
  );
}

// A function to fetch a single case study by its slug.
// Optionally uses the Contentful content preview.
interface FetchPageOptions {
  slug: string;
  preview: boolean;
}

export async function fetchCaseStudy({
  slug,
  preview,
}: FetchPageOptions): Promise<CaseStudy | null> {
  const contentful = contentfulClient({ preview });

  const caseStudyResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeCaseStudySkeleton>(
      {
        // biome-ignore lint/style/useNamingConvention: Contentful standards
        content_type: "caseStudy",
        "fields.slug": slug,
        include: 10,
      },
    );

  return parseContentfulCaseStudy(caseStudyResult.items[0]);
}
