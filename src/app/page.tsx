import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ValueProps } from "@/components/home/ValueProps";
import { ProductCategories } from "@/components/home/ProductCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { QuickQuote } from "@/components/home/QuickQuote";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Custom Inflatables Manufacturer | Giant Replicas, Mascots & More | InflatableModel",
  description:
    "Custom inflatables with documented materials, safety specs, and project-ready production files. Giant replicas, mascots, arches, tents and games. Get a budgetary quote in 2 minutes.",
  alternates: {
    canonical: "https://qddjtx.com/",
  },
  openGraph: {
    title: "Custom Inflatables Manufacturer | InflatableModel",
    description:
      "Custom inflatables with documented materials, safety specs, and project-ready production files. Get a budgetary quote in 2 minutes.",
    type: "website",
    siteName: "InflatableModel",
    locale: "en_US",
    url: "https://qddjtx.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Inflatables Manufacturer | InflatableModel",
    description:
      "Custom inflatables with documented materials, safety specs, and project-ready production files. Get a budgetary quote in 2 minutes.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Value Propositions */}
      <ValueProps />

      {/* 3. Product Categories Grid */}
      <ProductCategories />

      {/* 5. How It Works Timeline */}
      <HowItWorks />

      {/* 8. Quick Quote Form */}
      <QuickQuote />

      {/* 9. Full-Width CTA Banner */}
      <CTABanner />
    </>
  );
}