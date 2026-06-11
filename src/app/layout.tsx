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

export const metadata: Metadata = {
  title: "InflataCraft Pro — Custom Inflatable Manufacturing",
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
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION",
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
