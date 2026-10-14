import classNames from "classnames";
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from "react";
import styles from "src/components/LeafButton/LeafButton.module.css";
import { Button } from "src/ui/Button/Button.component";

type ButtonProps = ComponentPropsWithoutRef<typeof Button>;

interface LeafButtonProps extends ButtonProps {
  fullWidth?: boolean;
}

export const LeafButton = forwardRef(
  (props: LeafButtonProps, ref: Ref<HTMLElement>) => {
    const { fullWidth, ...restProps } = props;
    return (
      <Button
        ref={ref}
        {...restProps}
        className={classNames(styles.leafButton, {
          [styles.fullWidth]: fullWidth,
        })}
      />
    );
  },
);
