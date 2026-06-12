"use client";

import { useMemo } from "react";
import type {
  Transaction,
  TransactionFilter,
  TransactionStats as TransactionStatsType,
} from "@/lib/transactions/types";
import {
  filterTransactions,
  hasActiveFilters,
  paginate,
  sortTransactions,
} from "@/lib/transactions/utils";
import { TransactionStats } from "./TransactionStats";
import { TransactionToolbar } from "./TransactionToolbar";
import { FilterChips } from "./FilterChips";
import { TransactionTable } from "./TransactionTable";
import { TransactionEmptyState } from "./TransactionEmptyState";
import { TransactionPagination } from "./TransactionPagination";

interface TransactionsListViewProps {
  transactions: Transaction[];
  stats: TransactionStatsType;
  filters: TransactionFilter;
  onFilterChange: (next: Partial<TransactionFilter>) => void;
  onResetFilters: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  onView: (id: string) => void;
  onUpdateStatus: (id: string) => void;
}

export function TransactionsListView({
  transactions,
  stats,
  filters,
  onFilterChange,
  onResetFilters,
  onExportCSV,
  onExportPDF,
  onView,
  onUpdateStatus,
}: TransactionsListViewProps) {
  const filtered = useMemo(
    () => sortTransactions(filterTransactions(transactions, filters), filters.sortBy),
    [transactions, filters],
  );
  const pagination = useMemo(
    () => paginate(filtered, filters.page, filters.perPage),
    [filtered, filters.page, filters.perPage],
  );
  const active = hasActiveFilters(filters);

  return (
    <div className="space-y-6">
      <TransactionStats stats={stats} />
      <TransactionToolbar
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        onExportCSV={onExportCSV}
        onExportPDF={onExportPDF}
        hasActiveFilters={active}
      />
      {active && (
        <FilterChips
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
        />
      )}
      {filtered.length === 0 ? (
        <TransactionEmptyState
          variant={transactions.length === 0 ? "no-data" : "no-results"}
          onReset={transactions.length > 0 ? onResetFilters : undefined}
        />
      ) : (
        <>
          <TransactionTable
            transactions={pagination.data}
            startIndex={pagination.startIndex}
            onView={onView}
            onUpdateStatus={onUpdateStatus}
          />
          <TransactionPagination
            pagination={pagination}
            perPage={filters.perPage}
            onPageChange={(p) => onFilterChange({ page: p })}
            onPerPageChange={(n) => onFilterChange({ perPage: n, page: 1 })}
          />
        </>
      )}
    </div>
  );
}
