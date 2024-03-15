import classnames from "classnames";
import { Ref, forwardRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useObjectRef, useTextField } from "react-aria";
import styles from "src/ui/Input/Input.module.css";

interface InputProps extends AriaTextFieldProps {
  hasError: string;
}

export const Input = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { label, hasError } = props;
    const inputRef = useObjectRef(ref);
    const { labelProps, inputProps } = useTextField(props, inputRef);

    const classes = { [styles.hasError]: hasError } satisfies Partial<
      typeof styles
    >;

    return (
      <div className={styles.fieldsetWrapper}>
        <div className={styles.inputWrapper}>
          <label {...labelProps}>{label}</label>
          <input
            {...inputProps}
            className={classnames(styles.input, classes)}
            ref={inputRef}
            data-1p-ignore
          />
        </div>
        {hasError ? <p className={styles.errorMessage}>{hasError}</p> : null}
      </div>
    );
  },
);
