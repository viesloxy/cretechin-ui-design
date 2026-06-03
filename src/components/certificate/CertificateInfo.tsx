"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Download,
  Copy,
  Check,
} from "lucide-react";

interface CertificateInfoProps {
  courseTitle: string;
  recipientName: string;
  completionDate: string;
  certificateCode: string;
  instructor: {
    name: string;
    title: string;
  };
  verificationUrl: string;
  onDownload: () => void;
  isDownloading?: boolean;
}

export default function CertificateInfo({
  courseTitle,
  recipientName,
  completionDate,
  certificateCode,
  instructor,
  verificationUrl,
  onDownload,
  isDownloading = false,
}: CertificateInfoProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`;
    window.open(linkedInShareUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(verificationUrl);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = verificationUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-2 sm:mb-3">
          <Award className="w-4 h-4" />
          <span>Sertifikat Kelulusan</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white line-clamp-3 leading-tight">
          {courseTitle}
        </h2>
      </div>

      {/* Info Fields */}
      <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-7">
        {/* Diberikan kepada - Full Width */}
        <div>
          <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-white/50 uppercase tracking-wide mb-1">
            Diberikan kepada
          </p>
          <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2 flex-wrap">
            <span>{recipientName}</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase text-income bg-income/10 px-2 py-0.5 rounded-full">
              <Check className="w-3.5 h-3.5" />
              Terverifikasi
            </span>
          </p>
        </div>

        {/* Tanggal & ID - 2 Kolom di Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-white/50 uppercase tracking-wide mb-1">
              Tanggal Lulus
            </p>
            <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
              {completionDate}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-white/50 uppercase tracking-wide mb-1">
              ID Sertifikat
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white font-mono">
              {certificateCode}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-7">
        {/* Primary Button - Unduh */}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 text-sm sm:text-base font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isDownloading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-neutral-900 border-t-transparent rounded-full"
              />
              <span>Mengunduh...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Unduh Sertifikat (PDF)</span>
            </>
          )}
        </button>

        {/* Secondary Button - LinkedIn */}
        <button
          onClick={handleShareLinkedIn}
          className="w-full py-2.5 sm:py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/70 text-sm sm:text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span>Bagikan ke LinkedIn</span>
        </button>

        {/* Tertiary - Salin Link */}
        <button
          onClick={handleCopyLink}
          className="w-full py-2 sm:py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-primary hover:underline transition-all"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCopied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Tersalin!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Salin Link Sertifikat</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Signature Section */}
      <div className="pt-5 sm:pt-6 border-t border-black/5 dark:border-white/10 flex flex-col items-center text-center">
        <p className="text-xs font-medium text-neutral-400 dark:text-white/40 uppercase tracking-wide mb-4">
          — Ditandatangani Secara Digital Oleh —
        </p>
        <div className="flex items-center gap-4">
          {/* QR Code Placeholder */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1.5 border-2 border-primary rounded-lg flex items-center justify-center">
            <div className="w-full h-full bg-neutral-100 rounded grid grid-cols-4 grid-rows-4 gap-px p-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`${
                    // Pola sederhana untuk simulasi QR code
                    [0, 1, 2, 4, 5, 7, 8, 10, 11, 12, 14, 15].includes(i)
                      ? "bg-neutral-900"
                      : "bg-neutral-100"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Instructor Info */}
          <div className="text-left">
            <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              {instructor.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-white/50">
              {instructor.title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
