import Link from "next/link";
import { StaticMedia } from "src/components/StaticMedia/StaticMedia.component";
import { Tag } from "src/components/Tag/Tag.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import type { WorkCategory } from "src/contentful/getWork";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const CaseStudyCard = (props: CaseStudyCardProps) => {
  const { caseStudy } = props;

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={styles.caseStudyMedia}
    >
      <StaticMedia media={caseStudy.featuredMedia} />
      <div className={styles.meta}>
        <h2>{caseStudy.title}</h2>
        <div className={styles.tags}>
          {caseStudy.categories.map((category) => (
            <Tag key={category} label={category as WorkCategory} />
          ))}
        </div>
      </div>
    </Link>
  );
};
