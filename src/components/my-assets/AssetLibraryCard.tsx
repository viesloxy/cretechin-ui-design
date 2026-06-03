"use client";

import { motion } from "framer-motion";
import { Download, Eye, ExternalLink, Heart, Calendar } from "lucide-react";
import type { AssetLibraryItem } from "./types";

interface AssetLibraryCardProps {
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

function isNewPurchase(iso: string): boolean {
  const purchased = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - purchased.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

export default function AssetLibraryCard({
  asset,
  onDownload,
  onPreview,
  onViewDetail,
  onToggleFavorite,
}: AssetLibraryCardProps) {
  const {
    id,
    title,
    creator,
    fileType,
    fileSize,
    thumbnail,
    purchasedAt,
    downloadCount,
    isFavorite,
  } = asset;

  const showNewBadge = isNewPurchase(purchasedAt);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40 h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top-Left Badge: New or Favorite */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {showNewBadge && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary text-neutral-900 shadow-md">
              Baru
            </span>
          )}
          {isFavorite && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-income text-white shadow-md">
              Favorit
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons (Hover only on desktop) */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(id);
            }}
            aria-label="Preview"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center text-neutral-700 dark:text-white/70 hover:text-primary transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(id);
            }}
            aria-label="Lihat detail"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center text-neutral-700 dark:text-white/70 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom-Left: File Type & Size */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-xs font-semibold text-neutral-700 dark:text-white/70">
            {fileType}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-xs font-semibold text-neutral-700 dark:text-white/70">
            {fileSize}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-white/50 mb-3 line-clamp-1">
          {creator.studio ? `${creator.name} · ${creator.studio}` : creator.name}
        </p>

        {/* Meta: Purchase date & download count */}
        <div className="flex items-center justify-between gap-2 mb-4 text-xs text-neutral-400 dark:text-white/40">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3.5" />
            Dibeli: {formatDate(purchasedAt)}
          </span>
          {downloadCount > 0 && (
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3.5" />
              {downloadCount}x
            </span>
          )}
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onToggleFavorite(id)}
            aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
            className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-colors ${
              isFavorite
                ? "bg-income/10 border-income text-income"
                : "border-neutral-300 dark:border-white/20 text-neutral-500 dark:text-white/50 hover:border-primary hover:text-primary"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => onDownload(id)}
            aria-label={`Unduh ${title}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200 shadow-md shadow-primary/20"
          >
            <Download className="w-4 h-4" />
            Unduh File
          </button>
        </div>
      </div>
    </motion.div>
  );
}
