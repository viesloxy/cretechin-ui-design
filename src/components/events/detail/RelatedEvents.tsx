"use client";

import { motion } from "framer-motion";
import EventCard from "../EventCard";
import type { EventItem, EventTab } from "../types";

interface RelatedEventsProps {
  currentEventId: string;
  events: EventItem[];
  tab?: EventTab;
}

export default function RelatedEvents({
  currentEventId,
  events,
  tab = "upcoming",
}: RelatedEventsProps) {
  const filtered = events
    .filter((e) => e.id !== currentEventId)
    .slice(0, 6);

  if (filtered.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        Acara Serupa
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="w-72 sm:w-80 flex-shrink-0 snap-start"
          >
            <EventCard
              event={event}
              tab={tab}
              onViewDetail={() => {
                window.location.href = `/events/${event.id}`;
              }}
              onJoinRoom={
                event.roomUrl
                  ? () => window.open(event.roomUrl!, "_blank", "noopener,noreferrer")
                  : undefined
              }
              onWatchRecording={
                event.recordingUrl
                  ? () => window.open(event.recordingUrl!, "_blank", "noopener,noreferrer")
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
