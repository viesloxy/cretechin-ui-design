"use client";

import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

interface DynamicListInputProps {
  label: string;
  value: string[];
  onChange: (list: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export default function DynamicListInput({
  label,
  value,
  onChange,
  placeholder,
  addLabel = "+ Tambah",
}: DynamicListInputProps) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...value, v]);
    setInput("");
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700 dark:text-white/80">{label}</label>
      {value.length > 0 && (
        <ul className="space-y-1.5">
          {value.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Hapus item ${i + 1}`}
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!input.trim()}
          className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
