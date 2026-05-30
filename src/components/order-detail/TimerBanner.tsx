"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimerBannerProps {
  expiresAt: Date;
  onExpired?: () => void;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => v.toString().padStart(2, "0"))
    .join(" : ");
}

export default function TimerBanner({ expiresAt, onExpired }: TimerBannerProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, expiresAt.getTime() - Date.now()));
  const isWarning = remaining > 0 && remaining <= 60 * 60 * 1000; // < 1 hour
  const isExpired = remaining <= 0;

  useEffect(() => {
    const tick = setInterval(() => {
      const ms = Math.max(0, expiresAt.getTime() - Date.now());
      setRemaining(ms);
      if (ms <= 0) {
        clearInterval(tick);
        onExpired?.();
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [expiresAt, onExpired]);

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 p-4 rounded-xl border border-error/30 bg-error/5 flex items-center gap-3"
      >
        <Clock className="w-5 h-5 text-error flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-error">Waktu pembayaran telah habis</p>
          <p className="text-xs text-neutral-500 dark:text-white/50 mt-0.5">
            Pesanan secara otomatis dibatalkan
</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mb-6 p-4 rounded-xl border flex items-center gap-3 transition-colors ${
        isWarning
          ? "border-error/30 bg-error/5"
          : "border-warning/30 bg-warning/5"
      }`}
    >
      <Clock className={`w-5 h-5 flex-shrink-0 ${isWarning ? "text-error" : "text-warning"}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-700 dark:text-white/70">
          Selesaikan pembayaran dalam
</p>
        <p
          className={`text-xl sm:text-2xl font-bold font-mono mt-1 ${
            isWarning ? "text-error" : "text-warning"
          }`}
        >
          {formatTime(remaining)}
        </p>
      </div>
    </motion.div>
  );
}
