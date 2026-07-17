import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable Planning & Care Guides | InflatableModel Blog",
  description:
    "General educational guides for custom inflatable project planning, design review, inspection, cleaning, and storage.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Custom Inflatable Planning & Care Guides | InflatableModel Blog",
    description:
      "General educational guides for custom inflatable project planning and product care.",
    url: `${BASE_URL}/blog`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
