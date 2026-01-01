import { requireRole } from "@/lib/auth-utils";
import { PaymentHistoryContent } from "./payment-history-content";

export default async function PaymentHistoryPage() {
  await requireRole(["Buyer"]);

  return <PaymentHistoryContent />;
}
