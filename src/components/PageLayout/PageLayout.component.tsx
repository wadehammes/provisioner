import { draftMode } from "next/headers";
import type { HTMLAttributes } from "react";
import styles from "src/components/PageLayout/PageLayout.module.css";
import { PageProvider } from "src/components/PageLayout/PageProvider.provider";
import { fetchNavigation } from "src/contentful/getNavigation";
import type { Page } from "src/contentful/getPages";
import { Footer } from "../Footer/Footer.component";
import { Navigation } from "../Navigation/Navigation";

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  page?: Page;
}

export const PageLayout = async (props: PageLayoutProps) => {
  const { children, page } = props;
  const draft = await draftMode();

  const navigation = await fetchNavigation({
    id: "navigation-global",
    preview: draft.isEnabled,
  });

  return (
    <PageProvider page={page}>
      <main className="page">
        <Navigation navigation={navigation} />
        <div className="page-content">
          <div className={styles["page-layout-content"]}>{children}</div>
        </div>
        <Footer />
      </main>
    </PageProvider>
  );
};
