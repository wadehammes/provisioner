"use client";

import classNames from "classnames";
import { useEffect, useEffectEvent, useRef, useState } from "react";
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

  const updateFooterInView = useEffectEvent(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    setFooterInView(scrollTop + windowHeight >= docHeight - 650);
  });

  useEffect(() => {
    window.addEventListener("scroll", updateFooterInView, { passive: true });

    updateFooterInView();

    return () => {
      window.removeEventListener("scroll", updateFooterInView);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={classNames(styles.footer, {
        [styles.revealed]: footerInView,
      })}
    >
      <div className={styles.marquee}>
        <Marquee items={footerMarqueeItems} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <Provisioner aria-hidden />
        </div>
        <h3 id="newsletter-form-header">
          Drop your email and we'll stay in touch.
        </h3>
        <div className={styles.formSlot}>
          <NewsletterForm />
        </div>
      </div>
      <div className="container centered">
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Provisioner Agency, LLC
        </div>
        <div className={styles.socialList}>
          <a
            href="https://instagram.com/provisionerco"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <span className={styles.socialIcon} aria-hidden>
              <Instagram />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
