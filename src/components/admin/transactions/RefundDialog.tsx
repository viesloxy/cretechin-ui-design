"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, AlertCircle } from "lucide-react";
import type { Transaction } from "@/lib/transactions/types";
import { formatRupiah, getPaymentLabel } from "@/lib/transactions/utils";

interface RefundDialogProps {
  open: boolean;
  transaction: Transaction | null;
  onConfirm: (data: { type: "full" | "partial"; amount: number; reason: string; notify: boolean }) => void;
  onCancel: () => void;
}

export function RefundDialog({
  open,
  transaction,
  onConfirm,
  onCancel,
}: RefundDialogProps) {
  const [type, setType] = useState<"full" | "partial">("full");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    if (transaction && open) {
      setType("full");
      setAmount(transaction.total);
      setReason("");
      setNotify(true);
    }
  }, [transaction, open]);

  if (!transaction) return null;

  const reasonValid = reason.trim().length >= 20;
  const canSubmit = reasonValid && amount > 0 && amount <= transaction.total;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onConfirm({ type, amount, reason: reason.trim(), notify });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-neutral-900"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20">
                <RotateCcw className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Proses Refund?
                </h3>
                <button
                  type="button"
                  onClick={onCancel}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-black/5 bg-neutral-50 p-3 text-sm dark:border-white/10 dark:bg-neutral-900/50">
              <p className="font-mono font-semibold text-neutral-900 dark:text-white">
                {transaction.invoiceNumber}
              </p>
              <p className="text-xs text-neutral-500">
                {transaction.user.name} · {getPaymentLabel(transaction.paymentMethod)}
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
                Total: {formatRupiah(transaction.total)}
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setType("full");
                  setAmount(transaction.total);
                }}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                  type === "full"
                    ? "border-primary bg-primary/5"
                    : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                }`}
              >
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Full
                </span>
                <span className="text-[10px] text-neutral-500">
                  Pengembalian penuh
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("partial");
                  setAmount(Math.round(transaction.total * 0.5));
                }}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                  type === "partial"
                    ? "border-primary bg-primary/5"
                    : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                }`}
              >
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Partial
                </span>
                <span className="text-[10px] text-neutral-500">
                  Pengembalian sebagian
                </span>
              </button>
            </div>

            {type === "partial" && (
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Nominal Refund
                </label>
                <input
                  type="number"
                  min={1}
                  max={transaction.total}
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      Math.min(transaction.total, Math.max(0, Number(e.target.value))),
                    )
                  }
                  className="h-10 w-full rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
                <p className="mt-1 text-[10px] text-neutral-500">
                  Maks: {formatRupiah(transaction.total)}
                </p>
              </div>
            )}

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Alasan Refund <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Jelaskan alasan refund (min 20 karakter)..."
                className="w-full rounded-xl border border-black/5 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
              {reason.length > 0 && !reasonValid && (
                <p className="mt-1 text-xs text-red-600">
                  Alasan minimal 20 karakter (saat ini: {reason.trim().length}).
                </p>
              )}
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="refund-notify"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="refund-notify"
                className="cursor-pointer text-xs text-neutral-600 dark:text-neutral-300"
              >
                Kirim email notifikasi refund ke user
              </label>
            </div>

            <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-400">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>
                Refund akan diproses dalam 1-3 hari kerja via{" "}
                {getPaymentLabel(transaction.paymentMethod)}. Status akan berubah ke
                "Refund" dan tercatat di activity log.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Konfirmasi Refund
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
