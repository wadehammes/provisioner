import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import PageComponent from "src/components/pages/Page/Page.component";
import {
  Page as PageType,
  fetchPage,
  fetchPages,
} from "src/contentful/getPages";
import { SitemapItem, outputSitemap } from "src/lib/generateSitemap";
import {
  EXCLUDED_PAGE_SLUGS_FROM_BUILD,
  HOME_PAGE_SLUG,
  TEST_PAGE_SLUG,
} from "src/utils/constants";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

// Tell Next.js about all our pages so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<PageParams[]> {
  const pages = await fetchPages({ preview: false });

  if (pages) {
    // Generate Sitemap
    const routes: SitemapItem[] = pages
      .map((page: PageType) => {
        if (page.slug.includes(TEST_PAGE_SLUG) || !page.enableIndexing) {
          return {
            route: "",
            modTime: "",
          };
        }

        if (page.slug === HOME_PAGE_SLUG) {
          return {
            route: "/",
            modTime: page.updatedAt,
          };
        }

        return {
          route: `/${page.slug}`,
          modTime: page.updatedAt,
        };
      })
      .filter((item: SitemapItem) => item.route.length);

    outputSitemap(routes, "pages");
  }

  return pages
    .filter((page) => !EXCLUDED_PAGE_SLUGS_FROM_BUILD.includes(page.slug))
    .map((page) => ({ slug: page.slug }));
}

// For each page, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = await fetchPage({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    title: `${page.pageTitle} | Provisioner`,
    robots: page.enableIndexing ? "index, follow" : "noindex, nofollow",
    description: page.metaDescription,
  };
}

// The actual Page component.
async function Page({ params }: PageProps) {
  // Fetch a single page by slug,
  // using the content preview if draft mode is enabled:
  const page = await fetchPage({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!page) {
    // If a page can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return <PageComponent fields={page} />;
}

export default Page;
