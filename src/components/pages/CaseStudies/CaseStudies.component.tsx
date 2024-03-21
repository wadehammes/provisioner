import Link from "next/link";
import styles from "src/components/pages/CaseStudies/CaseStudies.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { Page } from "src/contentful/getPages";

interface CaseStudiesComponentProps {
  fields: Page | null;
  caseStudies: CaseStudy[];
}

export const CaseStudiesComponent = (props: CaseStudiesComponentProps) => {
  const { fields, caseStudies } = props;

  return (
    <main className={styles.caseStudies}>
      <h1>{fields?.pageTitle}</h1>
      <ul>
        {caseStudies.map((caseStudy) => (
          <li key={caseStudy.slug}>
            <Link href={`/case-study/${caseStudy.slug}`}>
              {caseStudy.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CaseStudiesComponent;
