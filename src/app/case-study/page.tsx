import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import CaseStudiesComponent from "src/components/pages/CaseStudies/CaseStudies.component";
import { fetchCaseStudies } from "src/contentful/getCaseStudies";
import { fetchPage } from "src/contentful/getPages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: "case-study",
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

async function CaseStudies() {
  const caseStudies = await fetchCaseStudies({
    preview: draftMode().isEnabled,
  });

  const caseStudyPage = await fetchPage({
    slug: "case-study",
    preview: draftMode().isEnabled,
  });

  return (
    <CaseStudiesComponent fields={caseStudyPage} caseStudies={caseStudies} />
  );
}

export default CaseStudies;
