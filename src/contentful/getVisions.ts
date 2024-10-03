import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import { contentfulClient } from "src/contentful/client";
import type { TypeVisionSkeleton } from "src/contentful/types/TypeVision";

type VisionEntry = Entry<
  TypeVisionSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

// Our simplified version of a Vision.
// We don't need all the data that Contentful gives us.
export interface Vision {
  title: string;
  slug: string;
  copy: Document;
  enableIndexing: boolean;
  metaDescription?: string;
  updatedAt: string;
  publishedAt: string;
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
    copy: visionEntry.fields.copy,
    title: visionEntry.fields.title,
    slug: visionEntry.fields.slug,
    enableIndexing: visionEntry.fields?.enableIndexing ?? true,
    updatedAt: visionEntry.sys.updatedAt,
    metaDescription: visionEntry.fields.metaDescription,
    publishedAt: visionEntry.sys.createdAt,
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

  const VisionResult =
    await contentful.withoutUnresolvableLinks.getEntries<TypeVisionSkeleton>({
      content_type: "vision",
      include: 10,
      limit: 1000,
    });

  return VisionResult.items.map(
    (VisionEntry) => parseContentfulVision(VisionEntry) as Vision,
  );
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
