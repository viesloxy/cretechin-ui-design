"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Course, CourseSortBy } from "@/lib/courses/types";
import {
  filterCourses,
  paginate,
  sortCourses,
} from "@/lib/courses/utils";
import {
  CATEGORY_FILTER_OPTIONS,
  LEVEL_FILTER_OPTIONS,
} from "@/lib/courses/mockData";
import CourseFilters from "./CourseFilters";
import CourseTable from "./CourseTable";
import CourseEmptyState from "./CourseEmptyState";
import CoursePagination from "./CoursePagination";

interface CoursesListViewProps {
  courses: Course[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onSyllabus: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CoursesListView({
  courses,
  onAdd,
  onEdit,
  onSyllabus,
  onPreview,
  onDelete,
}: CoursesListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<CourseSortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<10 | 25 | 50>(10);

  const filtered = useMemo(() => {
    const f = filterCourses(courses, searchQuery, categoryFilter, levelFilter, statusFilter);
    return sortCourses(f, sortBy);
  }, [courses, searchQuery, categoryFilter, levelFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = paginate(filtered, safePage, perPage);

  const hasFilter =
    searchQuery !== "" ||
    categoryFilter !== "all" ||
    levelFilter !== "all" ||
    statusFilter !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setLevelFilter("all");
    setStatusFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const stats = useMemo(() => {
    return {
      total: courses.length,
      published: courses.filter((c) => c.status === "published").length,
      draft: courses.filter((c) => c.status === "draft").length,
      comingSoon: courses.filter((c) => c.status === "coming_soon").length,
    };
  }, [courses]);

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
            Manajemen Kursus &amp; Kelas
          </h1>
          <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50 mt-3">
            Kelola semua kursus online CreTechin. Buat kursus baru, atur silabus, dan kelola harga.
          </p>
          <div className="flex items-center gap-3 mt-4 text-xs">
            <span className="text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">{stats.total}</span> total
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-green-700 dark:text-green-400">
              <span className="font-semibold">{stats.published}</span> published
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">{stats.draft}</span> draft
            </span>
            {stats.comingSoon > 0 && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span className="text-amber-700 dark:text-amber-400">
                  <span className="font-semibold">{stats.comingSoon}</span> coming soon
                </span>
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="h-10 px-4 md:px-5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tambah Kursus Baru</span>
          <span className="sm:hidden">Tambah</span>
        </button>
      </section>

      {/* Filters */}
      <CourseFilters
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        levelFilter={levelFilter}
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
        onLevelChange={(l) => {
          setLevelFilter(l);
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
        levelOptions={LEVEL_FILTER_OPTIONS}
      />

      {/* Table or Empty State */}
      {pageItems.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5">
          <CourseEmptyState
            hasFilter={hasFilter}
            onAdd={onAdd}
            onReset={handleResetFilters}
          />
        </div>
      ) : (
        <>
          <CourseTable
            courses={pageItems}
            onEdit={onEdit}
            onSyllabus={onSyllabus}
            onDelete={onDelete}
            onPreview={onPreview}
          />
          <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden -mt-4">
            <CoursePagination
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
