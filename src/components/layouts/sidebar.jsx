"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListTodo,
  Wallet,
  Users,
  Settings,
  HelpCircle,
  X,
  FileText,
  Send,
  PlusCircle,
  ClipboardCheck,
  Coins,
  AlertTriangle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workerNav = [
  { href: "/dashboard/worker", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/worker/tasks", label: "Available Tasks", icon: ListTodo },
  { href: "/dashboard/worker/submissions", label: "My Submissions", icon: Send },
  { href: "/dashboard/worker/withdraw", label: "Withdraw", icon: Wallet },
  { href: "/dashboard/worker/notifications", label: "Notifications", icon: Bell },
];

const buyerNav = [
  { href: "/dashboard/buyer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/buyer/tasks/create", label: "Create Task", icon: PlusCircle },
  { href: "/dashboard/buyer/tasks", label: "My Tasks", icon: FileText },
  { href: "/dashboard/buyer/submissions", label: "Review Submissions", icon: ClipboardCheck },
  { href: "/dashboard/buyer/purchase", label: "Purchase Coins", icon: Coins },
  { href: "/dashboard/buyer/reports", label: "Report Issues", icon: AlertTriangle },
];

const adminNav = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/tasks", label: "Manage Tasks", icon: FileText },
  { href: "/dashboard/admin/withdrawals", label: "Withdrawals", icon: Wallet },
  { href: "/dashboard/admin/reports", label: "Reports", icon: AlertTriangle },
];

const commonNav = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
];

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const getNavItems = () => {
    switch (role) {
      case "Admin":
        return adminNav;
      case "Buyer":
        return buyerNav;
      default:
        return workerNav;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-background lg:static lg:z-auto",
          isOpen ? "block" : "hidden lg:block"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="text-xl font-bold">
            MicroEarn
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1 p-4">
            <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
              {role || "Worker"}
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-border p-4">
            <ul className="space-y-1">
              {commonNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}