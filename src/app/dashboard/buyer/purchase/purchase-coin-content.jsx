"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Coins, Loader2, CheckCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const COIN_PACKAGES = [
  { id: "pkg_10", coins: 10, price: 1, popular: false },
  { id: "pkg_150", coins: 150, price: 10, popular: true },
  { id: "pkg_500", coins: 500, price: 20, popular: false },
  { id: "pkg_1000", coins: 1000, price: 35, popular: false },
];

export function PurchaseCoinContent() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const userCoins = session?.user?.coins || 0;

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setConfirmModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPackage) return;

    setConfirmModalOpen(false);
    setProcessingModalOpen(true);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/payments/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          paymentMethod: "dummy",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      // Update session with new coin balance
      await updateSession({
        ...session,
        user: {
          ...session.user,
          coins: userCoins + selectedPackage.coins,
        },
      });

      // Short delay to show success state
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`Successfully purchased ${selectedPackage.coins} coins!`);
      setProcessingModalOpen(false);
      router.push("/dashboard/buyer/payments");
    } catch (err) {
      setProcessingModalOpen(false);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setSelectedPackage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Purchase Coins
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Buy coins to create tasks and pay workers
        </p>
      </div>

      {/* Current Balance */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Coins className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current Balance
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {userCoins} coins
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Coin Packages */}
      <div>
        <h2 className="mb-4 text-lg font-medium text-foreground">
          Select a Package
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COIN_PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative cursor-pointer hover:border-primary ${
                pkg.popular ? "border-primary" : ""
              }`}
              onClick={() => handlePackageClick(pkg)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  Popular
                </Badge>
              )}
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Coins className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-3xl font-semibold text-foreground">
                  {pkg.coins}
                </p>
                <p className="text-sm text-muted-foreground">coins</p>
                <div className="mt-4 w-full border-t border-border pt-4">
                  <p className="text-2xl font-semibold text-foreground">
                    ${pkg.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${(pkg.price / pkg.coins).toFixed(3)} per coin
                  </p>
                </div>
                <Button className="mt-4 w-full" variant={pkg.popular ? "default" : "outline"}>
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Secure Payment
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                All payments are processed securely. Your coins will be added to
                your account immediately after successful payment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Purchase Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase {selectedPackage?.coins} coins for $
              {selectedPackage?.price}.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Package</span>
              <span className="font-medium">{selectedPackage?.coins} coins</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="font-medium">${selectedPackage?.price}</span>
            </div>
            <div className="mt-2 border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-semibold">
                  ${selectedPackage?.price}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPurchase}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Processing Payment Modal */}
      <Dialog open={processingModalOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center py-6 text-center">
            {loading ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  Processing Payment
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while we process your payment...
                </p>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  Payment Successful!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedPackage?.coins} coins have been added to your account.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
