import type { UrlObject } from "node:url";
import { format } from "node:url";
import {
  type AnchorHTMLAttributes,
  forwardRef,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";

type NextLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  children?: ReactNode;
  href: string | UrlObject;
  legacyBehavior?: boolean;
  locale?: string | false;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  passHref?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

function hrefToString(href: string | UrlObject): string {
  return typeof href === "string" ? href : format(href);
}

const MockNextLink = forwardRef(function MockNextLink(
  {
    children,
    href,
    legacyBehavior: _legacyBehavior,
    locale: _locale,
    onClick,
    passHref: _passHref,
    prefetch: _prefetch,
    replace: _replace,
    scroll: _scroll,
    ...rest
  }: NextLinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  const hrefString = hrefToString(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.(event);
  };

  return (
    <a href={hrefString} onClick={handleClick} ref={ref} {...rest}>
      {children}
    </a>
  );
});

export default MockNextLink;
