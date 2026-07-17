import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Contact inflatablemodel — Get Your Custom Inflatable Quote",
  description:
    "Contact inflatablemodel through WhatsApp or the online quote form for custom inflatable inquiries.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact inflatablemodel — Get Your Custom Inflatable Quote",
    description:
      "Contact inflatablemodel through WhatsApp or the online quote form for custom inflatable inquiries.",
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
