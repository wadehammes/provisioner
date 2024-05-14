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
    const checkIfEmailPageObjectExists = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: process.env.NOTION_NEWSLETTER_EMAILS_DB_ID,
      filter: {
        property: "Email",
        title: {
          contains: res.email,
        },
      },
    });

    if (checkIfEmailPageObjectExists.results.length >= 0) {
      const pageId = checkIfEmailPageObjectExists.results[0].id;

      await notion.pages.update({
        // biome-ignore lint/style/useNamingConvention: <explanation>
        page_id: pageId,
        archived: true,
      });
    } else {
      return new Response("Email doesn't exist in database", {
        status: 409,
      });
    }
  } catch (_e) {
    return new Response("failed to delete email from Notion", {
      status: 400,
    });
  }

  return new Response("email deleted successfully", {
    status: 201,
  });
}
