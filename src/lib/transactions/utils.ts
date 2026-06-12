import type {
  DateRangePreset,
  ItemType,
  PaginationResult,
  PaymentMethodGroup,
  PaymentMethodId,
  Transaction,
  TransactionFilter,
  TransactionSortBy,
  TransactionStats,
  TransactionStatus,
} from "./types";

const MONTH_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const STATUS_LABELS: Record<TransactionStatus, string> = {
  berhasil: "Berhasil",
  tertunda: "Tertunda",
  gagal: "Gagal",
  refund: "Refund",
  expired: "Expired",
};

const PAYMENT_LABELS: Record<PaymentMethodId, string> = {
  gopay: "GoPay",
  ovo: "OVO",
  dana: "DANA",
  shopeepay: "ShopeePay",
  bca_va: "BCA Virtual Account",
  mandiri_va: "Mandiri Virtual Account",
  bni_va: "BNI Virtual Account",
  visa: "Visa",
  mastercard: "Mastercard",
};

const PAYMENT_GROUP_LABELS: Record<PaymentMethodGroup, string> = {
  ewallet: "E-Wallet",
  virtualaccount: "Virtual Account",
  creditcard: "Kartu Kredit/Debit",
};

const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  course: "Kursus",
  product: "Aset",
  event: "Acara",
};

export function getStatusLabel(status: TransactionStatus): string {
  return STATUS_LABELS[status] ?? status;
}
export function getPaymentLabel(id: PaymentMethodId): string {
  return PAYMENT_LABELS[id] ?? id;
}
export function getPaymentGroupLabel(group: PaymentMethodGroup): string {
  return PAYMENT_GROUP_LABELS[group] ?? group;
}
export function getItemTypeLabel(type: ItemType): string {
  return ITEM_TYPE_LABELS[type] ?? type;
}

export function getPaymentLogo(id: PaymentMethodId): string {
  const map: Record<PaymentMethodId, string> = {
    gopay: "/images/Payment=GoPay.svg",
    ovo: "/images/Payment=OVO.svg",
    dana: "/images/Payment=DANA.svg",
    shopeepay: "/images/Payment=ShopeePay.svg",
    bca_va: "/images/Payment=BCA Virtual Account.svg",
    mandiri_va: "/images/Payment=Mandiri Virtual Account.svg",
    bni_va: "/images/Payment=BNI Virtual Account.svg",
    visa: "/images/Payment=Visa.svg",
    mastercard: "/images/Payment=Mastercard.svg",
  };
  return map[id];
}

export function getPaymentGroup(id: PaymentMethodId): PaymentMethodGroup {
  if (["gopay", "ovo", "dana", "shopeepay"].includes(id)) return "ewallet";
  if (["bca_va", "mandiri_va", "bni_va"].includes(id)) return "virtualaccount";
  return "creditcard";
}

export function getPaymentSublabel(id: PaymentMethodId): string {
  const map: Record<PaymentMethodId, string> = {
    gopay: "Proses instan",
    ovo: "Proses 1x24 jam",
    dana: "Proses instan",
    shopeepay: "Proses instan",
    bca_va: "Tidak ada biaya admin",
    mandiri_va: "Biaya admin Rp 2.500",
    bni_va: "Biaya admin Rp 2.500",
    visa: "Kartu kredit & debit Visa",
    mastercard: "Kartu kredit & debit Mastercard",
  };
  return map[id];
}

export function formatRupiah(value: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTH_ID[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}`;
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}`;
}

export function formatRelativeTime(iso: string): string {
  const NOW = new Date("2026-06-09T10:00:00Z").getTime();
  const ts = new Date(iso).getTime();
  const diff = NOW - ts;
  const absDiff = Math.abs(diff);
  const future = diff < 0;
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60)
    return future ? `Dalam ${minutes} menit` : `${minutes} menit yang lalu`;
  if (hours < 24)
    return future ? `Dalam ${hours} jam` : `${hours} jam yang lalu`;
  if (days < 30)
    return future ? `Dalam ${days} hari` : `${days} hari yang lalu`;
  const months = Math.floor(days / 30);
  return future ? `Dalam ${months} bulan` : `${months} bulan yang lalu`;
}

export function formatCountdown(iso: string): string {
  const NOW = new Date("2026-06-09T10:00:00Z").getTime();
  const target = new Date(iso).getTime();
  const diff = target - NOW;
  if (diff <= 0) return "Sudah expired";
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours >= 1) return `${hours} jam ${minutes} menit lagi`;
  return `${minutes} menit lagi`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

// =================== Filter / Sort / Paginate ===================

