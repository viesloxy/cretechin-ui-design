"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload, Trash2, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SettingsCard } from "./SettingsCard";
import type { EventBanner } from "@/lib/events/types";

interface BannerCardProps {
  banner: EventBanner | null;
  onChange: (banner: EventBanner | null) => void;
}

export function BannerCard({ banner, onChange }: BannerCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        onChange({
          url: reader.result as string,
          width: img.width,
          height: img.height,
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (banner?.url) {
    return (
      <SettingsCard title="Banner Acara">
        <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
          <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">
            <img
              src={banner.url}
              alt="Banner preview"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 border-t border-black/5 bg-neutral-50 p-2 dark:border-white/10 dark:bg-neutral-900/50">
            <p className="flex-1 text-xs text-neutral-500">
              {banner.width}×{banner.height}px
            </p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/5 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Upload className="h-3 w-3" />
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-3 w-3" />
              Hapus
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
      </SettingsCard>
    );
  }

  return (
    <SettingsCard title="Banner Acara">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging
            ? "rgb(164, 214, 36)"
            : "rgba(0, 0, 0, 0.05)",
          backgroundColor: isDragging
            ? "rgba(164, 214, 36, 0.05)"
            : "rgba(243, 244, 246, 1)",
        }}
        className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed dark:border-white/10 dark:bg-neutral-900/50"
        onClick={() => fileRef.current?.click()}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-neutral-800">
          {isDragging ? (
            <ImagePlus className="h-6 w-6 text-primary" />
          ) : (
            <ImageIcon className="h-6 w-6 text-neutral-400" />
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Drag & drop atau klik untuk upload
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          JPG, PNG, WebP • Maks 5MB • Rekomendasi 1280×720px (16:9)
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />
      </motion.div>
    </SettingsCard>
  );
}
