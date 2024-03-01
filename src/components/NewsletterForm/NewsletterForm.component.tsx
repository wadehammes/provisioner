import { Button } from "src/components/Button/Button.component";
import { Input } from "src/components/Input/Input.component";
import styles from "src/components/NewsletterForm/NewsletterForm.module.css";

export const NewsletterForm = () => {
  return (
    <form className={styles.newsletterForm}>
      <Input placeholder="Your email, please." />
      <Button label="Submit" />
    </form>
  );
};
