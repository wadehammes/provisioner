import type { Document } from "@contentful/rich-text-types";
import { contentfulClient } from "src/contentful/client";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  type ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import {
  parseContentfulQuote,
  type QuoteType,
} from "src/contentful/parseQuote";
import { parseContentfulStat, type StatType } from "src/contentful/parseStat";
import {
  isTypeCaseStudy,
  isTypeQuote,
  isTypeStat,
  TypeCaseStudyFields,
  type TypeCaseStudySkeleton,
  type TypeCaseStudyWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type CaseStudyEntry = TypeCaseStudyWithoutUnresolvableLinksResponse;

export interface CaseStudy {
  categories?: string[];
  challenge?: Document | null;
  clientUrl?: string | null;
  enableIndexing?: boolean;
  featuredMedia: ContentImage | null;
  introVideo?: string | null;
  media: (ContentImage | null)[];
  metaDescription: string;
  pageDescription?: string;
  pageIntroTitle?: string;
  pageTitle: string;
  quote?: QuoteType | null;
  results?: Document | null;
  situation?: Document | null;
  slug: string;
  socialImage: ContentImage | null;
  stats?: (StatType | null)[];
  tags?: string[];
  title: string;
  updatedAt: string;
  vision?: Document | null;
}

const _caseStudyTypeValidation: ContentfulTypeCheck<
  CaseStudy,
  TypeCaseStudyFields,
  "updatedAt"
> = true;

export function parseContentfulCaseStudy(
  caseStudyEntry?: CaseStudyEntry,
): CaseStudy | null {
  if (!caseStudyEntry || !isTypeCaseStudy(caseStudyEntry)) {
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
    quote: parseContentfulQuote(
      caseStudyEntry.fields.quote && isTypeQuote(caseStudyEntry.fields.quote)
        ? caseStudyEntry.fields.quote
        : undefined,
    ),
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
      caseStudyEntry.fields.stats?.map((stat) =>
        parseContentfulStat(stat && isTypeStat(stat) ? stat : undefined),
      ) ?? [],
    clientUrl: caseStudyEntry.fields.clientUrl ?? null,
  };
}

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
