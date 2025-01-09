"use client";

import classNames from "classnames";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  noParams?: boolean;
}

export const LeafButtonLink = (props: LeafButtonLinkProps) => {
  const searchParams = useSearchParams();
  const trafficSource = searchParams.get("utm_source") || "organic";

  const {
    children,
    color = "light",
    inverted,
    variant,
    fullWidth,
    href,
    noParams = false,
    ...restProps
  } = props;

  return (
    <Link
      {...restProps}
      href={noParams ? href : `${href}?utm_source=${trafficSource}`}
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
