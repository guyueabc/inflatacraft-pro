import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "How Custom Inflatables Are Made — Process & Timeline | inflatablemodel",
  description:
    "Learn how custom inflatables are made: consultation, 3D design, approval, production, and delivery. Our proven 5-step process delivers quality in 3-6 weeks.",
  alternates: {
    canonical: `${BASE_URL}/how-it-works`,
  },
  openGraph: {
    title: "How Custom Inflatables Are Made — Process & Timeline | inflatablemodel",
    description:
      "Learn how custom inflatables are made: consultation, 3D design, approval, production, and delivery. Our proven 5-step process.",
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
