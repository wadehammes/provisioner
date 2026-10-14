"use client";

import Link from "next/link";
import { Activity } from "react";
import styles from "src/components/Navigation/Navigation.module.css";
import type { NavigationType } from "src/contentful/getNavigation";
import Close from "src/icons/Close.svg";
import ProvisionerIcon from "src/icons/Provisioner.icon.svg";

interface MobileNavigationDrawerProps {
  navigation: NavigationType;
  visible: boolean;
  closeMenu?: () => void;
}

export const MobileNavigationDrawer = (props: MobileNavigationDrawerProps) => {
  const { navigation, visible, closeMenu } = props;

  return (
    <Activity mode={visible ? "visible" : "hidden"} name="MobileNavigation">
      <div className={styles.mobileNav} aria-hidden={!visible}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeMenu}
        >
          <Close className={styles.close} />
        </button>
        <Link href="/" onClick={closeMenu} className={styles.mobileNavLogo}>
          <ProvisionerIcon />
        </Link>
        <div className={styles.mobileNavList}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          {navigation.navigationItems.map((page) => {
            if (!page) {
              return null;
            }

            return (
              <Link href={`/${page.slug}`} key={page.slug} onClick={closeMenu}>
                {page.navigationTitle}
              </Link>
            );
          })}
          <Link
            href={`/${navigation.navigationCta?.ctaPageLink}`}
            onClick={closeMenu}
          >
            {navigation.navigationCta?.ctaText}
          </Link>
        </div>

        <a
          className={styles.navLink}
          href="mailto:hello@provisioner.agency"
          title="Email"
          aria-label="Email"
        >
          hello@provisioner.agency
        </a>
      </div>
    </Activity>
  );
};
