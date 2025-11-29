import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { VisionsPage } from "src/components/VisionsPage/VisionsPage.component";
import { fetchPage } from "src/contentful/getPages";
import { fetchAllVisions } from "src/contentful/getVisions";
import { VISIONS_SLUG } from "src/utils/constants";
import { envUrl } from "src/utils/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage({
    slug: VISIONS_SLUG,
    preview: draftMode().isEnabled,
  });

  if (!page) {
    return notFound();
  }

  return {
    metadataBase: new URL(`${envUrl()}/visions`),
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

async function Visions() {
  const visions = await fetchAllVisions({
    preview: draftMode().isEnabled,
  });

  const visionsPage = await fetchPage({
    slug: VISIONS_SLUG,
    preview: draftMode().isEnabled,
  });

  if (!visionsPage) {
    return notFound();
  }

  return <VisionsPage fields={visionsPage} visions={visions} />;
}

export default Visions;
