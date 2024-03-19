import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main>
      <div>
        <h1>{caseStudyPage?.pageTitle}</h1>
        <ul>
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <Link href={`/case-study/${caseStudy.slug}`}>
                {caseStudy.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default CaseStudies;
