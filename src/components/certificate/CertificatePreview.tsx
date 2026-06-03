"use client";

import { motion } from "framer-motion";
import { ZoomIn, Download } from "lucide-react";

interface CertificatePreviewProps {
  imageUrl: string;
  title: string;
  onZoom?: () => void;
  onQuickDownload?: () => void;
}

export default function CertificatePreview({
  imageUrl,
  title,
  onZoom,
  onQuickDownload,
}: CertificatePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      {/* Preview Container */}
      <div className="bg-neutral-100 dark:bg-neutral-800/50 border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-10 flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="aspect-[4/3] bg-white rounded-lg shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* Preview Toolbar */}
      <div className="flex items-center justify-between mt-4 sm:mt-6 px-2">
        <button
          onClick={onZoom}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors"
          aria-label="Preview sertifikat lebih besar"
        >
          <ZoomIn className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button
          onClick={onQuickDownload}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors"
          aria-label="Unduh sertifikat"
        >
          <Download className="w-4 h-4" />
          <span>Unduh</span>
        </button>
      </div>
    </motion.div>
  );
}
