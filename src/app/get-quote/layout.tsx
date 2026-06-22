import type { Metadata } from "next";

const BASE_URL = "https://qddjtx.com";

export const metadata: Metadata = {
  title: "Request a Free Custom Inflatable Quote | inflatablemodel",
  description:
    "Get a free custom inflatable quote in 24 hours. Share your project details and receive a detailed quote with free 3D renderings. No obligation.",
  alternates: {
    canonical: `${BASE_URL}/get-quote`,
  },
  openGraph: {
    title: "Request a Free Custom Inflatable Quote | inflatablemodel",
    description:
      "Get a free custom inflatable quote in 24 hours. Share your project details and receive a detailed quote with free 3D renderings.",
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
