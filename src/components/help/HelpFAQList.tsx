"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Accordion from "@/components/ui/Accordion";
import type { AccordionItem } from "@/components/ui/Accordion";
import { MOCK_FAQS } from "./mockData";
import { filterFAQsByCategory, sortFAQs, searchFAQs } from "./searchLogic";
import { CATEGORY_LABELS } from "./constants";
import type { FAQ, FAQCategory } from "./types";
import FAQAnswerContent from "./FAQAnswerContent";

interface HelpFAQListProps {
  activeCategory: FAQCategory | null;
  searchQuery: string;
  onCategoryChange: (id: FAQCategory | null) => void;
  openFaqId: string | null;
  onOpenFaq: (id: string | null) => void;
  onHelpfulFeedback: (faqId: string, helpful: boolean) => void;
}

type SortMode = "popular" | "newest";

export default function HelpFAQList({
  activeCategory,
  searchQuery,
  onCategoryChange,
  openFaqId,
  onOpenFaq,
  onHelpfulFeedback,
}: HelpFAQListProps) {
  const [sort, setSort] = useState<SortMode>("popular");

  const faqs = useMemo<FAQ[]>(() => {
    let result = MOCK_FAQS;
    result = filterFAQsByCategory(result, activeCategory);

    if (searchQuery.trim().length >= 2) {
      const searchIds = new Set(
        searchFAQs(MOCK_FAQS, searchQuery).map((r) => r.id),
      );
      result = result.filter((f) => searchIds.has(f.id));
    }

    return sortFAQs(result, sort);
  }, [activeCategory, searchQuery, sort]);

  const accordionItems: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: <FAQAnswerContent faq={faq} />,
    defaultOpen: openFaqId === faq.id,
    headerExtra: faq.isNew ? (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
        BARU
      </span>
    ) : undefined,
  }));

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 w-full">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white min-w-0 flex-1"
        >
          Pertanyaan Populer
        </h2>
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 text-xs font-medium flex-shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSort("popular")}
            aria-pressed={sort === "popular"}
            className={twMerge(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors",
              sort === "popular"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white",
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Populer
          </button>
          <button
            type="button"
            onClick={() => setSort("newest")}
            aria-pressed={sort === "newest"}
            className={twMerge(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors",
              sort === "newest"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white",
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            Terbaru
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {CATEGORY_LABELS[activeCategory]}
                <button
                  type="button"
                  onClick={() => onCategoryChange(null)}
                  aria-label="Hapus filter kategori"
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className="text-xs text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70"
              >
                Lihat semua
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {faqs.length === 0 ? (
        <EmptyFAQList
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onReset={() => {
            onCategoryChange(null);
          }}
        />
      ) : (
        <Accordion
          items={accordionItems}
          variant="single"
          openIds={openFaqId ? [openFaqId] : []}
          onToggle={(id) => {
            onOpenFaq(openFaqId === id ? null : id);
          }}
        />
      )}
    </section>
  );
}

function EmptyFAQList({
  activeCategory,
  searchQuery,
  onReset,
}: {
  activeCategory: FAQCategory | null;
  searchQuery: string;
  onReset: () => void;
}) {
  if (searchQuery.trim().length >= 2) {
    return (
      <div
        role="status"
        className="text-center py-12 px-4 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl"
      >
        <p className="text-sm text-neutral-500 dark:text-white/40 mb-3">
          Tidak ada hasil untuk "{searchQuery}".
        </p>
        <button
          type="button"
          onClick={onReset}
          className="py-2 px-4 rounded-full border border-neutral-300 dark:border-white/20 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary active:scale-95 transition-all"
        >
          Lihat Semua FAQ
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="text-center py-12 px-4 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl"
    >
      <p className="text-sm text-neutral-500 dark:text-white/40 mb-1">
        Belum ada FAQ untuk kategori{" "}
        <span className="font-semibold text-neutral-700 dark:text-white/70">
          {activeCategory ? CATEGORY_LABELS[activeCategory] : "ini"}
        </span>
        .
      </p>
      <p className="text-xs text-neutral-400 dark:text-white/30 mb-3">
        Hubungi support untuk pertanyaan di kategori ini.
      </p>
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-2 px-4 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
      >
        Hubungi Support
      </a>
    </div>
  );
}
