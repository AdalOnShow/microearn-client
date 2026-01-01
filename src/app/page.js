import { BasicLayout } from "@/components/layouts";
import { HeroSlider } from "@/components/home/hero-slider";
import { BestWorkers } from "@/components/home/best-workers";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyTrustUs } from "@/components/home/why-trust-us";
import { SecurePayments } from "@/components/home/secure-payments";

export default function Home() {
  return (
    <BasicLayout>
      {/* Hero Section */}
      <section className="border-b border-border bg-muted/20">
        <HeroSlider />
      </section>

      {/* Best Workers */}
      <BestWorkers />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Trust Us */}
      <WhyTrustUs />

      {/* Testimonials */}
      <section className="border-y border-border py-16 sm:py-20 lg:py-24">
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

      {/* Secure Payments */}
      <SecurePayments />
    </BasicLayout>
  );
}
