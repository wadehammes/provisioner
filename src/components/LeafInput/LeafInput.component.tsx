import classnames from "classnames";
import { Ref, forwardRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useObjectRef, useTextField } from "react-aria";
import { FieldError } from "react-hook-form";
import styles from "src/components/LeafInput/LeafInput.module.css";

interface LeafInputProps extends AriaTextFieldProps {
  hasError?: FieldError;
  largeInput?: boolean;
}

export const LeafInput = forwardRef(
  (props: LeafInputProps, ref: Ref<HTMLInputElement>) => {
    const { label, hasError, largeInput } = props;
    const inputRef = useObjectRef(ref);
    const { labelProps, inputProps } = useTextField(props, inputRef);
    const { id, ...restInputProps } = inputProps;

    return (
      <div className={styles.fieldsetWrapper}>
        {label ? (
          <label className={styles.label} {...labelProps} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div
          className={classnames(styles.inputWrapper, {
            [styles.inputHasError]: hasError,
          })}
        >
          <input
            {...restInputProps}
            id={id}
            className={classnames(styles.input, {
              [styles.hasError]: Boolean(hasError),
              [styles.variantLarge]: largeInput,
            })}
            ref={inputRef}
            data-1p-ignore
          />
        </div>
      </div>
    );
  },
);

export default LeafInput;
