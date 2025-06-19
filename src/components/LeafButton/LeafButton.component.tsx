import classNames from "classnames";
import { forwardRef, type Ref } from "react";
import type { AriaButtonProps } from "react-aria";
import styles from "src/components/LeafButton/LeafButton.module.css";
import { Button } from "src/ui/Button/Button.component";

interface LeafButtonProps extends AriaButtonProps {
  fullWidth?: boolean;
}

export const LeafButton = forwardRef(
  (props: LeafButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { fullWidth } = props;
    return (
      <Button
        ref={ref}
        {...props}
        className={classNames(styles.leafButton, {
          [styles.fullWidth]: fullWidth,
        })}
      />
    );
  },
);

export default LeafButton;
