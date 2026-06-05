/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface FileUploadProps {
  maxUpload?: number;
  imgbbUrl: string;
  className?: string;
  handleFileUpload: (files: string[]) => void;
  initialFileUrls?: string[];
  resetKey: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxUpload = 3,
  imgbbUrl,
  className,
  handleFileUpload,
  initialFileUrls = [],
  resetKey,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(initialFileUrls);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setUploadedUrls(initialFileUrls);
    setPreviewUrls(initialFileUrls);
  }, [initialFileUrls]);

  useEffect(() => {
    setSelectedFiles([]);
  }, [resetKey]);

  useEffect(() => {
    handleFileUpload(uploadedUrls);
  }, [uploadedUrls, handleFileUpload]);

  const removeImage = (url: string) => {
    const next = uploadedUrls.filter((image) => image !== url);
    setUploadedUrls(next);
    setPreviewUrls(next);
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    const fileArray = Array.from(files).slice(
      0,
      maxUpload - uploadedUrls.length,
    );
    if (fileArray.length === 0) {
      return;
    }

    setIsUploading(true);
    const newUrls: string[] = [];

    for (const file of fileArray) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(imgbbUrl, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok && data?.success) {
          newUrls.push(data.data.display_url as string);
          toast.success("Image uploaded");
        } else {
          toast.error("Image upload failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Image upload failed");
      }
    }

    const mergedUrls = [...uploadedUrls, ...newUrls].slice(0, maxUpload);
    setUploadedUrls(mergedUrls);
    setPreviewUrls(mergedUrls);
    setIsUploading(false);
  };

  return (
    <div className={className}>
      <label className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-700 transition hover:border-slate-400 hover:bg-slate-100">
        <span className="text-2xl font-semibold">+</span>
        <span className="text-sm">Upload images</span>
        <span className="text-xs text-slate-500">
          You can upload up to {maxUpload} images
        </span>
        <input
          key={resetKey}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => uploadFiles(event.target.files)}
          disabled={isUploading || uploadedUrls.length >= maxUpload}
        />
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {previewUrls.map((url) => (
          <div
            key={url}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={url}
              alt="uploaded"
              className="h-36 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute right-2 top-2 rounded-full bg-slate-950 px-2 py-1 text-xs text-white opacity-90 transition hover:bg-slate-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {isUploading && (
        <div className="mt-3 text-sm text-slate-600">Uploading images…</div>
      )}
    </div>
  );
};

export default FileUpload;
