import { Field } from "@base-ui/react/field";
import classnames from "classnames";
import { forwardRef, type Ref, type TextareaHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import styles from "src/components/LeafInput/LeafInput.module.css";

interface LeafTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: FieldError;
  label?: string;
  largeInput?: boolean;
}

export const LeafTextArea = forwardRef(
  (props: LeafTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      label,
      hasError,
      largeInput,
      id,
      name,
      className,
      ...restTextAreaProps
    } = props;

    return (
      <Field.Root
        name={name}
        invalid={Boolean(hasError)}
        className={styles.fieldsetWrapper}
      >
        {label ? (
          <Field.Label className={styles.label} htmlFor={id}>
            {label}
          </Field.Label>
        ) : null}
        <div
          className={classnames(styles.inputWrapper, {
            [styles.inputHasError]: hasError,
          })}
        >
          <textarea
            {...restTextAreaProps}
            id={id}
            name={name}
            className={classnames(
              styles.input,
              styles.textarea,
              {
                [styles.variantLarge]: largeInput,
                [styles.hasError]: Boolean(hasError),
              },
              className,
            )}
            ref={ref}
            data-1p-ignore
          />
        </div>
      </Field.Root>
    );
  },
);
