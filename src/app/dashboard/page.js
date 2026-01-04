import { requireAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await requireAuth();
  const { role } = session.user;

  // Redirect based on role
  if (role === "Admin") {
    redirect("/dashboard/admin");
  } else if (role === "Buyer") {
    redirect("/dashboard/buyer");
  } else {
    redirect("/dashboard/worker");
  }
}