import classNames from "classnames";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { RichText } from "src/contentful/richText";

import styles from "src/components/CaseStudy/CaseStudy.module.css";

interface CaseStudyTemplateProps {
  fields: CaseStudy;
}

export const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const { fields } = props;

  if (!fields) {
    return null;
  }

  const {
    challenge,
    media,
    pageTitle,
    pageIntroTitle,
    situation,
    vision,
    results,
  } = fields;

  return (
    <article>
      <div className={styles["case-study-hero"]}>
        <header className="container columned left-aligned">
          <h1>{pageTitle}</h1>
          <h2>{pageIntroTitle}</h2>
        </header>
      </div>
      <section id="case-study-text" className="container">
        <div className={styles["case-study-copy-container"]}>
          {challenge ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🤔</span>
              <h3>Challenge</h3>
              <RichText document={challenge} />
            </div>
          ) : null}
          {situation ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🔍</span>
              <h3>Situation</h3>
              <RichText document={situation} />
            </div>
          ) : null}
          {vision ? (
            <div className={styles["case-study-copy-item"]}>
              <span>👁️</span>
              <h3>Vision</h3>
              <RichText document={vision} />
            </div>
          ) : null}
        </div>
      </section>
      <section id="case-study-media">
        <div
          className={classNames(styles["case-study-media-grid"], "container")}
        >
          {media.map((m) => (
            <AnimatedMedia media={m} key={m?.src} />
          ))}
        </div>
      </section>
      <section id="case-study-results" className={styles["case-study-results"]}>
        <div className="container"></div>
      </section>
    </article>
  );
};
