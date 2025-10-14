import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";
import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

export const useSendWelcomeEmailApiMutation = () => {
  const mutation = useMutation({
    mutationFn: (variables: NewsletterFormInputs) =>
      api.resend.welcome(variables),
  });

  return mutation;
};
