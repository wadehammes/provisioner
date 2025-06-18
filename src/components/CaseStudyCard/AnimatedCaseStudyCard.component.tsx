"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import type { CaseStudy } from "src/contentful/getCaseStudies";
import { CaseStudyCard } from "./CaseStudyCard.component";

interface AnimatedCaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const AnimatedCaseStudyCard = (props: AnimatedCaseStudyCardProps) => {
  const { caseStudy } = props;
  const cardRef = useRef<HTMLLIElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (!inView || !cardRef.current) return;

    const card = cardRef.current;
    const link = card.querySelector("a");
    const meta = card.querySelector("[class*='meta']");
    const tags = card.querySelector("[class*='tags']");

    const tl = gsap.timeline();

    // Set initial states
    gsap.set(card, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotationX: 20,
      rotationY: 5,
    });

    gsap.set(meta, {
      opacity: 0,
      y: 30,
    });

    gsap.set(tags, {
      opacity: 0,
      y: 20,
    });

    // Main card animation
    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      duration: 1,
      ease: "power3.out",
    })
      // Animate meta content with slight delay
      .to(
        meta,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // Animate tags with staggered effect
      .to(
        tags,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

    // Add a subtle floating effect after animation
    tl.to(
      card,
      {
        y: -3,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      },
      "+=0.5",
    );

    return () => {
      tl.kill();
    };
  }, [inView]);

  return (
    <li
      ref={(el) => {
        ref(el);
        cardRef.current = el;
      }}
    >
      <CaseStudyCard caseStudy={caseStudy} />
    </li>
  );
};
