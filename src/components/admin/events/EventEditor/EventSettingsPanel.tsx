"use client";

import { Calendar, Clock, MapPin, Video, Users, CheckCircle2, FileEdit, Archive, Sparkles, Eye, Star, BarChart3 } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { EventTypeBadge, EventStatusBadge, QuotaIndicator } from "../shared";
import {
  calculateDurationMinutes,
  formatDuration,
  formatNumber,
  formatRupiah,
  formatRelativeTime,
} from "@/lib/events/utils";
import type { Event, EventEarlyBird, EventStatus, EventType, LocationType, OnlinePlatform } from "@/lib/events/types";

interface EventSettingsPanelProps {
  event: Event;
  isEditMode: boolean;
  onChange: (data: Partial<Event>) => void;
  onSave: () => void;
  isSaving: boolean;
}

const TIMEZONES = ["WIB", "WITA", "WIT"];
const PLATFORMS: Array<{ value: OnlinePlatform; label: string }> = [
  { value: "zoom", label: "Zoom" },
  { value: "google_meet", label: "Google Meet" },
  { value: "teams", label: "Microsoft Teams" },
  { value: "other", label: "Lainnya" },
];

function toDateInput(iso: string): string {
  if (!iso) return "";
  return iso.substring(0, 10);
}

function toTimeInput(iso: string): string {
  if (!iso) return "";
  return iso.substring(11, 16);
}

function fromDateTime(date: string, time: string): string {
  if (!date || !time) return "";
  return `${date}T${time}:00Z`;
}

