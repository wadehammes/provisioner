import classnames from "classnames";
import { InputHTMLAttributes, Ref } from "react";
import styles from "src/ui/Input/Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError: string;
  inputRef: Ref<HTMLInputElement>;
  handleChange: () => void;
}

export const Input = (props: InputProps) => {
  const {
    id,
    type = "text",
    hasError,
    placeholder,
    inputRef,
    handleChange,
    name,
  } = props;

  const classes = { [styles.hasError]: hasError } satisfies Partial<
    typeof styles
  >;

  return (
    <div className={styles.fieldsetWrapper}>
      <fieldset className={styles.inputWrapper}>
        <input
          className={classnames(styles.input, classes)}
          id={id}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          data-1p-ignore
        />
      </fieldset>
      {hasError ? <p className={styles.errorMessage}>{hasError}</p> : null}
    </div>
  );
};
