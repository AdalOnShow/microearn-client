import { CreditCard, Lock, RefreshCw } from "lucide-react";

const paymentFeatures = [
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "PayPal, bank transfer, cryptocurrency, and more options available.",
  },
  {
    icon: Lock,
    title: "Encrypted Transactions",
    description: "All payments are processed through secure, encrypted channels.",
  },
  {
    icon: RefreshCw,
    title: "Fast Processing",
    description: "Most withdrawals are processed within 24-48 hours.",
  },
];

const paymentMethods = ["PayPal", "Visa", "Mastercard", "Bitcoin", "Bank", "Stripe"];

export function SecurePayments() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Secure Payments
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Your earnings are safe with us. We use industry-leading security measures to protect every transaction.
            </p>

            <div className="mt-10 space-y-6">
              {paymentFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex h-16 w-20 items-center justify-center rounded-lg border border-border bg-background text-xs font-medium text-muted-foreground sm:h-20 sm:w-24 sm:text-sm"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
