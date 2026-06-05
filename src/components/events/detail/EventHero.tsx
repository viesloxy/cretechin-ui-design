"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Radio, Star } from "lucide-react";
import type { EventDetail } from "./types";

interface EventHeroProps {
  event: EventDetail;
}

const TYPE_LABELS: Record<string, string> = {
  webinar: "Webinar",
  workshop: "Workshop",
  meetup: "Meetup",
  conference: "Conference",
  networking: "Networking",
};

export default function EventHero({ event }: EventHeroProps) {
  const typeLabel = TYPE_LABELS[event.type] ?? event.type;
  const isLive = event.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/40 bg-neutral-200 dark:bg-neutral-800"
    >
      <Image
        src={event.banner}
        alt={event.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 65vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Type badge (top-left) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md bg-primary text-neutral-900">
          {typeLabel}
        </span>
      </div>

      {/* Live / Featured badge (top-right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 items-end">
        {isLive && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md bg-primary text-neutral-900 animate-pulse inline-flex items-center gap-1.5">
            <Radio className="w-3 h-3" />
            Live
          </span>
        )}
        {event.isFeatured && !isLive && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md bg-primary text-neutral-900 inline-flex items-center gap-1.5">
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      {/* Image fallback handled by bg-neutral-200 on container */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Calendar className="w-16 h-16 text-neutral-400" />
      </div>
    </motion.div>
  );
}
