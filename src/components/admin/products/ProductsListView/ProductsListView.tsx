"use client";

import { useMemo, useEffect } from "react";
import type { Product, ProductFilter } from "@/lib/products/types";
import { filterProducts, sortProducts, paginate, countProductsByStatus } from "@/lib/products/utils";
import ProductStatsStrip from "./ProductStats";
import ProductFilters from "./ProductFilters";
import FilterChips from "./FilterChips";
import ProductTable from "./ProductTable";
import ProductEmptyState from "./ProductEmptyState";
import ProductPagination from "./ProductPagination";

interface ProductsListViewProps {
  products: Product[];
  filters: ProductFilter;
  onFilterChange: (filters: Partial<ProductFilter>) => void;
  onResetFilters: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}

export default function ProductsListView({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  onAdd,
  onEdit,
  onDelete,
  onPreview,
}: ProductsListViewProps) {
  const stats = useMemo(() => countProductsByStatus(products), [products]);

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);
  const sorted = useMemo(() => sortProducts(filtered, filters.sortBy), [filtered, filters.sortBy]);
  const page = useMemo(
    () => paginate(sorted, filters.page, filters.perPage),
    [sorted, filters.page, filters.perPage]
  );

  // Reset to page 1 if filtered results drop below current page
  useEffect(() => {
    if (page.totalPages > 0 && filters.page > page.totalPages) {
      onFilterChange({ page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.totalPages]);

  const hasFilter =
    filters.search.trim() !== "" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.sortBy !== "newest";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black dark:text-white">
          Manajemen Produk &amp; Aset Digital
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Kelola daftar produk marketplace dan aset digital CreTechin
        </p>
      </div>

      {/* Stats */}
      <ProductStatsStrip stats={stats} />

      {/* Toolbar */}
      <ProductFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        onAdd={onAdd}
      />

      {/* Filter Chips */}
      <FilterChips
        filters={filters}
        onRemove={(key) => {
          if (key === "search") onFilterChange({ search: "", page: 1 });
          else if (key === "category") onFilterChange({ category: "all", page: 1 });
          else if (key === "status") onFilterChange({ status: "all", page: 1 });
          else if (key === "sortBy") onFilterChange({ sortBy: "newest" });
        }}
        onReset={onResetFilters}
      />

      {/* Table or Empty */}
      {products.length === 0 ? (
        <ProductEmptyState type="empty" onAdd={onAdd} />
      ) : filtered.length === 0 ? (
        <ProductEmptyState type="no_results" onReset={onResetFilters} />
      ) : (
        <>
          <ProductTable products={page.data} onEdit={onEdit} onDelete={onDelete} onPreview={onPreview} />
          <ProductPagination
            page={filters.page}
            totalPages={page.totalPages}
            totalItems={page.totalItems}
            startIndex={page.startIndex}
            endIndex={page.endIndex}
            perPage={filters.perPage}
            onPageChange={(p) => onFilterChange({ page: p })}
            onPerPageChange={(perPage) => onFilterChange({ perPage, page: 1 })}
          />
        </>
      )}

      {hasFilter && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
          Menampilkan {filtered.length} dari {products.length} produk
        </p>
      )}
    </div>
  );
}
