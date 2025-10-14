import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";
import { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

export const useSendProjectRequestEmailApiMutation = () => {
  const mutation = useMutation({
    mutationFn: (
      variables: Pick<
        ProjectFormInputs,
        "companyName" | "email" | "name" | "briefDescription"
      >,
    ) => api.resend.projectRequest(variables),
  });

  return mutation;
};
