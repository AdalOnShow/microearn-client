"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, Coins } from "lucide-react";
import { api } from "@/lib/api";

export function BuyerDashboardContent() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.getBuyerStats();
        if (response.success) {
          setStats(response.stats);
        } else {
          throw new Error(response.message || "Failed to fetch stats");
        }
      } catch (err) {
        console.error("Buyer stats error:", err);
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Buyer Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Buyer"}
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-8 w-16 rounded bg-muted" />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-sm text-muted-foreground">
              Failed to load stats: {error}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Tasks */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tasks
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalTasks ?? 0}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Tasks
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.pendingTasks ?? 0}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Payment Paid */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Payment Paid
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {stats?.totalPaymentPaid ?? 0}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && stats?.totalTasks === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No tasks yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first task to get started with MicroEarn.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
