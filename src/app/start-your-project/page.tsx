import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { PageLayout } from "src/components/PageLayout/PageLayout.component";
import { StartYourProjectPage } from "src/components/StartYourProjectPage/StartYourProjectPage.component";
import { fetchPage } from "src/contentful/getPages";
import { envUrl } from "src/utils/helpers";

export const dynamic = "force-static";

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

const StartYourProject = async () => {
  const draft = await draftMode();

  const page = await fetchPage({
    slug: "start-your-project",
    preview: draft.isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return (
    <PageLayout page={page}>
      <StartYourProjectPage />
    </PageLayout>
  );
};

export default StartYourProject;
