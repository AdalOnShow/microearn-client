import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ListChecks, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up for free in less than a minute. No credit card required.",
  },
  {
    icon: ListChecks,
    title: "Complete Tasks",
    description: "Browse available tasks and complete them at your own pace.",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    description: "Withdraw your earnings via PayPal, bank transfer, or crypto.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            Start earning in three simple steps
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
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