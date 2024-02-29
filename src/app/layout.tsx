"use client";

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
        <link rel="icon" href="favicon.webp" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/tze8rjv.css"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
