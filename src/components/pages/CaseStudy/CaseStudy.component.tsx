import Link from "next/link";
import styles from "src/components/pages/CaseStudy/CaseStudy.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";

interface CaseStudyComponentProps {
  fields: CaseStudy;
}

export const CaseStudyComponent = (props: CaseStudyComponentProps) => {
  const { fields } = props;

  return (
    <main className={styles.caseStudy}>
      <Link href="/case-study">← Case Studies</Link>
      <div>
        <h1>{fields.title}</h1>
      </div>
    </main>
  );
};

export default CaseStudyComponent;
