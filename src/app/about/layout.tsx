import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "About InflatableModel | Custom Inflatable Project Support",
  description:
    "Learn about InflatableModel's approach to custom inflatable project planning, design coordination, and product information.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About InflatableModel | Custom Inflatable Project Support",
    description:
      "Learn about InflatableModel's approach to custom inflatable projects.",
    url: `${BASE_URL}/about`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
