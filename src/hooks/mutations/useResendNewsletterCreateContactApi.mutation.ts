import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useResendNewsletterCreateContactApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.resend.newsletter,
  });

  return mutation;
};
