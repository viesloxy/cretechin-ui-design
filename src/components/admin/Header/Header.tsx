"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Calendar, Check } from "lucide-react";
import { useAdmin, Period } from "@/context/AdminContext";

const periodOptions: { value: Period; label: string }[] = [
  { value: "today", label: "Hari Ini" },
  { value: "7days", label: "7 Hari" },
  { value: "30days", label: "30 Hari" },
  { value: "year", label: "Tahun Ini" },
];

export default function DashboardHeader() {
  const { period, setPeriod } = useAdmin();
  const [open, setOpen] = useState(false);
  const [lastUpdated] = useState(new Date());

  const currentLabel = periodOptions.find((p) => p.value === period)?.label ?? "30 Hari";

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
          Dashboard Overview
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-white/40 mt-1">
          Ringkasan performa platform CreTechin
        </p>
        <p className="text-xs text-neutral-400 dark:text-white/30 mt-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Diperbarui {lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} yang lalu
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Period filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full text-sm font-medium text-neutral-700 dark:text-white/70 hover:border-primary/30 transition-colors"
          >
            <Calendar className="w-4 h-4 text-neutral-500" />
            {currentLabel}
            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 sm:left-0 mt-2 w-44 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-xl shadow-lg z-40 overflow-hidden"
                >
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setPeriod(opt.value);
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {opt.label}
                      {period === opt.value && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Export */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-neutral-900 font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Laporan</span>
        </button>
      </div>
    </div>
  );
}
