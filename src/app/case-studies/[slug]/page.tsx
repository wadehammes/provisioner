import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "src/components/CaseStudy/CaseStudy.component";
import { PageLayout } from "src/components/PageLayout/PageLayout.component";
import {
  type CaseStudy as CaseStudyType,
  fetchCaseStudies,
  fetchCaseStudy,
} from "src/contentful/getCaseStudies";
import { outputSitemap, type SitemapItem } from "src/lib/generateSitemap";
import { createImageUrl, envUrl } from "src/utils/helpers";

interface CaseStudyParams {
  slug: string;
}

interface CaseStudyProps {
  params: Promise<CaseStudyParams>;
}

// Tell Next.js about all our case studies so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<CaseStudyParams[]> {
  const caseStudies = await fetchCaseStudies({ preview: false });

  if (caseStudies) {
    // Generate Sitemap
    const routes: SitemapItem[] = caseStudies
      .map((caseStudy: CaseStudyType) => {
        if (caseStudy.slug.includes("test-page") || !caseStudy.enableIndexing) {
          return {
            route: "",
            modTime: "",
          };
        }
        return {
          route: `/case-studies/${caseStudy.slug}`,
          modTime: caseStudy.updatedAt,
        };
      })
      .filter((item: SitemapItem) => item.route.length);

    outputSitemap(routes, "casestudies");
  }

  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

// For each case study, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const draft = await draftMode();
  const { slug } = await params;

  const caseStudy = await fetchCaseStudy({
    slug,
    preview: draft.isEnabled,
  });

  if (!caseStudy) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/case-studies/${caseStudy.slug}`),
    alternates: {
      canonical: "/",
    },
    title: `${caseStudy.title} - Case Study | Provisioner`,
    robots:
      caseStudy.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: caseStudy.metaDescription,
    openGraph: caseStudy.socialImage
      ? {
          title: `${caseStudy.title} - Case Study | Provisioner`,
          description: caseStudy.metaDescription,
          images: [createImageUrl(caseStudy.socialImage.src)],
        }
      : undefined,
    twitter: caseStudy.socialImage
      ? {
          title: `${caseStudy.title} - Case Study | Provisioner`,
          description: caseStudy.metaDescription,
          images: [createImageUrl(caseStudy.socialImage.src)],
        }
      : undefined,
  };
}

// The actual CaseStudy component.
async function CaseStudy({ params }: CaseStudyProps) {
  const draft = await draftMode();
  const { slug } = await params;

  // Fetch a single case study by slug,
  // using the content preview if draft mode is enabled:
  const caseStudy = await fetchCaseStudy({
    slug,
    preview: draft.isEnabled,
  });

  if (!caseStudy) {
    // If a case study can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return (
    <PageLayout>
      <CaseStudyTemplate fields={caseStudy} />
    </PageLayout>
  );
}

export default CaseStudy;
