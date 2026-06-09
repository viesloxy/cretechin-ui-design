"use client";

import { Link2, Pencil, Trash2, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "@/lib/events/types";
import { calculateEventStatus } from "@/lib/events/utils";
import ThumbnailImage from "@/components/admin/articles/shared/ThumbnailImage";
import {
  EventTypeBadge,
  EventStatusBadge,
  QuotaIndicator,
} from "../shared";

interface EventTableProps {
  events: Event[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopyLink: (id: string) => void;
  onPreview: (id: string) => void;
  startIndex: number;
}

function SpeakerCell({ event }: { event: Event }) {
  if (event.speakers.length === 0) {
    return (
      <span className="text-xs italic text-neutral-500">Belum ada</span>
    );
  }
  const main = event.speakers[0];
  const extra = event.speakers.length - 1;
  const initials = main.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      {main.avatar?.url ? (
        <img
          src={main.avatar.url}
          alt={main.name}
          className="h-6 w-6 rounded-full object-cover ring-1 ring-black/5"
        />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
          {main.name}
        </p>
        {extra > 0 && (
          <p className="text-xs text-neutral-500">+{extra} lainnya</p>
        )}
      </div>
    </div>
  );
}

function DateTimeCell({ event }: { event: Event }) {
  const d = new Date(event.startDate);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const dateStr = `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  const startTime = d.toISOString().substring(11, 16);
  const endTime = new Date(event.endDate).toISOString().substring(11, 16);
  return (
    <div className="space-y-0.5">
      <p className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
        {dateStr}
      </p>
      <p className="text-xs text-neutral-500">
        {startTime} – {endTime} {event.timezone}
      </p>
    </div>
  );
}

export function EventTable({
  events,
  onEdit,
  onDelete,
  onCopyLink,
  onPreview,
  startIndex,
}: EventTableProps) {
  if (events.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm shadow-black/5 dark:border-white/10 dark:bg-neutral-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/50">
              <th className="w-12 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                #
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Detail Acara
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Jadwal
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Pembicara
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Kuota
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Status
              </th>
              <th className="w-32 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {events.map((event, idx) => {
              const computedStatus = calculateEventStatus(event);
              return (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.25 }}
                  className="group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                >
                  <td className="px-3 py-3 text-xs font-medium text-neutral-500">
                    {String(startIndex + idx).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => onPreview(event.id)}
                      className="flex items-center gap-3 text-left transition hover:opacity-80"
                    >
                      {event.banner?.url ? (
                        <ThumbnailImage
                          src={event.banner.url}
                          alt={event.title}
                          rounded="xl"
                          className="h-12 w-20 shrink-0"
                        />
                      ) : (
                        <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                          <ImageIcon className="h-5 w-5 text-neutral-400" />
                        </div>
                      )}
                      <div className="min-w-0 max-w-xs">
                        <p className="line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-white">
                          {event.title}
                        </p>
                        <div className="mt-1">
                          <EventTypeBadge type={event.type} />
                        </div>
                      </div>
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <DateTimeCell event={event} />
                  </td>
                  <td className="px-3 py-3">
                    <SpeakerCell event={event} />
                  </td>
                  <td className="px-3 py-3">
                    <QuotaIndicator event={event} />
                  </td>
                  <td className="px-3 py-3">
                    <EventStatusBadge status={computedStatus} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onCopyLink(event.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                        title="Salin Link"
                        aria-label={`Salin link untuk ${event.title}`}
                      >
                        <Link2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(event.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                        title="Edit"
                        aria-label={`Edit ${event.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(event.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        title="Hapus"
                        aria-label={`Hapus ${event.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
