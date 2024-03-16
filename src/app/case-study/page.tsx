import { draftMode } from "next/headers";
import Link from "next/link";
import { fetchCaseStudies } from "src/contentful/getCaseStudies";

async function CaseStudies() {
  // Fetch case studies using the content preview
  // if draft mode is enabled:
  const caseStudies = await fetchCaseStudies({
    preview: draftMode().isEnabled,
  });

  return (
    <main>
      <div>
        <h1>Case Studies</h1>
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
