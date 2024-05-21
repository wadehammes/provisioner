import classNames from "classnames";
import { HTMLAttributes } from "react";
import styles from "src/components/Tag/Tag.module.css";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  label: "branding" | "marketing" | "sales";
}

export const Tag = (props: TagProps) => {
  const { label, ...restProps } = props;

  return (
    <div
      className={classNames(styles.tag, {
        [styles.branding]: label === "branding",
        [styles.marketing]: label === "marketing",
        [styles.sales]: label === "sales",
      })}
      {...restProps}
    >
      {label}
    </div>
  );
};
