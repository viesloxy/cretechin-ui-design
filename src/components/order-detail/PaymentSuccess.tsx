"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  price: number;
  badge?: string;
}

interface PaymentSuccessProps {
  amount: number;
  methodName: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default function PaymentSuccess({
  amount,
  methodName,
  orderId,
  items,
  subtotal,
  shipping,
}: PaymentSuccessProps) {
  const now = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 dark:shadow-black/40 text-center"
    >
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center"
      >
        <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2"
      >
        Pembayaran Berhasil!
      </motion.h2>

      {/* Amount */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-xl font-bold text-primary mb-1"
      >
        Rp {amount.toLocaleString("id-ID")}
      </motion.p>

      {/* Method & Date */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-sm text-neutral-500 dark:text-white/50"
      >
        via {methodName} &bull; {formatDate(now)}
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-black/5 dark:border-white/10 my-6"
      />

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-left mb-6"
      >
        <p className="text-sm font-semibold text-neutral-700 dark:text-white/80 mb-3">
          Ringkasan Pembelian
        </p>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-white/50 line-clamp-1 flex-1 pr-4">
                {item.title}
              </span>
              <span className="text-neutral-900 dark:text-white font-medium flex-shrink-0">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t border-black/5 dark:border-white/10">
            <span className="text-neutral-500 dark:text-white/50">Ongkos Kirim</span>
            <span className="text-neutral-900 dark:text-white font-medium">
              Rp {shipping.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-black/5 dark:border-white/10">
            <span className="text-neutral-900 dark:text-white">TOTAL</span>
            <span className="text-primary">
              Rp {amount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/products"
          className="block w-full py-3 px-6 rounded-full bg-primary text-black font-semibold text-base text-center hover:bg-primary-dark transition-colors"
        >
          Lihat Marketplace CreTechin
        </Link>
        <Link
          href="/beranda"
          className="block w-full py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white font-semibold text-base text-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </motion.div>
  );
}