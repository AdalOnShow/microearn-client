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
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Why Trust MicroEarn
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Built on reliability and transparency
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
