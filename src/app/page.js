import { BasicLayout } from "@/components/layouts";
import { HeroSection } from "@/components/home/hero-section";
import { TrustSignals } from "@/components/home/trust-signals";
import { HowItWorks } from "@/components/home/how-it-works";
import { BestWorkers } from "@/components/home/best-workers";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <BasicLayout>
      {/* Hero Section - Clear value proposition with CTAs */}
      <HeroSection />

      {/* Trust Signals - Key benefits */}
      <TrustSignals />

      {/* How It Works - 3-step process */}
      <HowItWorks />

      {/* Best Workers - Top earners showcase */}
      <BestWorkers />

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What Our Users Say
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Real feedback from real earners
            </p>
          </div>
          <div className="mt-12">
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </BasicLayout>
  );
}
