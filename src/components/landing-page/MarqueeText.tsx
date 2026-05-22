"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";

const marqueeItems = [
  "Kreativitas Tanpa Batas",
  "Kolaborasi Komunitas",
  "Inovasi Teknologi",
  "Belajar Bersama",
  "Desain UI/UX",
  "Frontend Development",
  "Backend Development",
  "Mobile App",
  "Cloud Computing",
  "AI & Machine Learning",
];

export default function MarqueeText() {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();
  const animation = useRef<AnimationPlaybackControls>();

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 120, ease: "linear", repeat: Infinity }
    );
  }, [animate, scope]);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);

  return (
    <section className="py-16 overflow-hidden border-y border-primary/20">
      <div className="overflow-x-clip p-4 flex">
        <motion.div
          ref={scope}
          animate={{ x: "-50%" }}
          className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium text-neutral-400 dark:text-white/60 group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 10 }).map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-16">
              {marqueeItems.map((item, index) => (
                <div key={`${repeatIndex}-${index}`} className="flex items-center gap-16">
                  <span className="text-[#FFFF00] text-7xl md:text-8xl">&#10038;</span>
                  <span className="group-hover:text-primary transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}