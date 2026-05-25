import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 3) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-10 px-4">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-white/50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-colors text-xs sm:text-sm"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-neutral-400 text-xs sm:text-sm">
            •••
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-neutral-900 shadow-sm font-semibold'
                : 'border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-white/50 hover:border-primary hover:text-primary'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-white/50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-colors text-xs sm:text-sm"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;