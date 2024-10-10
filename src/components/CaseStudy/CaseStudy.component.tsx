"use client";

import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { InView } from "react-intersection-observer";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Quote } from "src/components/Quote/Quote.component";
import { Stat } from "src/components/Stat/Stat.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import { RichText } from "src/contentful/richText";
import { CONTACT_CTA_COPY } from "src/copy/global";
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
    stats,
    quote,
  } = fields;

  return (
    <article>
      <div className={styles["case-study-hero"]}>
        <header className="container columned left-aligned">
          <h1>
            <Link href="/case-studies">CASE STUDIES</Link> / {pageTitle}
          </h1>
          <h2>{parse(pageIntroTitle)}</h2>
        </header>
      </div>
      <section id="case-study-text" className="container">
        <div className={styles["case-study-copy-container"]}>
          {situation ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🔍</span>
              <h3>The Situation</h3>
              <RichText document={situation} />
            </div>
          ) : null}
          {challenge ? (
            <div className={styles["case-study-copy-item"]}>
              <span>🤔</span>
              <h3>The Challenge</h3>
              <RichText document={challenge} />
            </div>
          ) : null}
          {vision ? (
            <div className={styles["case-study-copy-item"]}>
              <span>👁️</span>
              <h3>The Vision</h3>
              <RichText document={vision} />
            </div>
          ) : null}
        </div>
      </section>
      <section id="case-study-media">
        <div className="container">
          <div className={classNames(styles["case-study-media-grid"])}>
            {media.map((m, index) => {
              if (index === 2) {
                return (
                  <>
                    {stats ? (
                      <div
                        key={`stats-${m?.src ?? index}`}
                        className={classNames(styles["case-study-stats"])}
                      >
                        {stats.map((stat) =>
                          stat ? <Stat key={stat.caption} stat={stat} /> : null,
                        )}
                      </div>
                    ) : null}
                    <AnimatedMedia
                      media={m}
                      key={m?.src}
                      className={classNames(
                        styles["case-study-media-grid-item"],
                        {
                          [styles["case-study-media-grid-item-half"]]:
                            (m?.width && m.width < 1000) ||
                            (isVideo(m?.src) && !m?.src.includes("website")),
                        },
                      )}
                    />
                  </>
                );
              }

              if (index === media.length - 3) {
                return (
                  <>
                    <AnimatedMedia
                      media={m}
                      key={m?.src}
                      className={classNames(
                        styles["case-study-media-grid-item"],
                        {
                          [styles["case-study-media-grid-item-half"]]:
                            (m?.width && m.width < 1000) ||
                            (isVideo(m?.src) && !m?.src.includes("website")),
                        },
                      )}
                    />
                    {quote ? (
                      <div
                        key={quote.name}
                        className={styles["case-study-quote"]}
                      >
                        <Quote quote={quote} />
                      </div>
                    ) : null}
                  </>
                );
              }

              return (
                <AnimatedMedia
                  media={m}
                  key={m?.src}
                  className={classNames(styles["case-study-media-grid-item"], {
                    [styles["case-study-media-grid-item-half"]]:
                      (m?.width && m.width < 1000) ||
                      (isVideo(m?.src) && !m?.src.includes("website")),
                  })}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section id="case-study-results" className={styles["case-study-results"]}>
        <div className="container left-aligned">
          <InView triggerOnce fallbackInView={true}>
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={classNames(styles["case-study-results-container"], {
                  [styles.inView]: inView,
                })}
              >
                <div className={styles["case-study-results-copy"]}>
                  <p className={styles.emoji}>🎉</p>
                  <h3>The Results</h3>
                  <RichText document={results} />
                </div>
                <div className={classNames(styles["case-study-results-cta"])}>
                  <h3>We want to work with you. Let's get started.</h3>
                  <LeafButtonLink
                    variant="contained"
                    color="dark"
                    href="/start-your-project"
                  >
                    {CONTACT_CTA_COPY}
                  </LeafButtonLink>
                </div>
              </div>
            )}
          </InView>
        </div>
      </section>
    </article>
  );
};
