import { requireRole } from "@/lib/auth-utils";
import { MyTasksContent } from "./my-tasks-content";

export default async function MyTasksPage() {
  await requireRole(["Buyer"]);

  return <MyTasksContent />;
}
