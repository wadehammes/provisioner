import { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import {
  ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import { Module, parseContentfulModule } from "src/contentful/parseModules";
import { TypeCaseStudySkeleton } from "src/contentful/types";

type CaseStudyEntry = Entry<
  TypeCaseStudySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

// Our simplified version of a Case Study.
// We don't need all the data that Contentful gives us.
export interface CaseStudy {
  title: string;
  slug: string;
  content: (Module | null)[];
  enableIndexing: boolean;
  metaDescription: string;
  updatedAt: string;
  socialImage: ContentImage | null;
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
    title: caseStudyEntry.fields.title,
    slug: caseStudyEntry.fields.slug,
    enableIndexing: caseStudyEntry.fields?.enableIndexing ?? true,
    content:
      caseStudyEntry.fields?.content?.map((module) =>
        parseContentfulModule(module),
      ) ?? [],
    updatedAt: caseStudyEntry.sys.updatedAt,
    metaDescription: caseStudyEntry.fields.metaDescription,
    socialImage: parseContentfulContentImage(caseStudyEntry.fields.socialImage),
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
