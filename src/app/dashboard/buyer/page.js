import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins, FileText, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Mock data - replace with API calls
const stats = {
  activeTasks: 5,
  pendingReviews: 8,
  totalSpent: 1250,
  totalWorkers: 45,
};

const myTasks = [
  { id: 1, title: "Complete Survey", status: "active", submissions: 12, quantity: 20, reward: 5 },
  { id: 2, title: "Test Mobile App", status: "active", submissions: 5, quantity: 10, reward: 15 },
  { id: 3, title: "Write Reviews", status: "completed", submissions: 50, quantity: 50, reward: 8 },
];

const pendingSubmissions = [
  { id: 1, task: "Complete Survey", worker: "John Doe", submittedAt: "2025-12-30" },
  { id: 2, task: "Complete Survey", worker: "Jane Smith", submittedAt: "2025-12-30" },
  { id: 3, task: "Test Mobile App", worker: "Mike Johnson", submittedAt: "2025-12-29" },
];

const coinPackages = [
  { id: 1, coins: 100, price: 10 },
  { id: 2, coins: 500, price: 45 },
  { id: 3, coins: 1000, price: 80 },
];

export default async function BuyerDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "Buyer") {
    redirect("/dashboard");
  }

  const { user } = session;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and workers</p>
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
              <CardDescription>Active Tasks</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.activeTasks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Pending Reviews</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.pendingReviews}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Spent</CardDescription>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalSpent}</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Task CTA */}
        <Card>
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <h3 className="font-semibold">Create a New Task</h3>
              <p className="text-sm text-muted-foreground">Post a task and get workers to complete it</p>
            </div>
            <Link href="/dashboard/buyer/tasks/create">
              <Button>Create Task</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>Tasks you have created</CardDescription>
              </div>
              <Link href="/dashboard/buyer/tasks">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant={task.status === "active" ? "default" : "secondary"}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.submissions}/{task.quantity}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/buyer/tasks/${task.id}`}>
                          <Button size="sm" variant="outline">Manage</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Reviews</CardTitle>
                <CardDescription>Submissions awaiting your review</CardDescription>
              </div>
              <Link href="/dashboard/buyer/submissions">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Worker</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.task}</TableCell>
                      <TableCell>{submission.worker}</TableCell>
                      <TableCell>{submission.submittedAt}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/buyer/submissions/${submission.id}`}>
                          <Button size="sm">Review</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Coins */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Coins</CardTitle>
            <CardDescription>Buy coins to create tasks and pay workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {coinPackages.map((pkg) => (
                <div key={pkg.id} className="rounded-lg border border-border p-4 text-center">
                  <p className="text-2xl font-bold">{pkg.coins}</p>
                  <p className="text-sm text-muted-foreground">coins</p>
                  <p className="mt-2 text-lg font-semibold">${pkg.price}</p>
                  <Button className="mt-4 w-full" variant="outline">Purchase</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Issues */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Report Issues</CardTitle>
              <CardDescription>Report problematic workers or submissions</CardDescription>
            </div>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Having issues with a worker or submission? Let us know.
              </p>
              <Link href="/dashboard/buyer/reports/create">
                <Button variant="outline">Report Issue</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}