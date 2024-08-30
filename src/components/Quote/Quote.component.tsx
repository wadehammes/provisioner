import styles from "src/components/Quote/Quote.module.css";
import { QuoteType } from "src/contentful/parseQuote";
import { RichText } from "src/contentful/richText";
import QuoteIcon from "src/icons/Quotes.icon.svg";

interface QuoteProps {
  quote: QuoteType;
}

export const Quote = (props: QuoteProps) => {
  const { quote } = props;

  return (
    <div className={styles.quote}>
      <QuoteIcon className={styles.quoteIcon} />
      <div className={styles.quoteText}>
        <RichText document={quote.quote} />
      </div>
      <div>
        <h3>{quote.name}</h3>
        <p>{quote.title}</p>
      </div>
    </div>
  );
};
