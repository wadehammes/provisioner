import Link from "next/link";
import styles from "src/components/pages/Page/Page.module.css";
import { Page } from "src/contentful/getPages";

interface PageComponentProps {
  fields: Page;
}

export const PageComponent = (props: PageComponentProps) => {
  const { fields } = props;

  return (
    <main className={styles.page}>
      <Link href="/">← Home</Link>
      <div>
        <h1>{fields.pageTitle}</h1>
      </div>
    </main>
  );
};

export default PageComponent;
