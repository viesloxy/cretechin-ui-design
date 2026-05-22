"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Learning Center",
    description: "Akses materi pembelajaran berkualitas tinggi dari mentor berpengalaman di bidang kreatif dan teknologi",
  },
  {
    title: "Marketplace Kreatif",
    description: "Jual dan beli karya digital, template, dan aset desain dari kreator Indonesia terbaik",
  },
  {
    title: "Portfolio Builder",
    description: "Bangun portfolio profesional yang menarik untuk memamerkan karya dan проекты terbaikmu",
  },
  {
    title: "Komunitas Kolaboratif",
    description: "Terhubung dengan ribuan kreator dan developer untuk collaborate dalam проекты menarik",
  },
  {
    title: "Event & Workshop",
    description: "Ikuti workshop eksklusif dan event networking untuk mengasah skill dan memperluas relasi",
  },
  {
    title: "Job Board",
    description: "Temukan peluang freelance dan kerja di bidang kreatif dan teknologi dari perusahaan terkemuka",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24" id="fitur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Semua yang Kamu Butuhkan
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Dirancang khusus untuk generasi muda Indonesia dengan fitur lengkap untuk mengembangkan kreativitas dan teknologi
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full group cursor-pointer p-8 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                  {/* Number Indicator */}
                  <span className="text-sm font-bold text-primary mb-6 inline-block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Content */}
                  <h3 className="text-lg font-medium mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-grow text-neutral-600 dark:text-white/50">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}