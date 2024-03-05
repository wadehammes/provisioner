import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPage, fetchPages } from "src/contentful/getPages";

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

  return pages.map((page) => ({ slug: page.slug }));
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
    title: page.pageTitle,
    robots: page.enableIndexing ? "index, follow" : "noindex, nofollow",
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

  return (
    <main>
      <Link href="/">← Home</Link>
      <div>
        <h1>{page.pageTitle}</h1>
      </div>
    </main>
  );
}

export default Page;
