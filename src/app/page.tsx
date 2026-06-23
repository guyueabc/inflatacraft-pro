import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ValueProps } from "@/components/home/ValueProps";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedCases } from "@/components/home/FeaturedCases";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { QuickQuote } from "@/components/home/QuickQuote";
import { CTABanner } from "@/components/home/CTABanner";
import { StatsSection } from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Custom Inflatables Manufacturer | Giant Replicas, Mascots & More | InflatableModel",
  description:
    "USA-made custom inflatables for advertising and events. Giant product replicas, mascots, arches, costumes, tents and games. 3-6 week turnaround. Free 3D renderings. Get a quote today.",
  canonical: "https://www.qddjtx.com/",
  openGraph: {
    title: "Custom Inflatables Manufacturer | InflatableModel",
    description:
      "USA-made custom inflatables for advertising and events. Free 3D renderings. Get a quote today.",
    type: "website",
    siteName: "InflatableModel",
    locale: "en_US",
    url: "https://www.qddjtx.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Inflatables Manufacturer | InflatableModel",
    description:
      "USA-made custom inflatables. Free 3D renderings. Get a quote today.",
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

      {/* 4. Client Logo Wall */}
      <ClientLogos />

      {/* 5. How It Works Timeline */}
      <HowItWorks />

      {/* 6. Featured Case Studies */}
      <FeaturedCases />

      {/* 7. Testimonials Carousel */}
      <Testimonials />

      {/* 8. Quick Quote Form */}
      <QuickQuote />

      {/* 9. Full-Width CTA Banner */}
      <CTABanner />

      {/* 10. Stats / By the Numbers */}
      <StatsSection />
    </>
  );
}