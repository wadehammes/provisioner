import classNames from "classnames";
import Image from "next/image";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Tag } from "src/components/Tag/Tag.component";
import styles from "src/components/WorkSlide/WorkSlide.module.css";
import { WorkCategory, WorkType } from "src/contentful/getWork";
import { RichText } from "src/contentful/richText";
import { createImageUrl, isVideo } from "src/utils/helpers";

interface WorkSlideProps {
  work: WorkType;
  index: number;
}

export const WorkSlide = (props: WorkSlideProps) => {
  const { work, index } = props;

  return (
    <div
      className={classNames(styles.workContainer)}
      key={`${work.id}-${index}`}
    >
      {work.client ? (
        <div
          className={styles.textContainer}
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>${work.cursorIcon}</text></svg>") 16 0,auto`,
          }}
        >
          <header>
            <h3>{work.client}</h3>
            {work?.projectDescription ? (
              <RichText document={work.projectDescription} />
            ) : null}
            {work?.caseStudy ? (
              <div className={styles.buttonContainer}>
                <LeafButtonLink
                  variant="outlined"
                  color="dark"
                  href={`/case-studies/${work.caseStudy?.slug}`}
                  fullWidth
                >
                  View case study
                </LeafButtonLink>
              </div>
            ) : null}
          </header>
          {work?.categories ? (
            <div className={styles.tagContainer}>
              <div className={styles.tags}>
                {work.categories.map((tag) => (
                  <Tag key={tag} label={tag as WorkCategory} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {work.featuredMedia ? (
        <div className={styles.media}>
          {!isVideo(work.featuredMedia.src) ? (
            <Image
              src={createImageUrl(work.featuredMedia.src)}
              alt={work.featuredMedia.alt ?? ""}
              width={2000}
              height={1000}
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <video playsInline loop preload="auto" autoPlay muted>
              <source
                src={createImageUrl(work.featuredMedia.src)}
                type="video/mp4"
              ></source>
            </video>
          )}
        </div>
      ) : null}
    </div>
  );
};
