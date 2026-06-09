"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { ImagePlus, Upload, Trash2 } from "lucide-react";
import { ThumbnailImage } from "../shared";

interface ThumbnailUploaderProps {
  value: { url: string; width: number; height: number } | null;
  onChange: (v: { url: string; width: number; height: number } | null) => void;
}

export default function ThumbnailUploader({ value, onChange }: ThumbnailUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onChange({ url, width: img.width, height: img.height });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (value) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group">
        <ThumbnailImage
          src={value.url}
          alt="Thumbnail"
          size={0}
          rounded="xl"
          className="!w-full !h-full !rounded-none"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-9 px-3 rounded-lg bg-white text-neutral-900 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-100 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Ganti
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="h-9 px-3 rounded-lg bg-red-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Hapus
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      className={`
        aspect-video rounded-xl border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center
        transition-colors
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-primary hover:bg-primary/5"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />
      <ImagePlus className="w-8 h-8 text-neutral-400 mb-2" />
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center px-2">
        Drop gambar atau klik untuk upload
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        JPG, PNG, WebP • Maks 2MB
      </p>
    </div>
  );
}
