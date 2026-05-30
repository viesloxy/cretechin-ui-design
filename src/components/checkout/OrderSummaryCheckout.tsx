"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "./PaymentMethodGroup";

interface OrderSummaryCheckoutProps {
  selectedMethod: PaymentMethod | null;
  onPay: () => void;
}

export default function OrderSummaryCheckout({ selectedMethod, onPay }: OrderSummaryCheckoutProps) {
  const { items, getSubtotal, getDiscount, getTotal } = useCart();
  const [isItemListOpen, setIsItemListOpen] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const shippingCost = 15000;

  const totalWithShipping = total + shippingCost;

  const discountPercentage = subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-black/5 dark:border-white/5">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Ringkasan Pesanan
        </h2>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Item count toggle */}
        <button
          onClick={() => setIsItemListOpen(!isItemListOpen)}
          className="w-full flex items-center justify-between text-sm font-medium text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <span>
            {items.length} item{items.length > 1 ? "s" : ""} dipilih
          </span>
          {isItemListOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Expanded item list */}
        <AnimatePresence>
          {isItemListOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/10">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-white/50 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-primary whitespace-nowrap">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Price Breakdown */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500 dark:text-white/50">Subtotal</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-emerald-500 flex items-center gap-1">
                Diskon {discountPercentage > 0 && `-${discountPercentage}%`}
              </span>
              <span className="text-sm font-medium text-emerald-500">
                -Rp {discount.toLocaleString("id-ID")}
              </span>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500 dark:text-white/50">Ongkos Kirim</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Rp {shippingCost.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-neutral-900 dark:text-white">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">
              Rp {totalWithShipping.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={onPay}
          disabled={!selectedMethod}
          className={`w-full h-12 sm:h-14 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            selectedMethod
              ? "bg-primary text-neutral-900 hover:bg-primary-dark active:scale-95"
              : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed opacity-60"
          }`}
        >
          <span>Bayar Sekarang</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 dark:text-white/30 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Transaksi aman & terenkripsi 128-bit</span>
        </div>
      </div>
    </div>
  );
}