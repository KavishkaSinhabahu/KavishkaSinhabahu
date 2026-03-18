"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
  Folder,
  ArrowUpRight,
  Layers,
  Monitor,
  Smartphone,
  Server,
  Sparkles,
  Eye,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "Desktop"] as const;
type Filter = (typeof FILTERS)[number];

const filterIcons: Record<Filter, React.ElementType> = {
  All: Layers,
  Web: Monitor,
  Mobile: Smartphone,
  Desktop: Server,
};

/* ─── Animation Variants ─── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
});

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const tagStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a gradient based on index for visual variety
  const gradients = [
    "from-violet-500/20 to-blue-500/20",
    "from-rose-500/20 to-orange-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-amber-500/20 to-yellow-500/20",
    "from-cyan-500/20 to-blue-500/20",
    "from-pink-500/20 to-purple-500/20",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm transition-all duration-500 hover:border-[hsl(var(--color-primary))]/20 hover:shadow-2xl hover:shadow-[hsl(var(--color-primary))]/[0.06]">
        {/* ── Image / Preview area ── */}
        <div className="relative overflow-hidden">
          <div
            className={cn(
              "flex h-48 items-center justify-center bg-gradient-to-br transition-all duration-700",
              gradient,
              isHovered && "scale-105"
            )}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Floating project icon */}
            <motion.div
              animate={isHovered ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md"
            >
              <Folder className="h-7 w-7 text-white drop-shadow-md" />
            </motion.div>

            {/* Floating accent shapes */}
            <motion.div
              animate={isHovered ? { x: 8, y: -8, rotate: 45 } : { x: 0, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="absolute right-8 top-8 h-8 w-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            />
            <motion.div
              animate={isHovered ? { x: -6, y: 6 } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="absolute bottom-8 left-10 h-5 w-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            />
          </div>

          {/* Hover overlay with actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px]"
              >
                {project.live && (
                  <motion.a
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-gray-900 shadow-lg transition-transform hover:scale-110 active:scale-95"
                    aria-label="View live demo"
                  >
                    <Eye className="h-4 w-4" />
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-gray-900 shadow-lg transition-transform hover:scale-110 active:scale-95"
                    aria-label="View source code"
                  >
                    <Github className="h-4 w-4" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Type badge - floating on image */}
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles className="h-2.5 w-2.5" />
              {project.type}
            </span>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Title with arrow */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-[hsl(var(--color-primary))] sm:text-lg">
              {project.title}
            </h3>
            <motion.div
              animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[hsl(var(--color-primary))]" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="mb-5 flex-1 text-[13px] leading-relaxed text-[var(--color-muted)] sm:text-sm">
            {project.description}
          </p>

          {/* Tech tags */}
          <motion.div
            variants={tagStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-1.5"
          >
            {project.tech.map((t) => (
              <motion.span
                key={t}
                variants={tagItem}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)] transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:text-[hsl(var(--color-primary))]"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] transition-all duration-500 group-hover:w-3/4" />
      </div>
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient backgrounds */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-40 top-40 h-[600px] w-[600px] rounded-full bg-[hsl(var(--color-primary))]/[0.02] blur-[140px]"
      />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-40 bottom-40 h-[500px] w-[500px] rounded-full bg-[hsl(var(--color-accent))]/[0.02] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A selection of projects I've built and delivered"
        />

        {/* ── Filter Bar ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-1.5 backdrop-blur-sm">
            {FILTERS.map((f) => {
              const Icon = filterIcons[f];
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm",
                    isActive
                      ? "text-[hsl(var(--color-background))]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-xl bg-[hsl(var(--color-foreground))] shadow-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-between"
        >
          <p className="text-sm text-[var(--color-muted)]">
            Showing{" "}
            <span className="font-bold text-[var(--color-foreground)]">
              {filtered.length}
            </span>{" "}
            project{filtered.length !== 1 && "s"}
            {filter !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-bold text-[hsl(var(--color-primary))]">
                  {filter}
                </span>
              </>
            )}
          </p>
          <div className="hidden items-center gap-1 text-xs text-[var(--color-muted)] sm:flex">
            <Sparkles className="h-3 w-3" />
            <span>Click cards to explore</span>
          </div>
        </motion.div>

        {/* ── Project Grid ── */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-surface-elevated)]">
                <Folder className="h-7 w-7 text-[var(--color-muted)]" />
              </div>
              <p className="text-base font-semibold text-[var(--color-foreground)]">
                No projects found
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Try selecting a different category
              </p>
              <button
                onClick={() => setFilter("All")}
                className="mt-4 rounded-lg bg-[hsl(var(--color-primary))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--color-primary))] transition-colors hover:bg-[hsl(var(--color-primary))]/20"
              >
                Show all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/KavishkaSinhabahu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:shadow-lg hover:shadow-[hsl(var(--color-primary))]/[0.06]"
          >
            <Github className="h-4 w-4 transition-colors group-hover:text-[hsl(var(--color-primary))]" />
            <span>View more on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--color-primary))]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}