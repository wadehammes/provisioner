import classNames from "classnames";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";
import { AriaLinkOptions } from "react-aria";
import styles from "src/components/LeafButton/LeafButton.module.css";

interface LeafButtonLinkProps extends Omit<AriaLinkOptions, "href"> {
  children: ReactNode;
  href: Url;
  inverted?: boolean;
  color?: "light" | "dark" | "yellow";
  variant: "contained" | "outlined";
}

export const LeafButtonLink = (props: LeafButtonLinkProps) => {
  const { children, color = "light", inverted, variant, ...restProps } = props;

  return (
    <Link
      {...restProps}
      className={classNames(styles.leafButton, {
        [styles.light]: color === "light",
        [styles.dark]: color === "dark",
        [styles.yellow]: color === "yellow",
        [styles.contained]: variant === "contained",
        [styles.inverted]: inverted,
      })}
    >
      {children}
    </Link>
  );
};

export default LeafButtonLink;
