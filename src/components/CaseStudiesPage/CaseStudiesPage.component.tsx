import Link from "next/link";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import styles from "src/components/CaseStudiesPage/CaseStudiesPage.module.css";
import { Section } from "src/components/Section/Section.component";
import { Tag } from "src/components/Tag/Tag.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import type { Page } from "src/contentful/getPages";
import type { WorkCategory } from "src/contentful/getWork";

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
      <Section>
        <div className="container">
          {" "}
          <ul className={styles.caseStudiesList}>
            {caseStudies.map((caseStudy) => {
              if (!caseStudy.featuredMedia) {
                return null;
              }

              return (
                <li key={caseStudy.slug}>
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className={styles.caseStudyMedia}
                  >
                    <AnimatedMedia media={caseStudy.featuredMedia} />
                    <div className={styles.meta}>
                      <h2>{caseStudy.title}</h2>
                      <div className={styles.tags}>
                        {caseStudy.categories.map((category) => (
                          <Tag
                            key={category}
                            label={category as WorkCategory}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
      <div className={styles.caseStudiesFooter}>
        Want to be our next case study?{" "}
        <Link href="/start-your-project">
          Start your project with us today.
        </Link>
      </div>
    </div>
  );
};
