"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  TIMEZONE_OPTIONS,
  LANGUAGE_OPTIONS,
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
} from "./mockData";
import type { RegionData } from "./types";

interface RegionSettingsProps {
  initialValues: RegionData;
  onSave: (data: RegionData) => Promise<void>;
  isSaving?: boolean;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-neutral-700 dark:text-white/80"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white rounded-full outline-none focus:border-primary transition-colors px-5 py-3 pr-12 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function RegionSettings({
  initialValues,
  onSave,
  isSaving = false,
}: RegionSettingsProps) {
  const [data, setData] = useState<RegionData>(initialValues);
  const [isDirty, setIsDirty] = useState(false);

  const update = <K extends keyof RegionData>(key: K, value: RegionData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    await onSave(data);
    setIsDirty(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Bahasa &amp; Region
        </h2>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-1">
          Atur bahasa, zona waktu, dan preferensi tampilan
        </p>
      </div>

      <div className="space-y-5">
        <SelectField
          id="language"
          label="Bahasa"
          value={data.language}
          onChange={(v) => update("language", v as RegionData["language"])}
          options={LANGUAGE_OPTIONS}
        />
        <SelectField
          id="timezone"
          label="Zona Waktu"
          value={data.timezone}
          onChange={(v) => update("timezone", v)}
          options={TIMEZONE_OPTIONS}
        />

        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-3">
            Format Tanggal
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DATE_FORMAT_OPTIONS.map((opt) => {
              const isSelected = data.dateFormat === opt.value;
              return (
                <label
                  key={opt.value}
                  className={twMerge(
                    "flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-black/10 dark:border-white/10 hover:border-primary/40",
                  )}
                >
                  <input
                    type="radio"
                    name="dateFormat"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() =>
                      update(
                        "dateFormat",
                        opt.value as RegionData["dateFormat"],
                      )
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-white/80">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <SelectField
          id="currency"
          label="Mata Uang"
          value={data.currency}
          onChange={(v) => update("currency", v as RegionData["currency"])}
          options={CURRENCY_OPTIONS}
        />
      </div>

      {isDirty && (
        <p className="text-xs text-neutral-500 dark:text-white/40 italic mt-6 text-right">
          Perubahan belum disimpan
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 sm:mt-8 border-t border-black/5 dark:border-white/5">
        <button
          type="button"
          onClick={() => {
            setData(initialValues);
            setIsDirty(false);
          }}
          disabled={isSaving || !isDirty}
          className="py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving && (
            <span className="inline-block w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </motion.div>
  );
}
