"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import LessonItem from "./LessonItem";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "active" | "locked" | "default";
}

interface AccordionModuleProps {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  defaultOpen?: boolean;
  onLessonClick?: (lessonId: string) => void;
}

export default function AccordionModule({
  id,
  title,
  duration,
  lessons,
  defaultOpen = false,
  onLessonClick,
}: AccordionModuleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const activeLesson = lessons.some((l) => l.status === "active");
  const shouldAutoOpen = activeLesson || defaultOpen;

  if (shouldAutoOpen && !isOpen) {
    // Auto-open if there's an active lesson or defaultOpen
    setIsOpen(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`
        rounded-xl border overflow-hidden
        ${activeLesson || isOpen
          ? "border-primary shadow-sm shadow-primary/10"
          : "border-black/5 dark:border-white/10"
        }
      `}
    >
      {/* Module Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
      >
        {/* Module Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center p-1.5">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>

        {/* Title & Duration */}
        <div className="flex-1 text-left">
          <h3 className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="text-xs text-neutral-400 dark:text-white/30 mt-0.5">
            {duration}
          </p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-neutral-400 dark:text-white/30" />
        </motion.div>
      </button>

      {/* Lessons List */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/5 dark:border-white/10 bg-neutral-50/50 dark:bg-neutral-800/30">
              {lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  status={lesson.status}
                  onClick={onLessonClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}