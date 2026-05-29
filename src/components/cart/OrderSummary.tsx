"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, ChevronDown, Ticket, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MotionButton from "@/components/ui/MotionButton";

interface OrderSummaryProps {
  onCheckout: () => void;
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const { items, getSubtotal, getDiscount, getTotal, promoCode, applyPromo, removePromo } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const isEmpty = items.length === 0;

  const handleApplyPromo = async () => {
    if (!promoInput.trim() || isApplying) return;
    setIsApplying(true);
    await applyPromo(promoInput.trim());
    setIsApplying(false);
    setPromoInput("");
  };

  const discountPercentage = promoCode && subtotal > 0
    ? Math.round((discount / subtotal) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-black/5 dark:border-white/5">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Ringkasan Pesanan
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Promo Code */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-neutral-500 dark:text-white/50" />
              <span className="text-sm font-medium text-neutral-700 dark:text-white/80">
                Kode Promo
              </span>
            </div>
            <button
              onClick={() => setIsPromoOpen(!isPromoOpen)}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            >
              {isPromoOpen ? "Tutup" : "Punya kode?"}
              <ChevronDown className={`w-3 h-3 transition-transform ${isPromoOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            {isPromoOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mb-3">
                  {promoCode ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <div>
                        <span className="text-sm font-bold text-primary">{promoCode.code}</span>
                        <p className="text-xs text-neutral-500 dark:text-white/50 mt-0.5">{promoCode.description}</p>
                      </div>
                      <button onClick={removePromo} className="p-1 rounded hover:bg-error/10 text-error transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder="Masukkan kode..."
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors"
                          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={!promoInput.trim() || isApplying}
                        className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary text-neutral-900 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                      >
                        {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pakai"}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600 dark:text-white/50">
              Subtotal ({items.length} item{items.length > 1 ? "s" : ""})
            </span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-income flex items-center gap-1">
                Diskon {discountPercentage > 0 && `-${discountPercentage}%`}
              </span>
              <span className="text-sm font-medium text-income">
                -Rp {discount.toLocaleString("id-ID")}
              </span>
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-neutral-900 dark:text-white">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <MotionButton
          label="Lanjut ke Pembayaran"
          onClick={onCheckout}
          disabled={isEmpty}
          classes="w-full"
          showIcon={false}
        />

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-white/30">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Keamanan Terjamin</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-white/30">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span>Pembayaran Aman</span>
          </div>
        </div>
      </div>
    </div>
  );
}