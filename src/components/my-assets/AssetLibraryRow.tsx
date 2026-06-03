"use client";

import { motion } from "framer-motion";
import { Download, Eye, ExternalLink, Heart, Calendar } from "lucide-react";
import type { AssetLibraryItem } from "./types";

interface AssetLibraryRowProps {
  asset: AssetLibraryItem;
  onDownload: (assetId: string) => void;
  onPreview: (assetId: string) => void;
  onViewDetail: (assetId: string) => void;
  onToggleFavorite: (assetId: string) => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AssetLibraryRow({
  asset,
  onDownload,
  onPreview,
  onViewDetail,
  onToggleFavorite,
}: AssetLibraryRowProps) {
  const {
    id,
    title,
    creator,
    fileType,
    fileSize,
    thumbnail,
    purchasedAt,
    isFavorite,
  } = asset;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-24 sm:h-24 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isFavorite && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-income flex items-center justify-center shadow-md">
            <Heart className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-1 mb-1">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-white/50 line-clamp-1 mb-2">
          {creator}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 dark:text-white/40">
          <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-600 dark:text-white/60">
            {fileType}
          </span>
          <span>{fileSize}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3.5" />
            {formatDate(purchasedAt)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row sm:flex-row items-stretch sm:items-center gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          className={`w-10 h-10 flex-shrink-0 rounded-full border flex items-center justify-center transition-colors ${
            isFavorite
              ? "bg-income/10 border-income text-income"
              : "border-neutral-300 dark:border-white/20 text-neutral-500 dark:text-white/50 hover:border-primary hover:text-primary"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={() => onPreview(id)}
          aria-label="Preview"
          className="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/70 hover:border-primary hover:text-primary items-center justify-center transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewDetail(id)}
          aria-label="Lihat detail"
          className="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/70 hover:border-primary hover:text-primary items-center justify-center transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDownload(id)}
          aria-label={`Unduh ${title}`}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Unduh
        </button>
      </div>
    </motion.div>
  );
}
