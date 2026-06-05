"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Eye, Play, LogIn, Radio } from "lucide-react";
import type { EventCardProps, EventTab } from "./types";

const TYPE_LABELS: Record<string, string> = {
  webinar: "Webinar",
  workshop: "Workshop",
  meetup: "Meetup",
  conference: "Conference",
  networking: "Networking",
};

export default function EventCard({
  event,
  tab,
  onViewDetail,
  onJoinRoom,
  onWatchRecording,
}: EventCardProps) {
  const isLive = event.status === "live";
  const typeLabel = TYPE_LABELS[event.type] ?? event.type;

  const renderActionButton = () => {
    switch (tab) {
      case "upcoming":
        return (
          <button
            onClick={() => onViewDetail(event.id)}
            className="w-full py-2.5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Lihat Detail
          </button>
        );
      case "my-tickets":
        return (
          <button
            onClick={() => onJoinRoom?.(event.id)}
            className={`w-full py-2.5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 ${
              isLive ? "animate-pulse" : ""
            }`}
          >
            {isLive ? <Radio className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            {isLive ? "Masuk ke Sesi — LIVE!" : "Masuk ke Sesi"}
          </button>
        );
      case "recordings":
        return (
          <button
            onClick={() => onWatchRecording?.(event.id)}
            className="w-full py-2.5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Tonton Ulang
          </button>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Banner Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.banner}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Type Badge (top-left) — lime theme */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md bg-primary text-neutral-900">
            {typeLabel}
          </span>
        </div>

        {/* Live / Status Badge (top-right) — lime theme */}
        {isLive && tab !== "upcoming" && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md bg-primary text-neutral-900 animate-pulse">
              Live Now
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 mb-3">
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-white/50">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{event.dateLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-white/50">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {event.timeStart} - {event.timeEnd} {event.timezone}
            </span>
          </div>
        </div>

        {/* Speaker Info */}
        {event.speakers.length > 0 && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 dark:border-white/10 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={event.speakers[0]?.avatar || "/images/avatar-placeholder.webp"}
                alt={event.speakers[0]?.name || "Speaker"}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-700 dark:text-white/80 truncate">
                {event.speakers[0]?.name}
              </p>
              <p className="text-xs text-neutral-400 dark:text-white/40 truncate">
                {event.speakers[0]?.role}
              </p>
              {event.speakers.length > 1 && (
                <p className="text-xs text-neutral-400 dark:text-white/40 mt-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  +{event.speakers.length - 1} pembicara lainnya
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {renderActionButton()}

        {/* Meta Row for Upcoming tab */}
        {tab === "upcoming" && (
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-neutral-400 dark:text-white/40">
              {event.maxParticipants
                ? `${event.currentParticipants ?? 0}/${event.maxParticipants} peserta`
                : null}
            </span>
            <span
              className={`font-semibold ${
                event.price === 0 ? "text-primary" : "text-primary"
              }`}
            >
              {event.priceDisplay}
            </span>
          </div>
        )}

        {/* Meta Row for My Tickets tab */}
        {tab === "my-tickets" && event.accessCode && (
          <p className="mt-3 text-xs text-neutral-400 dark:text-white/40">
            Kode Akses:{" "}
            <span className="font-semibold text-neutral-600 dark:text-white/60">
              {event.accessCode}
            </span>
          </p>
        )}

        {/* Meta Row for Recordings tab */}
        {tab === "recordings" && event.recordingAvailableAt && (
          <p className="mt-3 text-xs text-neutral-400 dark:text-white/40">
            Tersedia sejak {event.recordingAvailableAt}
          </p>
        )}
      </div>
    </motion.div>
  );
}
