import { requireRole } from "@/lib/auth-utils";
import { PurchaseCoinContent } from "./purchase-coin-content";

export default async function PurchaseCoinPage() {
  await requireRole(["Buyer"]);

  return <PurchaseCoinContent />;
}
