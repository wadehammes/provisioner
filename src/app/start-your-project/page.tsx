import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { StartYourProjectPage } from "src/components/StartYourProjectPage/StartYourProjectPage.component";
import { fetchPage } from "src/contentful/getPages";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const draft = await draftMode();

  const page = await fetchPage({
    slug: "start-your-project",
    preview: draft.isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/start-your-project`),
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

const StartYourProject = () => {
  return <StartYourProjectPage />;
};

export default StartYourProject;
