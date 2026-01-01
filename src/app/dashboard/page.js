import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your overview.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Earnings</CardDescription>
              <CardTitle className="text-2xl">$124.50</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tasks Completed</CardDescription>
              <CardTitle className="text-2xl">48</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+8 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Balance</CardDescription>
              <CardTitle className="text-2xl">$18.25</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Available in 3 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Referrals</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Your latest completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Survey: Product Feedback", amount: "$2.50", status: "Completed" },
                  { name: "Watch Video Ad", amount: "$0.25", status: "Completed" },
                  { name: "App Testing", amount: "$5.00", status: "Pending" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.amount}</p>
                    </div>
                    <Badge variant={task.status === "Completed" ? "secondary" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Tasks</CardTitle>
              <CardDescription>Tasks you can complete now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Daily Check-in", amount: "$0.10", time: "1 min" },
                  { name: "Survey: Shopping Habits", amount: "$3.00", time: "10 min" },
                  { name: "Review Website", amount: "$1.50", time: "5 min" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                    <span className="text-sm font-medium">{task.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}