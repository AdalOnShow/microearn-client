import { requireRole } from "@/lib/auth-utils";
import { BuyerDashboardContent } from "./buyer-dashboard-content";

export default async function BuyerDashboard() {
  await requireRole(["Buyer"]);

  return <BuyerDashboardContent />;
}
