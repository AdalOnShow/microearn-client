import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layouts";

export default async function DashboardRootLayout({ children }) {
  const session = await auth();

  // Server-side auth check - redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
