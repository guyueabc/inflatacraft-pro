import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable Visual References | InflatableModel",
  description:
    "Browse visual references for custom inflatable product forms and possible customization directions. Images are not presented as verified customer case studies or endorsements.",
  alternates: {
    canonical: `${BASE_URL}/gallery`,
  },
  openGraph: {
    title: "Custom Inflatable Visual References | InflatableModel",
    description:
      "Browse visual references for custom inflatable product forms and possible customization directions.",
    url: `${BASE_URL}/gallery`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
