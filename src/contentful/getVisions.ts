import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import { parseContentfulContentImage } from "src/contentful/image";
import type { ContentImage } from "src/contentful/image";
import type { TypeVisionSkeleton } from "src/contentful/types/TypeVision";

type VisionEntry = Entry<
  TypeVisionSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

// Our simplified version of a Vision.
// We don't need all the data that Contentful gives us.
export interface Vision {
  category?: string[];
  copy: Document;
  enableIndexing: boolean;
  id: string;
  metaDescription?: string;
  publishedAt: string;
  slug: string;
  socialImage?: ContentImage | null;
  title: string;
  updatedAt: string;
}

// A function to transform a Contentful Vision
// into our own Vision object.
export function parseContentfulVision(
  visionEntry?: VisionEntry,
): Vision | null {
  if (!visionEntry) {
    return null;
  }

  return {
    category: visionEntry.fields.category,
    copy: visionEntry.fields.copy,
    enableIndexing: visionEntry.fields?.enableIndexing ?? true,
    id: visionEntry.sys.id,
    metaDescription: visionEntry.fields.metaDescription,
    publishedAt: visionEntry.sys.createdAt,
    slug: visionEntry.fields.slug,
    socialImage: parseContentfulContentImage(visionEntry.fields.socialImage),
    title: visionEntry.fields.title,
    updatedAt: visionEntry.sys.updatedAt,
  };
}

// A function to fetch all Visions.
// Optionally uses the Contentful content preview.
interface FetchVisionsOptions {
  preview: boolean;
}

export async function fetchAllVisions({
  preview,
}: FetchVisionsOptions): Promise<Vision[]> {
  const contentful = contentfulClient({ preview });
  let allVisions: Vision[] = [];
  let total = 0;
  let skip = 0;
  const limit = 10;

  do {
    const response =
      await contentful.withoutUnresolvableLinks.getEntries<TypeVisionSkeleton>({
        content_type: "vision",
        include: 10,
        limit,
        skip,
      });

    const parsedVisions = response.items.map(
      (visionEntry) => parseContentfulVision(visionEntry) as Vision,
    );

    allVisions = [...allVisions, ...parsedVisions];

    total = response.total;
    skip += limit;

    if (total < limit) {
      break;
    }
  } while (skip < total);

  return allVisions;
}

// A function to fetch a single Vision by its slug.
// Optionally uses the Contentful content preview.
interface FetchVisionOptions {
  slug: string;
  preview: boolean;
}

export async function fetchVision({
  slug,
  preview,
}: FetchVisionOptions): Promise<Vision | null> {
  const contentful = contentfulClient({ preview });

  const VisionsResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeVisionSkeleton>({
      content_type: "vision",
      "fields.slug": slug,
      include: 10,
    });

  return parseContentfulVision(VisionsResult.items[0]);
}
