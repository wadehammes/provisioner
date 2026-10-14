"use client";

import classNames from "classnames";
import type { CSSProperties } from "react";
import { useInView } from "react-intersection-observer";
import styles from "src/components/ProblemCard/ProblemCard.module.css";
import type { ProblemType } from "src/types/Problems";

interface ProblemCardProps {
  index: number;
  problem: ProblemType;
}

export const ProblemCard = (props: ProblemCardProps) => {
  const { index, problem } = props;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const staggerStyle = {
    "--card-stagger": `${index * 0.1}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={classNames(styles.cardContainer, {
        [styles.inView]: inView,
      })}
      style={staggerStyle}
    >
      <div className={classNames(styles.problemCard, styles[`${problem.id}`])}>
        <h3>{problem.title}</h3>
        <p>{problem.statement}</p>
      </div>
      <div className={styles.solutionList}>
        <p>How we can help</p>
        <ul>
          {problem.solutionList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
