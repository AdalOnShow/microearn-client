"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, DollarSign, Clock, Loader2, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingWithdrawal, setProcessingWithdrawal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "Admin") {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch admin stats
        const statsResponse = await api.getAdminStats();
        if (statsResponse.success) {
          setStats(statsResponse.stats);
        }

        // Fetch pending withdrawals
        const withdrawalsResponse = await api.getWithdrawals({ status: "pending", limit: 20 });
        if (withdrawalsResponse.success) {
          setWithdrawals(withdrawalsResponse.withdrawals);
        }
      } catch (err) {
        setError(err.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      setProcessingWithdrawal(withdrawalId);
      
      const response = await api.processWithdrawal(withdrawalId, {
        status: "approved",
        adminNote: "Payment processed successfully"
      });

      if (response.success) {
        toast.success("Withdrawal approved and payment processed!");
        
        // Remove from pending list
        setWithdrawals(prev => prev.filter(w => w._id !== withdrawalId));
        
        // Refresh stats
        const statsResponse = await api.getAdminStats();
        if (statsResponse.success) {
          setStats(statsResponse.stats);
        }
      }
    } catch (err) {
      toast.error(err.message || "Failed to process withdrawal");
    } finally {
      setProcessingWithdrawal(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
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
                  <p className="text-sm font-medium text-muted-foreground">Total Workers</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalWorkers ?? 0}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Buyers</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalBuyers ?? 0}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Available Coins</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalCoins?.toLocaleString() ?? 0}
                  </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalPayments?.toLocaleString() ?? 0} <span className="text-lg font-normal text-muted-foreground">coins</span>
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Withdrawal Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {withdrawals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                <p className="text-sm text-muted-foreground">No pending withdrawal requests at the moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount (Coins)</TableHead>
                      <TableHead>USD Value</TableHead>
                      <TableHead>Payment System</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal._id}>
                        <TableCell className="font-medium">
                          {withdrawal.worker_name || withdrawal.user?.name || "Unknown"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {withdrawal.worker_email || withdrawal.user?.email || "Unknown"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {withdrawal.withdrawal_coin || withdrawal.amount} coins
                        </TableCell>
                        <TableCell>
                          ${withdrawal.withdrawal_amount || ((withdrawal.amount || 0) / 20).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {withdrawal.payment_system || withdrawal.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                          {withdrawal.account_number || withdrawal.paymentDetails}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(withdrawal.withdraw_date || withdrawal.requestedAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleApproveWithdrawal(withdrawal._id)}
                            disabled={processingWithdrawal === withdrawal._id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {processingWithdrawal === withdrawal._id ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Payment Success"
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Manage Users</h3>
                  <p className="text-sm text-muted-foreground">View and manage all users</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/admin/users")}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Manage Tasks</h3>
                  <p className="text-sm text-muted-foreground">View and manage all tasks</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/admin/tasks")}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">All Withdrawals</h3>
                  <p className="text-sm text-muted-foreground">View withdrawal history</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/dashboard/admin/withdrawals")}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}