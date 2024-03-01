import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const postmark = require("postmark");

const client = new postmark.Client(process.env.POSTMARK_API_KEY as string);

export async function POST(request: Request) {
  const res: NewsletterFormInputs = await request.json();
  const To = res.email;

  if (!To) {
    return new Response("no to: email provided", {
      status: 404,
    });
  }

  try {
    client.sendEmail({
      From: "hello@provisioner.agency",
      To,
      Subject: "We can't wait to grow together. - Provisioner",
      HtmlBody:
        "Hello from Provisioner! We have got your email and you will be the first to know when we launch.<br /><br />Provisioner Team - hello@provisioner.agency",
      TextBody:
        "Hello from Provisioner! We have got your email and you will be the first to know when we launch. Provisioner Team - hello@provisioner.agency",
      MessageStream: "outbound",
    });
  } catch (e) {
    return new Response("failed to send email", {
      status: 404,
    });
  }

  return new Response("email sent successfully", {
    status: 200,
  });
}
