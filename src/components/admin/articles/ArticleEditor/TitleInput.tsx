"use client";

import { slugify } from "@/lib/articles/utils";

interface TitleInputProps {
  value: string;
  onChange: (v: string) => void;
  slug: string;
}

export default function TitleInput({ value, onChange, slug }: TitleInputProps) {
  const preview = slug || "judul-artikel-anda";

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 p-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tulis Judul Artikel di sini..."
        className="w-full text-3xl md:text-4xl font-semibold border-0 bg-transparent focus:outline-none px-0 text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
        aria-label="Judul artikel"
        maxLength={200}
      />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">
          cretechin.com/blog/{preview}
        </p>
        <span
          className={`text-xs flex-shrink-0 ml-2 ${
            value.length > 60
              ? "text-amber-600 dark:text-amber-400"
              : "text-neutral-400 dark:text-neutral-500"
          }`}
        >
          {value.length}/60
        </span>
      </div>
    </div>
  );
}
