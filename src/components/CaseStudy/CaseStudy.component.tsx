import Link from "next/link";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";

interface CaseStudyTemplateProps {
  fields: CaseStudy;
}

export const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const { fields } = props;

  return (
    <main className={styles.caseStudy}>
      <Link href="/case-studies">← Case Studies</Link>
      <div>
        <h1>{fields.title}</h1>
      </div>
    </main>
  );
};
