import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";
import type { NewsletterFormInputs } from "src/schemas/newsletterForm.schema";

export const useResendUnsubscribeContactApiMutation = () => {
  const mutation = useMutation({
    mutationFn: (variables: NewsletterFormInputs) =>
      api.resend.unsubscribe(variables),
  });

  return mutation;
};
