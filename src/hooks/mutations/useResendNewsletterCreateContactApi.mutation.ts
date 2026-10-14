import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";
import type { NewsletterFormInputs } from "src/schemas/newsletterForm.schema";

export const useResendNewsletterCreateContactApiMutation = () => {
  const mutation = useMutation({
    mutationFn: (variables: NewsletterFormInputs) =>
      api.resend.newsletter(variables),
  });

  return mutation;
};
