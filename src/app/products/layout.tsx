import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable Products | inflatablemodel",
  description:
    "Browse custom inflatable product types — product replicas, mascots, arches, costumes, tents, and games. Final design support, specifications, production, and delivery estimates are confirmed for each project.",
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
  openGraph: {
    title: "Custom Inflatable Products | inflatablemodel",
    description:
      "Browse our custom inflatable manufacturing catalog — product replicas, mascots, arches, costumes, tents, and games.",
    url: `${BASE_URL}/products`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
