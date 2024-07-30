import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { BlogPage } from "src/components/BlogPage/ BlogPage.component";
import { fetchPage } from "src/contentful/getPages";
import { fetchNotionBlogPosts } from "src/notion/fetchBlogPosts";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: "blog",
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/blog`),
    alternates: {
      canonical: "/",
    },
    title: `${page.pageTitle} | Provisioner`,
    robots:
      page.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: page.metaDescription,
  };
}

const Blog = async () => {
  const posts = await fetchNotionBlogPosts();

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(posts);

  return <BlogPage posts={posts} />;
};

export default Blog;
