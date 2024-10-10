import Image from "next/image";
import styles from "src/components/CaseStudyCard/CaseStudyCard.module.css";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const CaseStudyCard = (props: CaseStudyCardProps) => {
  const { caseStudy } = props;

  return (
    <div className={styles.caseStudyCard}>
      {caseStudy.featuredMedia ? (
        <Image
          src={`https:${caseStudy.featuredMedia.src}?q=75`}
          alt={caseStudy.featuredMedia?.alt}
          width={caseStudy.featuredMedia?.width}
          height={caseStudy.featuredMedia?.height}
          className={styles.caseStudyImage}
        />
      ) : null}
      <div className={styles.caseStudyContent}>
        <h3>{caseStudy.title}</h3>
        <p>{caseStudy.pageDescription}</p>
        <LeafButtonLink
          href={`/case-studies/${caseStudy.slug}`}
          variant="contained"
        >
          View Case Study
        </LeafButtonLink>
      </div>
    </div>
  );
};
