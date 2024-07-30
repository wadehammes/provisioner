const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_BLOG_POSTS_API_KEY,
  logLevel: LogLevel.DEBUG,
});

export const fetchNotionBlogPosts = async () => {
  try {
    const getBlogPosts = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: <notion standards>
      database_id: process.env.NOTION_BLOG_POSTS_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
    });

    if (getBlogPosts.results.length >= 0) {
      return getBlogPosts.results;
    }
  } catch (_e) {
    return new Response("failed to fetch blog posts", {
      status: 400,
    }); // TODO: handle error
  }
};
