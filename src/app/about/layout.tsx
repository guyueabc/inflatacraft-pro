import type { Metadata } from "next";

const BASE_URL = "https://inflatablemodel.com.cn";

export const metadata: Metadata = {
  title: "About inflatablemodel — Leading Custom Inflatable Manufacturer",
  description:
    "Learn about inflatablemodel — a B2B custom inflatable manufacturer with 20+ years of experience, 5,000+ projects completed, and 200+ brand partners worldwide.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About inflatablemodel — Leading Custom Inflatable Manufacturer",
    description:
      "Learn about inflatablemodel — a B2B custom inflatable manufacturer with 20+ years of experience and 5,000+ projects completed.",
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
