import { requireRole } from "@/lib/auth-utils";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, AlertTriangle, Coins, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - replace with API calls
const platformStats = {
  totalUsers: 1250,
  totalWorkers: 980,
  totalBuyers: 270,
  totalTasks: 456,
  activeTasks: 89,
  totalCoins: 125000,
  pendingWithdrawals: 12,
  pendingReports: 5,
};

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Worker", coins: 150, createdAt: "2025-12-30" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Buyer", coins: 500, createdAt: "2025-12-29" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Worker", coins: 75, createdAt: "2025-12-28" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Buyer", coins: 1200, createdAt: "2025-12-27" },
];

const pendingReports = [
  { id: 1, type: "user", reporter: "John Doe", reason: "Spam submissions", createdAt: "2025-12-30" },
  { id: 2, type: "task", reporter: "Jane Smith", reason: "Misleading description", createdAt: "2025-12-29" },
  { id: 3, type: "submission", reporter: "Mike Johnson", reason: "Low quality work", createdAt: "2025-12-28" },
];

const pendingWithdrawals = [
  { id: 1, user: "Alex Brown", amount: 500, method: "PayPal", requestedAt: "2025-12-30" },
  { id: 2, user: "Emily Davis", amount: 250, method: "Bank", requestedAt: "2025-12-29" },
  { id: 3, user: "Chris Lee", amount: 1000, method: "Crypto", requestedAt: "2025-12-28" },
];

export default async function AdminDashboard() {
  await requireRole(["Admin"]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Platform Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{platformStats.totalUsers}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {platformStats.totalWorkers} workers, {platformStats.totalBuyers} buyers
                  </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{platformStats.totalTasks}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{platformStats.activeTasks} active</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Coins</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{platformStats.totalCoins.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">In circulation</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Actions</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {platformStats.pendingWithdrawals + platformStats.pendingReports}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {platformStats.pendingWithdrawals} withdrawals, {platformStats.pendingReports} reports
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manage Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription className="mt-1">Recent users and role management</CardDescription>
            </div>
            <Link href="/dashboard/admin/users">
              <Button variant="outline" size="sm" className="gap-1">
                View All Users
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Coins</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Buyer" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.coins}</TableCell>
                    <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/admin/users/${user.id}`}>
                        <Button size="sm" variant="outline">Manage</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Pending Reports</CardTitle>
                <CardDescription className="mt-1">Issues requiring attention</CardDescription>
              </div>
              <Link href="/dashboard/admin/reports">
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
                    <TableHead>Type</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.reporter}</TableCell>
                      <TableCell className="max-w-[150px] truncate text-muted-foreground">{report.reason}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/admin/reports/${report.id}`}>
                          <Button size="sm">Review</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pending Withdrawals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Pending Withdrawals</CardTitle>
                <CardDescription className="mt-1">Withdrawal requests to process</CardDescription>
              </div>
              <Link href="/dashboard/admin/withdrawals">
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
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-medium">{withdrawal.user}</TableCell>
                      <TableCell className="font-medium">{withdrawal.amount} coins</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{withdrawal.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/admin/withdrawals/${withdrawal.id}`}>
                          <Button size="sm">Process</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription className="mt-1">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard/admin/users">
                <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-xs text-muted-foreground">View and edit users</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/admin/tasks">
                <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Manage Tasks</p>
                    <p className="text-xs text-muted-foreground">Review all tasks</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/admin/withdrawals">
                <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Withdrawals</p>
                    <p className="text-xs text-muted-foreground">Process requests</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/admin/reports">
                <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Handle Reports</p>
                    <p className="text-xs text-muted-foreground">Review issues</p>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
