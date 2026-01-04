"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Trash2, Calendar, Coins, Users } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ManageTasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTask, setDeletingTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "Admin") {
      router.push("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.getTasks({ limit: 100 });
        if (response.success) {
          setTasks(response.tasks);
        }
      } catch (err) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [session, status, router]);

  const handleDeleteTask = async (taskId, taskTitle) => {
    if (!confirm(`Are you sure you want to delete task "${taskTitle}"?\n\nThis will:\n- Delete the task permanently\n- Delete all related submissions\n- NOT refund coins to the buyer (admin override)\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingTask(taskId);
      
      const response = await api.deleteTask(taskId);
      if (response.success) {
        toast.success(response.message || "Task deleted successfully");
        
        // Remove from local state
        setTasks(prev => prev.filter(task => task._id !== taskId));
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete task");
    } finally {
      setDeletingTask(null);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
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
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Manage Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and manage all platform tasks</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tasks ({tasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Title</TableHead>
                    <TableHead>Buyer Name</TableHead>
                    <TableHead>Payable Amount</TableHead>
                    <TableHead>Required Workers</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="font-medium text-foreground truncate">{task.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.buyer?.image} alt={task.buyer?.name} />
                            <AvatarFallback className="text-xs">
                              {task.buyer?.name?.charAt(0)?.toUpperCase() || "B"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{task.buyer?.name || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">{task.buyer?.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Coins className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{task.reward} coins</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {task.quantity - (task.completedCount || 0)} remaining
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({task.completedCount || 0}/{task.quantity} done)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(task.deadline)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteTask(task._id, task.title)}
                          disabled={deletingTask === task._id}
                        >
                          {deletingTask === task._id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete Task
                            </>
                          )}
                        </Button>
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