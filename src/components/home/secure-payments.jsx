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

export function SecurePayments() {
  return (
    <section className="border-t border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Secure Payments</h2>
            <p className="mt-2 text-muted-foreground">
              Your earnings are safe with us. We use industry-leading security measures to protect every transaction.
            </p>

            <div className="mt-8 space-y-6">
              {paymentFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4">
              {["PayPal", "Visa", "Mastercard", "Bitcoin", "Bank", "Stripe"].map((method) => (
                <div
                  key={method}
                  className="flex h-16 w-20 items-center justify-center rounded-lg border border-border bg-background text-xs font-medium text-muted-foreground"
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