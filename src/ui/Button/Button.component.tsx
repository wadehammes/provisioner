import { ButtonHTMLAttributes } from "react";
import styles from "src/ui/Button/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label: string;
}

export const Button = (props: ButtonProps) => {
  const { label, type = "button" } = props;

  return (
    <button type={type} className={styles.button} aria-label={label}>
      {label}
    </button>
  );
};
