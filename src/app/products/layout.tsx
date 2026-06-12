import type { Metadata } from "next";
import ProductsPage from "./page";

const BASE_URL = "https://inflatablemodel.com.cn";

export const metadata: Metadata = {
  title: "Custom Inflatable Products | inflatablemodel",
  description:
    "Browse our custom inflatable manufacturing catalog — product replicas, mascots, arches, costumes, tents, and games. Free 3D renderings, 3-6 week turnaround.",
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
