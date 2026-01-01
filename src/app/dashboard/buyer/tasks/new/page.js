import { requireRole } from "@/lib/auth-utils";
import { AddNewTaskContent } from "./add-new-task-content";

export default async function AddNewTaskPage() {
  await requireRole(["Buyer"]);

  return <AddNewTaskContent />;
}
