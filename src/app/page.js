import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">MicroEarn</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Your application is ready for development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Get Started</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
            <CardDescription>
              shadcn/ui components are installed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">View Components</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Learn more about the stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary">Read Docs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}