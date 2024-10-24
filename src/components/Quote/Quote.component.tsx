import classNames from "classnames";
import { InView } from "react-intersection-observer";
import styles from "src/components/Quote/Quote.module.css";
import type { QuoteType } from "src/contentful/parseQuote";
import { RichText } from "src/contentful/richText";
import QuoteIcon from "src/icons/Quotes.icon.svg";

interface QuoteProps {
  quote: QuoteType;
  cite: string;
}

export const Quote = (props: QuoteProps) => {
  const { cite, quote } = props;

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <blockquote
          ref={ref}
          className={classNames(styles.quote, { [styles.inView]: inView })}
          cite={cite}
        >
          <QuoteIcon className={styles.quoteIcon} aria-hidden />
          <div className={styles.quoteText}>
            <RichText document={quote.quote} />
          </div>
          <cite className={styles.cite}>
            <h3>{quote.name}</h3>
            <p>{quote.title}</p>
          </cite>
        </blockquote>
      )}
    </InView>
  );
};
