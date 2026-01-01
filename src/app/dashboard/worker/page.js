import { requireRole } from "@/lib/auth-utils";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins, FileText, Bell, Wallet } from "lucide-react";
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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Worker Dashboard</h1>
          <p className="text-muted-foreground">Find tasks and earn coins</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Available Coins</CardDescription>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{user.coins || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Available Tasks</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.availableTasks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Pending Submissions</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.pendingSubmissions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Earnings</CardDescription>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalEarnings}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Available Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Available Tasks</CardTitle>
                <CardDescription>Tasks you can complete</CardDescription>
              </div>
              <Link href="/dashboard/worker/tasks">
                <Button variant="outline" size="sm">View All</Button>
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
                      <TableCell>{task.reward} coins</TableCell>
                      <TableCell>{task.deadline}</TableCell>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates</CardDescription>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm">{notification.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Submissions</CardTitle>
              <CardDescription>Track your task submissions</CardDescription>
            </div>
            <Link href="/dashboard/worker/submissions">
              <Button variant="outline" size="sm">View All</Button>
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
                            ? "default"
                            : submission.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{submission.reward} coins</TableCell>
                    <TableCell>{submission.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Withdraw Section */}
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Coins</CardTitle>
            <CardDescription>Convert your coins to real money</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold">{user.coins || 0} coins</p>
                <p className="text-xs text-muted-foreground">Minimum withdrawal: 100 coins</p>
              </div>
              <Link href="/dashboard/worker/withdraw">
                <Button disabled={(user.coins || 0) < 100}>Withdraw</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}