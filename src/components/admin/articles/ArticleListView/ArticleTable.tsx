"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Star,
  ArrowUpDown,
  CheckSquare,
  Square,
} from "lucide-react";
import type { Article, ArticleStatus } from "@/lib/articles/types";
import { CATEGORY_LABELS } from "@/lib/articles/types";
import { formatDate, formatNumber } from "@/lib/articles/utils";
import { StatusBadge, ThumbnailImage } from "../shared";

interface ArticleTableProps {
  articles: Article[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const tableContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ArticleTable({
  articles,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onPreview,
  onDelete,
  onTogglePublish,
}: ArticleTableProps) {
  const allSelected = articles.length > 0 && selectedIds.length === articles.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800">
            <tr>
              <th scope="col" className="px-4 py-3 w-10">
                <button
                  type="button"
                  onClick={onToggleSelectAll}
                  className="flex items-center justify-center w-5 h-5 rounded text-neutral-500 hover:text-primary transition-colors"
                  aria-label={allSelected ? "Batalkan semua pilihan" : "Pilih semua"}
                >
                  {allSelected ? (
                    <CheckSquare className="w-4 h-4 text-primary" />
                  ) : someSelected ? (
                    <CheckSquare className="w-4 h-4 text-primary opacity-50" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <SortHeader label="Artikel" />
              </th>
              <th scope="col" className="px-4 py-3 text-left w-40">
                Penulis
              </th>
              <th scope="col" className="px-4 py-3 text-left w-36">
                <SortHeader label="Tanggal" />
              </th>
              <th scope="col" className="px-4 py-3 text-left w-28">
                <SortHeader label="Views" />
              </th>
              <th scope="col" className="px-4 py-3 text-left w-32">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right w-32">
                Aksi
              </th>
            </tr>
          </thead>
          <motion.tbody
            variants={tableContainerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-neutral-100 dark:divide-neutral-800"
          >
            {articles.map((article) => {
              const isSelected = selectedIds.includes(article.id);
              return (
                <motion.tr
                  key={article.id}
                  variants={rowVariants}
                  className={`
                    transition-colors
                    ${isSelected ? "bg-primary/5" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/30"}
                  `}
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onToggleSelect(article.id)}
                      className="flex items-center justify-center w-5 h-5 rounded text-neutral-500 hover:text-primary transition-colors"
                      aria-label={isSelected ? "Batalkan pilihan" : "Pilih baris"}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-primary" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <ThumbnailImage
                        src={article.thumbnail?.url}
                        alt={article.title}
                        size={56}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-1.5">
                          <h4 className="font-semibold text-sm leading-snug line-clamp-2 text-neutral-900 dark:text-white">
                            {article.title}
                          </h4>
                          {article.featured && (
                            <Star
                              className="w-3.5 h-3.5 fill-primary text-primary flex-shrink-0 mt-0.5"
                              aria-label="Artikel unggulan"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
                            {CATEGORY_LABELS[article.category]}
                          </span>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">
                            • {article.readTime} min baca
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 text-primary-dark text-xs font-bold">
                        {article.author.name.charAt(0)}
                      </div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                        {article.author.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {formatDate(article.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                      <Eye className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{formatNumber(article.views)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        onTogglePublish(article.id)
                      }
                      className="inline-block"
                      aria-label={`Toggle publish untuk ${article.title}`}
                      title="Klik untuk ubah status"
                    >
                      <StatusBadge status={article.status} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton
                        onClick={() => onPreview(article.id)}
                        ariaLabel={`Preview artikel ${article.title}`}
                        title="Preview"
                        icon={Eye}
                        hoverClass="hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-white"
                        iconClass="text-neutral-500 dark:text-neutral-400"
                      />
                      <ActionButton
                        onClick={() => onEdit(article.id)}
                        ariaLabel={`Edit artikel ${article.title}`}
                        title="Edit"
                        icon={Pencil}
                        hoverClass="hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-white"
                        iconClass="text-neutral-700 dark:text-neutral-300"
                      />
                      <ActionButton
                        onClick={() => onDelete(article.id)}
                        ariaLabel={`Hapus artikel ${article.title}`}
                        title="Hapus"
                        icon={Trash2}
                        hoverClass="hover:bg-red-50 dark:hover:bg-red-900/20"
                        iconClass="text-red-500"
                      />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

function SortHeader({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );
}

function ActionButton({
  onClick,
  ariaLabel,
  title,
  icon: Icon,
  hoverClass,
  iconClass,
}: {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverClass: string;
  iconClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${hoverClass}`}
    >
      <Icon className={`w-4 h-4 ${iconClass}`} />
    </button>
  );
}
