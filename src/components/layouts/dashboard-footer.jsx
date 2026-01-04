"use client";

export function DashboardFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-4 lg:px-6">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MicroEarn. All rights reserved.
      </p>
    </footer>
  );
}
