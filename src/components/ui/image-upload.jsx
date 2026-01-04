"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  disabled = false, 
  required = false,
  className = "",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  placeholder = "Click to upload image"
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const uploadToImgbb = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    
    if (!apiKey) {
      throw new Error("ImgBB API key not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your environment variables.");
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", apiKey);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error?.message || "Upload failed - invalid response from ImgBB");
    }

    return data.data.url;
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, GIF, etc.)");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB. Your file is ${Math.round(file.size / 1024 / 1024)}MB.`);
      return;
    }

    // Check for very small files (likely corrupted)
    if (file.size < 100) {
      toast.error("File appears to be corrupted or too small");
      return;
    }

    try {
      setUploading(true);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload to ImgBB
      const imageUrl = await uploadToImgbb(file);
      
      // Clean up preview URL to prevent memory leaks
      URL.revokeObjectURL(previewUrl);
      
      // Update preview with actual URL
      setPreview(imageUrl);
      
      // Call onChange with the hosted URL
      onChange(imageUrl);
      
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
      
      // Reset preview on error
      setPreview(value || "");
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled && !uploading) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled || uploading) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Create a synthetic event to reuse the existing file handling logic
      const syntheticEvent = {
        target: { files: [files[0]] }
      };
      handleFileSelect(syntheticEvent);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      <div className="space-y-3">
        {/* Upload Area */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${disabled || uploading 
              ? "border-muted bg-muted/50 cursor-not-allowed" 
              : dragOver
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary hover:bg-muted/50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading image...</p>
            </div>
          ) : preview ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  disabled={disabled || uploading}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{placeholder}</p>
                <p className="text-xs text-muted-foreground">
                  {dragOver ? "Drop image here" : `PNG, JPG, GIF up to ${Math.round(maxSize / 1024 / 1024)}MB`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Current Image Display (if different from preview) */}
        {value && value !== preview && !uploading && (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Current Image</p>
              <p className="text-xs text-muted-foreground truncate">{value}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}