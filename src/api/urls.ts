import { FetchMethods, fetchOptions, fetchResponse } from "src/api/helpers";
import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";
import { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

export const api = {
  notion: {
    newsletter: {
      add: ({ email }: NewsletterFormInputs) =>
        fetch(
          "/api/notion/newsletter/add",
          fetchOptions({
            method: FetchMethods.Post,
            body: JSON.stringify({ email }),
          }),
        ),
      delete: ({ email }: NewsletterFormInputs) =>
        fetch(
          "/api/notion/newsletter/delete",
          fetchOptions({
            method: FetchMethods.Post,
            body: JSON.stringify({ email }),
          }),
        ),
    },
    projectRequests: {
      add: ({
        briefDescription,
        companyName,
        email,
        name,
        phone,
      }: ProjectFormInputs) =>
        fetch(
          "/api/notion/project-requests/add",
          fetchOptions({
            method: FetchMethods.Post,
            body: JSON.stringify({
              briefDescription,
              companyName,
              email,
              name,
              phone,
            }),
          }),
        ),
    },
  },
  sendEmail: {
    welcome: ({ email }: NewsletterFormInputs) =>
      fetchResponse<{ data: { id: string } }>(
        fetch(
          "/api/send-email/welcome",
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
    }: Pick<ProjectFormInputs, "email" | "name" | "companyName">) =>
      fetch(
        "/api/send-email/project-request",
        fetchOptions({
          method: FetchMethods.Post,
          body: JSON.stringify({ email, name, companyName }),
        }),
      ),
  },
};
