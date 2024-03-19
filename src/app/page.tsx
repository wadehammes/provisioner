import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { NewsletterForm } from "src/components/NewsletterForm/NewsletterForm.component";
import { fetchPage } from "src/contentful/getPages";
import { Provisioner } from "src/icons/Provisioner.icon";

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
  return (
    <>
      <div className="leaf-pattern" />
      <div className="container">
        <div className="logo-lockup">
          <Provisioner className="logo" aria-label="Provisioner Logo" />
          <h1>A locally grown agency</h1>
          <p>Leave us your email to be the first to know when we bloom.</p>
          <NewsletterForm />
        </div>
      </div>
    </>
  );
};

export default Home;
