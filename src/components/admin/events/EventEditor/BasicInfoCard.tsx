"use client";

import { Link2, ExternalLink } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import Textarea from "@/components/ui/Textarea";
import type { EventType } from "@/lib/events/types";
import { EVENT_TYPE_LABELS, slugify } from "@/lib/events/utils";

interface BasicInfoCardProps {
  title: string;
  slug: string;
  shortDescription: string;
  type: EventType;
  isSlugUnique: boolean;
  onChange: (data: {
    title?: string;
    slug?: string;
    shortDescription?: string;
    type?: EventType;
  }) => void;
}

const TYPES: EventType[] = [
  "webinar",
  "workshop",
  "talkshow",
  "conference",
  "meetup",
  "networking",
];

export function BasicInfoCard({
  title,
  slug,
  shortDescription,
  type,
  isSlugUnique,
  onChange,
}: BasicInfoCardProps) {
  return (
    <SettingsCard title="Informasi Dasar">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Judul Acara <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              onChange({
                title: newTitle,
                slug: slug === slugify(title) || slug === "" ? slugify(newTitle) : slug,
              });
            }}
            placeholder="cth: Tren AI 2026: Peluang & Tantangan"
            className="h-10 w-full rounded-xl border border-black/5 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            <span className="inline-flex items-center gap-1">
              <Link2 className="h-3.5 w-3.5" /> Slug URL
            </span>
          </label>
          <div className="flex items-center gap-2">
            <span className="rounded-l-xl border border-r-0 border-black/5 bg-neutral-50 px-3 py-2 text-xs text-neutral-500 dark:border-white/10 dark:bg-neutral-800/50">
              cretechin.com/events/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              placeholder="judul-acara"
              className={`h-10 w-full rounded-r-xl border bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 ${
                !isSlugUnique && slug
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-black/5 focus:border-primary focus:ring-primary/20"
              } dark:border-white/10 dark:bg-neutral-900 dark:text-white`}
            />
          </div>
          {!isSlugUnique && slug && (
            <p className="mt-1.5 text-xs text-red-600">
              Slug sudah digunakan. Gunakan slug lain.
            </p>
          )}
          {isSlugUnique && slug && (
            <a
              href={`/events/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Lihat halaman publik
            </a>
          )}
        </div>

        <div>
          <Textarea
            label="Ringkasan Singkat"
            value={shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            placeholder="Deskripsi singkat yang menarik untuk acara Anda..."
            rows={2}
            maxLength={500}
          />
          <p className="mt-1 text-right text-xs text-neutral-500">
            {shortDescription.length}/500 karakter
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Tipe Acara <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TYPES.map((t) => {
              const active = t === type;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange({ type: t })}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-black/5 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  }`}
                >
                  {EVENT_TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
