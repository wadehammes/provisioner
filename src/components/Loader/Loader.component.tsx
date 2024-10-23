import styles from "src/components/Loader/Loader.module.css";
import ProvisionerLogoIcon from "src/icons/Provisioner.icon.svg";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <ProvisionerLogoIcon className={styles.loader} />
    </div>
  );
};
