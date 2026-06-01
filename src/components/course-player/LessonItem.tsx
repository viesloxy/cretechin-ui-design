"use client";

import { motion } from "framer-motion";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

interface LessonItemProps {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "active" | "locked" | "default";
  onClick?: (id: string) => void;
}

export default function LessonItem({
  id,
  title,
  duration,
  status,
  onClick,
}: LessonItemProps) {
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const isLocked = status === "locked";

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick(id);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isLocked}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      className={`
        w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200
        ${isActive
          ? "bg-primary/5 border-l-2 border-primary pl-5"
          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
        }
        ${isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      {/* Status Icon */}
      <span className="flex-shrink-0">
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-income" />
        )}
        {isActive && (
          <PlayCircle className="w-4 h-4 text-primary" />
        )}
        {isLocked && (
          <Lock className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />
        )}
        {!isCompleted && !isActive && !isLocked && (
          <div className="w-4 h-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
        )}
      </span>

      {/* Lesson Title */}
      <span
        className={`
          flex-1 text-sm truncate
          ${isActive
            ? "font-bold text-neutral-900 dark:text-white"
            : "font-medium text-neutral-600 dark:text-white/60"
          }
          ${isLocked
            ? "text-neutral-400 dark:text-white/30"
            : ""
          }
        `}
      >
        {title}
      </span>

      {/* Duration */}
      <span className="flex-shrink-0 text-xs text-neutral-400 dark:text-white/30">
        {duration}
      </span>
    </motion.button>
  );
}