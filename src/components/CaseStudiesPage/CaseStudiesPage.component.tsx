import Link from "next/link";
import styles from "src/components/CaseStudiesPage/CaseStudiesPage.module.css";
import { AnimatedCaseStudyCard } from "src/components/CaseStudyCard/AnimatedCaseStudyCard.component";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { PageLayout } from "src/components/PageLayout/PageLayout.component";
import { Section } from "src/components/Section/Section.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import type { Page } from "src/contentful/getPages";

interface CaseStudiesPageProps {
  fields: Page | null;
  caseStudies: CaseStudy[];
}

export const CaseStudiesPage = (props: CaseStudiesPageProps) => {
  const { fields, caseStudies } = props;

  if (!fields) {
    return null;
  }

  return (
    <div className={styles.caseStudies}>
      <h1 className="text-hidden">Case Studies</h1>
      <Section style={{ flex: 1 }}>
        <div className="container">
          {" "}
          <ul className={styles.caseStudiesList}>
            {caseStudies.map((caseStudy) => {
              if (!caseStudy.featuredMedia) {
                return null;
              }

              return (
                <AnimatedCaseStudyCard
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                />
              );
            })}
          </ul>
        </div>
      </Section>
      <div className={styles.caseStudiesFooter}>
        <h3>Want to be our next case study?</h3>{" "}
        <LeafButtonLink variant="outlined" href="/start-your-project">
          Start your project with us today.
        </LeafButtonLink>
      </div>
    </div>
  );
};
