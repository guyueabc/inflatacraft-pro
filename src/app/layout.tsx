import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Analytics } from "@/components/layout/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const BASE_URL = "https://www.qddjtx.com";

export const metadata: Metadata = {
  title: "inflatablemodel — Custom Inflatable Manufacturing",
  description:
    "Giant product replicas, mascots, arches, costumes, and tents. 3-6 week turnaround. Made in USA. Free 3D renderings. Scale your brand 100x.",
  keywords: [
    "custom inflatables",
    "inflatable manufacturing",
    "giant product replicas",
    "inflatable mascots",
    "inflatable arches",
    "advertising inflatables",
  ],
  metadataBase: new URL(BASE_URL),
  canonical: "/",
  verification: {
    google: "nWwctyDyo8qM_SM4TeYi9O28l5YC0hnS05h4WMig_pU",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({"@context": "https://schema.org", "@type": "Organization", "name": "InflatableModel", "url": "https://www.qddjtx.com", "description": "Custom inflatable manufacturing - giant product replicas, mascots, arches, costumes, and tents. Made in USA.", "email": "inflatablemodel@showlovein.com", "telephone": "+8615376427736", "areaServed": "Worldwide", "knowsAbout": ["Custom Inflatables", "Giant Product Replicas", "Inflatable Mascots", "Inflatable Arches", "Inflatable Costumes", "Inflatable Tents", "Inflatable Games"]})
          }}
        />
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
