"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { mockCategoryData } from "@/lib/admin/mockData";

ChartJS.register(ArcElement, Tooltip, Legend);

const data: ChartData<"doughnut"> = {
  labels: mockCategoryData.map((c) => c.name),
  datasets: [
    {
      data: mockCategoryData.map((c) => c.value),
      backgroundColor: mockCategoryData.map((c) => c.color),
      borderColor: "#fff",
      borderWidth: 3,
      hoverOffset: 8,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      cornerRadius: 10,
      titleFont: { family: "Poppins", size: 12, weight: 600 },
      bodyFont: { family: "Poppins", size: 12 },
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
      },
    },
  },
  animation: {
    animateRotate: true,
    duration: 1500,
    easing: "easeOutQuart",
  },
};

const total = mockCategoryData.reduce((s, c) => s + c.value, 0);

export default function CategoryDonutChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">Kategori Terpopuler</h3>
        <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">Distribusi enrollment</p>
      </div>

      <div className="relative flex-1 min-h-[180px] flex items-center justify-center">
        <div className="w-44 h-44">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-black dark:text-white">{total}%</p>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-white/40">Total</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {mockCategoryData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-neutral-700 dark:text-white/70">{cat.name}</span>
            </div>
            <span className="text-sm font-semibold text-black dark:text-white">{cat.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
