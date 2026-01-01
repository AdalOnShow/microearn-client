import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-primary py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
            Ready to Start Earning?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
            Join thousands of people already earning with MicroEarn. 
            Sign up today and complete your first task in minutes.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 px-8"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/60">
            No credit card required • Start earning immediately
          </p>
        </div>
      </div>
    </section>
  );
}
