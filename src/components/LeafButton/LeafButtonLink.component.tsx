import classNames from "classnames";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import type { ReactNode } from "react";
import type { AriaLinkOptions } from "react-aria";
import styles from "src/components/LeafButton/LeafButton.module.css";

interface LeafButtonLinkProps extends Omit<AriaLinkOptions, "href"> {
  children: ReactNode;
  href: Url;
  inverted?: boolean;
  color?: "light" | "dark" | "yellow";
  variant: "contained" | "outlined";
  fullWidth?: boolean;
}

export const LeafButtonLink = (props: LeafButtonLinkProps) => {
  const {
    children,
    color = "light",
    inverted,
    variant,
    fullWidth,
    ...restProps
  } = props;

  return (
    <Link
      {...restProps}
      className={classNames(styles.leafButton, {
        [styles.light]: color === "light",
        [styles.dark]: color === "dark",
        [styles.yellow]: color === "yellow",
        [styles.contained]: variant === "contained",
        [styles.inverted]: inverted,
        [styles.fullWidth]: fullWidth,
      })}
    >
      {children}
    </Link>
  );
};

export default LeafButtonLink;
