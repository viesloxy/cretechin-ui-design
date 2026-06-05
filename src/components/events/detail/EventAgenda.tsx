"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { AgendaItem } from "./types";

interface EventAgendaProps {
  agenda?: AgendaItem[];
}

export default function EventAgenda({ agenda }: EventAgendaProps) {
  if (!agenda || agenda.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Agenda Acara
      </h2>

      <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden">
        {agenda.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 p-4 ${
              idx < agenda.length - 1
                ? "border-b border-black/5 dark:border-white/5"
                : ""
            }`}
          >
            <div className="w-24 sm:w-32 flex-shrink-0">
              <p className="text-sm font-semibold text-primary">{item.time}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-neutral-700 dark:text-white/70 font-medium">
                {item.title}
              </p>
              {item.description && (
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-white/40 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
