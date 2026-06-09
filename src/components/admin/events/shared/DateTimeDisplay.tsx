"use client";

import { Calendar, Clock, MapPin, Video } from "lucide-react";
import type { Event } from "@/lib/events/types";
import {
  formatEventDate,
  formatEventTime,
  formatEventTimeRange,
} from "@/lib/events/utils";

interface DateTimeDisplayProps {
  event: Event;
  variant?: "default" | "compact";
}

export function DateTimeDisplay({
  event,
  variant = "default",
}: DateTimeDisplayProps) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5 text-sm">
        <Calendar className="h-3.5 w-3.5 text-neutral-500" />
        <span className="font-mono font-semibold text-neutral-900 dark:text-white">
          {formatEventDate(event.startDate)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Clock className="h-3 w-3" />
        <span>
          {formatEventTimeRange(
            event.startDate,
            event.endDate,
            event.timezone,
          )}
        </span>
      </div>
      {variant === "default" && (
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          {event.location.type === "online" ? (
            <>
              <Video className="h-3 w-3" />
              <span>Online</span>
            </>
          ) : (
            <>
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">
                {event.location.city || "Offline"}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function formatTimeOnly(iso: string): string {
  return formatEventTime(iso);
}
