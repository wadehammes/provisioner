import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useSendWelcomeEmailApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.resend.welcome,
  });

  return mutation;
};
