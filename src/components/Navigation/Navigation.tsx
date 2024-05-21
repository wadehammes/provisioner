"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import styles from "src/components/Navigation/Navigation.module.css";
import { CONTACT_CTA_COPY } from "src/copy/global";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Provisioner } from "src/icons/Provisioner.icon";
import { ProvisionerLogo } from "src/icons/ProvisionerLogo";

export const Navigation = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [scrolled, setScrolled] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY < 50) {
      return setScrolled(false);
    } else {
      return setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    listenScrollEvent();

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [listenScrollEvent]);

  return (
    <nav
      className={classNames(styles.navigation, { [styles.scrolled]: scrolled })}
    >
      <div className="container">
        <Link
          href="/"
          className={classNames(styles.logo, {
            [styles.desktopLogo]: !isMobile,
          })}
        >
          {isMobile ? <Provisioner /> : <ProvisionerLogo />}
        </Link>
        <ul className={styles.navItemList}></ul>
        <LeafButtonLink variant="outlined" href="/start-your-project">
          {CONTACT_CTA_COPY}
        </LeafButtonLink>
      </div>
    </nav>
  );
};
