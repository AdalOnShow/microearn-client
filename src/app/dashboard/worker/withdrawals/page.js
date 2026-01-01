"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Wallet, DollarSign, Coins, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function WithdrawalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawCoins, setWithdrawCoins] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("stripe");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState(null);
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);

  // Business rules
  const COINS_PER_DOLLAR = 20;
  const MIN_WITHDRAWAL_COINS = 200;
  const MIN_WITHDRAWAL_DOLLARS = MIN_WITHDRAWAL_COINS / COINS_PER_DOLLAR;

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "Worker") {
      router.push("/login");
      return;
    }

    const fetchWithdrawals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getWithdrawals({ limit: 50 });
        if (response.success) {
          setWithdrawals(response.withdrawals);
          
          // SAFETY CHECK: Check for existing pending withdrawals
          const pendingExists = response.withdrawals.some(w => w.status === "pending");
          setHasPendingWithdrawal(pendingExists);
        } else {
          throw new Error(response.message || "Failed to load withdrawals");
        }
      } catch (err) {
        console.error("Withdrawal fetch error:", err);
        setError(err.message || "Failed to load withdrawals");
        setWithdrawals([]);
        setHasPendingWithdrawal(false);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, [session, status, router]);

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

  const getStatusVariant = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "rejected":
        return "destructive";
      case "approved":
        return "secondary";
      case "pending":
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const coinsToUSD = (coins) => {
    return (coins / COINS_PER_DOLLAR).toFixed(2);
  };

  const currentCoins = session?.user?.coins || 0;
  const withdrawableUSD = coinsToUSD(currentCoins);
  const canWithdraw = currentCoins >= MIN_WITHDRAWAL_COINS && !hasPendingWithdrawal;
  
  // Calculate withdraw amount in USD from coins
  const withdrawAmountUSD = withdrawCoins ? coinsToUSD(parseInt(withdrawCoins) || 0) : "0.00";

  const handleWithdrawCoinsChange = (e) => {
    const value = e.target.value;
    
    // SAFETY CHECK: Only allow numeric input
    if (value === "" || /^\d+$/.test(value)) {
      const coins = parseInt(value) || 0;
      
      // SAFETY CHECK: Don't exceed available coins
      if (coins <= currentCoins) {
        setWithdrawCoins(value);
      } else {
        // Prevent input but show warning
        toast.error(`Cannot exceed available coins (${currentCoins})`);
      }
    } else {
      // Prevent non-numeric input
      toast.error("Please enter numbers only");
    }
  };

  const handleSubmitWithdrawal = async (e) => {
    e.preventDefault();
    
    // SAFETY CHECK: Validate all required fields
    if (!withdrawCoins || !withdrawCoins.trim()) {
      toast.error("Please enter withdrawal amount");
      return;
    }
    
    if (!accountNumber || !accountNumber.trim()) {
      toast.error("Please enter account number");
      return;
    }

    // SAFETY CHECK: Validate numeric input
    const coinsAmount = parseInt(withdrawCoins);
    if (isNaN(coinsAmount) || coinsAmount <= 0) {
      toast.error("Please enter a valid coin amount");
      return;
    }

    // SAFETY CHECK: Minimum withdrawal validation
    if (coinsAmount < MIN_WITHDRAWAL_COINS) {
      toast.error(`Minimum withdrawal is ${MIN_WITHDRAWAL_COINS} coins ($${MIN_WITHDRAWAL_DOLLARS})`);
      return;
    }

    // SAFETY CHECK: Maximum withdrawal validation
    if (coinsAmount > currentCoins) {
      toast.error(`Cannot exceed available coins (${currentCoins})`);
      return;
    }

    // SAFETY CHECK: Prevent multiple pending withdrawals
    if (hasPendingWithdrawal) {
      toast.error("You already have a pending withdrawal request. Please wait for admin approval.");
      return;
    }

    // SAFETY CHECK: Validate account number
    if (accountNumber.trim().length < 3) {
      toast.error("Account number must be at least 3 characters");
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await api.createWithdrawal({
        amount: coinsAmount,
        paymentMethod: paymentSystem,
        paymentDetails: accountNumber.trim(),
      });

      if (response.success) {
        toast.success(response.message || "Withdrawal request submitted successfully! Awaiting admin approval.");
        
        // Reset form
        setShowWithdrawForm(false);
        setWithdrawCoins("");
        setAccountNumber("");
        setPaymentSystem("stripe");
        setHasPendingWithdrawal(true);
        
        // Refresh withdrawals list
        try {
          const refreshResponse = await api.getWithdrawals({ limit: 50 });
          if (refreshResponse.success) {
            setWithdrawals(refreshResponse.withdrawals);
            const pendingExists = refreshResponse.withdrawals.some(w => w.status === "pending");
            setHasPendingWithdrawal(pendingExists);
          }
        } catch (refreshError) {
          console.error("Failed to refresh withdrawals:", refreshError);
          // Don't show error to user as main operation succeeded
        }
        
      } else {
        throw new Error(response.message || "Failed to submit withdrawal request");
      }
    } catch (err) {
      console.error("Withdrawal submission error:", err);
      
      // SAFETY CHECK: Handle specific API errors gracefully
      if (err.message.includes("pending withdrawal")) {
        setHasPendingWithdrawal(true);
        toast.error("You already have a pending withdrawal request.");
      } else if (err.message.includes("Insufficient coins")) {
        toast.error("Insufficient coins for this withdrawal amount");
      } else if (err.message.includes("Minimum withdrawal")) {
        toast.error(`Minimum withdrawal is ${MIN_WITHDRAWAL_COINS} coins`);
      } else {
        toast.error(err.message || "Failed to submit withdrawal request. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Withdrawals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Convert your coins to real money</p>
        </div>

        {/* Balance & Withdrawal Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Balance Display */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Coins className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Coins</p>
                  <p className="text-2xl font-semibold text-foreground">{currentCoins.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Withdrawable Amount</p>
                  <p className="text-2xl font-semibold text-foreground">${withdrawableUSD}</p>
                </div>
              </div>
            </div>

            {/* Conversion Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Conversion Rate:</strong> {COINS_PER_DOLLAR} coins = $1.00 USD
              </p>
            </div>

            {/* Withdrawal Action */}
            {!canWithdraw ? (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">
                    {currentCoins < MIN_WITHDRAWAL_COINS ? "Insufficient Coins" : "Pending Withdrawal"}
                  </p>
                  <p className="text-sm text-red-600">
                    {currentCoins < MIN_WITHDRAWAL_COINS 
                      ? `Minimum withdrawal is ${MIN_WITHDRAWAL_COINS} coins ($${MIN_WITHDRAWAL_DOLLARS}). You need ${MIN_WITHDRAWAL_COINS - currentCoins} more coins.`
                      : "You have a pending withdrawal request. Please wait for admin approval before submitting another request."
                    }
                  </p>
                </div>
              </div>
            ) : !showWithdrawForm ? (
              <Button onClick={() => setShowWithdrawForm(true)} className="w-full sm:w-auto">
                <Wallet className="mr-2 h-4 w-4" />
                Request Withdrawal
              </Button>
            ) : (
              <form onSubmit={handleSubmitWithdrawal} className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium text-foreground">Withdrawal Request</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="withdrawCoins">Coin to Withdraw *</Label>
                    <Input
                      id="withdrawCoins"
                      type="number"
                      min="0"
                      max={currentCoins}
                      value={withdrawCoins}
                      onChange={handleWithdrawCoinsChange}
                      placeholder={`Max: ${currentCoins.toLocaleString()}`}
                      disabled={!canWithdraw}
                      required
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Minimum: {MIN_WITHDRAWAL_COINS} coins
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="withdrawAmount">Withdraw Amount ($)</Label>
                    <Input
                      id="withdrawAmount"
                      type="text"
                      value={`$${withdrawAmountUSD}`}
                      readOnly
                      className="bg-muted text-muted-foreground"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Auto-calculated: coins ÷ 20
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="paymentSystem">Payment System *</Label>
                    <select
                      id="paymentSystem"
                      value={paymentSystem}
                      onChange={(e) => setPaymentSystem(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      disabled={!canWithdraw}
                      required
                    >
                      <option value="stripe">Stripe</option>
                      <option value="bkash">Bkash</option>
                      <option value="rocket">Rocket</option>
                      <option value="nagad">Nagad</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter your account number"
                      disabled={!canWithdraw}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={
                      submitting || 
                      !canWithdraw || 
                      !withdrawCoins || 
                      parseInt(withdrawCoins) < MIN_WITHDRAWAL_COINS ||
                      parseInt(withdrawCoins) > currentCoins ||
                      !accountNumber.trim() ||
                      hasPendingWithdrawal
                    }
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowWithdrawForm(false);
                      setWithdrawCoins("");
                      setAccountNumber("");
                      setPaymentSystem("stripe");
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent>
            {withdrawals.length === 0 ? (
              <EmptyState
                icon={Wallet}
                title="No withdrawals yet"
                description="Your withdrawal requests will appear here."
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount (Coins)</TableHead>
                      <TableHead>USD Value</TableHead>
                      <TableHead>Payment System</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal._id}>
                        <TableCell className="font-medium">
                          {withdrawal.withdrawal_coin || withdrawal.amount} coins
                        </TableCell>
                        <TableCell>
                          ${withdrawal.withdrawal_amount || coinsToUSD(withdrawal.amount)}
                        </TableCell>
                        <TableCell className="capitalize">
                          {withdrawal.payment_system || withdrawal.paymentMethod}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {withdrawal.account_number || withdrawal.paymentDetails}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(withdrawal.status)}>
                            {getStatusLabel(withdrawal.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(withdrawal.withdraw_date || withdrawal.requestedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}