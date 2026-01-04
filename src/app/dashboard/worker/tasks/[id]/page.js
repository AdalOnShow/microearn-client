"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Coins, Users, Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function TaskDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "Worker") {
      router.push("/login");
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await api.getTask(taskId);
        if (response.success) {
          setTask(response.task);
          
          // Check if worker has already submitted for this task
          const submissionsResponse = await api.getSubmissions({ task: taskId });
          if (submissionsResponse.success && submissionsResponse.submissions.length > 0) {
            setHasSubmitted(true);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [session, status, router, taskId]);

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isDeadlinePassed = () => {
    if (!task?.deadline) return false;
    return new Date(task.deadline) < new Date();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!submissionDetails.trim()) {
      toast.error("Please provide submission details");
      return;
    }

    if (isDeadlinePassed()) {
      toast.error("Cannot submit - deadline has passed");
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.createSubmission({
        taskId: task._id,
        submissionDetails: submissionDetails.trim(),
      });

      if (response.success) {
        toast.success("Submission created successfully!");
        setHasSubmitted(true);
        setSubmissionDetails("");
      }
    } catch (err) {
      toast.error(err.message || "Failed to create submission");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      
    );
  }

  if (error || !task) {
    return (
      
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-destructive">{error || "Task not found"}</p>
        </div>
      
    );
  }

  const deadlinePassed = isDeadlinePassed();
  const canSubmit = !hasSubmitted && !deadlinePassed && task.status === "active";

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Task Details</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review task information and submit your work</p>
        </div>

        {/* Task Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{task.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Task Image */}
            {task.imageUrl && (
              <div className="w-full">
                <img
                  src={task.imageUrl}
                  alt={task.title}
                  className="w-full max-w-md rounded-lg border object-cover"
                />
              </div>
            )}

            {/* Task Details */}
            <div>
              <h3 className="font-medium text-foreground mb-2">Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.description}</p>
            </div>

            {/* Task Info Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Buyer</p>
                  <p className="text-sm font-medium">{task.buyer?.name || "Unknown"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-sm font-medium">{formatDate(task.deadline)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Reward</p>
                  <p className="text-sm font-medium">{task.reward} coins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={deadlinePassed ? "destructive" : "success"}>
                    {deadlinePassed ? "Expired" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Submission Info */}
            {task.submissionInfo && (
              <div>
                <h3 className="font-medium text-foreground mb-2">Submission Guidelines</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.submissionInfo}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Work</CardTitle>
          </CardHeader>
          <CardContent>
            {hasSubmitted ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Submission Complete</p>
                  <p className="text-sm text-green-600">You have already submitted for this task.</p>
                </div>
              </div>
            ) : deadlinePassed ? (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Deadline Passed</p>
                  <p className="text-sm text-red-600">This task is no longer accepting submissions.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="submissionDetails">Submission Details *</Label>
                  <textarea
                    id="submissionDetails"
                    value={submissionDetails}
                    onChange={(e) => setSubmissionDetails(e.target.value)}
                    placeholder="Describe your work, provide links, or any other relevant information..."
                    className="mt-1 w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={submitting || !canSubmit}
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Work"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    
  );
}