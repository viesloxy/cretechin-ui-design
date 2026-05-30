"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import type { PaymentMethod } from "./PaymentMethodGroup";

interface MobileBottomBarProps {
  total: number;
  selectedMethod: PaymentMethod | null;
  onPay: () => void;
  isProcessing?: boolean;
}

export default function MobileBottomBar({
  total,
  selectedMethod,
  onPay,
  isProcessing = false,
}: MobileBottomBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-4 flex items-center gap-4"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Total</p>
        <p className="text-lg font-bold text-primary">
          Rp {total.toLocaleString("id-ID")}
        </p>
      </div>
      <button
        onClick={onPay}
        disabled={!selectedMethod || isProcessing}
        className={`h-12 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 ${
          selectedMethod && !isProcessing
            ? "bg-primary text-neutral-900 hover:bg-primary-dark active:scale-95"
            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed opacity-60"
        }`}
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Bayar Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.div>
  );
}