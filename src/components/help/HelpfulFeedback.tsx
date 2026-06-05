"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { recordFeedback, getFeedback } from "./searchLogic";

interface HelpfulFeedbackProps {
  faqId: string;
  onHelpful?: (helpful: boolean) => void;
}

export default function HelpfulFeedback({
  faqId,
  onHelpful,
}: HelpfulFeedbackProps) {
  const toast = useToast();
  const [response, setResponse] = useState<"yes" | "no" | null>(() => {
    return getFeedback(faqId)?.yes || getFeedback(faqId)?.no
      ? getFeedback(faqId)!.yes > 0
        ? "yes"
        : "no"
      : null;
  });
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleYes = () => {
    if (response) return;
    setResponse("yes");
    recordFeedback(faqId, true);
    onHelpful?.(true);
  };

  const handleNo = () => {
    if (response) return;
    setResponse("no");
    recordFeedback(faqId, false);
    onHelpful?.(false);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    recordFeedback(faqId, false, comment.trim());
    setSubmitting(false);
    setShowForm(false);
    setComment("");
    toast.success("Feedback terkirim. Terima kasih!");
  };

  return (
    <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
      <AnimatePresence mode="wait">
        {response === null ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-neutral-500 dark:text-white/40 mb-2">
              Apakah ini membantu?
            </p>
            <div role="group" aria-label="Feedback untuk FAQ ini" className="flex gap-2">
              <button
                type="button"
                onClick={handleYes}
                aria-label="Ya, ini membantu"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary active:scale-95 transition-all"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Ya
              </button>
              <button
                type="button"
                onClick={handleNo}
                aria-label="Tidak, ini kurang membantu"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary active:scale-95 transition-all"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                Tidak
              </button>
            </div>
          </motion.div>
        ) : response === "yes" ? (
          <motion.p
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-primary font-medium"
            role="status"
            aria-live="polite"
          >
            Terima kasih atas feedback Anda!
          </motion.p>
        ) : (
          <motion.div
            key="no-thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-neutral-500 dark:text-white/40 mb-2">
              Feedback Anda telah dicatat.
            </p>
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-1">
                    <label
                      htmlFor={`feedback-${faqId}`}
                      className="text-xs text-neutral-500 dark:text-white/40"
                    >
                      Beri tahu kami apa yang kurang (opsional)
                    </label>
                    <textarea
                      id={`feedback-${faqId}`}
                      value={comment}
                      onChange={(e) => setComment(e.target.value.slice(0, 500))}
                      placeholder="Ceritakan pengalaman Anda..."
                      className="w-full min-h-[80px] p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-neutral-400 dark:text-white/30">
                        {comment.length}/500
                      </span>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!comment.trim() || submitting}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-primary text-neutral-900 text-xs font-semibold hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        Kirim
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
