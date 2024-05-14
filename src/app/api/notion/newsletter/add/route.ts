import { NewsletterFormInputs } from "src/components/NewsletterForm/NewsletterForm.component";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_NEWSLETTER_EMAILS_TOKEN,
  logLevel: LogLevel.DEBUG,
});

// biome-ignore lint/style/useNamingConvention: Next.js API handler
export async function POST(request: Request) {
  const res: NewsletterFormInputs = await request.json();

  if (!res.email) {
    return new Response("no email provided", {
      status: 404,
    });
  }

  try {
    const checkIfEmailExists = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: process.env.NOTION_NEWSLETTER_EMAILS_DB_ID,
      filter: {
        property: "Email",
        title: {
          contains: res.email,
        },
      },
    });

    if (checkIfEmailExists.results.length === 0) {
      await notion.pages.create({
        parent: {
          // biome-ignore lint/style/useNamingConvention: Notion standards
          database_id: process.env.NOTION_NEWSLETTER_EMAILS_DB_ID,
        },
        properties: {
          // biome-ignore lint/style/useNamingConvention: Notion standards
          Email: {
            title: [
              {
                text: {
                  content: res.email,
                },
              },
            ],
          },
        },
      });
    } else {
      return new Response("Email already exists", {
        status: 409,
      });
    }
  } catch (_e) {
    return new Response("failed to send email to Notion", {
      status: 400,
    });
  }

  return new Response("email stored successfully", {
    status: 201,
  });
}
