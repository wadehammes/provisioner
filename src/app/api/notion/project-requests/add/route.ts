import { ProjectFormInputs } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_PROJECT_REQUESTS_API_KEY,
  logLevel: LogLevel.DEBUG,
});

// biome-ignore lint/style/useNamingConvention: Next.js API handler
export async function POST(request: Request) {
  const res: ProjectFormInputs = await request.json();

  if (!res.email) {
    return new Response("no email provided", {
      status: 404,
    });
  }

  try {
    const checkIfEmailExists = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: Notion standards
      database_id: process.env.NOTION_PROJECT_REQUESTS_DB_ID,
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
          // biome-ignore lint/style/useNamingConvention: Notion standards
          database_id: process.env.NOTION_PROJECT_REQUESTS_DB_ID,
        },
        properties: {
          "Opportunity Name": {
            title: [
              {
                text: {
                  content: res.companyName,
                },
              },
            ],
          },
          // biome-ignore lint/style/useNamingConvention: Notion standards
          Email: {
            email: res.email,
          },
          "Contact Name": {
            // biome-ignore lint/style/useNamingConvention: Notion standards
            rich_text: [
              {
                type: "text",
                text: {
                  content: res.name,
                  link: null,
                },
                // biome-ignore lint/style/useNamingConvention: Notion standards
                plain_text: res.name,
                href: null,
              },
            ],
          },
          "Account Owner": {
            people: [
              {
                object: "user",
                id: "0c05a4a9-3d24-4f6c-b754-f142916cb1b6",
              },
              {
                object: "user",
                id: "c05f9485-3fba-4770-b7ff-3a50fe5a8019",
              },
            ],
          },
          // biome-ignore lint/style/useNamingConvention: Notion standards
          Phone: {
            // biome-ignore lint/style/useNamingConvention: Notion standards
            phone_number: res.phone,
          },
          "Contact Message": {
            // biome-ignore lint/style/useNamingConvention: Notion standards
            rich_text: [
              {
                type: "text",
                text: {
                  content: res.briefDescription,
                  link: null,
                },
                // biome-ignore lint/style/useNamingConvention: Notion standards
                plain_text: res.briefDescription,
                href: null,
              },
            ],
          },
          // biome-ignore lint/style/useNamingConvention: Notion standards
          Status: {
            select: {
              name: "Lead",
            },
          },
        },
      });
    } else {
      return new Response("Email already exists", {
        status: 409,
      });
    }
  } catch (_e) {
    return new Response("failed to send project request to Notion", {
      status: 400,
    });
  }

  return new Response("project request stored successfully", {
    status: 201,
  });
}
