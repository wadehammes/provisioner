import { Resend } from "resend";
import type { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const res: ProjectFormInputs = await request.json();
  const email = res.email;
  const name = res.name;
  const companyName = res.companyName;
  const message = res.briefDescription;
  const marketingConsent = res.marketingConsent;

  const firstName = name.split(" ")[0] || "";
  const lastName = name.split(" ")[1] || "";

  if (!email) {
    return new Response("no to: email provided", {
      status: 404,
    });
  }

  try {
    const data = await resend.emails.send({
      from: "Provisioner <hello@provisioner.agency>",
      bcc: "Provisioner <hello@provisioner.agency>",
      to: `${name} <${email}>`,
      subject: "We received your project request.",
      text: `Hi, ${firstName} 👋🏻! We've received your project request for ${companyName} and will respond to you shortly. Feel free to reply back to this email whenever. [Your Message: ${message}] Grow forth, Provisioner Team - hello@provisioner.agency | https://provisioner.agency`,
      html: `<div>Hi, ${firstName} 👋🏻!<br /><br />We've received your project request for ${companyName} and will respond to you shortly. Feel free to reply back to this email whenever.<br /><br />Your Message: <br />${message}<br /><br />Grow forth, Provisioner Team<br />hello@provisioner.agency<br />https://provisioner.agency</div>`,
    });

    await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: !marketingConsent,
      audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID as string,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
