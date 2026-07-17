import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Request a Custom Inflatable Quote | InflatableModel",
  description:
    "Share your custom inflatable requirements for project review. Quotation timing and available design support vary by project.",
  alternates: {
    canonical: `${BASE_URL}/get-quote`,
  },
  openGraph: {
    title: "Request a Custom Inflatable Quote | InflatableModel",
    description:
      "Share your custom inflatable requirements for project review.",
    url: `${BASE_URL}/get-quote`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
