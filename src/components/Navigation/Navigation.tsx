import { draftMode } from "next/headers";
import Link from "next/link";
import styles from "src/components/Navigation/Navigation.module.css";
import { fetchNavigation } from "src/contentful/getNavigation";
import { Provisioner } from "src/icons/Provisioner.icon";
import { NAVIGATION_ID } from "src/utils/constants";

export const Navigation = async () => {
  const navigation = await fetchNavigation({
    id: NAVIGATION_ID,
    preview: draftMode().isEnabled,
  });

  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.logo}>
        <Provisioner />
      </Link>
      <ul className={styles.navItemList}>
        {navigation?.navigationItems.map((item) => (
          <li>
            <Link href={`/${item?.slug}`}>{item?.navigationTitle}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
