"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { EventDetail } from "./types";

interface EventDescriptionProps {
  event: EventDetail;
}

export default function EventDescription({ event }: EventDescriptionProps) {
  const hasLearnPoints = event.benefits && event.benefits.length > 0;
  const hasAudience = event.targetAudience && event.targetAudience.length > 0;
  const hasRequirements = event.requirements && event.requirements.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        Tentang Acara Ini
      </h2>

      <p className="text-sm sm:text-base text-neutral-600 dark:text-white/50 leading-relaxed whitespace-pre-line">
        {event.description}
      </p>

      {hasLearnPoints && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            Yang akan kamu dapatkan
          </h3>
          <ul className="flex flex-col gap-2">
            {event.benefits!.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm sm:text-base text-neutral-600 dark:text-white/50"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasAudience && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            Untuk siapa acara ini
          </h3>
          <ul className="flex flex-col gap-2">
            {event.targetAudience!.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm sm:text-base text-neutral-600 dark:text-white/50"
              >
                <Circle className="w-2 h-2 text-primary fill-primary flex-shrink-0 mt-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasRequirements && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            Yang perlu disiapkan
          </h3>
          <ul className="flex flex-col gap-2">
            {event.requirements!.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm sm:text-base text-neutral-600 dark:text-white/50"
              >
                <Circle className="w-2 h-2 text-primary fill-primary flex-shrink-0 mt-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}
