import classnames from "classnames";
import { Ref, forwardRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useObjectRef, useTextField } from "react-aria";
import styles from "src/ui/TextField/TextField.module.css";

interface TextFieldProps extends AriaTextFieldProps {
  className?: string;
}

export const TextField = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement>) => {
    const { label, className } = props;
    const inputRef = useObjectRef(ref);
    const { labelProps, inputProps } = useTextField(props, inputRef);

    return (
      <fieldset className={styles.fieldset}>
        <label {...labelProps}>{label}</label>
        <input
          {...inputProps}
          className={classnames(styles.input, className)}
          ref={inputRef}
          data-1p-ignore
        />
      </fieldset>
    );
  },
);
