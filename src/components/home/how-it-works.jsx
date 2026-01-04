import { UserPlus, ListChecks, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Create your free account in under a minute. No credit card or commitment required.",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Complete Tasks",
    description: "Browse available tasks and complete them at your own pace. Work when you want.",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Earn Rewards",
    description: "Get paid instantly via PayPal, bank transfer, or cryptocurrency. It's that simple.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Start earning in three simple steps
          </p>
        </div>

        {/* Desktop: Horizontal layout with connecting line */}
        <div className="mt-16 hidden sm:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-border" />
            
            <div className="relative grid grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    {/* Step circle */}
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <Icon className="h-7 w-7 text-primary" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="mt-6 text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="mt-12 space-y-8 sm:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
