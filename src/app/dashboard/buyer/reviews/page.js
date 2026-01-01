import { requireRole } from "@/lib/auth-utils";
import { TaskToReviewContent } from "./task-to-review-content";

export default async function TaskToReviewPage() {
  await requireRole(["Buyer"]);

  return <TaskToReviewContent />;
}
