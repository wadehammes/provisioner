import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { HomePage } from "src/components/HomePage/HomePage";
import { PageLayout } from "src/components/PageLayout/PageLayout.component";
import { fetchPage } from "src/contentful/getPages";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const draft = await draftMode();

  const page = await fetchPage({
    slug: "home",
    preview: draft.isEnabled,
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

const Home = async () => {
  const draft = await draftMode();

  const page = await fetchPage({
    slug: "home",
    preview: draft.isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return (
    <PageLayout page={page}>
      <HomePage />
    </PageLayout>
  );
};

export default Home;
