import classNames from "classnames";
import parse from "html-react-parser";
import { Suspense } from "react";
import styles from "src/components/Hero/Hero.module.css";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";

interface HeroProps {
  h1: string;
  subtitle?: string;
  buttonProps?: {
    label: string;
    href: string;
  };
  reducedHeight?: boolean;
}

export const Hero = (props: HeroProps) => {
  const { h1, subtitle, buttonProps, reducedHeight } = props;

  return (
    <div
      className={classNames("hero", styles.hero, {
        [styles.reducedHeight]: reducedHeight,
      })}
    >
      <div className="container centered">
        <header className="page-header">
          {h1 ? <h1>{parse(h1)}</h1> : null}
          {subtitle ? (
            <p className={classNames("subtitle", styles.heroSubtitle)}>
              {parse(subtitle)}
            </p>
          ) : null}
          {buttonProps ? (
            <div className={styles.buttonContainer}>
              <Suspense fallback={<div>Loading...</div>}>
                <LeafButtonLink
                  href={buttonProps.href}
                  variant="contained"
                  noParams
                >
                  {buttonProps.label}
                </LeafButtonLink>
              </Suspense>
            </div>
          ) : null}
        </header>
      </div>
    </div>
  );
};
