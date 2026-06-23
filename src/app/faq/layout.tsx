import type { Metadata } from "next";

const BASE_URL = "https://www.qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable FAQ — Everything You Need to Know | inflatablemodel",
  description:
    "Find answers to common questions about custom inflatable products, ordering, design, production, shipping, and maintenance. Can't find what you need? Contact us.",
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
  openGraph: {
    title: "Custom Inflatable FAQ — Everything You Need to Know | inflatablemodel",
    description:
      "Find answers to common questions about custom inflatable products, ordering, design, production, shipping, and maintenance.",
    url: `${BASE_URL}/faq`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
