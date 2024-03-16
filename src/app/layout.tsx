import { draftMode } from "next/headers";
import Providers from "src/app/providers";
import { ExitDraftModeLink } from "src/components/ExitDraftModeLink/ExitDraftModeLink.component";
import "src/styles/globals.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/tze8rjv.css"
        ></link>
      </head>
      <body className="gradient">
        {draftMode().isEnabled ? (
          <p>
            Draft mode is on!{" "}
            <ExitDraftModeLink style={{ textDecoration: "underline" }} />
          </p>
        ) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
