"use client";

import { motion } from "framer-motion";
import { Sparkles, LogIn, Radio } from "lucide-react";
import type { EventDetail } from "./types";

interface MobileStickyBarProps {
  event: EventDetail;
  isRegistered: boolean;
  isLoading?: boolean;
  onRegister: () => void;
}

export default function MobileStickyBar({
  event,
  isRegistered,
  isLoading = false,
  onRegister,
}: MobileStickyBarProps) {
  const isFree = event.price === 0;
  const isLive = event.status === "live";
  const isCompleted = event.status === "completed";
  const isSoldOut =
    event.maxParticipants !== undefined &&
    event.currentParticipants !== undefined &&
    event.currentParticipants >= event.maxParticipants;

  const handlePrimary = () => {
    if (isRegistered && event.roomUrl) {
      window.open(event.roomUrl, "_blank", "noopener,noreferrer");
      return;
    }
    onRegister();
  };

  const renderButtonContent = () => {
    if (isCompleted) return "Selesai";
    if (isSoldOut && !isRegistered) return "Tiket Habis";
    if (isRegistered) {
      return isLive ? "Masuk — LIVE!" : "Masuk ke Sesi";
    }
    return isLoading ? "Memproses..." : "Daftar Sekarang";
  };

  const Icon = isRegistered
    ? isLive
      ? Radio
      : LogIn
    : Sparkles;

  const isDisabled =
    isCompleted || (isSoldOut && !isRegistered) || isLoading;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-neutral-900 border-t border-black/5 dark:border-white/10 p-3 sm:p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-tight">
            {isFree ? "Gratis" : event.priceDisplay}
          </p>
          <p className="text-xs text-neutral-500 dark:text-white/40">1 tiket</p>
        </div>
        <button
          onClick={handlePrimary}
          disabled={isDisabled}
          className={`flex-1 py-2.5 sm:py-3 rounded-full bg-primary text-neutral-900 font-semibold hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
            isLive && isRegistered ? "animate-pulse" : ""
          }`}
        >
          <Icon className="w-4 h-4" />
          {renderButtonContent()}
        </button>
      </div>
    </motion.div>
  );
}
