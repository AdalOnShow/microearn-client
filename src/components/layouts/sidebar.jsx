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
  X,
  FileText,
  Send,
  PlusCircle,
  ClipboardCheck,
  Coins,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workerNav = [
  { href: "/dashboard/worker", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/worker/tasks", label: "Task List", icon: ListTodo },
  { href: "/dashboard/worker/submissions", label: "My Submissions", icon: Send },
  { href: "/dashboard/worker/withdrawals", label: "Withdrawals", icon: Wallet },
];

const buyerNav = [
  { href: "/dashboard/buyer", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/buyer/tasks/new", label: "Add New Task", icon: PlusCircle },
  { href: "/dashboard/buyer/tasks", label: "My Tasks", icon: FileText },
  { href: "/dashboard/buyer/reviews", label: "Task To Review", icon: ClipboardCheck },
  { href: "/dashboard/buyer/purchase", label: "Purchase Coin", icon: Coins },
  { href: "/dashboard/buyer/payments", label: "Payment History", icon: History },
];

const adminNav = [
  { href: "/dashboard/admin", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/tasks", label: "Manage Tasks", icon: FileText },
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
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-card lg:static lg:z-auto",
          isOpen ? "block" : "hidden lg:block"
        )}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">MicroEarn</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden h-16 items-center border-b border-border px-4 lg:flex">
          <p className="text-sm font-semibold text-foreground">Navigation</p>
        </div>

        <nav className="flex flex-col h-[calc(100%-4rem)] p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {role || "Worker"} Menu
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
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
