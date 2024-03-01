// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const postmark = require("postmark");

const client = new postmark.Client(process.env.POSTMARK_API_KEY as string);

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const To = searchParams.get("to");
  const name = searchParams.get("name");

  if (!To) {
    return new Response("no to: email provided", {
      status: 404,
    });
  }

  if (!name) {
    return new Response("no name provided", {
      status: 404,
    });
  }

  client.sendEmail({
    From: "hello@provisioner.agency",
    To,
    Subject: `We can't wait to grow together, ${name}. - Provisioner`,
    HtmlBody:
      "Hello from Provisioner! We have received your contact and will respond to you in 1-2 business days.<br /><br />Provisioner Team - hello@provisioner.agency",
    TextBody:
      "Hello from Provisioner! We have received your contact and will respond to you in 1-2 business days. Provisioner Team - hello@provisioner.agency",
    MessageStream: "outbound",
  });

  return new Response("email sent successfully", {
    status: 200,
  });
}
