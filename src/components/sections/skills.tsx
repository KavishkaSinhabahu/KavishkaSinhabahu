"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Palette,
  Wrench,
  Cloud,
  Smartphone,
  GitBranch,
  Boxes,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ─── Icon mapping for categories ─── */
const categoryIcons: Record<string, React.ElementType> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  design: Palette,
  tools: Wrench,
  devops: Cloud,
  cloud: Cloud,
  mobile: Smartphone,
  "version control": GitBranch,
  languages: Boxes,
};

function getCategoryIcon(category: string): React.ElementType {
  const key = Object.keys(categoryIcons).find((k) =>
    category.toLowerCase().includes(k)
  );
  return categoryIcons[key || "other"] || Boxes;
}

/* ─── Category color mapping ─── */
const categoryColors: Record<string, { gradient: string; bg: string; text: string; ring: string; glow: string }> = {
  frontend: {
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    ring: "ring-blue-500/20",
    glow: "group-hover:shadow-blue-500/10",
  },
  backend: {
    gradient: "from-emerald-500 to-green-400",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    ring: "ring-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/10",
  },
  database: {
    gradient: "from-violet-500 to-purple-400",
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    ring: "ring-violet-500/20",
    glow: "group-hover:shadow-violet-500/10",
  },
  mobile: {
    gradient: "from-pink-500 to-rose-400",
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    ring: "ring-pink-500/20",
    glow: "group-hover:shadow-pink-500/10",
  },
  languages: {
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    ring: "ring-amber-500/20",
    glow: "group-hover:shadow-amber-500/10",
  },
  tools: {
    gradient: "from-teal-500 to-cyan-400",
    bg: "bg-teal-500/10",
    text: "text-teal-500",
    ring: "ring-teal-500/20",
    glow: "group-hover:shadow-teal-500/10",
  },
};

function getCategoryColor(category: string) {
  const key = Object.keys(categoryColors).find((k) =>
    category.toLowerCase().includes(k)
  );
  return (
    categoryColors[key || "tools"] || categoryColors.tools
  );
}

/* ─── Variants ─── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
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
};

const tagStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const tagVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Skill Tag Component ─── */
function SkillTag({ skill, color }: { skill: string; color: ReturnType<typeof getCategoryColor> }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      variants={tagVariant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative cursor-default select-none overflow-hidden rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-all duration-300",
        "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-foreground)]/80",
        "hover:border-transparent hover:shadow-md"
      )}
    >
      {/* Hover fill */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 rounded-lg",
              color.bg
            )}
          />
        )}
      </AnimatePresence>

      <span className={cn(
        "relative z-10 transition-colors duration-300",
        isHovered && color.text
      )}>
        {skill}
      </span>
    </motion.span>
  );
}

/* ─── Category Card Component ─── */
function CategoryCard({
  category,
  index,
}: {
  category: (typeof SKILLS)[number];
  index: number;
}) {
  const Icon = getCategoryIcon(category.category);
  const color = getCategoryColor(category.category);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);
  const smoothRX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);
  const cardContent = (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm transition-all duration-500 hover:border-[var(--color-border-hover)] hover:shadow-2xl">
      {/* Top gradient line */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        color.gradient
      )} />

      {/* Watermark number */}
      <span className="pointer-events-none absolute -right-3 -top-5 select-none text-[80px] font-black leading-none text-[var(--color-foreground)]/[0.015]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Header */}
      <div className="relative border-b border-[var(--color-border)]/50 px-6 pb-4 pt-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-all duration-500",
            color.bg,
            color.ring,
            "group-hover:shadow-lg"
          )}>
            <Icon className={cn("h-4.5 w-4.5", color.text)} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-[var(--color-foreground)]">
              {category.category}
            </h3>
            <p className="text-[11px] text-[var(--color-muted)]">
              {category.items.length} technologies
            </p>
          </div>
        </div>

        {/* Proficiency indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-elevated)]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              className={cn("h-full rounded-full bg-gradient-to-r", color.gradient)}
            />
          </div>
          <TrendingUp className={cn("h-3 w-3", color.text)} />
        </div>
      </div>

      {/* Skills grid */}
      <motion.div
        variants={tagStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-1 flex-wrap content-start gap-2 p-6"
      >
        {category.items.map((skill) => (
          <SkillTag key={skill} skill={skill} color={color} />
        ))}
      </motion.div>

      {/* Bottom accent on hover */}
      <div className={cn(
        "absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-2/3",
        color.gradient
      )} />

      {/* Corner glow */}
      <div className={cn(
        "pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-[60px] transition-opacity duration-500",
        color.bg,
        "opacity-0 group-hover:opacity-60"
      )} />
    </div>
  );

  // Disable tilt on touch devices
  const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  if (isTouch) {
    return (
      <div className={cn("group relative", color.glow)}>
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothRX,
        rotateY: smoothRY,
        transformPerspective: 1000,
      }}
      className={cn("group relative", color.glow)}
    >
      {cardContent}
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Count total skills
  const totalSkills = SKILLS.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient blurs */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[hsl(var(--color-primary))]/[0.02] blur-[140px]"
      />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[hsl(var(--color-accent))]/[0.02] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with on a daily basis"
        />

        {/* Stats bar */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            // { label: "Categories", value: SKILLS.length, icon: Boxes },
            { label: "Technologies", value: totalSkills, icon: Code2 },
            { label: "Years Learning", value: "4+", icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-surface-elevated)]">
                <stat.icon className="h-4 w-4 text-[var(--color-muted)]" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
                  {stat.value}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((category, i) => (
            <CategoryCard key={category.category} category={category} index={i} />
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface)]/80 to-[var(--color-surface-elevated)]/80 p-6 backdrop-blur-sm sm:p-8">
            {/* Dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: "radial-gradient(var(--color-foreground) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))]/15 to-[hsl(var(--color-accent))]/15 ring-1 ring-[hsl(var(--color-primary))]/10">
                <Sparkles className="h-6 w-6 text-[hsl(var(--color-primary))]" />
              </div>
              <div>
                <h4 className="text-base font-bold tracking-tight">
                  Always Expanding My Toolkit
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  I'm constantly exploring new technologies and frameworks.
                  Currently diving deeper into AI/ML, Web3, and cloud-native architectures.
                </p>
              </div>
              <div className="hidden shrink-0 sm:block">
                <Zap className="h-8 w-8 text-[var(--color-foreground)]/[0.06]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}