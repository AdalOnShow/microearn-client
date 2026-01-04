"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ManageUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "Admin") {
      router.push("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.getUsers();
        if (response.success) {
          setUsers(response.users);
        }
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, status, router]);

  const handleRoleChange = async (userId, newRole, currentRole, userName) => {
    if (userId === session.user.id) {
      toast.error("Cannot change your own role");
      return;
    }

    // Confirm role change
    if (!confirm(`Are you sure you want to change ${userName}'s role from ${currentRole} to ${newRole}?`)) {
      return;
    }

    try {
      setUpdatingUser(userId);
      
      const response = await api.updateUserRole(userId, newRole);
      if (response.success) {
        toast.success("User role updated successfully");
        
        // Update local state
        setUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
      }
    } catch (err) {
      toast.error(err.message || "Failed to update user role");
      
      // Reset dropdown to original value on error
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, role: currentRole } : user
      ));
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (userId === session.user.id) {
      toast.error("Cannot delete your own account");
      return;
    }

    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingUser(userId);
      
      const response = await api.deleteUser(userId);
      if (response.success) {
        toast.success("User deleted successfully");
        
        // Remove from local state
        setUsers(prev => prev.filter(user => user._id !== userId));
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setDeletingUser(null);
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "Buyer":
        return "default";
      case "Worker":
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Manage Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and manage all platform users</p>
      </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Coins</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name || "Unknown"}</p>
                            {user._id === session.user.id && (
                              <p className="text-xs text-muted-foreground">(You)</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value, user.role, user.name)}
                          disabled={updatingUser === user._id || user._id === session.user.id}
                          className="px-2 py-1 border border-border rounded bg-background text-foreground text-sm"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Worker">Worker</option>
                        </select>
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.coin?.toLocaleString() || 0} coins
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user._id === session.user.id ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertTriangle className="h-3 w-3" />
                              Cannot modify own account
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              disabled={deletingUser === user._id}
                            >
                              {deletingUser === user._id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Trash2 className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}