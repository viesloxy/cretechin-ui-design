"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  TransactionsListView,
  TransactionDetailModal,
  RefundDialog,
} from "@/components/admin/transactions";
import type {
  Transaction,
  TransactionFilter,
  TransactionStatus,
} from "@/lib/transactions/types";
import { MOCK_TRANSACTIONS } from "@/lib/transactions/mockData";
import {
  countTransactionStats,
  downloadCSV,
  generateTransactionsCSV,
} from "@/lib/transactions/utils";

const DEFAULT_FILTER: TransactionFilter = {
  search: "",
  status: "all",
  itemType: "all",
  paymentGroup: "all",
  paymentMethod: "all",
  datePreset: "all",
  customDateFrom: "",
  customDateTo: "",
  sortBy: "newest",
  page: 1,
  perPage: 10,
};

function TransactionsContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [filters, setFilters] = useState<TransactionFilter>(DEFAULT_FILTER);
  const [currentAdminName] = useState<string>("Admin Vito");

  const [detailOpen, setDetailOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const initialAutoExpireDone = useRef(false);

  // Auto-expire pending > 24 jam (mock)
  useEffect(() => {
    if (initialAutoExpireDone.current) return;
    initialAutoExpireDone.current = true;
    const NOW = new Date("2026-06-09T10:00:00Z").getTime();
    const dayMs = 86400000;
    let changed = false;
    setTransactions((prev) => {
      const next: Transaction[] = prev.map((t) => {
        if (t.status !== "tertunda") return t;
        const ts = new Date(t.createdAt).getTime();
        if (NOW - ts > dayMs) {
          changed = true;
          return {
            ...t,
            status: "expired" as const,
            updatedAt: new Date(NOW).toISOString(),
            timeline: [
              ...t.timeline,
              {
                timestamp: new Date(NOW).toISOString(),
                actor: "system" as const,
                event: "Auto-expired (>24 jam tidak dibayar)",
                type: "failed" as const,
              },
            ],
          };
        }
        return t;
      });
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  const stats = useMemo(() => countTransactionStats(transactions), [transactions]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">
            Memuat halaman...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const selected = selectedId ? transactions.find((t) => t.id === selectedId) ?? null : null;

  const showToast = (
    message: string,
    variant: "success" | "error" = "success",
  ) => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const openView = (id: string) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  const openRefund = (t: Transaction) => {
    setDetailOpen(false);
    setSelectedId(t.id);
    setRefundOpen(true);
  };

  const closeAll = () => {
    setDetailOpen(false);
    setRefundOpen(false);
    setSelectedId(null);
  };

  const handleUpdateStatus = async (data: {
    status: TransactionStatus;
    notes: string;
    notify: boolean;
  }) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!selected) return;
    const now = new Date("2026-06-09T10:00:00Z").toISOString();
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              status: data.status,
              notes: data.notes,
              updatedAt: now,
              paymentDetails:
                data.status === "berhasil" && !t.paymentDetails.paidAt
                  ? { ...t.paymentDetails, paidAt: now }
                  : t.paymentDetails,
              timeline: [
                ...t.timeline,
                {
                  timestamp: now,
                  actor: `Admin ${currentAdminName.replace(/^Admin\s+/, "")}`,
                  event: `Status diubah dari "${t.status}" ke "${data.status}". Catatan: ${data.notes}`,
                  type: data.status === "berhasil" ? "success" : data.status === "gagal" ? "failed" : "info",
                },
              ],
            }
          : t,
      ),
    );
    showToast(`Status ${selected.invoiceNumber} berhasil diperbarui`);
    closeAll();
  };

  const handleRefund = (data: {
    type: "full" | "partial";
    amount: number;
    reason: string;
    notify: boolean;
  }) => {
    if (!selected) return;
    const now = new Date("2026-06-09T10:00:00Z").toISOString();
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              status: "refund",
              notes: `Refund ${data.type} Rp ${data.amount.toLocaleString("id-ID")}: ${data.reason}`,
              updatedAt: now,
              timeline: [
                ...t.timeline,
                {
                  timestamp: now,
                  actor: `Admin ${currentAdminName.replace(/^Admin\s+/, "")}`,
                  event: `Refund ${data.type} sebesar Rp ${data.amount.toLocaleString("id-ID")} diproses. Alasan: ${data.reason}`,
                  type: "refund",
                },
              ],
            }
          : t,
      ),
    );
    showToast(`Refund ${selected.invoiceNumber} sebesar Rp ${data.amount.toLocaleString("id-ID")} telah diproses`);
    closeAll();
  };

  const handleFilterChange = (partial: Partial<TransactionFilter>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };
  const handleResetFilters = () => setFilters({ ...DEFAULT_FILTER });

  const applyFilterToList = (list: Transaction[]): Transaction[] => {
    const search = filters.search.toLowerCase().trim();
    return list.filter((t) => {
      if (search) {
        const hay = `${t.invoiceNumber} ${t.user.name} ${t.user.email} ${t.items.map((i) => i.itemName).join(" ")}`.toLowerCase();
        if (!hay.includes(search)) return false;
      }
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.itemType !== "all" && !t.items.some((i) => i.itemType === filters.itemType)) return false;
      if (filters.paymentGroup !== "all" && t.paymentMethodGroup !== filters.paymentGroup) return false;
      if (filters.paymentMethod !== "all" && t.paymentMethod !== filters.paymentMethod) return false;
      if (filters.datePreset !== "all") {
        const NOW = new Date("2026-06-09T10:00:00Z").getTime();
        const ts = new Date(t.createdAt).getTime();
        const day = 86400000;
        if (filters.datePreset === "today") {
          if (ts < new Date("2026-06-09T00:00:00Z").getTime()) return false;
        } else if (filters.datePreset === "7days" && NOW - ts > 7 * day) return false;
        else if (filters.datePreset === "30days" && NOW - ts > 30 * day) return false;
        else if (filters.datePreset === "3months" && NOW - ts > 90 * day) return false;
        else if (filters.datePreset === "this_month") {
          const d = new Date(t.createdAt);
          const n = new Date(NOW);
          if (d.getUTCFullYear() !== n.getUTCFullYear() || d.getUTCMonth() !== n.getUTCMonth()) return false;
        } else if (filters.datePreset === "custom") {
          const from = filters.customDateFrom ? new Date(filters.customDateFrom).getTime() : 0;
          const to = filters.customDateTo ? new Date(filters.customDateTo).getTime() + day : Infinity;
          if (ts < from || ts >= to) return false;
        }
      }
      return true;
    });
  };

  const handleExportCSV = () => {
    const filtered = applyFilterToList(transactions);
    const csv = generateTransactionsCSV(filtered);
    const today = new Date("2026-06-09T00:00:00Z").toISOString().substring(0, 10);
    downloadCSV(csv, `cretechin-transactions-${today}.csv`);
    showToast(`Laporan CSV berhasil diunduh (${filtered.length} baris)`);
  };

  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      const w = window.open("", "_blank", "width=900,height=700");
      if (!w) {
        showToast("Popup diblokir. Izinkan popup untuk cetak PDF.", "error");
        return;
      }
      const filtered = applyFilterToList(transactions);
      w.document.write(buildPrintHTML(filtered));
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 300);
      showToast(`Membuka jendela cetak (${filtered.length} transaksi)`);
    }
  };

  const handlePrintInvoice = (t: Transaction) => {
    if (typeof window !== "undefined") {
      const w = window.open("", "_blank", "width=900,height=700");
      if (!w) {
        showToast("Popup diblokir. Izinkan popup untuk cetak invoice.", "error");
        return;
      }
      w.document.write(buildInvoiceHTML(t));
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Sidebar />
      <div
        className={`w-full transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-4" : "lg:pl-6"
        }`}
      >
        <TopBar />
        <main className="p-4 lg:p-6 xl:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white sm:text-3xl md:text-4xl">
              Manajemen Transaksi &amp; Pendapatan
            </h1>
            <p className="mt-1 text-sm text-neutral-500 md:text-base">
              Pantau seluruh transaksi, verifikasi pembayaran, dan ekspor
              laporan keuangan CreTechin
            </p>
          </div>

          <TransactionsListView
            transactions={transactions}
            stats={stats}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
            onView={openView}
            onUpdateStatus={openView}
          />
          <div className="h-8" />
        </main>
      </div>

      <TransactionDetailModal
        open={detailOpen}
        transaction={selected}
        onClose={closeAll}
        onSave={handleUpdateStatus}
        onRefund={openRefund}
        onPrint={handlePrintInvoice}
      />

      <RefundDialog
        open={refundOpen}
        transaction={selected}
        onConfirm={handleRefund}
        onCancel={closeAll}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border px-4 py-3 shadow-lg ${
              toast.variant === "error"
                ? "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-900/20"
                : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900"
            }`}
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {toast.variant === "error" ? "⚠" : "✓"} {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =================== HTML untuk Print ===================

function buildPrintHTML(list: Transaction[]): string {
  const rows = list
    .map(
      (t) => `
    <tr>
      <td>${t.invoiceNumber}</td>
      <td>${t.createdAt.substring(0, 10)}</td>
      <td>${escapeHtml(t.user.name)}</td>
      <td>${escapeHtml(t.items.map((i) => i.itemName).join("; "))}</td>
      <td>${escapeHtml(t.paymentMethod)}</td>
      <td style="text-align:right">${t.total.toLocaleString("id-ID")}</td>
      <td>${t.status}</td>
    </tr>`,
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Laporan Transaksi CreTechin</title>
    <style>
      body{font-family:Poppins,Arial,sans-serif;padding:24px;color:#111}
      h1{font-size:20px;margin:0 0 4px}
      p{color:#555;margin:0 0 16px;font-size:12px}
      table{width:100%;border-collapse:collapse;font-size:11px}
      th,td{border:1px solid #e5e7eb;padding:6px 8px;text-align:left}
      th{background:#f9fafb;font-weight:600}
      @media print{body{padding:12mm}}
    </style></head>
    <body>
      <h1>Laporan Transaksi CreTechin</h1>
      <p>Tanggal cetak: ${new Date().toISOString().substring(0, 10)} · ${list.length} transaksi</p>
      <table><thead><tr>
        <th>Invoice</th><th>Tanggal</th><th>Pengguna</th><th>Item</th>
        <th>Metode</th><th>Total</th><th>Status</th>
      </tr></thead><tbody>${rows}</tbody></table>
    </body></html>`;
}

function buildInvoiceHTML(t: Transaction): string {
  const itemRows = t.items
    .map(
      (i) => `
    <tr>
      <td>${escapeHtml(i.itemName)} <span style="color:#999">(${i.itemType})</span></td>
      <td style="text-align:right">${i.price.toLocaleString("id-ID")}</td>
      <td style="text-align:center">${i.quantity}</td>
      <td style="text-align:right">${(i.price * i.quantity).toLocaleString("id-ID")}</td>
    </tr>`,
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${t.invoiceNumber}</title>
    <style>
      body{font-family:Poppins,Arial,sans-serif;padding:32px;color:#111;max-width:800px;margin:auto}
      .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #A4D024;padding-bottom:16px;margin-bottom:24px}
      .brand h1{margin:0;font-size:24px;color:#A4D024}
      .brand p{margin:4px 0 0;color:#555;font-size:12px}
      .invoice-meta{text-align:right}
      .invoice-meta h2{margin:0;font-size:20px;font-family:monospace}
      .invoice-meta p{margin:4px 0 0;font-size:11px;color:#555}
      h3{font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#666;margin:24px 0 8px}
      .info{font-size:12px;line-height:1.6}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
      th,td{padding:8px;border-bottom:1px solid #e5e7eb}
      th{text-align:left;background:#f9fafb}
      .totals{margin-top:8px;margin-left:auto;width:280px;font-size:12px}
      .totals div{display:flex;justify-content:space-between;padding:4px 0}
      .totals .grand{border-top:1px solid #999;padding-top:8px;margin-top:4px;font-weight:700;font-size:14px}
      .footer{margin-top:40px;text-align:center;color:#888;font-size:11px}
      @media print{body{padding:12mm}}
    </style></head>
    <body>
      <div class="head">
        <div class="brand">
          <h1>CreTechin</h1>
          <p>Platform Edukasi &amp; Aset Digital Kreatif</p>
        </div>
        <div class="invoice-meta">
          <h2>${t.invoiceNumber}</h2>
          <p>${t.createdAt.substring(0, 10)}</p>
        </div>
      </div>
      <h3>Tagihan Kepada</h3>
      <div class="info">
        <strong>${escapeHtml(t.user.name)}</strong><br/>
        ${escapeHtml(t.user.email)}<br/>
        ${t.userId}
      </div>
      <h3>Rincian Pesanan</h3>
      <table><thead><tr>
        <th>Item</th><th style="text-align:right">Harga</th><th style="text-align:center">Qty</th><th style="text-align:right">Subtotal</th>
      </tr></thead><tbody>${itemRows}</tbody></table>
      <div class="totals">
        <div><span>Subtotal</span><span>Rp ${t.subtotal.toLocaleString("id-ID")}</span></div>
        ${t.discount > 0 ? `<div><span>Diskon ${t.discountCode ?? ""}</span><span>- Rp ${t.discount.toLocaleString("id-ID")}</span></div>` : ""}
        ${t.adminFee > 0 ? `<div><span>Biaya Admin</span><span>+ Rp ${t.adminFee.toLocaleString("id-ID")}</span></div>` : ""}
        <div class="grand"><span>TOTAL</span><span>Rp ${t.total.toLocaleString("id-ID")}</span></div>
      </div>
      <h3>Metode Pembayaran</h3>
      <div class="info">${t.paymentMethod} (${t.paymentMethodGroup})</div>
      <div class="footer">Terima kasih telah berbelanja di CreTechin.</div>
    </body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function AdminTransactionsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <TransactionsContent />
      </AdminProvider>
    </AuthProvider>
  );
}
