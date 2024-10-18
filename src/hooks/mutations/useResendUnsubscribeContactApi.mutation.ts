import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useResendUnsubscribeContactApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.resend.unsubscribe,
  });

  return mutation;
};
