import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useNotionNewsletterDeleteApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.notion.newsletter.delete,
  });

  return mutation;
};
