import { VisionLink } from "src/components/VisionsPage/VisionLink.component";
import styles from "src/components/VisionsPage/VisionsPage.module.css";
import type { Page } from "src/contentful/getPages";
import type { Vision } from "src/contentful/getVisions";

interface VisionsPageProps {
  fields: Page;
  visions: Vision[];
}

export const VisionsPage = (props: VisionsPageProps) => {
  const { fields } = props;

  return (
    <div className={styles.visionsPage}>
      <div className="container columned">
        <h1>{fields.pageTitle}</h1>
        <div>
          {props.visions.map((vision) => (
            <VisionLink key={vision.slug} vision={vision} />
          ))}
        </div>
      </div>
    </div>
  );
};
