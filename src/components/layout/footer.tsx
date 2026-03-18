"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </motion.a>
              );
            })}
          </div>

          {/* Credit */}
          <div className="text-center text-sm text-[var(--color-muted)]">
            <p>Designed & Built by Kavishka Sinhabahu</p>
            <p className="mt-1">© 2025 All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-0 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-muted)] shadow-lg transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </footer>
  );
}
