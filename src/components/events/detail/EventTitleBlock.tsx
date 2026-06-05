"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";
import type { EventDetail } from "./types";

interface EventTitleBlockProps {
  event: EventDetail;
}

const TYPE_LABELS: Record<string, string> = {
  webinar: "Webinar",
  workshop: "Workshop",
  meetup: "Meetup",
  conference: "Conference",
  networking: "Networking",
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function EventTitleBlock({ event }: EventTitleBlockProps) {
  const typeLabel = TYPE_LABELS[event.type] ?? event.type;
  const levelLabel = event.level ? LEVEL_LABELS[event.level] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-tight line-clamp-3 mb-3">
        {event.title}
      </h1>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {typeLabel}
        </span>
        {levelLabel && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-white/60">
            {levelLabel}
          </span>
        )}
        {event.isFeatured && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-neutral-900">
            ★ Featured
          </span>
        )}
      </div>

      {/* Meta info row */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-white/50">
          <Calendar className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span>{event.dateLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-white/50">
          <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span>
            {event.timeStart} - {event.timeEnd} {event.timezone}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-white/50">
          <Video className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span>{event.platform}</span>
        </div>
      </div>
    </motion.div>
  );
}
