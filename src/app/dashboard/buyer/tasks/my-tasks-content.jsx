"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Pencil, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function MyTasksContent() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update modal states
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    title: "",
    description: "",
    submissionInfo: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const buyerId = session?.user?.id;
      
      const res = await fetch(`${API_URL}/tasks?buyer=${buyerId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      // Sort by completion_date (deadline) descending
      const sortedTasks = (data.tasks || []).sort((a, b) => {
        const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
        const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
        return dateB - dateA;
      });

      setTasks(sortedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks();
    }
  }, [session?.user?.id]);

  const isTaskCompleted = (task) => {
    return task.completedCount >= task.quantity;
  };

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setUpdateForm({
      title: task.title || "",
      description: task.description || "",
      submissionInfo: task.submissionInfo || "",
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedTask) return;

    setUpdateLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/tasks/${selectedTask._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(updateForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      // Update local state
      setTasks((prev) =>
        prev.map((t) =>
          t._id === selectedTask._id ? { ...t, ...updateForm } : t
        )
      );

      toast.success("Task updated successfully");
      setUpdateModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTask) return;

    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/tasks/${selectedTask._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      // Remove from local state
      setTasks((prev) => prev.filter((t) => t._id !== selectedTask._id));

      toast.success(
        data.refunded > 0
          ? `Task deleted. ${data.refunded} coins refunded.`
          : "Task deleted successfully"
      );
      setDeleteModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const calculateRefund = (task) => {
    const remainingSlots = task.quantity - (task.completedCount || 0);
    return remainingSlots * task.reward;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Tasks
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage tasks you have created
        </p>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Failed to load tasks: {error}
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                No tasks yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first task to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Title</TableHead>
                  <TableHead>Required Workers</TableHead>
                  <TableHead>Payable Amount</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => {
                  const completed = isTaskCompleted(task);
                  return (
                    <TableRow key={task._id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        {task.completedCount || 0} / {task.quantity}
                      </TableCell>
                      <TableCell>{task.reward} coins</TableCell>
                      <TableCell>{formatDate(task.deadline)}</TableCell>
                      <TableCell>
                        <Badge variant={completed ? "secondary" : "default"}>
                          {completed ? "Completed" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateClick(task)}
                            disabled={completed}
                            title={completed ? "Cannot update completed task" : "Update task"}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(task)}
                            disabled={completed}
                            title={completed ? "Cannot delete completed task" : "Delete task"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Update the task details. Only title, description, and submission info can be modified.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update_title">Task Title</Label>
              <Input
                id="update_title"
                value={updateForm.title}
                onChange={(e) =>
                  setUpdateForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update_description">Task Detail</Label>
              <textarea
                id="update_description"
                value={updateForm.description}
                onChange={(e) =>
                  setUpdateForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update_submissionInfo">Submission Info</Label>
              <textarea
                id="update_submissionInfo"
                value={updateForm.submissionInfo}
                onChange={(e) =>
                  setUpdateForm((prev) => ({
                    ...prev,
                    submissionInfo: e.target.value,
                  }))
                }
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdateModalOpen(false)}
              disabled={updateLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} disabled={updateLoading}>
              {updateLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedTask?.title}&quot;?
              {selectedTask && calculateRefund(selectedTask) > 0 && (
                <span className="mt-2 block text-foreground">
                  You will be refunded {calculateRefund(selectedTask)} coins for
                  unfinished workers.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
            >
              {deleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
