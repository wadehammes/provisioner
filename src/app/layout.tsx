import classNames from "classnames";
import { draftMode, headers } from "next/headers";
import Providers from "src/app/providers";
import { ExitDraftModeLink } from "src/components/ExitDraftModeLink/ExitDraftModeLink.component";
import { Navigation } from "src/components/Navigation/Navigation";
import "src/styles/globals.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const activePath = headersList.get("x-pathname");

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
      <body className={classNames({ gradient: activePath === "/" })}>
        {draftMode().isEnabled ? (
          <p>
            Draft mode is on!{" "}
            <ExitDraftModeLink style={{ textDecoration: "underline" }} />
          </p>
        ) : null}
        <Providers>
          {activePath !== "/" ? <Navigation /> : null}
          {children}
        </Providers>
      </body>
    </html>
  );
}
