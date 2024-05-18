import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useNotionProjectRequestsApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.notion.projectRequests.add,
  });

  return mutation;
};
