"use client";

import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import { InView } from "react-intersection-observer";
import { AnimatedMedia } from "src/components/AnimatedMedia/AnimatedMedia.component";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Quote } from "src/components/Quote/Quote.component";
import { Stat } from "src/components/Stat/Stat.component";
import { Tag } from "src/components/Tag/Tag.component";
import { VideoPlayer } from "src/components/VideoPlayer/VideoPlayer.component";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import type { WorkCategory } from "src/contentful/getWork";
import { RichText } from "src/contentful/richText";
import { CONTACT_CTA_COPY } from "src/copy/global";
import { isVideo } from "src/utils/helpers";
import { useMediaQuery } from "usehooks-ts";

interface CaseStudyTemplateProps {
  fields: CaseStudy;
}

export const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const { fields } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!fields) {
    return null;
  }

  const {
    categories,
    challenge,
    clientUrl,
    media,
    pageTitle,
    pageIntroTitle,
    situation,
    vision,
    results,
    stats,
    quote,
    introVideo,
  } = fields;

  const title = `Case Studies - ${pageTitle} | Provisioner`;

  return (
    <article>
      <div className={styles["case-study-hero"]}>
        <h1 className="text-hidden">{title}</h1>
        <header className="container columned left-aligned">
          <nav className={styles.breadcrumbs}>
            <Link href="/case-studies">CASE STUDIES</Link> / {pageTitle}
          </nav>
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
            {introVideo ? (
              <div
                key="introVideo"
                className={styles["case-study-media-grid-item"]}
              >
                <VideoPlayer
                  url={introVideo}
                  rounded
                  autoPlay={!isMobile}
                  playInView
                  controls={isMobile}
                />
              </div>
            ) : null}
            {media.map((m, index) => {
              if (stats.length > 0 && index === 2) {
                return (
                  <Fragment key={m?.id}>
                    <div className={classNames(styles["case-study-stats"])}>
                      {stats.map((stat) =>
                        stat ? <Stat key={stat.caption} stat={stat} /> : null,
                      )}
                    </div>
                    <AnimatedMedia
                      media={m}
                      className={classNames(
                        styles["case-study-media-grid-item"],
                        {
                          [styles["case-study-media-grid-item-half"]]:
                            (m?.width && m.width < 1000) ||
                            (isVideo(m?.src) && !m?.src.includes("website")),
                        },
                      )}
                    />
                  </Fragment>
                );
              }

              if (quote && index === media.length - 3) {
                return (
                  <Fragment key={m?.id}>
                    <AnimatedMedia
                      media={m}
                      className={classNames(
                        styles["case-study-media-grid-item"],
                        {
                          [styles["case-study-media-grid-item-half"]]:
                            (m?.width && m.width < 1000) ||
                            (isVideo(m?.src) && !m?.src.includes("website")),
                        },
                      )}
                    />
                    <div className={styles["case-study-quote"]}>
                      <Quote quote={quote} cite={clientUrl ?? ""} />
                    </div>
                  </Fragment>
                );
              }

              return (
                <AnimatedMedia
                  priority={index === 0}
                  media={m}
                  key={`${m?.id}-${index}`}
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
      <section className={styles["case-study-meta"]}>
        <div className="container">
          <ul>
            {clientUrl ? (
              <li>
                Website: <a href={clientUrl}>{clientUrl}</a>
              </li>
            ) : null}
            {introVideo ? (
              <li>
                Intro Video:
                <Link href={introVideo}>Created by {pageTitle}</Link>
              </li>
            ) : null}
            <li>
              Disciplines:{" "}
              {categories.map((category) => (
                <Tag key={category} label={category as WorkCategory} />
              ))}
            </li>
          </ul>
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
                  <Suspense fallback={<div>Loading...</div>}>
                    <LeafButtonLink
                      variant="contained"
                      color="dark"
                      href="/start-your-project"
                    >
                      {CONTACT_CTA_COPY}
                    </LeafButtonLink>
                  </Suspense>
                </div>
              </div>
            )}
          </InView>
        </div>
      </section>
    </article>
  );
};
