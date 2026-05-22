"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import MotionButton from "@/components/ui/MotionButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Future: send to API
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24" id="newsletter">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="p-8 md:p-12 rounded-2xl border-primary/20 bg-neutral-50 dark:bg-neutral-900">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              Dapatkan Update Terbaru
            </h3>
            <p className="text-base mb-6 max-w-md mx-auto text-neutral-600 dark:text-white/50">
              Daftar newsletter untuk mendapatkan informasi kursus baru, promo spesial, dan tips pengembangan skill digital
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors text-black dark:text-white placeholder:text-neutral-400"
              />
              <MotionButton label="Berlangganan" showIcon={false} />
            </form>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-primary font-medium"
              >
                Berhasil subscribing. Cek email kamu untuk konfirmasi.
              </motion.p>
            )}

            <p className="mt-4 text-xs text-neutral-500 dark:text-white/40">
              Tidak spam, unsubscribe kapan saja.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}