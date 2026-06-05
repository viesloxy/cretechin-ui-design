"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  show: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES: Record<ToastType, string> = {
  success: "bg-white dark:bg-neutral-900 border-primary/30",
  error: "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-white/20",
  info: "bg-white dark:bg-neutral-900 border-primary/30",
};

const ICON_STYLES: Record<ToastType, string> = {
  success: "text-primary",
  error: "text-neutral-600 dark:text-white/60",
  info: "text-primary",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev.slice(-2), { id, type, message }]);
      setTimeout(() => remove(id), 3000);
    },
    [remove],
  );

  const value: ToastContextValue = {
    show,
    success: (m) => show("success", m),
    error: (m) => show("error", m),
    info: (m) => show("info", m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-20 right-4 z-[60] flex flex-col gap-2 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type];
            return (
              <motion.div
                key={t.id}
                role="status"
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={twMerge(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border max-w-sm pointer-events-auto",
                  STYLES[t.type],
                )}
              >
                <Icon className={twMerge("w-5 h-5 flex-shrink-0", ICON_STYLES[t.type])} />
                <p className="text-sm text-neutral-900 dark:text-white flex-1">
                  {t.message}
                </p>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Tutup notifikasi"
                  className="text-neutral-400 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
