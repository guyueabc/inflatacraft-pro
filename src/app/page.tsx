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
