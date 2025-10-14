import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/urls";
import { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

export const useHubspotLeadGenerationFormApiMutation = () => {
  const mutation = useMutation({
    mutationFn: (
      variables: Pick<
        ProjectFormInputs,
        | "briefDescription"
        | "companyName"
        | "email"
        | "jobTitle"
        | "name"
        | "phone"
        | "trafficSource"
      >,
    ) => api.hubspot.leadGeneration(variables),
  });

  return mutation;
};
