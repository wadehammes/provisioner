import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import styles from "src/ui/Button/Button.module.css";

export const Button = (props: AriaButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button ref={ref} {...buttonProps} className={styles.button}>
      {props.children}
    </button>
  );
};
