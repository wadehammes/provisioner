import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ComingSoonPage } from "src/components/ComingSoonPage/ComingSoonPage.component";
import { fetchPage } from "src/contentful/getPages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: "home",
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    title: `${page.pageTitle} | Provisioner`,
    robots: page.enableIndexing ? "index, follow" : "noindex, nofollow",
    description: page.metaDescription,
  };
}

const Home = () => {
  return <ComingSoonPage />;
};

export default Home;
