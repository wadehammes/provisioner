import type { Document } from "@contentful/rich-text-types";
import { contentfulClient } from "src/contentful/client";
import {
  isTypeVision,
  type TypeVisionSkeleton,
  type TypeVisionWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type VisionEntry = TypeVisionWithoutUnresolvableLinksResponse;

export interface Vision {
  title: string;
  slug: string;
  copy: Document;
  enableIndexing: boolean;
  metaDescription?: string;
  updatedAt: string;
  publishedAt: string;
}

export function parseContentfulVision(
  visionEntry?: VisionEntry,
): Vision | null {
  if (!visionEntry || !isTypeVision(visionEntry)) {
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
