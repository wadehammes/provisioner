import classNames from "classnames";
import Image from "next/image";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import { CaseStudy } from "src/contentful/getCaseStudies";
import { RichText } from "src/contentful/richText";
import { isVideo } from "src/utils/helpers";

interface CaseStudyTemplateProps {
  fields: CaseStudy;
}

export const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const { fields } = props;

  if (!fields) {
    return null;
  }

  const { copy, media, pageDescription, pageTitle, pageIntroTitle } = fields;

  return (
    <article>
      <div className={styles["case-study-hero"]}>
        <div className="container columned left-aligned">
          <h1>{pageTitle}</h1>
          <h2>{pageIntroTitle}</h2>
          <p>{pageDescription}</p>
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
          {media.map((m) => {
            const video = isVideo(m?.src);

            if (m && !video) {
              return (
                <Image
                  key={m?.src}
                  src={`https:${m?.src}`}
                  alt={m?.alt}
                  width={m?.width}
                  height={m?.height}
                  loading="lazy"
                  style={{ height: "auto" }}
                  className={styles["cast-study-image"]}
                />
              );
            }
          })}
        </div>
      </section>
    </article>
  );
};
