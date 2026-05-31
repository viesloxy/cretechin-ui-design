"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

interface StatsBarProps {
  totalEnrolled: number;
  totalCompleted: number;
  totalHoursLearned: number;
}

export default function StatsBar({ totalEnrolled, totalCompleted, totalHoursLearned }: StatsBarProps) {
  const stats = [
    { icon: BookOpen, label: `${totalEnrolled} Kelas Dipelajari` },
    { icon: CheckCircle, label: `${totalCompleted} Kelas Diselesaikan` },
    { icon: Clock, label: `${totalHoursLearned} Jam Belajar` },
  ];

  return (
    <section className="py-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-700 dark:text-white/70 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}