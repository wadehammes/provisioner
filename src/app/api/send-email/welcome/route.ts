import { Resend } from "resend";
import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const res: NewsletterFormInputs = await request.json();
  const to = res.email;

  if (!to) {
    return new Response("no to: email provided", {
      status: 404,
    });
  }

  try {
    const data = await resend.emails.send({
      from: "Provisioner <hello@provisioner.agency>",
      to,
      subject: "Let's grow together.",
      text: "Hello from Provisioner! We've stored your email and you will be the first to know when we bloom. Love, Provisioner Team - hello@provisioner.agency",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
