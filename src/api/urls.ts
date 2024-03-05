import { FetchMethods, fetchOptions } from "src/api/helpers";
import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

export const api = {
  notion: {
    newsletter: ({ email }: NewsletterFormInputs) =>
      fetch(
        "/api/notion/newsletter",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email }),
        }),
      ),
  },
  sendEmail: {
    welcome: ({ email }: NewsletterFormInputs) =>
      fetch(
        "/api/send-email/welcome",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email }),
        }),
      ),
  },
};
