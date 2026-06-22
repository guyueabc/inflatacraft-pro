import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable Case Studies & Gallery | inflatablemodel",
  description:
    "See our custom inflatable projects — giant can replicas, mascots, arches, costumes, tents, obstacle courses, and more for brands worldwide.",
  alternates: {
    canonical: `${BASE_URL}/gallery`,
  },
  openGraph: {
    title: "Custom Inflatable Case Studies & Gallery | inflatablemodel",
    description:
      "See our custom inflatable projects — giant can replicas, mascots, arches, costumes, tents, obstacle courses, and more for brands worldwide.",
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
