import type { Metadata } from "next";

const BASE_URL = "https://inflatablemodel.com.cn";

export const metadata: Metadata = {
  title: "Contact inflatablemodel — Get Your Custom Inflatable Quote",
  description:
    "Contact inflatablemodel for custom inflatable manufacturing. Phone, email, live chat, or request a free quote. We respond within 24 hours.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact inflatablemodel — Get Your Custom Inflatable Quote",
    description:
      "Contact inflatablemodel for custom inflatable manufacturing. Phone, email, live chat, or request a free quote.",
    url: `${BASE_URL}/contact`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
