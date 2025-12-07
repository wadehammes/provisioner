import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { VisionEntryPage } from "src/components/VisionEntryPage/VisionEntryPage.component";
import {
  type Vision,
  fetchAllVisions,
  fetchVision,
} from "src/contentful/getVisions";
import { type SitemapItem, outputSitemap } from "src/lib/generateSitemap";
import { createImageUrl, envUrl } from "src/utils/helpers";

interface VisionParams {
  slug: string;
}

interface VisionProps {
  params: VisionParams;
}

// Tell Next.js about all our visions so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<VisionParams[]> {
  const visions = await fetchAllVisions({ preview: false });

  if (visions) {
    // Generate Sitemap
    const routes: SitemapItem[] = visions
      .map((vision: Vision) => {
        if (vision.slug.includes("test-page") || !vision.enableIndexing) {
          return {
            route: "",
            modTime: "",
          };
        }

        return {
          route: `/visions/${vision.slug}`,
          modTime: vision.updatedAt,
        };
      })
      .filter((item: SitemapItem) => item.route.length);

    outputSitemap(routes, "visions");
  }

  return visions.map((vision) => ({ slug: vision.slug }));
}

// For each Vision, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata({
  params,
}: VisionProps): Promise<Metadata> {
  const vision = await fetchVision({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!vision) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/case-studies/${vision.slug}`),
    alternates: {
      canonical: "/",
    },
    title: `${vision.title} - Case Study | Provisioner`,
    robots:
      vision.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: vision.metaDescription,
    openGraph: vision.socialImage
      ? {
          title: `${vision.title} - Case Study | Provisioner`,
          description: vision.metaDescription,
          images: [createImageUrl(vision.socialImage.src)],
        }
      : undefined,
    twitter: vision.socialImage
      ? {
          title: `${vision.title} - Case Study | Provisioner`,
          description: vision.metaDescription,
          images: [createImageUrl(vision.socialImage.src)],
        }
      : undefined,
  };
}

// The actual Vision component.
async function VisionEntry({ params }: VisionProps) {
  // Fetch a single case study by slug,
  // using the content preview if draft mode is enabled:
  const vision = await fetchVision({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!vision) {
    // If a case study can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return <VisionEntryPage vision={vision} />;
}

export default VisionEntry;
