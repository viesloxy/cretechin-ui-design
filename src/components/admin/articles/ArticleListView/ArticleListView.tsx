"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, Send, X } from "lucide-react";
import type { Article, ArticleStatus, SortBy } from "@/lib/articles/types";
import {
  filterArticles,
  paginate,
  sortArticles,
} from "@/lib/articles/utils";
import { CATEGORY_FILTER_OPTIONS } from "@/lib/articles/mockData";
import ArticleFilters from "./ArticleFilters";
import ArticleTable from "./ArticleTable";
import ArticleEmptyState from "./ArticleEmptyState";
import ArticlePagination from "./ArticlePagination";

interface ArticleListViewProps {
  articles: Article[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onTogglePublish: (id: string) => void;
}

export default function ArticleListView({
  articles,
  onAdd,
  onEdit,
  onPreview,
  onDelete,
  onBulkDelete,
  onTogglePublish,
}: ArticleListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<10 | 25 | 50>(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const f = filterArticles(articles, searchQuery, categoryFilter, statusFilter);
    return sortArticles(f, sortBy);
  }, [articles, searchQuery, categoryFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = paginate(filtered, safePage, perPage);

  const hasFilter =
    searchQuery !== "" || categoryFilter !== "all" || statusFilter !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === pageItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pageItems.map((a) => a.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section
        className="
          py-8 md:py-10 bg-gradient-to-br from-primary/5 to-transparent
          border-b border-black/5 dark:border-white/5
          -mt-4 lg:-mt-6 xl:-mt-8
          -mx-4 lg:-mx-6 xl:-mx-8
          px-4 lg:px-6 xl:px-8
          flex flex-col md:flex-row md:items-end md:justify-between gap-4
        "
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black dark:text-white">
            Manajemen Artikel &amp; Blog
          </h1>
          <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50 mt-3">
            Kelola semua artikel &amp; blog CreTechin. Buat, edit, dan publikasikan konten untuk komunitas.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {selectedIds.length > 0 && (
            <>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 hidden sm:inline">
                {selectedIds.length} dipilih
              </span>
              <button
                type="button"
                onClick={() => onBulkDelete(selectedIds)}
                className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-primary hover:text-primary transition-colors"
                aria-label="Batalkan pilihan"
                title="Batalkan pilihan"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onAdd}
            className="h-10 px-4 md:px-5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Artikel Baru</span>
            <span className="sm:hidden">Tambah</span>
          </button>
        </div>
      </section>

      {/* Filters */}
      <ArticleFilters
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onCategoryChange={(c) => {
          setCategoryFilter(c);
          setCurrentPage(1);
        }}
        onStatusChange={(s) => {
          setStatusFilter(s);
          setCurrentPage(1);
        }}
        onSortChange={(s) => {
          setSortBy(s);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
        categoryOptions={CATEGORY_FILTER_OPTIONS}
      />

      {/* Table or Empty State */}
      {pageItems.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5">
          <ArticleEmptyState
            hasFilter={hasFilter}
            onAdd={onAdd}
            onReset={handleResetFilters}
          />
        </div>
      ) : (
        <>
          <ArticleTable
            articles={pageItems}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onEdit={onEdit}
            onPreview={onPreview}
            onDelete={onDelete}
            onTogglePublish={onTogglePublish}
          />
          <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden -mt-4">
            <ArticlePagination
              currentPage={safePage}
              totalPages={totalPages}
              totalItems={filtered.length}
              perPage={perPage}
              onPageChange={(p) => setCurrentPage(p)}
              onPerPageChange={(n) => {
                setPerPage(n);
                setCurrentPage(1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
