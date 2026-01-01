import { BasicLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <BasicLayout>
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Earn Money Online
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Complete simple tasks and earn real money. Join thousands of users already earning with MicroEarn.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Simple Tasks</CardTitle>
              <CardDescription>
                Complete surveys, watch videos, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easy tasks that anyone can complete from anywhere in the world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fast Payments</CardTitle>
              <CardDescription>
                Get paid quickly and securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Withdraw your earnings via multiple payment methods.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>
                Earn more by inviting friends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get bonus earnings when your referrals complete tasks.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </BasicLayout>
  );
}