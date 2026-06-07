"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { mockRevenueData } from "@/lib/admin/mockData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PRIMARY = "#A4D624";
const PRIMARY_LIGHT = "#C5E256";
const NEUTRAL = "#9CA3AF";

const data: ChartData<"line"> = {
  labels: mockRevenueData.map((d) => d.month),
  datasets: [
    {
      label: "2025",
      data: mockRevenueData.map((d) => d.value),
      borderColor: PRIMARY,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return "rgba(164, 214, 36, 0.2)";
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(164, 214, 36, 0.4)");
        gradient.addColorStop(1, "rgba(164, 214, 36, 0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: PRIMARY,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      borderWidth: 2.5,
    },
    {
      label: "2024",
      data: mockRevenueData.map((d) => d.lastYear),
      borderColor: NEUTRAL,
      backgroundColor: "transparent",
      borderDash: [5, 5],
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: NEUTRAL,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      borderWidth: 2,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        boxHeight: 8,
        padding: 16,
        color: NEUTRAL,
        font: { family: "Poppins", size: 12, weight: 500 },
      },
    },
    tooltip: {
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      cornerRadius: 10,
      displayColors: true,
      boxWidth: 8,
      boxHeight: 8,
      usePointStyle: true,
      titleFont: { family: "Poppins", size: 12, weight: 600 },
      bodyFont: { family: "Poppins", size: 12 },
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: Rp ${ctx.parsed.y}jt`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: NEUTRAL,
        font: { family: "Poppins", size: 11 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 120,
      grid: { color: "rgba(0, 0, 0, 0.05)" },
      ticks: {
        color: NEUTRAL,
        font: { family: "Poppins", size: 11 },
        callback: (v) => `${v}M`,
        stepSize: 30,
      },
      border: { display: false },
    },
  },
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
  },
};

export default function RevenueLineChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">Tren Pendapatan 2025</h3>
          <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">Periode Januari - Desember 2025</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-neutral-600 dark:text-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" /> 2025
          </span>
          <span className="flex items-center gap-1.5 text-neutral-600 dark:text-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" /> 2024
          </span>
        </div>
      </div>
      <div className="h-64 md:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
