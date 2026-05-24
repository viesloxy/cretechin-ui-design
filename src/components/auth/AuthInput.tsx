"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onSuffixClick?: () => void;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, prefixIcon, suffixIcon, onSuffixClick, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/40 pointer-events-none">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              `w-full bg-white dark:bg-neutral-900 border text-neutral-900 dark:text-white placeholder:text-neutral-400 rounded-full outline-none transition-colors`,
              error
                ? "border-[#FF5252] focus:border-[#FF5252]"
                : "border-black/10 dark:border-white/10 focus:border-primary",
              prefixIcon ? "pl-12" : "pl-5",
              suffixIcon ? "pr-12" : "pr-5",
              "py-3",
              className
            )}
            {...props}
          />
          {suffixIcon && (
            <button
              type="button"
              onClick={onSuffixClick}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/40 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
            >
              {suffixIcon}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-[#FF5252]">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;