import { HeroSection } from "../components/heroSection";
import { FeaturesSection } from "../components/featuresSection";
import { PricingSection } from "../components/pricingSection";
import { DashboardShowcase } from "@/components/howItWorks";
import { useRef } from "react";

export default function Home() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleScrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="w-full">
      <HeroSection />

      {/* The `id` attributes below correspond to the `href` in the navbar */}
      <section id="how-it-works" ref={showcaseRef}>
        <DashboardShowcase />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>
    </div>
  );
}