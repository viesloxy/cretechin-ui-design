"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Transaction, TransactionStatus } from "@/lib/transactions/types";
import { getStatusLabel } from "@/lib/transactions/utils";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface UpdateStatusFormProps {
  transaction: Transaction;
  onSave: (data: { status: TransactionStatus; notes: string; notify: boolean }) => Promise<void>;
}

const STATUS_OPTIONS: TransactionStatus[] = ["berhasil", "tertunda", "gagal"];

const STATUS_HELPER: Record<TransactionStatus, string> = {
  berhasil: "Konfirmasi pembayaran manual — user sudah membayar via transfer.",
  tertunda: "Tandai sebagai menunggu konfirmasi payment gateway.",
  gagal: "Tandai pembayaran gagal (saldo tidak cukup, user cancel, atau ditolak).",
  refund: "Gunakan tombol Refund di footer untuk proses pengembalian dana.",
  expired: "Auto-set oleh sistem — tidak bisa diubah manual.",
};

export function UpdateStatusForm({ transaction, onSave }: UpdateStatusFormProps) {
  const [status, setStatus] = useState<TransactionStatus>(transaction.status);
  const [notes, setNotes] = useState(transaction.notes ?? "");
  const [notify, setNotify] = useState(true);
  const [saving, setSaving] = useState(false);

  const isReadOnly =
    transaction.status === "berhasil" ||
    transaction.status === "refund" ||
    transaction.status === "expired";
  const dirty = status !== transaction.status;
  const isManualSettle = transaction.status === "tertunda" && status === "berhasil";
  const minLen = isManualSettle ? 20 : 10;
  const notesValid = notes.trim().length >= minLen;
  const canSave = !isReadOnly && dirty && notesValid && !saving;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    try {
      await onSave({ status, notes: notes.trim(), notify });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Update Status (Manual)
      </h4>
      <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-neutral-900/50">
        {isReadOnly ? (
          <div className="flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Status tidak bisa diubah manual.</p>
              <p className="mt-0.5 text-[11px]">
                Transaksi dengan status <strong>{getStatusLabel(transaction.status)}</strong>{" "}
                bersifat final. Untuk perubahan, gunakan tombol Refund di footer.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Status Baru
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TransactionStatus)}
                className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {getStatusLabel(opt)}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-neutral-500">{STATUS_HELPER[status]}</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Catatan Admin <span className="text-red-500">*</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder={`Wajib diisi (min ${minLen} karakter). Contoh: "Verifikasi manual via mutasi bank BCA tgl 15/6"`}
                className="w-full rounded-xl border border-black/5 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
              {notes.length > 0 && !notesValid && (
                <p className="mt-1 text-xs text-red-600">
                  Catatan minimal {minLen} karakter (saat ini: {notes.trim().length}).
                </p>
              )}
            </div>

            <ToggleSwitch
              checked={notify}
              onChange={setNotify}
              label="Kirim email notifikasi ke user"
              description="User akan menerima email tentang perubahan status transaksi"
            />

            {isManualSettle && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-400">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  <strong>Override manual:</strong> Anda akan mengonfirmasi pembayaran di luar
                  callback payment gateway. Pastikan dana sudah benar-benar masuk.
                </p>
              </div>
            )}

            {canSave && (
              <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1.5 text-[11px] text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Siap disimpan</span>
              </div>
            )}
          </div>
        )}
      </div>

      {!isReadOnly && (
        <div className="mt-3 flex items-center justify-end">
          <button
            type="submit"
            disabled={!canSave}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan Status"}
          </button>
        </div>
      )}
    </form>
  );
}