function inDatePreset(
  iso: string,
  preset: DateRangePreset,
  customFrom: string,
  customTo: string,
): boolean {
  const NOW = new Date("2026-06-09T10:00:00Z").getTime();
  const ts = new Date(iso).getTime();
  if (preset === "all") return true;
  if (preset === "custom") {
    const from = customFrom ? new Date(customFrom).getTime() : 0;
    const to = customTo ? new Date(customTo).getTime() + 86400000 : Infinity;
    return ts >= from && ts < to;
  }
  const day = 86400000;
  if (preset === "today") {
    const start = new Date("2026-06-09T00:00:00Z").getTime();
    return ts >= start;
  }
  if (preset === "7days") return NOW - ts <= 7 * day;
  if (preset === "30days") return NOW - ts <= 30 * day;
  if (preset === "3months") return NOW - ts <= 90 * day;
  if (preset === "this_month") {
    const d = new Date(iso);
    const n = new Date(NOW);
    return d.getUTCFullYear() === n.getUTCFullYear() && d.getUTCMonth() === n.getUTCMonth();
  }
  return true;
}

export function filterTransactions(
  list: Transaction[],
  filters: TransactionFilter,
): Transaction[] {
  const search = filters.search.toLowerCase().trim();
  return list.filter((t) => {
    if (search) {
      const haystack = `${t.invoiceNumber} ${t.user.name} ${t.user.email} ${t.items.map((i) => i.itemName).join(" ")}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.status !== "all" && t.status !== filters.status) return false;
    if (filters.itemType !== "all" && !t.items.some((i) => i.itemType === filters.itemType)) return false;
    if (filters.paymentGroup !== "all" && t.paymentMethodGroup !== filters.paymentGroup) return false;
    if (filters.paymentMethod !== "all" && t.paymentMethod !== filters.paymentMethod) return false;
    if (!inDatePreset(t.createdAt, filters.datePreset, filters.customDateFrom, filters.customDateTo)) return false;
    return true;
  });
}

export function sortTransactions(
  list: Transaction[],
  sortBy: TransactionSortBy,
): Transaction[] {
  const sorted = [...list];
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "amount_high":
      return sorted.sort((a, b) => b.total - a.total);
    case "amount_low":
      return sorted.sort((a, b) => a.total - b.total);
    default:
      return sorted;
  }
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  return {
    data: items.slice(startIndex, endIndex),
    totalPages,
    totalItems,
    startIndex: startIndex + 1,
    endIndex,
  };
}

export function countTransactionStats(
  list: Transaction[],
): TransactionStats {
  const stats: TransactionStats = {
    total: list.length,
    berhasil: 0,
    tertunda: 0,
    gagal: 0,
    refund: 0,
    expired: 0,
    monthRevenue: 0,
    lastMonthRevenue: 0,
    totalRevenue: 0,
  };
  const NOW = new Date("2026-06-09T10:00:00Z");
  const monthStart = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), 1)).getTime();
  const lastMonthStart = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth() - 1, 1)).getTime();
  list.forEach((t) => {
    if (t.status === "berhasil") stats.berhasil += 1;
    else if (t.status === "tertunda") stats.tertunda += 1;
    else if (t.status === "gagal") stats.gagal += 1;
    else if (t.status === "refund") stats.refund += 1;
    else if (t.status === "expired") stats.expired += 1;
    const ts = new Date(t.createdAt).getTime();
    if (t.status === "berhasil") {
      stats.totalRevenue += t.total;
      if (ts >= monthStart) stats.monthRevenue += t.total;
      else if (ts >= lastMonthStart && ts < monthStart) stats.lastMonthRevenue += t.total;
    }
  });
  return stats;
}

export function hasActiveFilters(filters: TransactionFilter): boolean {
  return (
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.itemType !== "all" ||
    filters.paymentGroup !== "all" ||
    filters.paymentMethod !== "all" ||
    filters.datePreset !== "all" ||
    filters.sortBy !== "newest"
  );
}

export function maskCardNumber(num: string): string {
  if (!num) return "";
  const last4 = num.slice(-4);
  return `**** **** **** ${last4}`;
}

// =================== CSV Export ===================

export function generateTransactionsCSV(list: Transaction[]): string {
  const header = [
    "No. Invoice",
    "Tanggal",
    "Pengguna",
    "Email",
    "Item",
    "Tipe",
    "Metode Pembayaran",
    "Group",
    "Subtotal",
    "Diskon",
    "Biaya Admin",
    "Total",
    "Status",
  ];
  const rows = list.map((t) => {
    const itemSummary = t.items.map((i) => i.itemName).join("; ");
    const typeSummary = t.items.map((i) => getItemTypeLabel(i.itemType)).join("; ");
    return [
      t.invoiceNumber,
      t.createdAt.substring(0, 10),
      `"${t.user.name.replace(/"/g, '""')}"`,
      t.user.email,
      `"${itemSummary.replace(/"/g, '""')}"`,
      `"${typeSummary}"`,
      getPaymentLabel(t.paymentMethod),
      getPaymentGroupLabel(t.paymentMethodGroup),
      t.subtotal,
      t.discount,
      t.adminFee,
      t.total,
      getStatusLabel(t.status),
    ].join(",");
  });
  return "\uFEFF" + [header.join(","), ...rows].join("\n");
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
