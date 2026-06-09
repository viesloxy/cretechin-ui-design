"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X, Star, GripVertical, Upload, AlertCircle } from "lucide-react";
import type { ProductImage } from "@/lib/products/types";

interface GalleryCardProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  maxImages?: number;
}

export default function GalleryCard({ images, onChange, maxImages = 8 }: GalleryCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setError(null);
    const incoming = Array.from(files);
    const remaining = maxImages - images.length;
    if (incoming.length > remaining) {
      setError(`Maksimal ${maxImages} gambar. Hanya ${remaining} gambar pertama yang akan ditambahkan.`);
    }
    const toProcess = incoming.slice(0, remaining);
    toProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang didukung (JPG, PNG, WebP)");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Ukuran file maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const newImage: ProductImage = {
            id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            url,
            width: img.width,
            height: img.height,
            isPrimary: images.length === 0 && !images.some((i) => i.isPrimary),
          };
          onChange([...images, newImage]);
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    });
  };

  const remove = (id: string) => {
    const next = images.filter((i) => i.id !== id);
    // ensure exactly one is primary (first)
    if (next.length > 0 && !next.some((i) => i.isPrimary)) {
      next[0].isPrimary = true;
    }
    onChange(next);
  };

  const setPrimary = (id: string) => {
    onChange(
      images.map((i) => ({
        ...i,
        isPrimary: i.id === id,
      }))
    );
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;
    const srcIdx = images.findIndex((i) => i.id === sourceId);
    const tgtIdx = images.findIndex((i) => i.id === targetId);
    if (srcIdx < 0 || tgtIdx < 0) return;
    const next = [...images];
    const [moved] = next.splice(srcIdx, 1);
    next.splice(tgtIdx, 0, moved);
    onChange(next);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Galeri Preview</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Rekomendasi: 1280×720px • JPG/PNG/WebP • Maks 2MB per gambar
          </p>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                draggable
                onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, img.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e as unknown as React.DragEvent, img.id)}
                className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group bg-neutral-100 dark:bg-neutral-800 cursor-move"
              >
                <img src={img.url} alt={img.alt ?? "Gallery"} className="w-full h-full object-cover" />
                {img.isPrimary && (
                  <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-0.5 text-[9px] font-bold tracking-wider text-primary-dark bg-primary/90 px-1.5 py-0.5 rounded">
                    <Star className="w-2 h-2 fill-primary-dark" /> UTAMA
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors">
                  <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setPrimary(img.id)}
                      disabled={img.isPrimary}
                      title="Jadikan utama"
                      className="w-6 h-6 flex items-center justify-center rounded bg-white/90 hover:bg-white text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Star className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(img.id)}
                      title="Hapus"
                      className="w-6 h-6 flex items-center justify-center rounded bg-red-500/90 hover:bg-red-500 text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-white drop-shadow" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Drop zone */}
      {images.length < maxImages && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`
            block aspect-[16/6] rounded-xl border-2 border-dashed
            flex flex-col items-center justify-center cursor-pointer transition-colors
            ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-primary hover:bg-primary/5"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <ImagePlus className="w-7 h-7 text-neutral-400 mb-1.5" />
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Drop gambar atau klik untuk upload
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {images.length === 0 ? "Upload minimal 1 gambar" : `Tambah ${maxImages - images.length} gambar lagi`}
          </p>
        </label>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {images.length > 0 && (
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-2 flex items-center gap-1">
          <Upload className="w-3 h-3" />
          Drag untuk reorder. Klik bintang untuk set utama. Gambar pertama otomatis jadi utama.
        </p>
      )}
    </div>
  );
}
