"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, Loader2, ClipboardList } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function TaskToReviewContent() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "approve" or "reject"
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/submissions?status=pending`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch submissions");
      }

      setSubmissions(data.submissions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setViewModalOpen(true);
  };

  const handleActionClick = (submission, action) => {
    setSelectedSubmission(submission);
    setConfirmAction(action);
    setConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedSubmission || !confirmAction) return;

    setActionLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/submissions/${selectedSubmission._id}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            status: confirmAction === "approve" ? "approved" : "rejected",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to process submission");
      }

      // Remove from list
      setSubmissions((prev) =>
        prev.filter((s) => s._id !== selectedSubmission._id)
      );

      toast.success(
        confirmAction === "approve"
          ? "Submission approved successfully"
          : "Submission rejected"
      );

      setConfirmModalOpen(false);
      setViewModalOpen(false);
      setSelectedSubmission(null);
      setConfirmAction(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Task To Review
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and approve worker submissions
        </p>
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Failed to load submissions: {error}
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                No pending submissions
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                All submissions have been reviewed.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker Name</TableHead>
                  <TableHead>Task Title</TableHead>
                  <TableHead>Payable Amount</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell className="font-medium">
                      {submission.worker?.name || "Unknown"}
                    </TableCell>
                    <TableCell>{submission.task?.title || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {submission.task?.reward || 0} coins
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSubmission(submission)}
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleActionClick(submission, "approve")
                          }
                        >
                          <CheckCircle className="mr-1.5 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleActionClick(submission, "reject")
                          }
                        >
                          <XCircle className="mr-1.5 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Submission Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Review the worker&apos;s submission for &quot;{selectedSubmission?.task?.title}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Worker
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {selectedSubmission?.worker?.name || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Payable Amount
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {selectedSubmission?.task?.reward || 0} coins
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Submission Details
              </p>
              <div className="mt-2 rounded-lg border border-border bg-muted/50 p-4">
                <p className="whitespace-pre-wrap text-sm text-foreground">
                  {selectedSubmission?.submissionDetails || "No details provided"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Submitted At
              </p>
              <p className="mt-1 text-sm text-foreground">
                {selectedSubmission?.submittedAt
                  ? new Date(selectedSubmission.submittedAt).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setViewModalOpen(false);
                handleActionClick(selectedSubmission, "reject");
              }}
            >
              <XCircle className="mr-1.5 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => {
                setViewModalOpen(false);
                handleActionClick(selectedSubmission, "approve");
              }}
            >
              <CheckCircle className="mr-1.5 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction === "approve"
                ? "Approve Submission"
                : "Reject Submission"}
            </DialogTitle>
            <DialogDescription>
              {confirmAction === "approve"
                ? `Are you sure you want to approve this submission? ${selectedSubmission?.task?.reward || 0} coins will be paid to the worker.`
                : "Are you sure you want to reject this submission? The task slot will be reopened for other workers."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmModalOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              variant={confirmAction === "approve" ? "default" : "destructive"}
              onClick={handleConfirmAction}
              disabled={actionLoading}
            >
              {actionLoading && (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              )}
              {confirmAction === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
