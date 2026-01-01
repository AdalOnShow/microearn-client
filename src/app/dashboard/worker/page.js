import { requireRole } from "@/lib/auth-utils";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins, FileText, Bell, Wallet, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

// Mock data - replace with API calls
const stats = {
  availableTasks: 24,
  completedTasks: 12,
  pendingSubmissions: 3,
  totalEarnings: 450,
};

const availableTasks = [
  { id: 1, title: "Complete Survey", category: "Survey", reward: 5, deadline: "2026-01-15" },
  { id: 2, title: "Test Mobile App", category: "Testing", reward: 15, deadline: "2026-01-20" },
  { id: 3, title: "Write Product Review", category: "Writing", reward: 8, deadline: "2026-01-18" },
  { id: 4, title: "Data Entry Task", category: "Data Entry", reward: 10, deadline: "2026-01-22" },
];

const mySubmissions = [
  { id: 1, task: "Website Feedback", status: "approved", reward: 10, date: "2025-12-28" },
  { id: 2, task: "App Testing", status: "pending", reward: 15, date: "2025-12-30" },
  { id: 3, task: "Survey Completion", status: "rejected", reward: 0, date: "2025-12-25" },
];

const notifications = [
  { id: 1, message: "Your submission for 'Website Feedback' was approved", time: "2 hours ago" },
  { id: 2, message: "New task available: Complete Survey", time: "5 hours ago" },
  { id: 3, message: "Withdrawal of 100 coins completed", time: "1 day ago" },
];

export default async function WorkerDashboard() {
  const session = await requireRole(["Worker"]);
  const { user } = session;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Worker Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Find tasks and earn coins</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Coins</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{user.coins || 0}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Tasks</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.availableTasks}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Submissions</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.pendingSubmissions}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.totalEarnings}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Available Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Available Tasks</CardTitle>
                <CardDescription className="mt-1">Tasks you can complete</CardDescription>
              </div>
              <Link href="/dashboard/worker/tasks">
                <Button variant="outline" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{task.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{task.reward} coins</TableCell>
                      <TableCell className="text-muted-foreground">{task.deadline}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/worker/tasks/${task.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription className="mt-1">Recent updates</CardDescription>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>My Submissions</CardTitle>
              <CardDescription className="mt-1">Track your task submissions</CardDescription>
            </div>
            <Link href="/dashboard/worker/submissions">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mySubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.task}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          submission.status === "approved"
                            ? "success"
                            : submission.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{submission.reward} coins</TableCell>
                    <TableCell className="text-muted-foreground">{submission.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Withdraw Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Withdraw Coins</h3>
                  <p className="text-sm text-muted-foreground">Convert your coins to real money</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-semibold text-foreground">{user.coins || 0} coins</p>
                  <p className="text-xs text-muted-foreground">Minimum withdrawal: 100 coins</p>
                </div>
                <Link href="/dashboard/worker/withdraw">
                  <Button disabled={(user.coins || 0) < 100}>Withdraw</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
