import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { HomePage } from "src/components/HomePage/HomePage";
import { fetchPage } from "src/contentful/getPages";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: "home",
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/`),
    alternates: {
      canonical: "/",
    },
    title: `Provisioner - ${page.pageTitle}`,
    robots:
      page.enableIndexing && process.env.ENVIRONMENT === "production"
        ? "index, follow"
        : "noindex, nofollow",
    description: page.metaDescription,
  };
}

const Home = () => {
  return <HomePage />;
};

export default Home;
