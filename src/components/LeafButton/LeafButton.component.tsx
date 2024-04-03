import { AriaButtonProps } from "react-aria";
import styles from "src/components/LeafButton/LeafButton.module.css";
import { Button } from "src/ui/Button/Button.component";

export const LeafButton = (props: AriaButtonProps) => {
  return <Button {...props} className={styles.leafButton} />;
};

export default LeafButton;
