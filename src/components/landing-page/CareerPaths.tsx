"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Code, Palette, TrendingUp, Database, Megaphone, Briefcase } from "lucide-react";

const careerPaths = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Pelajari HTML, CSS, JavaScript, dan React untuk membangun antarmuka web modern",
    skills: 12,
    courses: 24,
    icon: Code,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description: "Kuasai Figma, riset pengguna, dan prinsip desain untuk menciptakan pengalaman digital yang luar biasa",
    skills: 8,
    courses: 18,
    icon: Palette,
  },
  {
    id: 3,
    title: "Backend Developer",
    description: "Bangun server-side applications dengan Node.js, Python, dan database management",
    skills: 10,
    courses: 20,
    icon: Database,
  },
  {
    id: 4,
    title: "Digital Marketer",
    description: "Pelajari SEO, social media marketing, dan analytics untuk mempromosikan produk secara efektif",
    skills: 7,
    courses: 15,
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Data Scientist",
    description: "Analisis data dan machine learning dengan Python, SQL, dan berbagai tools analitik",
    skills: 9,
    courses: 16,
    icon: Briefcase,
  },
  {
    id: 6,
    title: "Product Manager",
    description: "Pimpin product development dari ide hingga launch dengan skill strategik dan komunikasi",
    skills: 6,
    courses: 12,
    icon: Megaphone,
  },
];

export default function CareerPaths() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-16 md:py-24" id="careers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Jelajahi Jalur Karir
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Temukan skill yang dibutuhkan industri dan bangun jalur karir yang solid
          </p>
        </motion.div>

        {/* Career Paths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {careerPaths.map((path) => (
            <motion.div key={path.id} variants={itemVariants}>
              <Link href={`/careers/${path.id}`}>
                <Card className="h-full group cursor-pointer p-6 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <path.icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-white/50 mb-4 flex-grow">
                      {path.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-white/40 mb-4">
                      <span>{path.skills} Skills</span>
                      <span>{path.courses} Kursus</span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      <span>Mulai Belajar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}