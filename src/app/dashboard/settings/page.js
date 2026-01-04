"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Loader2, Settings, Palette, Shield, Bell, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Account Type</p>
                <p className="text-sm text-muted-foreground">
                  Your current role in the platform
                </p>
              </div>
              <Badge variant="outline">
                {session.user?.role || "Worker"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Profile Settings</p>
                <p className="text-sm text-muted-foreground">
                  Update your profile information
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/profile")}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about important updates
                </p>
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Documentation</p>
                <p className="text-sm text-muted-foreground">
                  Learn how to use MicroEarn
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                View Docs
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Contact Support</p>
                <p className="text-sm text-muted-foreground">
                  Get help with your account
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific Settings */}
      {session.user?.role === "Admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Admin Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">User Management</p>
                <p className="text-sm text-muted-foreground">
                  Manage platform users and roles
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/admin/users")}
              >
                Manage Users
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Task Management</p>
                <p className="text-sm text-muted-foreground">
                  Oversee all platform tasks
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/admin/tasks")}
              >
                Manage Tasks
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Withdrawal Requests</p>
                <p className="text-sm text-muted-foreground">
                  Process pending withdrawals
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/admin")}
              >
                View Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}