import styles from "src/components/VisionEntryPage/VisionEntryPage.module.css";
import type { Vision } from "src/contentful/getVisions";
interface VisionEntryPageProps {
  vision: Vision;
}

export const VisionEntryPage = (props: VisionEntryPageProps) => {
  const { vision } = props;

  return <article className={styles.visionEntryPage}>{vision.title}</article>;
};
