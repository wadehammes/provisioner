import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { CaseStudiesPage } from "src/components/CaseStudiesPage/CaseStudiesPage.component";
import { fetchCaseStudies } from "src/contentful/getCaseStudies";
import { fetchPage } from "src/contentful/getPages";
import { CASE_STUDIES_SLUG } from "src/utils/constants";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: CASE_STUDIES_SLUG,
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/case-studies`),
    alternates: {
      canonical: "/",
    },
    title: `${page.pageTitle} | Provisioner`,
    robots:
      page.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: page.metaDescription,
  };
}

async function CaseStudies() {
  const caseStudies = await fetchCaseStudies({
    preview: draftMode().isEnabled,
  });

  const caseStudyPage = await fetchPage({
    slug: CASE_STUDIES_SLUG,
    preview: draftMode().isEnabled,
  });

  return <CaseStudiesPage fields={caseStudyPage} caseStudies={caseStudies} />;
}

export default CaseStudies;
