"use client";

import { twMerge } from "tailwind-merge";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
}: ToggleSwitchProps) {
  const switchId =
    id ?? `toggle-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="flex items-start justify-between gap-4">
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={switchId}
              className={twMerge(
                "text-sm font-medium text-neutral-700 dark:text-white/80 cursor-pointer",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label ?? "Toggle"} (${checked ? "aktif" : "nonaktif"})`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        id={switchId}
        className={twMerge(
          "relative inline-flex flex-shrink-0 items-center w-11 h-6 rounded-full transition-colors duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          checked
            ? "bg-primary"
            : "bg-neutral-200 dark:bg-neutral-800",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <span
          className={twMerge(
            "inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
