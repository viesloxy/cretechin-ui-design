"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
  currentTime?: number; // in seconds
  totalDuration?: number; // in seconds
  isPlaying?: boolean;
  onPlayClick?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({
  currentTime = 765,
  totalDuration = 2190,
  isPlaying = false,
  onPlayClick,
}: VideoPlayerProps) {
  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
        {/* Placeholder GIF */}
        <Image
          src="/images/courses.gif"
          alt="Course Video"
          fill
          className="object-cover w-full h-full"
          unoptimized
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onPlayClick}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            aria-label="Play video"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-900 fill-neutral-900" />
            </div>
          </motion.button>
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Time Display */}
      <div className="flex justify-end px-3 py-1 bg-neutral-900">
        <span className="text-xs font-mono text-white/60">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </span>
      </div>
    </div>
  );
}