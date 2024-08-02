import classNames from "classnames";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { RichText } from "src/contentful/richText";

interface CaseStudyTemplateProps {
  fields: CaseStudy;
}

export const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const { fields } = props;

  if (!fields) {
    return null;
  }

  const { copy, media, pageTitle, pageIntroTitle } = fields;

  return (
    <article>
      <div className={styles["case-study-hero"]}>
        <div className="container columned left-aligned">
          <h1>{pageTitle}</h1>
          <h2>{pageIntroTitle}</h2>
        </div>
      </div>
      <section id="case-study-copy" className="container">
        {copy ? (
          <div className={styles.caseStudy}>
            <RichText document={copy} />
          </div>
        ) : null}
      </section>
      <section id="case-study-media">
        <div
          className={classNames(styles["case-study-media-grid"], "container")}
        >
          {media.map((m, index) => (
            <AnimatedMedia media={m} key={m?.src} />
          ))}
        </div>
      </section>
    </article>
  );
};
