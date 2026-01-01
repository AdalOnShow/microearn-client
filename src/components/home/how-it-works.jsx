import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, ListChecks, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Account",
    description: "Sign up for free in less than a minute. No credit card required.",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Complete Tasks",
    description: "Browse available tasks and complete them at your own pace.",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Get Paid",
    description: "Withdraw your earnings via PayPal, bank transfer, or crypto.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Start earning in three simple steps
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="absolute right-4 top-4 text-4xl font-bold text-muted/50">
                    {step.step}
                  </div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
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
