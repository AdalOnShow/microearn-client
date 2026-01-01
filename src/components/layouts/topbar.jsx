"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Bell, LogOut, User, Settings, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Topbar({ onMenuClick }) {
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      {/* Left: Menu button (mobile) + Logo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">M</span>
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:block">
            MicroEarn
          </span>
        </Link>
      </div>

      {/* Right: Coins, User Info, Notification */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        {/* Available Coins */}
        <Badge variant="secondary" className="gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5">
          <Coins className="h-3.5 w-3.5" />
          <span className="font-semibold">{user?.coins || 0}</span>
        </Badge>

        {/* User Info with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="bg-muted text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left sm:flex">
                <span className="text-sm font-medium leading-tight">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.role || "Worker"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                <Badge variant="outline" className="mt-2 w-fit text-xs">
                  {user?.role || "Worker"}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive cursor-pointer focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification Icon (UI only) */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
      </div>
    </header>
  );
}