export function EventSettingsPanel({
  event,
  isEditMode,
  onChange,
  onSave,
  isSaving,
}: EventSettingsPanelProps) {
  const duration = calculateDurationMinutes(event.startDate, event.endDate);
  const computedStatus = event.status;

  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      {/* Jadwal */}
      <SettingsCard title="Jadwal">
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
              Tanggal
            </label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
              <input
                type="date"
                value={toDateInput(event.startDate)}
                onChange={(e) => {
                  const newStart = fromDateTime(e.target.value, toTimeInput(event.startDate) || "12:00");
                  onChange({ startDate: newStart });
                }}
                className="h-9 w-full rounded-lg border border-black/5 bg-white pl-8 pr-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Mulai
              </label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
                <input
                  type="time"
                  value={toTimeInput(event.startDate)}
                  onChange={(e) => {
                    const newStart = fromDateTime(toDateInput(event.startDate), e.target.value);
                    onChange({ startDate: newStart });
                  }}
                  className="h-9 w-full rounded-lg border border-black/5 bg-white pl-8 pr-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Selesai
              </label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
                <input
                  type="time"
                  value={toTimeInput(event.endDate)}
                  onChange={(e) => {
                    const newEnd = fromDateTime(toDateInput(event.endDate), e.target.value);
                    onChange({ endDate: newEnd });
                  }}
                  className="h-9 w-full rounded-lg border border-black/5 bg-white pl-8 pr-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
              Timezone
            </label>
            <select
              value={event.timezone}
              onChange={(e) => onChange({ timezone: e.target.value })}
              className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-700 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          {duration > 0 && (
            <p className="rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-300">
              Durasi: <span className="font-semibold">{formatDuration(duration)}</span>
            </p>
          )}
        </div>
      </SettingsCard>

      {/* Tipe & Harga */}
      <SettingsCard title="Tipe & Harga">
        <div className="mb-3 flex items-center gap-2">
          <EventTypeBadge type={event.type} size="md" />
        </div>
        <div className="space-y-3">
          <ToggleSwitch
            checked={event.isFree}
            onChange={(v) => onChange({ isFree: v, price: v ? 0 : event.price })}
            label="Gratis"
            description="Jadikan acara gratis tanpa dipungut biaya"
          />
          {!event.isFree && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Harga Tiket
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
                  Rp
                </span>
                <input
                  type="number"
                  min={0}
                  value={event.price}
                  onChange={(e) => onChange({ price: Number(e.target.value) })}
                  className="h-9 w-full rounded-lg border border-black/5 bg-white pl-8 pr-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
              <p className="mt-1 text-[11px] text-neutral-500">
                {formatRupiah(event.price)}
              </p>
            </div>
          )}
          {!event.isFree && (
            <div className="rounded-lg border border-black/5 bg-neutral-50 p-3 dark:border-white/10 dark:bg-neutral-900/50">
              <ToggleSwitch
                checked={!!event.earlyBird?.enabled}
                onChange={(v) =>
                  onChange({
                    earlyBird: v
                      ? {
                          enabled: true,
                          price: event.earlyBird?.price ?? Math.round(event.price * 0.7),
                          validUntil:
                            event.earlyBird?.validUntil ??
                            new Date(Date.now() + 7 * 86400000).toISOString(),
                        }
                      : null,
                  })
                }
                label="Early Bird"
                description="Diskon untuk pendaftar awal"
              />
              {event.earlyBird?.enabled && (
                <div className="mt-3 space-y-2">
                  <div>
                    <label className="mb-1 block text-[10px] uppercase tracking-wider text-neutral-500">
                      Harga Early Bird
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={event.earlyBird.price}
                      onChange={(e) =>
                        onChange({
                          earlyBird: {
                            ...(event.earlyBird as EventEarlyBird),
                            price: Number(e.target.value),
                          },
                        })
                      }
                      className="h-8 w-full rounded-lg border border-black/5 bg-white px-2 text-xs text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] uppercase tracking-wider text-neutral-500">
                      Berlaku Sampai
                    </label>
                    <input
                      type="date"
                      value={toDateInput(event.earlyBird.validUntil)}
                      onChange={(e) =>
                        onChange({
                          earlyBird: {
                            ...(event.earlyBird as EventEarlyBird),
                            validUntil: fromDateTime(e.target.value, "23:59"),
                          },
                        })
                      }
                      className="h-8 w-full rounded-lg border border-black/5 bg-white px-2 text-xs text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SettingsCard>

      {/* Lokasi */}
      <SettingsCard title="Lokasi / Tautan">
        <div className="mb-3 grid grid-cols-2 gap-2">
          {(
            [
              { v: "online", label: "Online", Icon: Video },
              { v: "offline", label: "Offline", Icon: MapPin },
            ] as Array<{ v: LocationType; label: string; Icon: typeof Video }>
          ).map(({ v, label, Icon }) => {
            const active = event.location.type === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ location: { ...event.location, type: v } })}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-black/5 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {event.location.type === "online" ? (
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Platform
              </label>
              <select
                value={event.location.platform ?? "zoom"}
                onChange={(e) =>
                  onChange({
                    location: {
                      ...event.location,
                      platform: e.target.value as OnlinePlatform,
                    },
                  })
                }
                className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-700 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Link Meeting <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={event.location.meetingUrl ?? ""}
                onChange={(e) =>
                  onChange({
                    location: { ...event.location, meetingUrl: e.target.value },
                  })
                }
                placeholder="https://zoom.us/j/..."
                className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                  Meeting ID
                </label>
                <input
                  type="text"
                  value={event.location.meetingId ?? ""}
                  onChange={(e) =>
                    onChange({
                      location: { ...event.location, meetingId: e.target.value },
                    })
                  }
                  placeholder="123 456 7890"
                  className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                  Passcode
                </label>
                <input
                  type="text"
                  value={event.location.passcode ?? ""}
                  onChange={(e) =>
                    onChange({
                      location: { ...event.location, passcode: e.target.value },
                    })
                  }
                  placeholder="abc123"
                  className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Nama Venue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={event.location.venueName ?? ""}
                onChange={(e) =>
                  onChange({
                    location: { ...event.location, venueName: e.target.value },
                  })
                }
                placeholder="cth: JCC Plenary Hall"
                className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                value={event.location.address ?? ""}
                onChange={(e) =>
                  onChange({
                    location: { ...event.location, address: e.target.value },
                  })
                }
                rows={2}
                placeholder="Jl. ..."
                className="w-full rounded-lg border border-black/5 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                  Kota <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={event.location.city ?? ""}
                  onChange={(e) =>
                    onChange({
                      location: { ...event.location, city: e.target.value },
                    })
                  }
                  placeholder="Jakarta"
                  className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                  Google Maps
                </label>
                <input
                  type="url"
                  value={event.location.mapsUrl ?? ""}
                  onChange={(e) =>
                    onChange({
                      location: { ...event.location, mapsUrl: e.target.value },
                    })
                  }
                  placeholder="https://maps..."
                  className="h-9 w-full rounded-lg border border-black/5 bg-white px-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      {/* Kuota */}
      <SettingsCard title="Kapasitas Kuota">
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700 dark:text-neutral-200">
              Kuota Maksimal
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
              <input
                type="number"
                min={1}
                value={event.capacity}
                onChange={(e) => onChange({ capacity: Math.max(1, Number(e.target.value)) })}
                className="h-9 w-full rounded-lg border border-black/5 bg-white pl-8 pr-2 text-sm text-neutral-900 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>
          <div className="rounded-lg border border-black/5 bg-neutral-50 p-3 dark:border-white/10 dark:bg-neutral-900/50">
            <QuotaIndicator event={event} showProgress />
            <p className="mt-2 text-[11px] text-neutral-500">
              Sisa {formatNumber(Math.max(0, event.capacity - event.registeredCount))} kursi
            </p>
          </div>
          <ToggleSwitch
            checked={event.autoCloseRegistration}
            onChange={(v) => onChange({ autoCloseRegistration: v })}
            label="Tutup Otomatis"
            description="Otomatis tutup pendaftaran saat kuota penuh"
          />
        </div>
      </SettingsCard>

      {/* Status Publikasi */}
      <SettingsCard title="Status Publikasi">
        <div className="space-y-2">
          {(
            [
              { v: "published", label: "Published", Icon: CheckCircle2, color: "text-green-700 dark:text-green-400", sub: "Acara dapat dilihat & didaftar" },
              { v: "draft", label: "Draft", Icon: FileEdit, color: "text-amber-700 dark:text-amber-400", sub: "Hanya admin yang bisa melihat" },
              { v: "archived", label: "Archived", Icon: Archive, color: "text-neutral-700 dark:text-neutral-300", sub: "Soft-delete, disembunyikan" },
            ] as Array<{ v: "published" | "draft" | "archived"; label: string; Icon: typeof CheckCircle2; color: string; sub: string }>
          ).map(({ v, label, Icon, color, sub }) => {
            const isPublishedState =
              computedStatus === "upcoming" ||
              computedStatus === "ongoing" ||
              computedStatus === "finished";
            const active =
              v === "published" ? isPublishedState : computedStatus === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ status: v as EventStatus })}
                className={`flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-black/5 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 ${color}`} />
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {label}
                  </p>
                  <p className="text-[11px] text-neutral-500">{sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center rounded-lg bg-neutral-50 px-3 py-2 text-xs dark:bg-neutral-900/50">
          <span className="text-neutral-500">Status saat ini: </span>
          <span className="ml-1.5">
            <EventStatusBadge status={computedStatus} />
          </span>
        </div>
      </SettingsCard>

      {/* Stats (edit only) */}
      {isEditMode && (
        <SettingsCard title="Statistik" variant="subtle">
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> Pendaftar
              </span>
              <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                {formatNumber(event.registeredCount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Views
              </span>
              <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                {formatNumber(event.viewCount)}
              </span>
            </div>
            {event.attendanceRate > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 inline-flex items-center gap-1">
                  <BarChart3 className="h-3.5 w-3.5" /> Kehadiran
                </span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  {event.attendanceRate}%
                </span>
              </div>
            )}
            {event.rating > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> Rating
                </span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  {event.rating.toFixed(1)} ({event.reviewCount})
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Dibuat
              </span>
              <span className="text-xs text-neutral-700 dark:text-neutral-200">
                {formatRelativeTime(event.createdAt)}
              </span>
            </div>
          </div>
        </SettingsCard>
      )}

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="sticky bottom-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-neutral-900 transition hover:bg-primary/90 disabled:opacity-50"
      >
        Simpan Acara
      </button>
    </div>
  );
}
