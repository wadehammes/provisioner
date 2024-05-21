import classNames from "classnames";
import parse from "html-react-parser";
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
          <img
            src={work.mediaUrl}
            alt={work.description}
            width={1000}
            height={600}
            loading="lazy"
            style={{ objectFit: "cover" }}
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
