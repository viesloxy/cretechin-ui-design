"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import SettingsCard from "./SettingsCard";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim().toLowerCase();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  return (
    <SettingsCard title="Tags">
      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 min-h-[42px] focus-within:border-primary transition-colors">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary-dark text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="hover:bg-primary/20 rounded-sm"
              aria-label={`Hapus tag ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? "Ketik dan tekan Enter..." : ""}
          className="flex-1 min-w-[100px] bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          aria-label="Tambah tag"
        />
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Tags membantu artikel Anda ditemukan pembaca.
      </p>
    </SettingsCard>
  );
}
