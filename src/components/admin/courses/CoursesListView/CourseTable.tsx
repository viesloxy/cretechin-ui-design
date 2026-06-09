"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  ListTree,
  Trash2,
  Star,
  ArrowUpDown,
  CheckSquare,
  Square,
  Eye,
} from "lucide-react";
import type { Course } from "@/lib/courses/types";
import { formatNumber, formatRupiah } from "@/lib/courses/utils";
import { ThumbnailImage } from "@/components/admin/articles/shared";
import { LevelBadge } from "../shared";
import CourseStatusBadge from "../shared/CourseStatusBadge";

interface CourseTableProps {
  courses: Course[];
  onEdit: (id: string) => void;
  onSyllabus: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}

const tableContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CourseTable({
  courses,
  onEdit,
  onSyllabus,
  onDelete,
  onPreview,
}: CourseTableProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <SortHeader label="Detail Kursus" />
              </th>
              <th scope="col" className="px-4 py-3 text-left w-44">
                Instruktur
              </th>
              <th scope="col" className="px-4 py-3 text-left w-32">
                <SortHeader label="Harga" />
              </th>
              <th scope="col" className="px-4 py-3 text-left w-36">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right w-36">
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
            {courses.map((course) => {
              const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
              return (
                <motion.tr
                  key={course.id}
                  variants={rowVariants}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <ThumbnailImage
                        src={course.thumbnail?.url}
                        alt={course.title}
                        size={56}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-1.5">
                          <h4 className="font-semibold text-sm leading-snug line-clamp-2 text-neutral-900 dark:text-white">
                            {course.title}
                          </h4>
                          {course.featured && (
                            <Star
                              className="w-3.5 h-3.5 fill-primary text-primary flex-shrink-0 mt-0.5"
                              aria-label="Kursus unggulan"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <LevelBadge level={course.level} showIcon />
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">
                            • {totalLessons} pelajaran
                          </span>
                          {course.isFree && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-primary-dark bg-primary/15 px-1.5 py-0.5 rounded">
                              Gratis
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 text-primary-dark text-xs font-bold">
                        {course.instructor.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                          {course.instructor.name}
                        </p>
                        {course.instructor.title && (
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                            {course.instructor.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <span
                        className={`text-sm font-semibold ${
                          course.isFree
                            ? "text-primary"
                            : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        {formatRupiah(course.price)}
                      </span>
                      {course.discount?.enabled && (
                        <p className="text-[10px] text-green-600 dark:text-green-400">
                          Diskon {course.discount.percent}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CourseStatusBadge status={course.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton
                        onClick={() => onPreview(course.id)}
                        ariaLabel={`Preview kursus ${course.title}`}
                        title="Preview"
                        icon={Eye}
                        hoverClass="hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-white"
                        iconClass="text-neutral-500 dark:text-neutral-400"
                      />
                      <ActionButton
                        onClick={() => onSyllabus(course.id)}
                        ariaLabel={`Kelola silabus ${course.title}`}
                        title="Kelola Silabus"
                        icon={ListTree}
                        hoverClass="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        iconClass="text-blue-600 dark:text-blue-400"
                      />
                      <ActionButton
                        onClick={() => onEdit(course.id)}
                        ariaLabel={`Edit kursus ${course.title}`}
                        title="Edit Info"
                        icon={Pencil}
                        hoverClass="hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-white"
                        iconClass="text-neutral-700 dark:text-neutral-300"
                      />
                      <ActionButton
                        onClick={() => onDelete(course.id)}
                        ariaLabel={`Hapus kursus ${course.title}`}
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
