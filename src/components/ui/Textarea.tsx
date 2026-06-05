"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  maxLengthCounter?: number;
  currentLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helper,
      maxLengthCounter,
      currentLength = 0,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-neutral-700 dark:text-white/80"
            >
              {label}
              {props.required && <span className="text-primary ml-1">*</span>}
            </label>
            {maxLengthCounter !== undefined && (
              <span className="text-xs text-neutral-400 dark:text-white/30">
                {currentLength}/{maxLengthCounter}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={twMerge(
            `w-full bg-white dark:bg-neutral-900 border text-neutral-900 dark:text-white placeholder:text-neutral-400 rounded-2xl outline-none transition-colors px-5 py-3 resize-y min-h-[100px]`,
            error
              ? "border-neutral-500 focus:border-neutral-700"
              : "border-black/10 dark:border-white/10 focus:border-primary",
            "disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-neutral-500 dark:text-white/40 italic flex items-center gap-1"
          >
            {error}
          </p>
        ) : helper ? (
          <p className="text-xs text-neutral-500 dark:text-white/40">
            {helper}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
