"use client";

import classNames from "classnames";
import { gsap } from "gsap";
import parse from "html-react-parser";
import { Suspense, useEffect, useRef } from "react";
import styles from "src/components/Hero/Hero.module.css";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";

interface HeroProps {
  h1: string;
  subtitle?: string;
  buttonProps?: {
    label: string;
    href: string;
  };
  reducedHeight?: boolean;
}

export const Hero = (props: HeroProps) => {
  const { h1, subtitle, buttonProps, reducedHeight } = props;
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!h1Ref.current) return;

    const h1Element = h1Ref.current;

    // Get all strong elements for underline animation
    const strongElements = h1Element.querySelectorAll("strong");

    // Set initial state for the h1 element
    gsap.set(h1Element, {
      opacity: 0,
      y: 30,
    });

    // Create the animation timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate the full h1 element
    tl.to(h1Element, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out",
    });

    // Animate the underlines on strong elements
    let addedStyle: HTMLStyleElement | null = null;
    if (strongElements.length > 0) {
      // Set initial state for underlines - hidden and clipped
      gsap.set(strongElements, {
        "--underline-opacity": 0,
        "--underline-clip": "inset(0 100% 0 0)",
      });

      // Add CSS custom properties for the underline animation
      addedStyle = document.createElement("style");
      addedStyle.textContent = `
        strong::after {
          opacity: var(--underline-opacity, 0) !important;
          clip-path: var(--underline-clip, inset(0 100% 0 0)) !important;
          transition: opacity 0.4s ease-out;
        }
      `;
      document.head.appendChild(addedStyle);

      // Animate underlines after text animation - draw from left to right
      tl.to(
        strongElements,
        {
          "--underline-opacity": 1,
          "--underline-clip": "inset(0 0% 0 0)",
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }

    // After text animation, fade in the button if it exists
    if (buttonRef.current && buttonProps) {
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }

    // Cleanup function
    return () => {
      tl.kill();
      if (addedStyle && addedStyle.parentNode) {
        addedStyle.parentNode.removeChild(addedStyle);
      }
    };
  }, [h1, buttonProps]);

  return (
    <div
      className={classNames("hero", styles.hero, {
        [styles.reducedHeight]: reducedHeight,
      })}
    >
      <div className="container centered">
        <header className="page-header">
          {h1 ? (
            <h1 ref={h1Ref} className={styles.heroH1}>
              {parse(h1)}
            </h1>
          ) : null}
          {subtitle ? (
            <p className={classNames("subtitle", styles.heroSubtitle)}>
              {parse(subtitle)}
            </p>
          ) : null}
          {buttonProps ? (
            <div
              ref={buttonRef}
              className={styles.buttonContainer}
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LeafButtonLink
                  href={buttonProps.href}
                  variant="contained"
                  noParams
                >
                  {buttonProps.label}
                </LeafButtonLink>
              </Suspense>
            </div>
          ) : null}
        </header>
      </div>
    </div>
  );
};
