"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface AccordionItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
  defaultOpen?: boolean;
  /** Optional: render custom content for header right side (e.g. badge) */
  headerExtra?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "single" | "multiple";
  openIds?: string[];
  onToggle?: (id: string) => void;
  className?: string;
  itemClassName?: string;
}

export default function Accordion({
  items,
  variant = "single",
  openIds,
  onToggle,
  className,
  itemClassName,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState<string[]>(() => {
    const initial = items.filter((i) => i.defaultOpen).map((i) => i.id);
    return initial;
  });

  const isControlled = openIds !== undefined;
  const currentOpen = isControlled ? openIds! : internalOpen;

  const handleToggle = (id: string) => {
    onToggle?.(id);
    if (!isControlled) {
      setInternalOpen((prev) => {
        if (variant === "single") {
          return prev.includes(id) ? [] : [id];
        }
        return prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
      });
    }
  };

  return (
    <div className={twMerge("space-y-3 sm:space-y-4", className)}>
      {items.map((item) => {
        const isOpen = currentOpen.includes(item.id);
        return (
          <div
            key={item.id}
            className={twMerge(
              "rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden w-full",
              itemClassName,
            )}
          >
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="w-full flex items-start gap-3 px-4 py-4 sm:px-6 sm:py-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors text-left"
            >
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white leading-tight flex-1 min-w-0">
                    {item.question}
                  </span>
                  {item.headerExtra}
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 mt-0.5"
              >
                <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-white/50" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-neutral-600 dark:text-white/50 leading-relaxed break-words">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
