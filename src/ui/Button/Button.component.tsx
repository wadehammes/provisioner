import { Button as BaseButton } from "@base-ui/react/button";
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from "react";
import styles from "src/ui/Button/Button.module.css";

type BaseButtonProps = ComponentPropsWithoutRef<typeof BaseButton>;

interface ButtonProps extends Omit<BaseButtonProps, "disabled"> {
  className?: string;
  disabled?: boolean;
  isDisabled?: boolean;
}

export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLElement>) => {
    const { className, isDisabled, disabled, children, ...restProps } = props;

    return (
      <BaseButton
        ref={ref}
        disabled={disabled ?? isDisabled}
        className={className ? className : styles.button}
        {...restProps}
      >
        {children}
      </BaseButton>
    );
  },
);
