import { requireRole } from "@/lib/auth-utils";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins, FileText, Users, AlertTriangle, ArrowRight, Plus } from "lucide-react";
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
  { id: 1, coins: 100, price: 10, popular: false },
  { id: 2, coins: 500, price: 45, popular: true },
  { id: 3, coins: 1000, price: 80, popular: false },
];

export default async function BuyerDashboard() {
  const session = await requireRole(["Buyer"]);
  const { user } = session;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Buyer Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your tasks and workers</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.activeTasks}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.pendingReviews}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stats.totalSpent}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Task CTA */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Plus className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Create a New Task</h3>
                <p className="text-sm text-muted-foreground">Post a task and get workers to complete it</p>
              </div>
            </div>
            <Link href="/dashboard/buyer/tasks/create">
              <Button className="gap-2">
                Create Task
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription className="mt-1">Tasks you have created</CardDescription>
              </div>
              <Link href="/dashboard/buyer/tasks">
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
                    <TableHead>Progress</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant={task.status === "active" ? "success" : "secondary"}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{task.submissions}/{task.quantity}</TableCell>
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
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Pending Reviews</CardTitle>
                <CardDescription className="mt-1">Submissions awaiting your review</CardDescription>
              </div>
              <Link href="/dashboard/buyer/submissions">
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
                    <TableHead>Worker</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.task}</TableCell>
                      <TableCell className="text-muted-foreground">{submission.worker}</TableCell>
                      <TableCell className="text-muted-foreground">{submission.submittedAt}</TableCell>
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
          <CardHeader className="pb-4">
            <CardTitle>Purchase Coins</CardTitle>
            <CardDescription className="mt-1">Buy coins to create tasks and pay workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {coinPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative rounded-lg border p-6 text-center ${pkg.popular ? 'border-primary bg-primary/5' : 'border-border'}`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Popular</Badge>
                  )}
                  <p className="text-3xl font-semibold text-foreground">{pkg.coins}</p>
                  <p className="mt-1 text-sm text-muted-foreground">coins</p>
                  <p className="mt-4 text-xl font-semibold text-foreground">${pkg.price}</p>
                  <Button className="mt-4 w-full" variant={pkg.popular ? "default" : "outline"}>
                    Purchase
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Issues */}
        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Report Issues</h3>
                <p className="text-sm text-muted-foreground">Having issues with a worker or submission? Let us know.</p>
              </div>
            </div>
            <Link href="/dashboard/buyer/reports/create">
              <Button variant="outline">Report Issue</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
