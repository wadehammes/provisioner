"use client";

import classNames from "classnames";
import parse from "html-react-parser";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { RichText } from "src/contentful/richText";
import { CONTACT_CTA_COPY } from "src/copy/global";

import styles from "src/components/CaseStudy/CaseStudy.module.css";
import { isVideo } from "src/utils/helpers";

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
          <h1>CASE STUDIES / {pageTitle}</h1>
          <h2>{parse(pageIntroTitle)}</h2>
        </header>
      </div>
      <section id="case-study-text" className="container">
        <div className={styles["case-study-copy-container"]}>
          {situation ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🔍</span>
              <h3>Situation</h3>
              <RichText document={situation} />
            </div>
          ) : null}
          {challenge ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🤔</span>
              <h3>Challenge</h3>
              <RichText document={challenge} />
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
        <div className="container">
          <div className={classNames(styles["case-study-media-grid"])}>
            {media.map((m) => (
              <AnimatedMedia
                media={m}
                key={m?.src}
                className={classNames(styles["case-study-media-grid-item"], {
                  [styles["case-study-media-grid-item-half"]]:
                    (m?.width && m.width < 1000) || isVideo(m?.src),
                })}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="case-study-results" className={styles["case-study-results"]}>
        <div className="container left-aligned">
          <div className={styles["case-study-results-container"]}>
            <div className={styles["case-study-results-copy"]}>
              <p className={styles.emoji}>🎉</p>
              <h3>Results</h3>
              <RichText document={results} />
            </div>
            <div className={classNames(styles["case-study-results-cta"])}>
              <h3>We want to work with you. Let's get started.</h3>
              <LeafButtonLink
                variant="outlined"
                color="dark"
                href="/start-your-project"
              >
                {CONTACT_CTA_COPY}
              </LeafButtonLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
