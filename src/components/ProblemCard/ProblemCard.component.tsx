"use client";

import classNames from "classnames";
import { useRef } from "react";
import styles from "src/components/ProblemCard/ProblemCard.module.css";
import { ProblemType } from "src/types/Problems";

interface ProblemCardProps {
  problem: ProblemType;
}

export const ProblemCard = (props: ProblemCardProps) => {
  const { problem } = props;
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <div className={styles.cardContainer}>
      <div
        onMouseEnter={(e) => {
          boundingRef.current = e.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(e) => {
          if (!boundingRef.current) {
            return;
          }

          const x = e.clientX - boundingRef.current.left;
          const y = e.clientY - boundingRef.current.top;
          const xPer = x / boundingRef.current.width;
          const yPer = y / boundingRef.current.height;
          const xRotation = (xPer - 0.5) * 20;
          const yRotation = (0.5 - yPer) * 20;

          e.currentTarget.style.setProperty("--x-rotation", `${xRotation}deg`);
          e.currentTarget.style.setProperty("--y-rotation", `${yRotation}deg`);
        }}
        onMouseLeave={(e) => {
          boundingRef.current = null;
          e.currentTarget.style.setProperty("--x-rotation", "0deg");
          e.currentTarget.style.setProperty("--y-rotation", "deg");
        }}
        className={classNames(styles.problemCard, styles[`${problem.id}`])}
      >
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
