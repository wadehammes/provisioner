import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import {
  type CaseStudy,
  parseContentfulCaseStudySlug,
} from "src/contentful/getCaseStudies";
import {
  type ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import type { TypeWorkSkeleton } from "src/contentful/types";

type WorkEntry = Entry<TypeWorkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

export type WorkCategory = "Branding" | "Marketing" | "Sales";

// Our simplified version of a Work.
// We don't need all the data that Contentful gives us.
export interface WorkType {
  caseStudy?: Partial<CaseStudy> | null;
  categories?: WorkCategory[];
  client?: string;
  cursorIcon?: string;
  featuredMedia?: ContentImage | null;
  id: string;
  priority: number;
  projectDescription?: Document | null;
  projectName?: string;
  updatedAt: string;
}

// A function to transform a Contentful work entry
// into our own Work object.
export function parseContentfulWork(workEntry?: WorkEntry): WorkType | null {
  if (!workEntry) {
    return null;
  }

  return {
    id: workEntry.sys.id,
    projectName: workEntry.fields.projectName,
    client: workEntry.fields.client,
    featuredMedia: parseContentfulContentImage(workEntry.fields.featuredMedia),
    projectDescription: workEntry.fields.projectDescription,
    caseStudy: workEntry?.fields?.caseStudy
      ? parseContentfulCaseStudySlug(workEntry.fields.caseStudy)
      : null,
    categories: workEntry.fields.categories,
    cursorIcon: workEntry.fields.cursorIcon ?? "😀",
    updatedAt: workEntry.sys.updatedAt,
    priority: workEntry.fields.priority ?? 0,
  };
}

// A function to fetch all work.
// Optionally uses the Contentful content preview.
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
      order: ["fields.priority", "sys.updatedAt"],
    });

  return pageResult.items.map(
    (workEntry) => parseContentfulWork(workEntry) as WorkType,
  );
}
