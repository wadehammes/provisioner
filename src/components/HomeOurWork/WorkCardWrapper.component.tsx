"use client";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import styles from "src/components/HomeOurWork/HomeOurWork.module.css";
import { WorkCard } from "src/components/HomeOurWork/WorkCard.component";
import type { WorkType } from "src/contentful/getWork";

interface WorkCardWrapperProps {
  work: WorkType;
  index: number;
  sizeClass: string;
  span5?: boolean;
  span7?: boolean;
}

export const WorkCardWrapper = (props: WorkCardWrapperProps) => {
  const { work, index, sizeClass, span5, span7 } = props;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={classNames(styles.workCard, sizeClass, {
        [styles.span5]: span5,
        [styles.span7]: span7,
        [styles.fadeIn]: inView,
      })}
    >
      <WorkCard work={work} index={index} />
    </div>
  );
};
