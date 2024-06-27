import classNames from "classnames";
import parse from "html-react-parser";
import Image from "next/image";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Tag } from "src/components/Tag/Tag.component";
import styles from "src/components/WorkSlide/WorkSlide.module.css";
import { WorkType } from "src/types/Work";

interface WorkSlideProps {
  work: WorkType;
  index: number;
}

export const WorkSlide = (props: WorkSlideProps) => {
  const { work, index } = props;

  return (
    <div
      className={classNames(styles.workContainer, styles[`${work.id}`])}
      key={`${work.id}-${index}`}
    >
      {work.title ? (
        <div className={styles.textContainer}>
          <header>
            <h3>{work.title}</h3>
            {work?.description ? <p>{parse(work.description)}</p> : null}
            {work?.caseStudy ? (
              <LeafButtonLink
                variant="outlined"
                color="dark"
                href={work.caseStudy}
              >
                View case study
              </LeafButtonLink>
            ) : null}
          </header>
          {work?.tags ? (
            <div className={styles.tagContainer}>
              <div className={styles.tags}>
                {work.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={styles.media}>
        {work.type === "image" ? (
          <Image
            src={work.mediaUrl}
            alt={work?.title ?? ""}
            width={2000}
            height={1000}
            style={{ objectFit: "cover" }}
            priority
          />
        ) : null}
        {work.type === "video" ? (
          <video playsInline loop preload="auto" autoPlay muted>
            <source src={work.mediaUrl} type="video/mp4"></source>
          </video>
        ) : null}
      </div>
    </div>
  );
};
