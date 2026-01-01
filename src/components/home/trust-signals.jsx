import { Card, CardContent } from "@/components/ui/card";
import { Shield, BadgeCheck, Wallet, Eye } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-level encryption protects every transaction. Your earnings are always safe.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Workers",
    description: "All task creators are verified. Work with confidence on legitimate opportunities.",
  },
  {
    icon: Wallet,
    title: "Easy Withdrawals",
    description: "Cash out anytime via PayPal, bank transfer, or crypto. No minimum threshold.",
  },
  {
    icon: Eye,
    title: "Transparent System",
    description: "Clear task requirements, fair pricing, and real-time earnings tracking.",
  },
];

export function TrustSignals() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Why Choose MicroEarn
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Built for trust, designed for simplicity
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="group border-border bg-background transition-shadow duration-200 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
