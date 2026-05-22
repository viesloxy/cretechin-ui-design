"use client";

import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";

export default function HeroStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 md:py-28" id="home">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Floating Info Bar - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            opacity: { delay: 0.5, duration: 0.8 },
            x: { delay: 0.5, duration: 0.8 },
          }}
          className="absolute left-0 top-10 hidden xl:block z-10"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-primary/30 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            <div>
              <p className="text-xs text-neutral-500 dark:text-white/50 mb-1">Pengguna Aktif</p>
              <p className="text-xl font-bold text-primary">1.000+</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Info Bar - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            opacity: { delay: 0.7, duration: 0.8 },
            x: { delay: 0.7, duration: 0.8 },
          }}
          className="absolute right-0 top-10 hidden xl:block z-10"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-primary/30 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            <div>
         <p className="text-xs text-neutral-500 dark:text-white/50 mb-1">Kursus Tersedia</p>
              <p className="text-xl font-bold text-primary">500+</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Info Bar - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            opacity: { delay: 0.9, duration: 0.8 },
            x: { delay: 0.9, duration: 0.8 },
          }}
          className="absolute left-0 bottom-20 hidden xl:block z-10"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-primary/30 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            <div>
              <p className="text-xs text-neutral-500 dark:text-white/50 mb-1">Aset Digital</p>
              <p className="text-xl font-bold text-primary">1.200+</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Info Bar - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            opacity: { delay: 1.1, duration: 0.8 },
            x: { delay: 1.1, duration: 0.8 },
          }}
          className="absolute right-0 bottom-20 hidden xl:block z-10"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-primary/30 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            <div>
              <p className="text-xs text-neutral-500 dark:text-white/50 mb-1">Rating Platform</p>
              <p className="text-xl font-bold text-primary">4.9/5</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Center Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-xs text-primary font-medium tracking-wider">
                Platform Belajar & Marketplace Kreatif
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center leading-tight tracking-tight mb-6"
          >
            Wadah Kreativitas &
            <br />
            <span className="text-primary">Inovasi Teknologi</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-neutral-600 dark:text-white/60 max-w-2xl mb-4"
          >
            <span className="font-semibold text-primary">CreTechin</span> (Creative, Technology, and Business) adalah platform yang menghubungkan talenta digital dengan kebutuhan industri
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-neutral-500 dark:text-white/50 max-w-2xl mb-10"
          >
            Belajar melalui kursus video, beli aset digital, dan bangun portofolio profesional dalam satu ekosistem terpadu
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 rez-10"
          >
            <MotionButton label="Mulai Sekarang" />
            <MotionButton label="Jelajahi Kursus" variant="secondary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none z-0">
        <img
          src="https://i.postimg.cc/Ss6yShGy/glows.png"
          alt=""
          className="w-full h-auto opacity-30"
        />
      </div>
    </section>
  );
}