import classnames from "classnames";
import { InputHTMLAttributes } from "react";
import styles from "src/components/Input/Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: string | null;
}

export const Input = (props: InputProps) => {
  const { id, type = "text", hasError, placeholder } = props;

  return (
    <fieldset className={styles.inputWrapper}>
      <input
        className={classnames(styles.input, { hasError: Boolean(hasError) })}
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </fieldset>
  );
};
