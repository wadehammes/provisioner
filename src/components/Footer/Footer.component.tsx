"use client";

import classNames from "classnames";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import styles from "src/components/Footer/Footer.module.css";
import type { MarqueeItem } from "src/components/Marquee/Marquee.component";
import { Marquee } from "src/components/Marquee/Marquee.component";
import { NewsletterForm } from "src/components/NewsletterForm/NewsletterForm.component";
import Instagram from "src/icons/Instagram.icon.svg";
import Provisioner from "src/icons/Provisioner.icon.svg";

const footerMarqueeItems: MarqueeItem[] = [
  {
    content: <span className="marquee-content-text">Together we grow.</span>,
    maxWidth: "100%",
    name: "marquee-content-1",
  },
  {
    content: <span className="marquee-content-text">Together we grow.</span>,
    maxWidth: "100%",
    name: "marquee-content-2",
  },
  {
    content: <span className="marquee-content-text">Together we grow.</span>,
    maxWidth: "100%",
    name: "marquee-content-3",
  },
];

export const Footer = () => {
  const [footerInView, setFooterInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 650) {
        setFooterInView(true);
      } else {
        setFooterInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (footerInView && footerRef.current) {
      // Reset initial states
      gsap.set(
        [
          logoRef.current,
          titleRef.current,
          formRef.current,
          copyrightRef.current,
          socialRef.current,
        ],
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
      );

      gsap.set(marqueeRef.current, {
        opacity: 0,
      });

      // Create timeline for staggered animation
      const tl = gsap.timeline({ ease: "back.out(1.7)" });

      // Animate marquee first (fades in)
      tl.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
      )
        // Logo animation (bounces in)
        .fromTo(
          logoRef.current,
          { opacity: 0, y: 50, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45 },
          "-=0.4",
        )
        // Title animation (slides up with bounce)
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.375 },
          "-=0.3",
        )
        // Form animation (slides up)
        .fromTo(
          formRef.current,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45 },
          "-=0.2",
        )
        // Copyright text (fades in)
        .fromTo(
          copyrightRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
          "-=0.1",
        )
        // Social icons (staggered entrance)
        .fromTo(
          socialRef.current,
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3 },
          "-=0.1",
        );

      // Add a fun floating animation to the logo after entrance
      gsap.to(logoRef.current, {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    } else if (!footerInView && footerRef.current) {
      // Reset animations when footer goes out of view
      gsap.killTweensOf([
        marqueeRef.current,
        logoRef.current,
        titleRef.current,
        formRef.current,
        copyrightRef.current,
        socialRef.current,
      ]);
    }
  }, [footerInView]);

  return (
    <footer ref={footerRef} id="footer" className={styles.footer}>
      <div ref={marqueeRef} className={styles.marquee}>
        <Marquee items={footerMarqueeItems} />
      </div>
      <div className={styles.footerContainer}>
        <Provisioner ref={logoRef} />
        <h3 ref={titleRef} id="newsletter-form-header">
          Drop your email and we'll stay in touch.
        </h3>
        <div ref={formRef}>
          <NewsletterForm />
        </div>
      </div>
      <div className="container centered">
        <div ref={copyrightRef}>
          &copy; {new Date().getFullYear()} Provisioner Agency, LLC
        </div>
        <div ref={socialRef} className={styles.socialList}>
          <a
            href="https://instagram.com/provisionerco"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <Instagram className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
};
