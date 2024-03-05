import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchCaseStudies,
  fetchCaseStudy,
} from "src/contentful/getCaseStudies";

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

  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

// For each case study, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
  { params }: CaseStudyProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const caseStudy = await fetchCaseStudy({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!caseStudy) {
    return notFound();
  }

  return {
    title: caseStudy.title,
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

  return (
    <main>
      <Link href="/case-study">← Case Studies</Link>
      <div>
        <h1>{caseStudy.title}</h1>
      </div>
    </main>
  );
}

export default CaseStudy;
