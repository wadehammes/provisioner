import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import classnames from "classnames";
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  type Ref,
} from "react";
import type { FieldError } from "react-hook-form";
import styles from "src/components/LeafInput/LeafInput.module.css";

type BaseInputProps = ComponentPropsWithoutRef<typeof Input>;

interface LeafInputProps extends Omit<BaseInputProps, "onChange"> {
  hasError?: FieldError;
  label?: string;
  largeInput?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const LeafInput = forwardRef(
  (props: LeafInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      hasError,
      largeInput,
      id,
      name,
      value,
      onChange,
      onBlur,
      className,
      ...restInputProps
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
          <Input
            {...restInputProps}
            id={id}
            name={name}
            ref={ref}
            value={value ?? ""}
            onBlur={onBlur}
            onValueChange={(nextValue) => {
              onChange?.({
                target: { value: nextValue, name: name ?? "" },
              } as ChangeEvent<HTMLInputElement>);
            }}
            className={classnames(
              styles.input,
              {
                [styles.hasError]: Boolean(hasError),
                [styles.variantLarge]: largeInput,
              },
              className,
            )}
            data-1p-ignore
          />
        </div>
      </Field.Root>
    );
  },
);
