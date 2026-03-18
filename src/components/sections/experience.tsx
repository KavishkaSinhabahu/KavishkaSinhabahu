"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowUpRight, Building2, Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { EXPERIENCES, EDUCATION } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ─── Animation variants ─── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, type: "spring", stiffness: 200, damping: 22 },
  },
});

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

/* ─── Timeline Dot ─── */
function TimelineDot({ index, isLast }: { index: number; isLast: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Dot */}
      <motion.div
        variants={scaleIn(index * 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[hsl(var(--color-primary))]/30 bg-[var(--color-surface)] shadow-lg shadow-[hsl(var(--color-primary))]/5"
      >
        <span className="text-xs font-black text-[hsl(var(--color-primary))]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Pulse ring - hidden on mobile for performance */}
        <span className="absolute inset-0 animate-ping rounded-xl border border-[hsl(var(--color-primary))]/20 [animation-duration:3s] hidden md:block" />
      </motion.div>

      {/* Connecting line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="h-full w-px origin-top bg-gradient-to-b from-[hsl(var(--color-primary))]/30 via-[var(--color-border)] to-transparent"
        />
      )}
    </div>
  );
}

/* ─── Experience Card ─── */
function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(index * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm transition-all duration-500 hover:border-[hsl(var(--color-primary))]/25 hover:shadow-2xl hover:shadow-[hsl(var(--color-primary))]/[0.04]">
        {/* Top accent gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--color-primary))]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Card number watermark */}
        <span className="pointer-events-none absolute -right-4 -top-6 select-none text-[100px] font-black leading-none text-[var(--color-foreground)]/[0.015]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              {/* Company logo placeholder */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-primary))]/10 to-[hsl(var(--color-accent))]/10 ring-1 ring-[hsl(var(--color-primary))]/10">
                <Building2 className="h-5 w-5 text-[hsl(var(--color-primary))]" />
              </div>
              <div>
                <h4 className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
                  {exp.role}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                    <ArrowUpRight className="h-3 w-3" />
                    {exp.company}
                  </span>
                  {/* If location exists */}
                  <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                    <MapPin className="h-3 w-3" />
                    On-site
                  </span>
                </div>
              </div>
            </div>

            {/* Period badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm">
              <Calendar className="h-3 w-3" />
              {exp.period}
            </div>
          </div>

          {/* Description bullets */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 space-y-3"
          >
            {exp.description.map((desc, j) => (
              <motion.li
                key={j}
                variants={listItem}
                className="group/item flex gap-3 text-[14px] leading-relaxed text-[var(--color-muted)] sm:text-[15px]"
              >
                <span className="relative mt-2 flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--color-primary))]/40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-primary))]" />
                </span>
                <span className="transition-colors duration-200 group-hover/item:text-[var(--color-foreground)]">
                  {desc}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag, j) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + j * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                className="inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)] transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:text-[hsl(var(--color-primary))]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] transition-all duration-500 group-hover:w-2/3" />
      </div>
    </motion.div>
  );
}

/* ─── Education Card ─── */
function EducationCard({ edu, index }: { edu: typeof EDUCATION[number]; index: number }) {
  return (
    <motion.div
      variants={fadeUp(index * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[hsl(var(--color-accent))]/25 hover:shadow-xl hover:shadow-[hsl(var(--color-accent))]/[0.04]">
        {/* Side accent */}
        <div className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-gradient-to-b from-[hsl(var(--color-accent))] via-[hsl(var(--color-primary))] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-accent))]/10 to-[hsl(var(--color-primary))]/10 ring-1 ring-[hsl(var(--color-accent))]/10">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--color-accent))]" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2.5 py-1 text-[10px] font-semibold text-[hsl(var(--color-accent))]">
            <Calendar className="h-2.5 w-2.5" />
            {edu.period}
          </div>
        </div>

        {/* Details */}
        <h4 className="mb-1.5 text-[15px] font-bold tracking-tight text-[var(--color-foreground)] transition-colors group-hover:text-[hsl(var(--color-accent))]">
          {edu.degree}
        </h4>
        <div className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
          <Building2 className="h-3.5 w-3.5" />
          {edu.institution}
        </div>

        {/* Decorative corner */}
        <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[hsl(var(--color-accent))]/[0.03] blur-xl transition-all duration-500 group-hover:bg-[hsl(var(--color-accent))]/[0.08]" />
      </div>
    </motion.div>
  );
}

/* ─── Section Label Component ─── */
function SectionLabel({
  icon: Icon,
  label,
  color = "primary",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  color?: "primary" | "accent";
  delay?: number;
}) {
  const colorClasses = {
    primary: {
      bg: "from-[hsl(var(--color-primary))]/10 to-[hsl(var(--color-primary))]/5",
      ring: "ring-[hsl(var(--color-primary))]/15",
      icon: "text-[hsl(var(--color-primary))]",
      line: "from-[hsl(var(--color-primary))]/40",
    },
    accent: {
      bg: "from-[hsl(var(--color-accent))]/10 to-[hsl(var(--color-accent))]/5",
      ring: "ring-[hsl(var(--color-accent))]/15",
      icon: "text-[hsl(var(--color-accent))]",
      line: "from-[hsl(var(--color-accent))]/40",
    },
  };

  const c = colorClasses[color];

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-8 flex items-center gap-4"
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ring-1",
          c.bg,
          c.ring
        )}
      >
        <Icon className={cn("h-5 w-5", c.icon)} />
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight">{label}</h3>
        <p className="text-xs text-[var(--color-muted)]">
          {color === "primary" ? "Professional journey" : "Academic background"}
        </p>
      </div>
      {/* Expanding line */}
      <div
        className={cn(
          "ml-auto hidden h-px flex-1 bg-gradient-to-r to-transparent sm:block",
          c.line
        )}
      />
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient backgrounds */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[hsl(var(--color-primary))]/[0.02] blur-[120px]"
      />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[hsl(var(--color-accent))]/[0.02] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience & Education"
          subtitle="My professional journey and academic background"
        />

        {/* ── Work Experience ── */}
        <div className="mb-24">
          <SectionLabel icon={Briefcase} label="Work Experience" color="primary" />

          {/* Timeline Layout */}
          <div className="relative">
            {/* Desktop: vertical timeline */}
            <div className="space-y-6 lg:space-y-0">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="relative lg:flex lg:gap-8">
                  {/* Timeline column - desktop only */}
                  <div className="hidden shrink-0 lg:flex lg:w-12 lg:flex-col lg:items-center">
                    <TimelineDot index={i} isLast={i === EXPERIENCES.length - 1} />
                  </div>

                  {/* Card */}
                  <div className={cn("flex-1 pb-6 lg:pb-10", i === 0 && "lg:pt-0")}>
                    <ExperienceCard exp={exp} index={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div>
          <SectionLabel icon={GraduationCap} label="Education" color="accent" delay={0.1} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EDUCATION.map((edu, i) => (
              <EducationCard key={i} edu={edu} index={i} />
            ))}
          </div>

          {/* Achievement Banner */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface)]/80 to-[var(--color-surface-elevated)]/80 p-6 backdrop-blur-sm sm:p-8">
              {/* Pattern overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: `radial-gradient(var(--color-foreground) 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))]/15 to-[hsl(var(--color-accent))]/15 ring-1 ring-[hsl(var(--color-primary))]/10">
                  <Award className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-bold tracking-tight">
                    Always Learning & Growing
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    Continuously expanding my skill set through online courses, certifications,
                    and hands-on projects. Currently exploring AI/ML integration and cloud-native architectures.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}