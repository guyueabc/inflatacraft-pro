import type { Metadata } from "next";

const BASE_URL = "https://inflatablemodel.com.cn";

export const metadata: Metadata = {
  title: "Inflatable Industry Insights & Tips | inflatablemodel Blog",
  description:
    "Expert insights on inflatable marketing, design tips, industry trends, and case studies from the world of giant brand activations. Read the inflatablemodel blog.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Inflatable Industry Insights & Tips | inflatablemodel Blog",
    description:
      "Expert insights on inflatable marketing, design tips, industry trends, and case studies from the world of giant brand activations.",
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
