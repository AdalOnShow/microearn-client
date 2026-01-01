"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ErrorState({ 
  title = "Something went wrong", 
  description = "An error occurred while loading data. Please try again.",
  onRetry,
  className 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}