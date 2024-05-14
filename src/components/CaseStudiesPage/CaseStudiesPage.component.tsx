import Link from "next/link";
import styles from "src/components/CaseStudiesPage/CaseStudiesPage.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { Page } from "src/contentful/getPages";

interface CaseStudiesPageProps {
  fields: Page | null;
  caseStudies: CaseStudy[];
}

export const CaseStudiesPage = (props: CaseStudiesPageProps) => {
  const { fields, caseStudies } = props;

  return (
    <main className={styles.caseStudies}>
      <h1>{fields?.pageTitle}</h1>
      <ul>
        {caseStudies.map((caseStudy) => (
          <li key={caseStudy.slug}>
            <Link href={`/case-studies/${caseStudy.slug}`}>
              {caseStudy.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
