"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Clock,
  ShoppingBag,
  GraduationCap,
  Image as ImageIcon,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { formatRupiah, formatDate } from "@/lib/format";
import { getPaymentMethodLabel } from "./format";
import StatusBadge from "./StatusBadge";
import type { Transaction } from "./types";

interface TransactionCardProps {
  transaction: Transaction;
  index?: number;
  onInvoiceDownload?: (id: string) => void;
}

function TypeIcon({ type }: { type: Transaction["type"] }) {
  const size = "w-3.5 h-3.5";
  if (type === "course") return <GraduationCap className={size} />;
  if (type === "asset") return <ImageIcon className={size} />;
  if (type === "event") return <Ticket className={size} />;
  // mixed
  return <ShoppingBag className={size} />;
}

export default function TransactionCard({
  transaction,
  index = 0,
  onInvoiceDownload,
}: TransactionCardProps) {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  const canDownload =
    (transaction.status === "paid" || transaction.status === "refunded") &&
    !!transaction.invoiceDownloadUrl;

  const downloadLabel =
    transaction.status === "refunded" ? "Bukti Refund" : "Unduh Invoice";

  const handleDownload = async () => {
    if (!canDownload || !onInvoiceDownload) return;
    setDownloading(true);
    try {
      await onInvoiceDownload(transaction.id);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby={`invoice-${transaction.id}`}
      data-tx-id={transaction.id}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
    >
      {/* Header: date + status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-white/40 min-w-0">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <time
            dateTime={transaction.date}
            className="truncate"
          >
            {formatDate(transaction.date)}
          </time>
        </div>
        <StatusBadge status={transaction.status} className="flex-shrink-0" />
      </div>

      {/* Body: invoice + summary */}
      <div className="space-y-1 mb-4">
        <h3
          id={`invoice-${transaction.id}`}
          className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight"
        >
          {transaction.invoiceNumber}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-white/50">
          <TypeIcon type={transaction.type} />
          <span className="truncate">{transaction.itemSummary}</span>
        </div>
        {transaction.failureReason && (
          <p className="text-xs text-neutral-500 dark:text-white/40 italic mt-1">
            Alasan: {transaction.failureReason}
          </p>
        )}
        {transaction.status === "refunded" && transaction.refundedAt && (
          <p className="text-xs text-neutral-500 dark:text-white/40 italic mt-1">
            Dikembalikan pada {formatDate(transaction.refundedAt)}
          </p>
        )}
      </div>

      <div className="border-t border-black/5 dark:border-white/5" />

      {/* Footer: total + actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 pt-4">
        <div className="min-w-0">
          <p className="text-xs text-neutral-500 dark:text-white/40 mb-0.5">
            Total Belanja
          </p>
          <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            {formatRupiah(transaction.total)}
          </p>
          <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
            {getPaymentMethodLabel(transaction.paymentMethod)}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap sm:flex-shrink-0">
          <button
            type="button"
            onClick={() => router.push(transaction.orderDetailUrl)}
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all"
          >
            Lihat Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {canDownload ? (
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full text-sm font-medium text-neutral-700 dark:text-white/70 hover:text-primary active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              {downloading ? "Mengunduh..." : downloadLabel}
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
