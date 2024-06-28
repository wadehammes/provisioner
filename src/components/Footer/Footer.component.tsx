"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "src/components/Footer/Footer.module.css";
import NewsletterForm from "src/components/NewsletterForm/NewsletterForm.component";
import Instagram from "src/icons/Instagram.icon.svg";
import Provisioner from "src/icons/Provisioner.icon.svg";
import Twitter from "src/icons/Twitter.icon.svg";

export const Footer = () => {
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 610) {
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

  return (
    <footer
      id="footer"
      className={classNames(styles.footer, {
        [styles.inView]: footerInView,
      })}
    >
      <div className="leaf-pattern"></div>
      <div className={classNames("marquee", styles.marquee)}>
        <div className="marquee-content">
          <span>Together we grow.</span>
          <span>Together we grow.</span>
        </div>
        <div className="marquee-content" aria-hidden>
          <span>Together we grow.</span>
          <span>Together we grow.</span>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Provisioner />
        <h3 id="newsletter-form-header">
          Drop your email and we'll stay in touch.
        </h3>
        <NewsletterForm />
      </div>
      <div className="container centered">
        &copy; {new Date().getFullYear()} Provisioner, LLC
        <div className={styles.socialList}>
          <a
            href="https://instagram.com/provisionerco"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <Instagram className={styles.socialIcon} />
          </a>
          <a
            href="https://twitter.com/provisionerco"
            rel="noopener noreferrer"
            title="Twitter"
          >
            <Twitter className={styles.twitterIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
};
