import { requireRole } from "@/lib/auth-utils";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, AlertTriangle, Coins, Wallet } from "lucide-react";
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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Platform Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Users</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{platformStats.totalUsers}</p>
              <p className="text-xs text-muted-foreground">
                {platformStats.totalWorkers} workers, {platformStats.totalBuyers} buyers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Tasks</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{platformStats.totalTasks}</p>
              <p className="text-xs text-muted-foreground">{platformStats.activeTasks} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Coins</CardDescription>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{platformStats.totalCoins.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">In circulation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Pending Actions</CardDescription>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {platformStats.pendingWithdrawals + platformStats.pendingReports}
              </p>
              <p className="text-xs text-muted-foreground">
                {platformStats.pendingWithdrawals} withdrawals, {platformStats.pendingReports} reports
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Manage Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>Recent users and role management</CardDescription>
            </div>
            <Link href="/dashboard/admin/users">
              <Button variant="outline" size="sm">View All Users</Button>
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
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Buyer" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.coins}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Reports</CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </div>
              <Link href="/dashboard/admin/reports">
                <Button variant="outline" size="sm">View All</Button>
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
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{report.reason}</TableCell>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Withdrawals</CardTitle>
                <CardDescription>Withdrawal requests to process</CardDescription>
              </div>
              <Link href="/dashboard/admin/withdrawals">
                <Button variant="outline" size="sm">View All</Button>
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
                      <TableCell>{withdrawal.amount} coins</TableCell>
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
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/dashboard/admin/tasks">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Tasks
                </Button>
              </Link>
              <Link href="/dashboard/admin/withdrawals">
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  Process Withdrawals
                </Button>
              </Link>
              <Link href="/dashboard/admin/reports">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Handle Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}