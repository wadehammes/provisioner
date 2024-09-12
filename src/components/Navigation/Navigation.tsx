"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import styles from "src/components/Navigation/Navigation.module.css";
import { NavigationType } from "src/contentful/getNavigation";
import ProvisionerLogo from "src/icons/ProvisionerLogo.svg";
import Menu from "src/icons/Menu.svg";
import { MobileNavigationDrawer } from "src/components/Navigation/MobileNavigation";

interface NavigationProps {
  navigation: NavigationType | null;
}

export const Navigation = (props: NavigationProps) => {
  const { navigation } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const listenScrollEvent = useCallback(() => {
    if (window.scrollY < 50) {
      return setScrolled(false);
    } else {
      return setScrolled(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    listenScrollEvent();

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [listenScrollEvent]);

  if (!navigation) {
    return null;
  }

  return (
    <nav
      className={classNames(styles.navigation, { [styles.scrolled]: scrolled })}
    >
      <div className="container" style={{ gap: "2rem" }}>
        <Link
          href="/"
          className={classNames(styles.logo)}
          title="Provisioner"
          aria-label="Provisioner"
        >
          <ProvisionerLogo />
        </Link>

        {navigation ? (
          <div className={styles.desktopNavigation}>
            <ul className={styles.navigationList}>
              {navigation.navigationItems.map((item) => {
                if (!item) {
                  return null;
                }

                return (
                  <li
                    key={item.slug}
                    className={classNames({
                      [styles.active]: pathname.includes(item.slug || ""),
                    })}
                  >
                    <Link href={`/${item.slug}`}>{item.navigationTitle}</Link>
                  </li>
                );
              })}
            </ul>
            <div className={styles.buttonContainer}>
              <LeafButtonLink
                variant="outlined"
                href={`/${navigation.navigationCta?.ctaPageLink}`}
              >
                {navigation.navigationCta?.ctaText}
              </LeafButtonLink>
            </div>
          </div>
        ) : null}
        <div className={styles.mobileNavToggleContainer}>
          <button
            type="button"
            className={styles.mobileNavToggle}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className={styles.menu} />
          </button>
        </div>

        <MobileNavigationDrawer
          navigation={navigation}
          visible={isOpen}
          closeMenu={() => setIsOpen(false)}
        />
      </div>
    </nav>
  );
};
