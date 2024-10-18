import { Resend } from "resend";
import type { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

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
      subject: "Together we grow.",
      text: `Hi 👋🏻! We've added you to our email list. You'll hear from us in the future! Grow forth, Provisioner Team - hello@provisioner.agency | https://provisioner.agency`,
      html: `<div>Hi 👋🏻!<br /><br />We've added you to our email list. You'll hear from us in the future!<br /><br />Grow forth, Provisioner Team<br />hello@provisioner.agency<br />https://provisioner.agency</div>`,
    });

    await resend.contacts.create({
      email: to,
      unsubscribed: false,
      audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID as string,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
