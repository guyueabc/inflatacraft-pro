import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Custom Inflatable Project Review Process | InflatableModel",
  description:
    "Learn how requirements, proposal scope, written approval, production details, and delivery arrangements are reviewed for a custom inflatable project.",
  alternates: {
    canonical: `${BASE_URL}/how-it-works`,
  },
  openGraph: {
    title: "Custom Inflatable Project Review Process | InflatableModel",
    description:
      "Learn how custom inflatable project requirements and written terms are reviewed.",
    url: `${BASE_URL}/how-it-works`,
    siteName: "inflatablemodel",
    type: "website",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
