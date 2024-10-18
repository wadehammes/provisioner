import { Resend } from "resend";
import type { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const res: ProjectFormInputs = await request.json();
  const email = res.email;

  if (!email) {
    return new Response("no to: email provided", {
      status: 404,
    });
  }

  try {
    const contacts = await resend.contacts.list({
      audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID as string,
    });

    const contact = contacts.data?.data?.find(
      (contact) => contact.email === email,
    );

    if (!contact) {
      return new Response("no contact id found", {
        status: 404,
      });
    }

    const data = await resend.contacts.update({
      audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID as string,
      id: contact.id,
      unsubscribed: true,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
