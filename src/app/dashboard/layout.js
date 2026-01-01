import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  // Server-side auth check - redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}