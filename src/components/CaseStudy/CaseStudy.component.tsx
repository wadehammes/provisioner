import Image from "next/image";
import styles from "src/components/CaseStudy/CaseStudy.module.css";
import { Hero } from "src/components/Hero/Hero";
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

  const { copy, media, pageDescription, pageTitle } = fields;

  return (
    <article>
      <Hero h1={pageTitle} subtitle={pageDescription} reducedHeight={true} />
      <section id="case-study-copy" className="container">
        {copy ? (
          <div className={styles.caseStudy}>
            <RichText document={copy} />
          </div>
        ) : null}
      </section>
      <section id="case-study-media" className="container">
        {media.map((m) => {
          if (m) {
            return (
              <Image
                key={m?.src}
                src={`https:${m?.src}`}
                alt={m?.alt}
                width={m?.width}
                height={m?.height}
                loading="lazy"
                style={{ height: "auto" }}
              />
            );
          }
        })}
      </section>
    </article>
  );
};
