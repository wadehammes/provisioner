import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Provisioner",
    short_name: "Provisioner",
    description:
      "Provisioner is a full-service digital marketing agency specializing in branding, content strategy, web development, and more for food/community-focused brands.",
    start_url: "/",
    display: "standalone",
    background_color: "#075652",
    theme_color: "#075652",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
