import classNames from "classnames";
import { InView } from "react-intersection-observer";
import styles from "src/components/Quote/Quote.module.css";
import type { QuoteType } from "src/contentful/parseQuote";
import { RichText } from "src/contentful/richText";
import QuoteIcon from "src/icons/Quotes.icon.svg";

interface QuoteProps {
  quote: QuoteType;
}

export const Quote = (props: QuoteProps) => {
  const { quote } = props;

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <div
          ref={ref}
          className={classNames(styles.quote, { [styles.inView]: inView })}
        >
          <QuoteIcon className={styles.quoteIcon} />
          <div className={styles.quoteText}>
            <RichText document={quote.quote} />
          </div>
          <div>
            <h3>{quote.name}</h3>
            <p>{quote.title}</p>
          </div>
        </div>
      )}
    </InView>
  );
};
