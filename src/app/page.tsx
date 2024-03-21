import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ComingSoonComponent } from "src/components/pages/ComingSoon/ComingSoon.component";
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
  return <ComingSoonComponent />;
};

export default Home;
