"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Download,
  Menu,
  X,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn, scrollToSection } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

const getIcon = (iconName: string) =>
  iconMap[iconName.toLowerCase()] ?? <ArrowUpRight className="h-4 w-4" />;

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 260, damping: 24 },
  }),
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");

  const sectionIds = NAV_LINKS.map((l) =>
    l.href.startsWith("#") ? l.href.substring(1) : ""
  ).filter(Boolean);

  const activeSectionId = useScrollSpy(sectionIds, {
    rootMargin: "-20% 0px -60% 0px",
  });

  // Live clock
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setIsOpen(false);
      if (href.startsWith("#")) {
        scrollToSection(href);
      }
    },
    []
  );

  /* ─── Shared content ─── */
  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-5 lg:p-6">
      {/* ── Top: Avatar + Identity ── */}
      <div className="flex flex-col items-center gap-3">
        {/* Avatar ring */}
        <div className="relative">
          {/* Animated gradient ring */}
          <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-secondary))] opacity-80 blur-[2px] animate-[spin_6s_linear_infinite]" />
          <div className="relative h-20 w-20 rounded-full border-[3px] border-[var(--color-background)] overflow-hidden bg-[var(--color-surface-elevated)]">
            <Image
              src="/images/avatar.jpg"
              alt="Kavishka Sinhabahu"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 z-10 h-4 w-4 rounded-full border-2 border-[var(--color-background)] bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,.45)]" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold tracking-tight leading-tight">
            Kavishka Sinhabahu
          </h2>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-primary))]/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-primary))]">
            <Sparkles className="h-3 w-3" />
            Full-Stack Developer
          </p>
        </div>
      </div>

      {/* ── Middle: Navigation ── */}
      <nav className="flex flex-col gap-0.5 my-auto">
        {NAV_LINKS.map((link, i) => {
          const id = link.href.startsWith("#") ? link.href.substring(1) : "";
          const isActive =
            activeSectionId === id || (!activeSectionId && id === "home");

          return (
            <motion.button
              key={link.href}
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onMouseEnter={() => setHoveredNav(id)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))]/40",
                isActive
                  ? "text-[hsl(var(--color-primary))]"
                  : "text-[var(--color-foreground)]/55 hover:text-[var(--color-foreground)]"
              )}
            >
              {/* Hover / active pill background */}
              <AnimatePresence>
                {(isActive || hoveredNav === id) && (
                  <motion.span
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      isActive
                        ? "bg-[hsl(var(--color-primary))]/[0.08]"
                        : "bg-[var(--color-surface-elevated)]"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </AnimatePresence>

              {/* Active indicator bar */}
              {isActive && (
                <motion.span
                  layoutId="nav-bar"
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[hsl(var(--color-primary))] shadow-[2px_0_8px_0_hsl(var(--color-primary)/0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              {/* Number */}
              <span
                className={cn(
                  "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors",
                  isActive
                    ? "bg-[hsl(var(--color-primary))]/15 text-[hsl(var(--color-primary))]"
                    : "bg-[var(--color-surface-elevated)] text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative z-10">{link.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* ── Bottom: Actions & Socials ── */}
      <div className="flex flex-col gap-4">
        {/* Theme + time row */}
        <div className="flex items-center justify-between rounded-xl bg-[var(--color-surface-elevated)] px-4 py-2">
          <span className="text-[11px] font-medium text-[var(--color-muted)] tabular-nums tracking-wide">
            {time || "--:--"}
          </span>
          <ThemeToggle />
        </div>

        {/* CTA Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[hsl(var(--color-foreground))] px-5 py-3 text-sm font-semibold text-[hsl(var(--color-background))] shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
        >
          {/* Shimmer effect */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Download className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Download CV</span>
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]/60 transition-all duration-300 hover:border-[hsl(var(--color-primary))]/40 hover:text-[hsl(var(--color-primary))] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[hsl(var(--color-primary))]/10"
            >
              {getIcon(link.icon)}
            </a>
          ))}
        </div>

        {/* Footer line */}
        <p className="text-center text-[10px] text-[var(--color-muted)]/60 tracking-wide">
          © {new Date().getFullYear()} · Designed & Built by Kavishka Sinhabahu
        </p>
      </div>
    </div>
  );

  /* ─── Render ─── */
  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-[var(--color-border)]/60 lg:bg-[var(--color-background)]/80 lg:backdrop-blur-2xl">
        {/* Decorative noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        {/* Gradient accent at top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[hsl(var(--color-primary))]/[0.04] to-transparent" />

        <div className="relative z-10 flex h-full flex-col">
          {sidebarContent}
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-border)]/50 bg-[var(--color-background)]/70 px-4 backdrop-blur-2xl backdrop-saturate-150 lg:hidden">
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-1.5 text-base font-bold tracking-tight"
        >
          {/* <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))] text-xs font-black text-white shadow-md shadow-[hsl(var(--color-primary))]/25">
            K
          </span> */}
          <span>
            KAVISHKA<span className="text-[hsl(var(--color-accent))]"> .</span>
          </span>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm active:scale-95 transition-transform"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.5 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-xs flex-col border-r border-[var(--color-border)]/60 bg-[var(--color-background)] shadow-2xl shadow-black/20 lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)]/50 px-5">
                <span className="text-sm font-bold tracking-tight">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] active:scale-95 transition-transform"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}