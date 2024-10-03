import type { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_NEWSLETTER_EMAILS_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export async function POST(request: Request) {
  const res: NewsletterFormInputs = await request.json();

  if (!res.email) {
    return new Response("no email provided", {
      status: 404,
    });
  }

  try {
    const checkIfEmailExists = await notion.databases.query({
      database_id: process.env.NOTION_NEWSLETTER_EMAILS_DB_ID,
      filter: {
        property: "Email",
        email: {
          contains: res.email,
        },
      },
    });

    if (checkIfEmailExists.results.length === 0) {
      await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_NEWSLETTER_EMAILS_DB_ID,
        },
        properties: {
          Email: {
            title: [
              {
                text: {
                  content: res.email,
                },
              },
            ],
          },

          Subscribed: {
            checkbox: true,
          },
        },
      });
    } else {
      return new Response("Email already exists", {
        status: 409,
      });
    }
  } catch (_e) {
    return new Response("Failed to send email to Notion", {
      status: 400,
    });
  }

  return new Response("Email stored successfully", {
    status: 201,
  });
}
