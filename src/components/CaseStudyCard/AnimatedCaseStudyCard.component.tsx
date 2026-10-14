"use client";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import styles from "src/components/CaseStudyCard/AnimatedCaseStudyCard.module.css";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import { CaseStudyCard } from "./CaseStudyCard.component";

interface AnimatedCaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const AnimatedCaseStudyCard = (props: AnimatedCaseStudyCardProps) => {
  const { caseStudy } = props;
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <li
      ref={ref}
      className={classNames(styles.item, { [styles.inView]: inView })}
    >
      <CaseStudyCard caseStudy={caseStudy} />
    </li>
  );
};
