"use client";

import type { TimelineEvent, Transaction } from "@/lib/transactions/types";
import { formatDateTime, formatRelativeTime } from "@/lib/transactions/utils";

interface ActivityLogCardProps {
  transaction: Transaction;
}

const DOT_COLOR: Record<TimelineEvent["type"], string> = {
  info: "bg-blue-500 dark:bg-blue-400",
  pending: "bg-amber-500 dark:bg-amber-400",
  success: "bg-green-500 dark:bg-green-400",
  failed: "bg-red-500 dark:bg-red-400",
  refund: "bg-purple-500 dark:bg-purple-400",
};

export function ActivityLogCard({ transaction }: ActivityLogCardProps) {
  if (transaction.timeline.length === 0) return null;
  return (
    <section>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Timeline / Activity Log
      </h4>
      <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-neutral-900/50">
        <ol className="relative space-y-3.5 pl-6">
          <div className="absolute left-2 top-1 bottom-1 w-px bg-neutral-200 dark:bg-neutral-800" />
          {transaction.timeline.map((evt, idx) => (
            <li key={idx} className="relative">
              <span
                className={`absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-neutral-900 ${DOT_COLOR[evt.type]}`}
              />
              <div>
                <p className="text-sm text-neutral-900 dark:text-white">{evt.event}</p>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  <span className="font-mono">{formatDateTime(evt.timestamp)}</span>
                  {" · "}
                  {formatRelativeTime(evt.timestamp)}
                  {" · "}
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {evt.actor}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
