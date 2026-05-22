"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Motion values for smooth cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Fast spring for immediate feel, with slight smoothness
  const springConfig = { damping: 30, stiffness: 800, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Click animation spring
  const clickSpring = { damping: 20, stiffness: 400 };

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    // Hide default cursor
    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      // Update position directly for minimal lag
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      if (isHoverable) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  // Size calculations
  const normalSize = 32;
  const clickSize = 28;
  const hoverSize = 38;
  const currentSize = isClicking ? clickSize : isHovering ? hoverSize : normalSize;

  return (
    <>
      {/* Main Cursor - SVG arrow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          opacity: { duration: 0.1 },
          scale: { type: "spring", stiffness: 500, damping: 25 },
        }}
      >
        <motion.div
          animate={{
            width: currentSize,
            height: currentSize,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 25,
          }}
        >
          {/* Custom SVG Cursor - CreTechin Brand Color */}
          <svg
            width={currentSize}
            height={currentSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3L5.5 20L9.75 15.75L13.5 22.5L16 21L12.25 14.25L18 12.75L5.5 3Z"
              fill="#A4D624"
              stroke="#7BAF15"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Click ripple effect */}
          {isClicking && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <svg width={currentSize} height={currentSize} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="#A4D624" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Small dot for precision */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
        }}
        transition={{
          opacity: { duration: 0.1 },
          scale: { type: "spring", stiffness: 600, damping: 25 },
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: isClicking ? 5 : isHovering ? 10 : 6,
            height: isClicking ? 5 : isHovering ? 10 : 6,
            backgroundColor: "#A4D624",
          }}
        />
      </motion.div>

      {/* Hover ring */}
      {isHovering && !isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="rounded-full border-2"
            style={{
              width: 44,
              height: 44,
              borderColor: "#A4D624",
            }}
          />
        </motion.div>
      )}
    </>
  );
}