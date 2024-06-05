// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_FETCH_USERS_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export async function GET() {
  try {
    const getUsers = await notion.users.list();

    if (getUsers.results.length >= 0) {
      return new Response(JSON.stringify(getUsers.results, null, 2), {
        status: 201,
      });
    }
  } catch (_e) {
    return new Response("failed to fetch users", {
      status: 400,
    });
  }

  return new Response("email deleted successfully", {
    status: 201,
  });
}
