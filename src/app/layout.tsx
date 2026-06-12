import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Analytics } from "@/components/layout/Analytics";
import { OrganizationSchema, WebSiteSchema } from "@/components/layout/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const BASE_URL = "https://inflatablemodel.com.cn";

export const metadata: Metadata = {
  title: "inflatablemodel — Custom Inflatable Manufacturing | B2B Giant Inflatables",
  description:
    "B2B custom inflatable manufacturer: giant product replicas, mascots, arches, costumes, tents & games. 3-6 week turnaround, free 3D renderings, worldwide shipping.",
  keywords: [
    "custom inflatable",
    "inflatable manufacturing",
    "giant product replica",
    "inflatable mascot",
    "inflatable arch",
    "inflatable tent",
    "inflatable costume",
    "inflatable games",
    "advertising inflatables",
    "B2B inflatable manufacturer",
  ],
  robots: "index, follow",
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION",
    yandex: "YOUR_YANDEX_VERIFICATION",
    yahoo: "YOUR_BING_VERIFICATION",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "inflatablemodel — Custom Inflatable Manufacturing | B2B Giant Inflatables",
    description:
      "B2B custom inflatable manufacturer: giant product replicas, mascots, arches, costumes, tents & games. 3-6 week turnaround, free 3D renderings.",
    url: BASE_URL,
    siteName: "inflatablemodel",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "inflatablemodel — Custom Inflatable Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "inflatablemodel — Custom Inflatable Manufacturing | B2B Giant Inflatables",
    description:
      "B2B custom inflatable manufacturer: giant product replicas, mascots, arches, costumes, tents & games. 3-6 week turnaround.",
    images: [`${BASE_URL}/images/og-default.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="flex min-h-full flex-col bg-white text-gray-800">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
