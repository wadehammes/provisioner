import classNames from "classnames";
import type { HTMLAttributes } from "react";
import styles from "src/components/Tag/Tag.module.css";
import type { WorkCategory } from "src/contentful/getWork";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  label: WorkCategory;
}

export const Tag = (props: TagProps) => {
  const { label, ...restProps } = props;

  return (
    <div
      className={classNames(styles.tag, {
        [styles.branding]: label === "Branding",
        [styles.marketing]: label === "Marketing",
        [styles.sales]: label === "Sales",
      })}
      {...restProps}
    >
      {label}
    </div>
  );
};
