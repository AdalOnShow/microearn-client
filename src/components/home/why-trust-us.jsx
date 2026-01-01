import { Shield, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your data is protected with industry-standard encryption.",
  },
  {
    icon: Users,
    title: "50K+ Users",
    description: "Join our growing community of earners worldwide.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our support team is always ready to help you.",
  },
  {
    icon: Award,
    title: "Trusted Since 2020",
    description: "Years of reliable service and timely payments.",
  },
];

export function WhyTrustUs() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why Trust MicroEarn</h2>
          <p className="mt-2 text-muted-foreground">
            Built on reliability and transparency
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}