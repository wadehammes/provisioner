import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useSendProjectRequestEmailApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.resend.projectRequest,
  });

  return mutation;
};
