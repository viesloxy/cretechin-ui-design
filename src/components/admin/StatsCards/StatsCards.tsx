"use client";

import { mockStats } from "@/lib/admin/mockData";
import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {mockStats.map((stat, i) => (
        <StatCard key={stat.id} data={stat} index={i} />
      ))}
    </div>
  );
}
