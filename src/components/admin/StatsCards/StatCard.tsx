"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, BookOpen, ShoppingBag } from "lucide-react";
import { StatCardData } from "@/lib/admin/mockData";

const iconMap = {
  DollarSign,
  Users,
  BookOpen,
  ShoppingBag,
};

interface StatCardProps {
  data: StatCardData;
  index: number;
}

function useCountUp(target: number, durationMs: number = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const start = 0;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setValue(target);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [target, durationMs]);
  return value;
}

function Sparkline({ data, color = "#A4D624" }: { data: number[]; color?: string }) {
  const w = 100;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `0,${h} ${points} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={areaPoints}
        fill={`url(#spark-${color})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function StatCard({ data, index }: StatCardProps) {
  const Icon = iconMap[data.icon];
  const animatedValue = useCountUp(data.value);

  const formatted =
    data.id === "revenue"
      ? `Rp ${animatedValue.toLocaleString("id-ID")}`
      : animatedValue.toLocaleString("id-ID");

  const TrendIcon = data.trend.isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-neutral-900 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-neutral-500 dark:text-white/50">{data.title}</p>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      <p className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1 truncate">
        {formatted}
      </p>

      <div className="flex items-center justify-between gap-2 mt-3">
        <div className="flex items-center gap-1 text-xs font-medium text-primary">
          <TrendIcon className="w-3.5 h-3.5" />
          <span>
            {data.id === "courses" || data.id === "products"
              ? `+${data.trend.value} ${data.trend.label}`
              : `+${data.trend.value}% ${data.trend.label}`}
          </span>
        </div>
        <Sparkline data={data.sparkline} />
      </div>
    </motion.div>
  );
}
