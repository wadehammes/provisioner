import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "src/components/HomeOurWork/WorkCard.module.css";
import type { WorkType } from "src/contentful/getWork";
import { createImageUrl, isVideo } from "src/utils/helpers";

interface WorkCardProps {
  work: WorkType;
  index: number;
}

export const WorkCard = (props: WorkCardProps) => {
  const { work, index } = props;

  return (
    <div
      className={classNames(styles.workContainer)}
      key={`${work.id}-${index}`}
      style={{
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>${work.cursorIcon ?? "😀"}</text></svg>") 16 0,auto`,
      }}
    >
      {work.featuredMedia ? (
        <div className={styles.media}>
          <div className={styles.overlay} />
          {!isVideo(work.featuredMedia.src) ? (
            <Image
              src={createImageUrl(work.featuredMedia.src)}
              alt={work.featuredMedia.alt ?? work.client ?? ""}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <video
              playsInline
              loop
              preload="auto"
              autoPlay
              muted
              className={styles.video}
            >
              <source
                src={createImageUrl(work.featuredMedia.src)}
                type="video/mp4"
              />
            </video>
          )}
        </div>
      ) : null}
      {work.client ? (
        <div className={styles.textContainer}>
          <header className={styles.header}>
            <h3 className={styles.title}>{work.client}</h3>
            {work.projectSubhead ? (
              <p className={styles.subhead}>{work.projectSubhead}</p>
            ) : null}
          </header>
          {work.caseStudy ? (
            <div className={styles.buttonContainer}>
              <Link href={`/case-studies/${work.caseStudy?.slug}`}>
                View case study
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
