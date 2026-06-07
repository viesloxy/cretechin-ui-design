"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import { useToast } from "@/components/ui/Toast";
import {
  TransactionsHeader,
  TransactionStatusTabs,
  TransactionsSummaryCards,
  AdvancedFilters,
  TransactionCard,
  TransactionsEmptyState,
  TransactionCardSkeleton,
  TransactionsErrorState,
  MOCK_TRANSACTIONS,
  calculateSummary,
  filterByStatus,
  filterByType,
  filterByPeriod,
  generateInvoiceText,
} from "@/components/transactions";
import type {
  Transaction,
  TransactionStatusFilter,
  TransactionTypeFilter,
  TransactionPeriodFilter,
  TransactionStatus,
} from "@/components/transactions";

const VALID_STATUS: TransactionStatusFilter[] = [
  "all",
  "paid",
  "pending",
  "failed",
  "refunded",
  "expired",
];

const VALID_TYPE: TransactionTypeFilter[] = [
  "all",
  "course",
  "asset",
  "event",
];

const VALID_PERIOD: TransactionPeriodFilter[] = [
  "7d",
  "30d",
  "90d",
  "1y",
  "all",
];

function TransactionsContent() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Read filters from URL
  const statusFromUrl = searchParams.get("status") as TransactionStatusFilter | null;
  const typeFromUrl = searchParams.get("type") as TransactionTypeFilter | null;
  const periodFromUrl = searchParams.get("period") as TransactionPeriodFilter | null;

  const statusFilter: TransactionStatusFilter =
    statusFromUrl && VALID_STATUS.includes(statusFromUrl) ? statusFromUrl : "all";
  const typeFilter: TransactionTypeFilter =
    typeFromUrl && VALID_TYPE.includes(typeFromUrl) ? typeFromUrl : "all";
  const periodFilter: TransactionPeriodFilter =
    periodFromUrl && VALID_PERIOD.includes(periodFromUrl) ? periodFromUrl : "all";

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (periodFilter !== "all") params.set("period", periodFilter);
      const query = params.toString();
      router.push(`/login?redirect=/transactions${query ? `?${query}` : ""}`);
    }
  }, [isAuthenticated, isAuthLoading, router, statusFilter, typeFilter, periodFilter]);

  // Simulate fetch
  useEffect(() => {
    if (!isAuthenticated || isAuthLoading) return;
    setIsDataLoading(true);
    setLoadError(false);
    const t = setTimeout(() => {
      try {
        setAllTransactions(MOCK_TRANSACTIONS);
      } catch {
        setLoadError(true);
      } finally {
        setIsDataLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [isAuthenticated, isAuthLoading, fetchKey]);

  // Summary (always over ALL data, not filtered)
  const summary = useMemo(
    () => calculateSummary(allTransactions),
    [allTransactions],
  );

  // Apply filters
  const filtered = useMemo(() => {
    let result = allTransactions;
    result = filterByPeriod(result, periodFilter);
    result = filterByType(result, typeFilter);
    result = filterByStatus(result, statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.invoiceNumber.toLowerCase().includes(q) ||
          t.itemSummary.toLowerCase().includes(q) ||
          t.items.some((it) => it.name.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [allTransactions, statusFilter, typeFilter, periodFilter, searchQuery]);

  // Count per status (for tab badges, always over period+type filtered)
  const counts = useMemo(() => {
    const periodAndTypeFiltered = filterByType(
      filterByPeriod(allTransactions, periodFilter),
      typeFilter,
    );
    const statusMap: Record<TransactionStatus, number> = {
      paid: 0,
      pending: 0,
      failed: 0,
      refunded: 0,
      expired: 0,
    };
    periodAndTypeFiltered.forEach((t) => {
      if (t.status === "failed" || t.status === "expired") {
        statusMap.failed += 1;
      } else {
        statusMap[t.status] += 1;
      }
    });
    return {
      all: periodAndTypeFiltered.length,
      paid: statusMap.paid,
      pending: statusMap.pending,
      failed: statusMap.failed,
      refunded: statusMap.refunded,
      expired: statusMap.expired,
    } as Record<TransactionStatusFilter, number>;
  }, [allTransactions, periodFilter, typeFilter]);

  // URL sync helper
  const updateUrl = useCallback(
    (
      next: Partial<{
        status: TransactionStatusFilter;
        type: TransactionTypeFilter;
        period: TransactionPeriodFilter;
      }>,
    ) => {
      const params = new URLSearchParams();
      const s = next.status ?? statusFilter;
      const t = next.type ?? typeFilter;
      const p = next.period ?? periodFilter;
      if (s !== "all") params.set("status", s);
      if (t !== "all") params.set("type", t);
      if (p !== "all") params.set("period", p);
      const query = params.toString();
      router.replace(`/transactions${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, statusFilter, typeFilter, periodFilter],
  );

  const handleStatusChange = (status: TransactionStatusFilter) => {
    updateUrl({ status });
  };

  const handleTypeChange = (type: TransactionTypeFilter) => {
    updateUrl({ type });
  };

  const handlePeriodChange = (period: TransactionPeriodFilter) => {
    updateUrl({ period });
  };

  const handleResetFilters = () => {
    router.replace("/transactions", { scroll: false });
  };

  const handlePendingTileClick = () => {
    updateUrl({ status: "pending" });
  };

  // Invoice download (mock — generates .txt blob)
  const handleInvoiceDownload = useCallback(
    async (transactionId: string) => {
      const tx = allTransactions.find((t) => t.id === transactionId);
      if (!tx || !tx.invoiceDownloadUrl) return;

      await new Promise((r) => setTimeout(r, 800));

      const text = generateInvoiceText(tx);
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tx.invoiceNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const label =
        tx.status === "refunded"
          ? "Bukti refund"
          : "Invoice";
      toast.success(`${label} ${tx.invoiceNumber} berhasil diunduh`);
    },
    [allTransactions, toast],
  );

  // Full-page spinner while auth is resolving
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <BerandaNavbar />
      <TransactionsHeader />

      <main className="flex-1 pb-12">
        <div className="py-4 sm:py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <TransactionsSummaryCards
              summary={summary}
              isLoading={isDataLoading}
              onPendingClick={handlePendingTileClick}
            />
          </div>

          <AdvancedFilters
            type={typeFilter}
            period={periodFilter}
            onTypeChange={handleTypeChange}
            onPeriodChange={handlePeriodChange}
            onReset={() => {
              setSearchQuery("");
              handleResetFilters();
            }}
            resultCount={filtered.length}
            totalCount={allTransactions.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TransactionStatusTabs
            activeTab={statusFilter}
            onTabChange={handleStatusChange}
            counts={counts}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {loadError ? (
              <TransactionsErrorState
                onRetry={() => setFetchKey((k) => k + 1)}
              />
            ) : isDataLoading ? (
              <div
                role="status"
                aria-label="Memuat transaksi"
                className="space-y-3 sm:space-y-4"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <TransactionCardSkeleton key={i} />
                ))}
              </div>
            ) : allTransactions.length === 0 ? (
              <TransactionsEmptyState variant="no-transactions" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${statusFilter}-${typeFilter}-${periodFilter}-${searchQuery}`}
                  id="transactions-list-panel"
                  role="tabpanel"
                  aria-live="polite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filtered.length === 0 ? (
                    <TransactionsEmptyState
                      variant="no-filter-results"
                      onAction={handleResetFilters}
                    />
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filtered.map((tx, idx) => (
                        <TransactionCard
                          key={tx.id}
                          transaction={tx}
                          index={idx}
                          onInvoiceDownload={handleInvoiceDownload}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <TransactionsContent />
      </Suspense>
    </AuthProvider>
  );
}
