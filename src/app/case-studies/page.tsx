import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { CaseStudiesPage } from "src/components/CaseStudiesPage/CaseStudiesPage.component";
import { fetchCaseStudies } from "src/contentful/getCaseStudies";
import { fetchPage } from "src/contentful/getPages";
import { CASE_STUDIES_SLUG } from "src/utils/constants";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const draft = await draftMode();

  const page = await fetchPage({
    slug: CASE_STUDIES_SLUG,
    preview: draft.isEnabled,
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
  const draft = await draftMode();

  const caseStudies = await fetchCaseStudies({
    preview: draft.isEnabled,
  });

  const caseStudyPage = await fetchPage({
    slug: CASE_STUDIES_SLUG,
    preview: draft.isEnabled,
  });

  return <CaseStudiesPage fields={caseStudyPage} caseStudies={caseStudies} />;
}

export default CaseStudies;
