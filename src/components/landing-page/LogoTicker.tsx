"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "Facebook", src: "/images/Platform=Facebook, Color=Negative.svg" },
  { name: "X (Twitter)", src: "/images/Platform=X (Twitter), Color=Negative.svg" },
  { name: "Instagram", src: "/images/Platform=Instagram, Color=Negative.svg" },
  { name: "TikTok", src: "/images/Platform=TikTok, Color=Negative.svg" },
  { name: "Threads", src: "/images/Platform=Threads, Color=Negative.svg" },
  { name: "YouTube", src: "/images/Platform=YouTube, Color=Negative.svg" },
];

export default function LogoTicker() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-center text-neutral-600 dark:text-white/50 text-xl mb-12">
          Terintegrasi Dengan Platform Populer
        </h3>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <motion.div
            animate={{
              x: "-50%",
            }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex flex-none gap-24 pr-24"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <Fragment key={i}>
                {logos.map((logo) => (
                  <div key={logo.name} className="flex items-center">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 brightness-0 opacity-60 dark:brightness-0 dark:invert dark:opacity-100"
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}