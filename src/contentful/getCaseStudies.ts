import { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import { TypeCaseStudySkeleton } from "src/contentful/types/TypeCaseStudy";

type CaseStudyEntry = Entry<TypeCaseStudySkeleton, undefined, string>;

// Our simplified version of a CaseStudy.
// We don't need all the data that Contentful gives us.
export interface CaseStudy {
  title: string;
  slug: string;
  enableIndexing: boolean;
  metaDescription: string;
  updatedAt: string;
}

// A function to transform a Contentful case study
// into our own CaseStudy object.
export function parseContentfulCaseStudy(
  caseStudyEntry?: CaseStudyEntry,
): CaseStudy | null {
  if (!caseStudyEntry) {
    return null;
  }

  return {
    title: caseStudyEntry.fields.title || "",
    slug: caseStudyEntry.fields.slug,
    enableIndexing: caseStudyEntry.fields?.enableIndexing ?? true,
    metaDescription: caseStudyEntry.fields.metaDescription,
    updatedAt: caseStudyEntry.sys.updatedAt,
  };
}

// A function to fetch all CaseStudies.
// Optionally uses the Contentful content preview.
interface FetchCaseStudiesOptions {
  preview: boolean;
}

export async function fetchCaseStudies({
  preview,
}: FetchCaseStudiesOptions): Promise<CaseStudy[]> {
  const contentful = contentfulClient({ preview });

  const caseStudyResult = await contentful.getEntries<TypeCaseStudySkeleton>({
    content_type: "caseStudy",
    include: 10,
    limit: 1000,
  });

  return caseStudyResult.items.map(
    (caseStudyEntry) => parseContentfulCaseStudy(caseStudyEntry) as CaseStudy,
  );
}

// A function to fetch a single CaseStudy by its slug.
// Optionally uses the Contentful content preview.
interface FetchCaseStudyOptions {
  slug: string;
  preview: boolean;
}

export async function fetchCaseStudy({
  slug,
  preview,
}: FetchCaseStudyOptions): Promise<CaseStudy | null> {
  const contentful = contentfulClient({ preview });

  const caseStudiesResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeCaseStudySkeleton>(
      {
        content_type: "caseStudy",
        "fields.slug": slug,
        include: 10,
      },
    );

  return parseContentfulCaseStudy(caseStudiesResult.items[0]);
}
