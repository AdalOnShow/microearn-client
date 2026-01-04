"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AddNewTaskContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const userCoins = session?.user?.coins || 0;

  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: "",
    task_image_url: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const totalPayable =
    (parseInt(formData.required_workers) || 0) *
    (parseInt(formData.payable_amount) || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.task_title.trim()) {
      newErrors.task_title = "Task title is required";
    }

    if (!formData.task_detail.trim()) {
      newErrors.task_detail = "Task detail is required";
    }

    if (!formData.required_workers || parseInt(formData.required_workers) <= 0) {
      newErrors.required_workers = "Required workers must be greater than 0";
    }

    if (!formData.payable_amount || parseInt(formData.payable_amount) <= 0) {
      newErrors.payable_amount = "Payable amount must be greater than 0";
    }

    if (!formData.completion_date) {
      newErrors.completion_date = "Completion date is required";
    } else {
      const selectedDate = new Date(formData.completion_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.completion_date = "Completion date must be in the future";
      }
    }

    if (!formData.submission_info.trim()) {
      newErrors.submission_info = "Submission info is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check if user has enough coins
    if (totalPayable > userCoins) {
      toast.error("Not enough coins. Purchase coin.", {
        description: `You need ${totalPayable} coins but only have ${userCoins}.`,
      });
      router.push("/dashboard/buyer/purchase");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          title: formData.task_title,
          description: formData.task_detail,
          quantity: parseInt(formData.required_workers),
          reward: parseInt(formData.payable_amount),
          deadline: formData.completion_date,
          submissionInfo: formData.submission_info,
          imageUrl: formData.task_image_url,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle insufficient coins from server
        if (data.insufficientCoins) {
          toast.error("Not enough coins. Purchase coin.", {
            description: `You need ${data.required} coins but only have ${data.available}.`,
          });
          router.push("/dashboard/buyer/purchase");
          return;
        }
        throw new Error(data.message || "Failed to create task");
      }

      toast.success("Task created successfully!");
      router.push("/dashboard/buyer/tasks");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Add New Task
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new task for workers to complete
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div className="space-y-2">
              <Label htmlFor="task_title">Task Title</Label>
              <Input
                id="task_title"
                name="task_title"
                placeholder="Enter task title"
                value={formData.task_title}
                onChange={handleChange}
              />
              {errors.task_title && (
                <p className="text-sm text-destructive">{errors.task_title}</p>
              )}
            </div>

            {/* Task Detail */}
            <div className="space-y-2">
              <Label htmlFor="task_detail">Task Detail</Label>
              <textarea
                id="task_detail"
                name="task_detail"
                placeholder="Describe the task in detail"
                value={formData.task_detail}
                onChange={handleChange}
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.task_detail && (
                <p className="text-sm text-destructive">{errors.task_detail}</p>
              )}
            </div>

            {/* Required Workers & Payable Amount */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="required_workers">Required Workers</Label>
                <Input
                  id="required_workers"
                  name="required_workers"
                  type="number"
                  min="1"
                  placeholder="Number of workers needed"
                  value={formData.required_workers}
                  onChange={handleChange}
                />
                {errors.required_workers && (
                  <p className="text-sm text-destructive">
                    {errors.required_workers}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="payable_amount">Payable Amount (per worker)</Label>
                <Input
                  id="payable_amount"
                  name="payable_amount"
                  type="number"
                  min="1"
                  placeholder="Coins per worker"
                  value={formData.payable_amount}
                  onChange={handleChange}
                />
                {errors.payable_amount && (
                  <p className="text-sm text-destructive">
                    {errors.payable_amount}
                  </p>
                )}
              </div>
            </div>

            {/* Total Payable Display */}
            {totalPayable > 0 && (
              <div
                className={`flex items-center gap-2 rounded-lg border p-4 ${
                  totalPayable > userCoins
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-muted/50"
                }`}
              >
                {totalPayable > userCoins && (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    Total Payable: {totalPayable} coins
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your balance: {userCoins} coins
                    {totalPayable > userCoins && (
                      <span className="text-destructive">
                        {" "}
                        (Need {totalPayable - userCoins} more)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Completion Date */}
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion Date</Label>
              <Input
                id="completion_date"
                name="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.completion_date && (
                <p className="text-sm text-destructive">
                  {errors.completion_date}
                </p>
              )}
            </div>

            {/* Submission Info */}
            <div className="space-y-2">
              <Label htmlFor="submission_info">Submission Info</Label>
              <textarea
                id="submission_info"
                name="submission_info"
                placeholder="What should workers submit as proof?"
                value={formData.submission_info}
                onChange={handleChange}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.submission_info && (
                <p className="text-sm text-destructive">
                  {errors.submission_info}
                </p>
              )}
            </div>

            {/* Task Image */}
            <div className="space-y-2">
              <ImageUpload
                label="Task Image (optional)"
                value={formData.task_image_url}
                onChange={(url) => setFormData(prev => ({ ...prev, task_image_url: url }))}
                disabled={loading}
                placeholder="Upload an image for your task"
                maxSize={3 * 1024 * 1024} // 3MB for task images
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
