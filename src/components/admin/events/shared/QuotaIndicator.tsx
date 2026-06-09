"use client";

import { Users } from "lucide-react";
import type { Event } from "@/lib/events/types";
import {
  formatNumber,
  getQuotaColor,
  getQuotaRatio,
} from "@/lib/events/utils";

interface QuotaIndicatorProps {
  event: Event;
  showProgress?: boolean;
}

export function QuotaIndicator({
  event,
  showProgress = true,
}: QuotaIndicatorProps) {
  const ratio = getQuotaRatio(event);
  const color = getQuotaColor(event);

  const barColor = {
    green: "bg-green-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
  }[color];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-neutral-500" />
        <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
          {formatNumber(event.registeredCount)} / {formatNumber(event.capacity)}
        </span>
      </div>
      {showProgress && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.max(2, ratio * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
