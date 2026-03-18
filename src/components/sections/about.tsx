"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ABOUT_BIO, STATS } from "@/lib/data";
import { Code2, Coffee, Rocket, Users, MapPin, Calendar, Zap } from "lucide-react";

/* ─── Stat icon mapping ─── */
const statIconMap: Record<string, React.ElementType> = {
  projects: Rocket,
  clients: Users,
  experience: Calendar,
  coffee: Coffee,
  default: Zap,
};

function getStatIcon(label: string) {
  const key = Object.keys(statIconMap).find((k) =>
    label.toLowerCase().includes(k)
  );
  return statIconMap[key || "default"];
}

/* ─── CountUp with spring physics ─── */
function CountUp({ target, start = 0 }: { target: string; start?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
  const hasSuffix = target.includes("+");

  const motionVal = useMotionValue(start);
  const springVal = useSpring(motionVal, {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    if (isInView) {
      motionVal.set(numericTarget);
    }
  }, [isInView, motionVal, numericTarget]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [springVal]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {hasSuffix && "+"}
    </span>
  );
}

/* ─── Paragraph with highlighted keywords ─── */
function HighlightedParagraph({ text }: { text: string }) {
  // Bold text wrapped in **...**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-base">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span
            key={i}
            className="font-semibold text-[var(--color-foreground)]"
          >
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

/* ─── Tilt Card ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  // Disable tilt on touch devices
  const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Fade-up variant factory ─── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const statCardVariant: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

/* ─── Main Component ─── */
export function About() {
  const paragraphs = ABOUT_BIO.split("\n\n");

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[hsl(var(--color-primary))]/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[hsl(var(--color-accent))]/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my journey"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── Left Column: Photo Card ── */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-start justify-center lg:col-span-5"
          >
            <TiltCard className="w-full max-w-sm">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                {/* Photo area */}
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[var(--color-surface-elevated)]">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Kavishka Sinhabahu"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />

                  {/* Hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Info strip below photo */}
                <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-[var(--color-foreground)]">
                      Kavishka Sinhabahu
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--color-muted)]">
                      <MapPin className="h-3 w-3" />
                      Sri Lanka
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))]/10">
                    <Code2 className="h-4 w-4 text-[hsl(var(--color-primary))]" />
                  </div>
                </div>

                {/* Tech stack strip */}
                {/* <div className="flex flex-wrap gap-1.5 border-t border-[var(--color-border)] px-5 py-3">
                  {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[var(--color-surface-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div> */}
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Right Column: Bio & Details ── */}
          <div className="lg:col-span-7">
            {/* Bio paragraphs */}
            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-5"
            >
              {/* Decorative quote line */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))]" />
                <p className="text-lg font-semibold italic text-[var(--color-foreground)]/80 sm:text-xl">
                  &ldquo;Crafting digital experiences that matter.&rdquo;
                </p>
              </div>

              {paragraphs.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.2 + i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <HighlightedParagraph text={p} />
                </motion.div>
              ))}
            </motion.div>

            {/* Quick info cards */}
            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {[
                { icon: MapPin, label: "Based in", value: "Sri Lanka" },
                { icon: Code2, label: "Focus", value: "Full-Stack" },
                { icon: Coffee, label: "Fuel", value: "Coffee ☕" },
                { icon: Zap, label: "Motto", value: "Ship fast" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:bg-[hsl(var(--color-primary))]/[0.03]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-elevated)] transition-colors group-hover:bg-[hsl(var(--color-primary))]/10">
                    <item.icon className="h-3.5 w-3.5 text-[var(--color-muted)] transition-colors group-hover:text-[hsl(var(--color-primary))]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                      {item.label}
                    </p>
                    <p className="truncate text-xs font-bold text-[var(--color-foreground)]">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((stat, i) => {
            const Icon = getStatIcon(stat.label);
            return (
              <motion.div key={stat.label} variants={statCardVariant}>
                <TiltCard className="h-full">
                  <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-7 text-center backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:shadow-xl hover:shadow-[hsl(var(--color-primary))]/[0.04]">
                    {/* Background number watermark */}
                    <span className="pointer-events-none absolute -right-2 -top-4 text-[80px] font-black leading-none text-[var(--color-foreground)]/[0.02] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--color-primary))]/[0.08] transition-colors group-hover:bg-[hsl(var(--color-primary))]/15">
                      <Icon className="h-4 w-4 text-[hsl(var(--color-primary))]" />
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-extrabold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
                      <CountUp target={stat.value} start={stat.label === "Expected Graduation" ? 2016 : 0} />
                    </div>

                    {/* Label */}
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
                      {stat.label}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] transition-all duration-500 group-hover:w-3/4" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}