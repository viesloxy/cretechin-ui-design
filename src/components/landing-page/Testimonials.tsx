"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    name: "Rizky Pratama",
    role: "Mahasiswa Informatika",
    university: "Telkom University",
    quote: "CreTechin membantu aku belajar programming dengan cara yang menyenangkan. Materinya berkualitas dan komunitasnya sangat supportive!",
    avatar: "/images/avatar-1.jpeg",
  },
  {
    name: "Anisa Putri",
    role: "Siswi SMA Negeri 12",
    university: "Jakarta",
    quote: "Interface-nya clean dan gampang dipahami. Aku jadi lebih semangat belajar desain UI/UX. Marketplace-nya juga membantu banget!",
    avatar: "/images/avatar-2.jpeg",
  },
  {
    name: "Bagas Ardhana",
    role: "Fresh Graduate",
    university: "UGM",
    quote: "Sebagai fresh graduate, CreTechin jadi platform tepat untuk membangun portfolio dan connect dengan profesional di industri kreatif.",
    avatar: "/images/avatar-3.jpeg",
  },
];

export default function Testimonials() {
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
    <section className="py-16 md:py-24" id="testimoni">
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
            Apa Kata Mereka
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Dipercaya oleh ratusan Gen-Z Indonesia untuk mengembangkan kreativitas dan skill teknologi
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="h-full p-8 rounded-2xl flex flex-col border-white/5">
                {/* Quote Icon */}
                <svg className="w-5 h-5 text-primary mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote Text */}
                <p className="leading-relaxed flex-grow mb-6 text-neutral-600 dark:text-white/50">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-white/50">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "1.000+", label: "Pengguna Aktif" },
            { value: "500+", label: "Proyek Dibuat" },
            { value: "98%", label: "Tingkat Kepuasan" },
            { value: "4.9", label: "Rating Aplikasi" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-medium text-primary">{stat.value}</p>
              <p className="text-sm mt-1 text-neutral-600 dark:text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}