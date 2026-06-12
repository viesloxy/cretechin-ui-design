"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, RotateCcw, X } from "lucide-react";
import type { Transaction, TransactionStatus } from "@/lib/transactions/types";
import { TransactionHeader } from "./TransactionHeader";
import { BuyerInfoCard } from "./BuyerInfoCard";
import { OrderItemsCard } from "./OrderItemsCard";
import { PaymentInfoCard } from "./PaymentInfoCard";
import { ActivityLogCard } from "./ActivityLogCard";
import { UpdateStatusForm } from "./UpdateStatusForm";

interface TransactionDetailModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (data: { status: TransactionStatus; notes: string; notify: boolean }) => Promise<void>;
  onRefund: (transaction: Transaction) => void;
  onPrint: (transaction: Transaction) => void;
}

export function TransactionDetailModal({
  open,
  transaction,
  onClose,
  onSave,
  onRefund,
  onPrint,
}: TransactionDetailModalProps) {
  const updateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!transaction) return null;

  const canRefund =
    transaction.status === "berhasil" || transaction.status === "tertunda";

  const scrollToUpdate = () => {
    updateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 flex h-[90vh] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-neutral-900"
            role="dialog"
            aria-modal="true"
          >
            <TransactionHeader transaction={transaction} onClose={onClose} />

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-5">
                <BuyerInfoCard transaction={transaction} />
                <OrderItemsCard transaction={transaction} />
                <PaymentInfoCard transaction={transaction} />
                <ActivityLogCard transaction={transaction} />
                <div ref={updateRef}>
                  <UpdateStatusForm transaction={transaction} onSave={onSave} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/5 bg-white px-6 py-3 dark:border-white/10 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPrint(transaction)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  <Printer className="h-4 w-4" />
                  Cetak Invoice
                </button>
                {canRefund && (
                  <button
                    type="button"
                    onClick={() => onRefund(transaction)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:bg-neutral-800 dark:hover:bg-red-900/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refund
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollToUpdate}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Ke Form Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/5 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  <X className="h-4 w-4" />
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
