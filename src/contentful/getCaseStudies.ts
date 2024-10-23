import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import {
  type ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import {
  type QuoteType,
  parseContentfulQuote,
} from "src/contentful/parseQuote";
import { type StatType, parseContentfulStat } from "src/contentful/parseStat";
import type { TypeCaseStudySkeleton } from "src/contentful/types";

type CaseStudyEntry = Entry<
  TypeCaseStudySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

// Our simplified version of a Case Study.
// We don't need all the data that Contentful gives us.
export interface CaseStudy {
  categories: string[];
  challenge: Document | null;
  clientUrl: string | null;
  enableIndexing: boolean;
  featuredMedia: ContentImage | null;
  introVideo: string | null;
  media: (ContentImage | null)[];
  metaDescription: string;
  pageDescription: string;
  pageIntroTitle: string;
  pageTitle: string;
  quote: QuoteType | null;
  results: Document | null;
  situation: Document | null;
  slug: string;
  socialImage: ContentImage | null;
  stats: (StatType | null)[];
  tags: string[];
  title: string;
  updatedAt: string;
  vision: Document | null;
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
    featuredMedia: parseContentfulContentImage(
      caseStudyEntry.fields.featuredMedia,
    ),
    introVideo: caseStudyEntry.fields.introVideo ?? null,
    media:
      caseStudyEntry.fields.media.map((m) => parseContentfulContentImage(m)) ??
      [],
    metaDescription: caseStudyEntry.fields.metaDescription,
    pageDescription: caseStudyEntry.fields.pageDescription ?? "",
    pageTitle: caseStudyEntry.fields.pageTitle ?? "",
    pageIntroTitle: caseStudyEntry.fields.pageIntroTitle ?? "",
    quote: parseContentfulQuote(caseStudyEntry.fields.quote),
    slug: caseStudyEntry.fields.slug,
    socialImage: parseContentfulContentImage(caseStudyEntry.fields.socialImage),
    tags: caseStudyEntry.fields.tags ?? [],
    title: caseStudyEntry.fields.title,
    updatedAt: caseStudyEntry.sys.updatedAt,
    results: caseStudyEntry.fields.results ?? null,
    situation: caseStudyEntry.fields.situation ?? null,
    challenge: caseStudyEntry.fields.challenge ?? null,
    vision: caseStudyEntry.fields.vision ?? null,
    stats:
      caseStudyEntry.fields.stats?.map((stat) => parseContentfulStat(stat)) ??
      [],
    clientUrl: caseStudyEntry.fields.clientUrl ?? null,
  };
}

// A function to transform a Contentful case study
// into our own Case Study object.
export function parseContentfulCaseStudySlug(
  caseStudyEntry?: CaseStudyEntry,
): Partial<CaseStudy> | null {
  if (!caseStudyEntry) {
    return null;
  }

  return {
    slug: caseStudyEntry.fields.slug,
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
interface FetchCaseStudyBySlugOptions {
  slug: string;
  preview: boolean;
}

export async function fetchCaseStudy({
  slug,
  preview,
}: FetchCaseStudyBySlugOptions): Promise<CaseStudy | null> {
  const contentful = contentfulClient({ preview });

  const caseStudyResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeCaseStudySkeleton>(
      {
        content_type: "caseStudy",
        "fields.slug": slug,
        include: 10,
      },
    );

  return parseContentfulCaseStudy(caseStudyResult.items[0]);
}
