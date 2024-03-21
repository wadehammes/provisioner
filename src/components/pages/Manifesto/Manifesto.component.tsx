import styles from "src/components/pages/Manifesto/Manifesto.module.css";
import { Provisioner } from "src/icons/Provisioner.icon";

export const ManifestoComponent = () => (
  <main className={styles.manifesto}>
    <div className={styles.header}>
      <div className="leaf-pattern"></div>
      <div className={styles.logo}>
        <Provisioner />
      </div>
      <div className={styles.scrollingText}>
        <div className={styles.marquee}>
          <span>
            A locally grown agency &bull; A locally grown agency &bull; A
            locally grown agency &bull; A locally grown agency &bull; A locally
            grown agency &bull; A locally grown agency &bull; A locally grown
            agency &bull; A locally grown agency &bull; A locally grown agency
            &bull; A locally grown agency &bull; A locally grown agency &bull; A
            locally grown agency &bull; A locally grown agency &bull; A locally
            grown agency &bull;
          </span>
        </div>
      </div>
    </div>
    <div className={styles.content}>
      <div className="our-manifesto">Manifest Content</div>
      <div className={styles.sidebar}>Work vertical scrolling grid</div>
    </div>
    <div className={styles.footer}>Full width email form here</div>
  </main>
);
