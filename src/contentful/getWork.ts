import type { Document } from "@contentful/rich-text-types";
import { contentfulClient } from "src/contentful/client";
import {
  type CaseStudy,
  parseContentfulCaseStudySlug,
} from "src/contentful/getCaseStudies";
import type {
  ContentfulTypeCheck,
  ExtractArrayItemType,
  ExtractSymbolType,
} from "src/contentful/helpers";
import {
  type ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import {
  isTypeCaseStudy,
  isTypeWork,
  type TypeWorkFields,
  type TypeWorkSkeleton,
  type TypeWorkWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type WorkEntry = TypeWorkWithoutUnresolvableLinksResponse;

export type WorkCategory = ExtractSymbolType<
  ExtractArrayItemType<NonNullable<TypeWorkFields["categories"]>>
>;

export interface WorkType {
  addToFeaturedCarousel?: boolean;
  caseStudy?: Partial<CaseStudy> | null;
  categories?: WorkCategory[];
  client: string;
  createdAt: string;
  cursorIcon?: string;
  featuredMedia?: ContentImage | null;
  id: string;
  priority?: number;
  projectDescription?: Document | null;
  projectExternalUrl?: string;
  projectName?: string;
  projectSubhead?: string;
  updatedAt: string;
}

const _workTypeValidation: ContentfulTypeCheck<
  WorkType,
  TypeWorkFields,
  "createdAt" | "updatedAt" | "id"
> = true;

export function parseContentfulWork(workEntry?: WorkEntry): WorkType | null {
  if (!workEntry || !isTypeWork(workEntry)) {
    return null;
  }

  const caseStudyLink = workEntry.fields.caseStudy;
  return {
    id: workEntry.sys.id,
    createdAt: workEntry.sys.createdAt,
    addToFeaturedCarousel: workEntry.fields.addToFeaturedCarousel,
    projectName: workEntry.fields.projectName,
    client: workEntry.fields.client,
    projectSubhead: workEntry.fields.projectSubhead,
    featuredMedia: parseContentfulContentImage(workEntry.fields.featuredMedia),
    projectDescription: workEntry.fields.projectDescription,
    projectExternalUrl: workEntry.fields.projectExternalUrl,
    caseStudy:
      caseStudyLink && isTypeCaseStudy(caseStudyLink)
        ? parseContentfulCaseStudySlug(caseStudyLink)
        : null,
    categories: workEntry.fields.categories,
    cursorIcon: workEntry.fields.cursorIcon ?? "😀",
    updatedAt: workEntry.sys.updatedAt,
    priority: workEntry.fields.priority ?? 0,
  };
}

interface FetchPagesOptions {
  preview: boolean;
}

export async function fetchWork({
  preview,
}: FetchPagesOptions): Promise<WorkType[]> {
  const contentful = contentfulClient({ preview });

  const pageResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeWorkSkeleton>({
      content_type: "work",
      include: 10,
      limit: 1000,
      order: ["fields.priority", "-sys.createdAt"],
    });

  return pageResult.items.flatMap((workEntry) => {
    const work = parseContentfulWork(workEntry);
    return work ? [work] : [];
  });
}
