import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import styles from "src/ui/Button/Button.module.css";

interface ButtonProps extends AriaButtonProps {
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { className } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={className ? className : styles.button}
    >
      {props.children}
    </button>
  );
};
