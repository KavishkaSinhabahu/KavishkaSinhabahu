"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, MousePointer2, Sparkles, ChevronRight } from "lucide-react";
import { HERO_DATA, SOCIAL_LINKS } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.035,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.9 },
  },
};

const socialItem: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientX = useTransform(smoothX, [0, 1], [30, 70]);
  const gradientY = useTransform(smoothY, [0, 1], [30, 70]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_DATA.roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    },
    [mouseX, mouseY]
  );

  const nameChars = HERO_DATA.name.split("");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── Layered Backgrounds ── */}

      {/* Radial gradient that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(800px circle at ${gx}% ${gy}%, hsl(var(--color-primary) / 0.12), transparent 55%)`
          ),
        }}
      />

      {/* Grid pattern */}
      <div className="grid-pattern" />

      {/* Gradient mesh base */}
      <div className="gradient-mesh hidden md:block" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden md:block">
        <motion.div
          className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-[hsl(var(--color-primary))]/[0.04] blur-[100px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-[600px] w-[600px] rounded-full bg-[hsl(var(--color-accent))]/[0.04] blur-[120px]"
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--color-secondary))]/[0.03] blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle animated particles */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[hsl(var(--color-primary))]/20"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[var(--color-muted)]">
                {HERO_DATA.greeting}
              </span>
            </div>
          </motion.div>

          {/* Name with per-character animation */}
          <div className="mb-5 overflow-hidden" style={{ perspective: 800 }}>
            <h1
              className="flex flex-wrap items-center justify-center text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    char === " "
                      ? "inline-block w-3 sm:w-4 md:w-5"
                      : "inline-block transition-colors duration-300 hover:text-[hsl(var(--color-primary))] cursor-default"
                  }
                  whileHover={{ y: -4, scale: 1.1 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Rotating Roles with progress bar */}
          <motion.div
            variants={fadeUp(0.6)}
            initial="hidden"
            animate="visible"
            className="mb-8 flex flex-col items-center gap-3"
          >
            <div className="relative h-10 sm:h-12 flex items-center">
              {/* <span className="mr-2 text-lg text-[var(--color-muted)] sm:text-xl md:text-2xl">
                I'm a
              </span> */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block text-lg font-bold sm:text-xl md:text-2xl"
                >
                  <span className="bg-gradient-to-r from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-secondary))] bg-clip-text text-[var(--color-muted)]">
                    {HERO_DATA.roles[roleIndex]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Role progress dots */}
            <div className="flex items-center gap-1.5">
              {HERO_DATA.roles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRoleIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === roleIndex
                      ? "w-6 bg-[hsl(var(--color-primary))]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-muted)]"
                  }`}
                  aria-label={`Show role ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp(0.7)}
            initial="hidden"
            animate="visible"
            className="mb-10 max-w-lg text-sm leading-relaxed text-[var(--color-muted)] sm:text-base md:max-w-xl md:text-lg"
          >
            {HERO_DATA.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp(0.8)}
            initial="hidden"
            animate="visible"
            className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            {/* Primary CTA */}
            <button
              onClick={() => scrollToSection("#projects")}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[hsl(var(--color-foreground))] px-7 py-3.5 text-sm font-semibold text-[hsl(var(--color-background))] shadow-xl shadow-[hsl(var(--color-foreground))]/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[hsl(var(--color-foreground))]/15 active:scale-[0.97]"
            >
              {/* Shimmer */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles className="relative z-10 h-4 w-4" />
              <span className="relative z-10">View My Work</span>
              <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="group flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-[hsl(var(--color-primary))]/30 hover:bg-[hsl(var(--color-primary))]/[0.05] hover:shadow-lg hover:shadow-[hsl(var(--color-primary))]/5 active:scale-[0.97]"
            >
              <Mail className="h-4 w-4 text-[var(--color-muted)] transition-colors group-hover:text-[hsl(var(--color-primary))]" />
              <span>Get In Touch</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2"
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialItem}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-muted)] backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--color-primary))]/40 hover:text-[hsl(var(--color-primary))] hover:shadow-lg hover:shadow-[hsl(var(--color-primary))]/10"
                  aria-label={link.name}
                >
                  {/* Hover glow */}
                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-[hsl(var(--color-primary))]/0 transition-colors duration-300 group-hover:bg-[hsl(var(--color-primary))]/[0.06]" />
                  {Icon && <Icon className="relative z-10 h-4 w-4" />}
                </motion.a>
              );
            })}

            {/* Divider */}
            <span className="mx-2 h-5 w-px bg-[var(--color-border)]" />

            {/* Scroll hint */}
            <motion.span
              variants={socialItem}
              className="text-[11px] font-medium text-[var(--color-muted)]/60 tracking-wide hidden sm:inline"
            >
              Scroll to explore ↓
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="group flex flex-col items-center gap-2"
          aria-label="Scroll down"
        >
          {/* Mouse icon */}
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-[var(--color-border)] p-1 transition-colors group-hover:border-[hsl(var(--color-primary))]/50">
            <motion.div
              className="h-1.5 w-1 rounded-full bg-[var(--color-muted)] group-hover:bg-[hsl(var(--color-primary))]"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* ── Side accent lines ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-8 z-10 hidden h-24 w-px origin-bottom bg-gradient-to-t from-[hsl(var(--color-primary))]/30 to-transparent lg:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        className="absolute bottom-0 right-8 z-10 hidden h-24 w-px origin-bottom bg-gradient-to-t from-[hsl(var(--color-accent))]/30 to-transparent lg:block"
      />
    </section>
  );
}