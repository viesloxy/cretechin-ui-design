"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, ChevronDown, Check } from "lucide-react";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
  helpfulCount?: number;
}

interface TabReviewsProps {
  reviews: Review[];
  stats: {
    averageRating: number;
    totalReviews: number;
    distribution: number[];
  };
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
  return `${Math.floor(diffDays / 365)} tahun yang lalu`;
}

interface DropdownProps {
  label: string;
  options: { value: string | number | null; label: string }[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  icon?: React.ReactNode;
}

function CustomDropdown({ label, options, value, onChange, icon }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-4 pr-3 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm text-neutral-600 dark:text-white/50 hover:border-primary/50 transition-colors whitespace-nowrap"
      >
        {icon}
        <span>{currentLabel}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-44 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg overflow-hidden z-20"
          >
            {options.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                  option.value === value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-neutral-600 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TabReviews({ reviews, stats }: TabReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(
    Object.fromEntries(reviews.map((r) => [r.id, r.helpfulCount || 0]))
  );

  const sortOptions: { value: "recent" | "highest" | "lowest"; label: string }[] = [
    { value: "recent", label: "Terbaru" },
    { value: "highest", label: "Rated Tertinggi" },
    { value: "lowest", label: "Rated Terendah" },
  ];

  const filterOptions: { value: number | null; label: string }[] = [
    { value: null, label: "Semua Bintang" },
    { value: 5, label: "5 Bintang" },
    { value: 4, label: "4 Bintang" },
    { value: 3, label: "3 Bintang" },
    { value: 2, label: "2 Bintang" },
    { value: 1, label: "1 Bintang" },
  ];

  const filteredReviews = [...reviews]
    .filter((r) => filterRating === null || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "highest") return b.rating - a.rating;
      return a.rating - b.rating;
    });

  const handleHelpful = (reviewId: string, isHelpful: boolean) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] + (isHelpful ? 1 : -1),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Ulasan ({stats.totalReviews.toLocaleString()})
        </h2>

        <div className="flex gap-3 flex-wrap">
          <CustomDropdown
            label="Urutkan"
            options={sortOptions}
            value={sortBy}
            onChange={(v) => setSortBy(v as "recent" | "highest" | "lowest")}
          />
          <CustomDropdown
            label="Filter"
            options={filterOptions}
            value={filterRating}
            onChange={(v) => setFilterRating(v as number | null)}
          />
        </div>
      </div>

      {/* Rating Overview */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
        {/* Overall Rating */}
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-5xl font-bold text-neutral-900 dark:text-white">
            {stats.averageRating}
          </span>
          <div className="flex gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill={i < Math.floor(stats.averageRating) ? "#FBBF24" : "#E5E7EB"}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-neutral-500">dari 5</span>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-2 w-full">
          {stats.distribution.map((percent, index) => {
            const stars = 5 - index;
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-neutral-600 dark:text-white/50 w-12">
                  {stars} &#9733;
                </span>
                <div className="flex-1 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-xs text-neutral-500 w-10 text-right">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">Belum ada ulasan untuk filter ini.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {review.user.name}
                    </p>
                    <p className="text-xs text-neutral-500">{getRelativeTime(review.date)}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill={i < review.rating ? "#FBBF24" : "#E5E7EB"}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-base text-neutral-600 dark:text-white/50 leading-relaxed">
                {review.comment}
              </p>

              {/* Helpful Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-black/5 dark:border-white/5">
                <span className="text-xs text-neutral-400">Bermafaat?</span>
                <button
                  onClick={() => handleHelpful(review.id, true)}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{helpfulCounts[review.id] > 0 ? helpfulCounts[review.id] : "Ya"}</span>
                </button>
                <button
                  onClick={() => handleHelpful(review.id, false)}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-error transition-colors"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Tidak</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredReviews.length > 0 && filteredReviews.length < stats.totalReviews && (
        <div className="text-center pt-4">
          <button className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-neutral-900 transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}