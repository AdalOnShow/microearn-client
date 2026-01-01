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
      {/* Hero Section - Client Component */}
      <section className="border-b border-border">
        <HeroSlider />
      </section>

      {/* Best Workers - Server Component */}
      <BestWorkers />

      {/* How It Works - Server Component */}
      <HowItWorks />

      {/* Why Trust Us - Server Component */}
      <WhyTrustUs />

      {/* Testimonials - Client Component */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
            <p className="mt-2 text-muted-foreground">
              Real feedback from real earners
            </p>
          </div>
          <div className="mt-10">
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      {/* Secure Payments - Server Component */}
      <SecurePayments />
    </BasicLayout>
  );
}