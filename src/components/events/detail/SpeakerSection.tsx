"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Globe } from "lucide-react";
import type { EventSpeaker } from "./types";

interface SpeakerSectionProps {
  speakers: EventSpeaker[];
}

export default function SpeakerSection({ speakers }: SpeakerSectionProps) {
  if (!speakers || speakers.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-5">
        Pembicara
      </h2>

      <div
        className={
          speakers.length > 1
            ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {speakers.map((speaker, idx) => (
          <motion.article
            key={speaker.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.25 + idx * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={speaker.avatar}
                    alt={`${speaker.name}, ${speaker.role}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                  {speaker.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-white/40">
                  {speaker.role}
                  {speaker.company ? ` · ${speaker.company}` : ""}
                </p>

                {speaker.bio && (
                  <p className="text-sm text-neutral-600 dark:text-white/50 leading-relaxed mt-3">
                    {speaker.bio}
                  </p>
                )}

                {(speaker.linkedin || speaker.twitter) && (
                  <div className="flex gap-2 mt-3">
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${speaker.name} LinkedIn`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:text-primary hover:border-primary transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {speaker.twitter && (
                      <a
                        href={
                          speaker.twitter.startsWith("http")
                            ? speaker.twitter
                            : `https://twitter.com/${speaker.twitter.replace("@", "")}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${speaker.name} Twitter`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:text-primary hover:border-primary transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {"website" in speaker && (speaker as { website?: string }).website && (
                      <a
                        href={(speaker as { website: string }).website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${speaker.name} Website`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:text-primary hover:border-primary transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
