import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "src/components/CaseStudy/CaseStudy.component";
import {
  CaseStudy as CaseStudyType,
  fetchCaseStudies,
  fetchCaseStudy,
} from "src/contentful/getCaseStudies";
import { SitemapItem, outputSitemap } from "src/lib/generateSitemap";

interface CaseStudyParams {
  slug: string;
}

interface CaseStudyProps {
  params: CaseStudyParams;
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
        } else {
          return {
            route: `/case-study/${caseStudy.slug}`,
            modTime: caseStudy.updatedAt,
          };
        }
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
  const caseStudy = await fetchCaseStudy({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!caseStudy) {
    return notFound();
  }

  return {
    title: `${caseStudy.title} - Case Study | Provisioner`,
    robots:
      caseStudy.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: caseStudy.metaDescription,
  };
}

// The actual CaseStudy component.
async function CaseStudy({ params }: CaseStudyProps) {
  // Fetch a single case study by slug,
  // using the content preview if draft mode is enabled:
  const caseStudy = await fetchCaseStudy({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!caseStudy) {
    // If a case study can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  return <CaseStudyTemplate fields={caseStudy} />;
}

export default CaseStudy;
