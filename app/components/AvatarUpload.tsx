"use client";

import React, { useRef, useState } from "react";

interface AvatarUploadProps {
  entityType: "person" | "organization";
  entityId: string | null; // null for new entities
  currentAvatar: string | null;
  onAvatarChange: (url: string | null) => void;
  initials: string;
  shape?: "circle" | "rounded"; // circle for people, rounded for orgs
}

export default function AvatarUpload({
  entityType,
  entityId,
  currentAvatar,
  onAvatarChange,
  initials,
  shape = "circle",
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const displayUrl = previewUrl || currentAvatar;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, GIF, or WebP.");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // If we have an entityId, upload immediately
    if (entityId) {
      await uploadFile(file, entityId);
    } else {
      // For new entities, store the file to upload after entity creation
      setPendingFile(file);
      // Notify parent that we have a pending upload (pass preview URL for display)
      onAvatarChange(reader.result as string);
    }
  };

  const uploadFile = async (file: File, id: string) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entityType", entityType);
      formData.append("entityId", id);

      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setPreviewUrl(null);
      setPendingFile(null);
      onAvatarChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!entityId) {
      // For new entities, just clear the preview
      setPreviewUrl(null);
      setPendingFile(null);
      onAvatarChange(null);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/avatar?entityType=${entityType}&entityId=${entityId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Delete failed");
      }

      setPreviewUrl(null);
      onAvatarChange(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="Avatar"
            className={`w-24 h-24 object-cover ${shapeClass} border-2 border-gray-200`}
            onError={() => {
              setPreviewUrl(null);
              if (!pendingFile) onAvatarChange(null);
            }}
          />
        ) : (
          <div
            className={`w-24 h-24 ${shapeClass} flex items-center justify-center text-2xl font-semibold ${
              entityType === "person" ? "bg-gray-200" : "bg-blue-100"
            }`}
          >
            {initials}
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 ${shapeClass} bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer`}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="text-white text-sm font-medium">
            {isUploading ? "Uploading..." : "Change"}
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          {displayUrl ? "Replace" : "Upload"}
        </button>
        {displayUrl && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {pendingFile && !entityId && (
        <p className="text-xs text-gray-500">
          Image will be uploaded when you save.
        </p>
      )}
    </div>
  );
}

// Export a helper hook for handling pending uploads
export function useAvatarUpload() {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setPendingFile(null);
      setPreviewUrl(null);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setPendingFile(file);
  };

  const uploadPendingAvatar = async (
    entityType: "person" | "organization",
    entityId: string
  ): Promise<string | null> => {
    if (!pendingFile) return null;

    const formData = new FormData();
    formData.append("file", pendingFile);
    formData.append("entityType", entityType);
    formData.append("entityId", entityId);

    const response = await fetch("/api/avatar", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Upload failed");
    }

    setPendingFile(null);
    setPreviewUrl(null);
    return result.url;
  };

  const clear = () => {
    setPendingFile(null);
    setPreviewUrl(null);
  };

  return {
    pendingFile,
    previewUrl,
    handleFileSelect,
    uploadPendingAvatar,
    clear,
  };
}
