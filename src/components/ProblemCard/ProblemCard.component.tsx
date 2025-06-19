"use client";

import classNames from "classnames";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
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

  const cardRef = useRef<HTMLDivElement>(null);
  const solutionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && cardRef.current && solutionListRef.current) {
      // Create a simple, smooth timeline
      const tl = gsap.timeline({
        delay: index * 0.1, // Faster stagger between cards
      });

      // Smooth card entrance - fade in with subtle slide
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      // Smooth text reveal - slightly delayed
      const title = cardRef.current.querySelector("h3");
      const statement = cardRef.current.querySelector("p");

      if (title) {
        tl.fromTo(
          title,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.2, // Start after card begins appearing
        );
      }

      if (statement) {
        tl.fromTo(
          statement,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.3, // Start after title begins
        );
      }

      // Smooth solution list reveal
      tl.fromTo(
        solutionListRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.4, // Start after statement begins
      );

      // Smooth list items with gentle stagger
      const listItems = solutionListRef.current.querySelectorAll("li");
      if (listItems.length > 0) {
        tl.fromTo(
          listItems,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.5, // Start after solution list begins
        );
      }
    }
  }, [inView, index]);

  return (
    <div ref={ref} className={styles.cardContainer}>
      <div
        ref={cardRef}
        className={classNames(styles.problemCard, styles[`${problem.id}`])}
      >
        <h3>{problem.title}</h3>
        <p>{problem.statement}</p>
      </div>
      <div ref={solutionListRef} className={styles.solutionList}>
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
