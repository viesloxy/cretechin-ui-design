"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface CurrentLessonInfoProps {
  title: string;
  duration: string; // e.g. "1 jam 20 menit"
  moduleLabel?: string; // e.g. "Modul 3 - Lesson 5 dari 12"
}

export default function CurrentLessonInfo({
  title,
  duration,
  moduleLabel,
}: CurrentLessonInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 sm:px-6 py-4 sm:py-6 bg-neutral-50 dark:bg-neutral-900 border-b border-black/5 dark:border-white/10"
    >
      {/* Lesson Title */}
      <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
        {title}
      </h2>

      {/* Duration */}
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span className="text-sm font-medium text-primary">
          Durasi: {duration}
        </span>
      </div>

      {/* Module Label */}
      {moduleLabel && (
        <p className="mt-1 text-xs text-neutral-400 dark:text-white/30">
          {moduleLabel}
        </p>
      )}
    </motion.div>
  );
}