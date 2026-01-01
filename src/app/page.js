import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            MicroEarn Client
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A modern Next.js application with shadcn/ui components
          </p>
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg bg-card">
              <h2 className="text-xl font-semibold mb-2">Ready to Build</h2>
              <p className="text-muted-foreground mb-4">
                Your Next.js app with App Router, Tailwind CSS, and shadcn/ui is ready for development.
              </p>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
