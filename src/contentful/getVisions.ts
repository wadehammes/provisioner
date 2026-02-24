import type { Document } from "@contentful/rich-text-types";
import { contentfulClient } from "src/contentful/client";
import { ContentfulTypeCheck } from "src/contentful/helpers";
import {
  ContentImage,
  parseContentfulContentImage,
} from "src/contentful/image";
import {
  isTypeVision,
  TypeVisionFields,
  type TypeVisionSkeleton,
  type TypeVisionWithoutUnresolvableLinksResponse,
} from "src/contentful/types";

type VisionEntry = TypeVisionWithoutUnresolvableLinksResponse;

export interface Vision {
  title: string;
  slug: string;
  copy: Document;
  excerpt?: Document;
  enableIndexing?: boolean;
  metaDescription?: string;
  updatedAt: string;
  publishedAt: string;
  socialImage?: ContentImage;
  id: string;
  category?: string[];
}

const _visionTypeValidation: ContentfulTypeCheck<
  Vision,
  TypeVisionFields,
  "updatedAt" | "publishedAt" | "id"
> = true;

export function parseContentfulVision(
  visionEntry?: VisionEntry,
): Vision | null {
  if (!visionEntry || !isTypeVision(visionEntry)) {
    return null;
  }

  return {
    id: visionEntry.sys.id,
    slug: visionEntry.fields.slug,
    title: visionEntry.fields.title,
    copy: visionEntry.fields.copy,
    excerpt: visionEntry.fields.excerpt,
    enableIndexing: visionEntry.fields?.enableIndexing ?? true,
    metaDescription: visionEntry.fields.metaDescription,
    updatedAt: visionEntry.sys.updatedAt,
    publishedAt: visionEntry.sys.createdAt,
    socialImage:
      parseContentfulContentImage(visionEntry.fields.socialImage) ?? undefined,
    category: visionEntry.fields.category,
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
