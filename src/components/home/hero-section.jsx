import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 50,000+ earners worldwide</span>
          </div>

          {/* Main headline */}
          <h1 className="animate-slide-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turn Your Spare Time Into
            <span className="block mt-2">Real Earnings</span>
          </h1>

          {/* Supporting description */}
          <p className="animate-slide-up-delay-1 mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Complete simple micro-tasks, surveys, and reviews. Get paid instantly. 
            No experience needed — start earning from anywhere in the world.
          </p>

          {/* CTA buttons */}
          <div className="animate-slide-up-delay-2 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full gap-2 px-8 sm:w-auto">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/tasks">
              <Button variant="outline" size="lg" className="w-full px-8 sm:w-auto">
                Browse Tasks
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-slide-up-delay-3 mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Instant withdrawals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
