import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";

export const useNotionNewsletterAddApiMutation = () => {
  const mutation = useMutation({
    mutationFn: api.notion.newsletter.add,
  });

  return mutation;
};
