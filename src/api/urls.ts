import { FetchMethods, fetchOptions, fetchResponse } from "src/api/helpers";
import type { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";
import type { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

export const api = {
  hubspot: {
    leadGeneration: ({
      briefDescription,
      companyName,
      email,
      jobTitle,
      name,
      phone,
    }: Partial<ProjectFormInputs>) =>
      fetch(
        "/api/hubspot/lead-generation",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({
            briefDescription,
            companyName,
            email,
            jobTitle,
            name,
            phone,
          }),
        }),
      ),
  },
  resend: {
    welcome: ({ email }: NewsletterFormInputs) =>
      fetchResponse<{ data: { id: string } }>(
        fetch(
          "/api/resend/welcome",
          fetchOptions({
            method: FetchMethods.Post,
            body: JSON.stringify({ email }),
          }),
        ),
      ),
    projectRequest: ({
      companyName,
      email,
      name,
      briefDescription,
    }: Pick<
      ProjectFormInputs,
      "email" | "name" | "companyName" | "briefDescription"
    >) =>
      fetch(
        "/api/resend/project-request",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email, name, companyName, briefDescription }),
        }),
      ),
    newsletter: ({ email }: Pick<ProjectFormInputs, "email">) =>
      fetch(
        "/api/resend/newsletter",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email }),
        }),
      ),
    unsubscribe: ({ email }: NewsletterFormInputs) =>
      fetch(
        "/api/resend/unsubscribe",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email }),
        }),
      ),
  },
};
