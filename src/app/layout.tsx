import { draftMode } from "next/headers";
import Providers from "src/app/providers";
import { ExitDraftModeLink } from "src/components/ExitDraftModeLink/ExitDraftModeLink.component";
import { Footer } from "src/components/Footer/Footer.component";
import { Navigation } from "src/components/Navigation/Navigation";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "src/styles/globals.css";
import "src/styles/swiper.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { fetchNavigation } from "src/contentful/getNavigation";
import { envUrl } from "src/utils/helpers";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(`${envUrl()}`),
    keywords: [
      "marketing",
      "branding",
      "creative",
      "website design",
      "web development",
      "e-commerce",
      "videography",
      "photography",
      "social media",
      "seo",
    ],
    authors: [{ name: "Wade" }, { name: "Harrison" }, { name: "Jeff" }],
    creator: "Provisioner, LLC",
    publisher: "Provisioner, LLC",
  };
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();

  const navigation = await fetchNavigation({
    id: "navigation-global",
    preview: draft.isEnabled,
  });

  return (
    <html lang="en">
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap-index.xml"
        />
        <link rel="stylesheet" href="https://use.typekit.net/tze8rjv.css" />
      </head>
      <body>
        {draft.isEnabled ? (
          <div className="draftMode">
            Draft mode is enabled!{" "}
            <ExitDraftModeLink style={{ textDecoration: "underline" }} />
          </div>
        ) : null}
        <Providers>
          <div className="page">
            <Navigation navigation={navigation} />
            <main className="page-content">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID as string} />
    </html>
  );
}
