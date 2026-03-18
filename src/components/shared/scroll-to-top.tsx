"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const CIRCLE_RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const progress = useScrollProgress();

  const strokeDashoffset = useMemo(
    () => CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100,
    [progress]
  );

  useEffect(() => {
    setIsVisible(progress > 3);
  }, [progress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[hsl(var(--color-primary))]/20 to-[hsl(var(--color-accent))]/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[hsl(var(--color-primary))]/40 hover:shadow-xl hover:shadow-[hsl(var(--color-primary))]/15"
            aria-label="Scroll to top"
          >
            {/* Background fill based on progress */}
            <motion.div
              className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-[hsl(var(--color-primary))]/10 to-[hsl(var(--color-accent))]/10"
              style={{ opacity: progress / 100 }}
            />

            {/* SVG progress ring */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Track */}
              <circle
                cx="24"
                cy="24"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="2.5"
                opacity={0.5}
              />
              {/* Progress arc */}
              <circle
                cx="24"
                cy="24"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                className="transition-[stroke-dashoffset] duration-100 ease-out"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="progress-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--color-primary))"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--color-accent))"
                  />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing dot at progress tip */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 48 48"
            >
              <circle
                cx={24 + CIRCLE_RADIUS * Math.cos(2 * Math.PI * (progress / 100) - Math.PI / 2)}
                cy={24 + CIRCLE_RADIUS * Math.sin(2 * Math.PI * (progress / 100) - Math.PI / 2)}
                r="2.5"
                fill="hsl(var(--color-primary))"
                className="transition-all duration-100 ease-out"
                opacity={progress > 5 ? 1 : 0}
              >
                {/* Pulse animation on the dot */}
                <animate
                  attributeName="r"
                  values="2.5;3.5;2.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.6;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Center icon */}
            <div className="relative z-10 flex flex-col items-center">
              <ArrowUp className="h-4 w-4 text-[var(--color-foreground)] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            {/* Hover glow overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[hsl(var(--color-primary))]/0 transition-colors duration-300 group-hover:bg-[hsl(var(--color-primary))]/[0.06]" />
          </motion.button>

          {/* Percentage tooltip */}
          <AnimatePresence>
            {progress > 10 && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/90 px-2.5 py-1 text-[10px] font-bold tabular-nums text-[var(--color-foreground)] shadow-lg backdrop-blur-md"
              >
                {Math.round(progress)}%
                {/* Tooltip arrow */}
                <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 border-r border-t border-[var(--color-border)] bg-[var(--color-surface)]/90" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}