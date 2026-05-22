"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";

const faqs = [
  {
    question: "Apa itu CreTechin?",
    answer: "CreTechin adalah platform belajar dan marketplace kreatif yang menghubungkan talenta digital dengan kebutuhan industri. Nama CreTechin merupakan akronim dari Creative, Technology, and Business. Platform ini menyediakan kursus video, aset digital, dan event untuk membantu pengguna mengembangkan skill digital mereka.",
  },
  {
    question: "Bagaimana cara memulai belajar di CreTechin?",
    answer: "Daftar akun gratis di CreTechin, pilih kursus atau topik yang kamu minati, dan mulai belajar. Kamu bisa langsung mengakses kursus gratis untuk mengenal platform kami atau membeli kursus premium untuk pembelajaran yang lebih mendalam.",
  },
  {
    question: "Apakah kursus di CreTechin gratis?",
    answer: "Kami menyediakan campuran kursus gratis dan premium. Kamu bisa memulai dengan kursus gratis untuk mengenal platform kami dan melanjutkan dengan kursus premium untuk mendapatkan materi yang lebih lengkap dan bersertifikat.",
  },
  {
    question: "Apa itu Digital Assets Marketplace?",
    answer: "Digital Assets Marketplace adalah tempat dimana kreator dapat menjual dan pembeli dapat membeli template desain, UI Kits, source code, icon set, mockups, dan alat digital lainnya yang dibutuhkan dalam workflow desain dan development.",
  },
  {
    question: "Bagaimana cara membeli aset digital?",
    answer: "Pilih aset yang kamu butuhkan dari marketplace, tambahkan ke keranjang, pilih metode pembayaran yang tersedia, dan lakukan pembayaran. Setelah berhasil, kamu bisa langsung mengunduh aset digital yang sudah dibeli.",
  },
  {
    question: "Apakah saya bisa menjual karya saya di CreTechin?",
    answer: "Ya, kreator dapat mendaftar sebagai penjual di CreTechin. Setelah diverifikasi, kamu bisa mengunggah produk digital seperti template, UI Kits, atau aset desain lainnya ke marketplace dan memulai menjual karya kamu.",
  },
  {
    question: "Bagaimana cara mendapatkan sertifikat?",
    answer: "Selesaikan semua modul dalam kursus yang kamu ikuti di CreTechin. Setelah menyelesaikan seluruh materi, sertifikat digital akan tersedia secara otomatis di menu Sertifikat Saya dan bisa kamu unduh untuk keperluan portofolio profesional.",
  },
  {
    question: "Apakah CreTechin tersedia di mobile?",
    answer: "Ya, CreTechin dapat diakses melalui browser di desktop maupun mobile. Desain responsive kami memastikan pengalaman terbaik di semua perangkat. Tidak perlu download aplikasi tambahan untuk mengakses semua fitur platform.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Temukan jawaban untuk pertanyaanmu tentang CreTechin
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="p-0 rounded-2xl border-black/5 dark:border-white/5 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="text-base font-medium pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-neutral-600 dark:text-white/50" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-neutral-600 dark:text-white/50 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}