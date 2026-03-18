"use client";

import { useState, useRef, type FormEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Github,
  Linkedin,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  User,
  AtSign,
  FileText,
  PenLine,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/data";
import { submitContactForm } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

/* ─── Animation Variants ─── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemSpring: Variants = {
  hidden: { opacity: 0, x: -16, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

const socialPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/* ─── Contact Details Config ─── */
const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    color: "from-blue-500/15 to-cyan-500/15",
    iconColor: "text-blue-500",
    ringColor: "ring-blue-500/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
    color: "from-emerald-500/15 to-green-500/15",
    iconColor: "text-emerald-500",
    ringColor: "ring-emerald-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT_INFO.location,
    color: "from-violet-500/15 to-purple-500/15",
    iconColor: "text-violet-500",
    ringColor: "ring-violet-500/20",
  },
  {
    icon: Globe,
    label: "Website",
    value: CONTACT_INFO.website,
    href: `https://${CONTACT_INFO.website}`,
    color: "from-amber-500/15 to-orange-500/15",
    iconColor: "text-amber-500",
    ringColor: "ring-amber-500/20",
  },
];

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

/* ─── Form Field Component ─── */
function FormField({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  rows,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.trim().length > 0;

  const sharedClasses = cn(
    "peer w-full rounded-xl border bg-[var(--color-surface)]/60 pl-10 sm:pl-11 pr-3 sm:pr-4 text-sm text-[var(--color-foreground)] placeholder-transparent backdrop-blur-sm outline-none transition-all duration-300",
    "border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
    "focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary))]/15 focus:shadow-lg focus:shadow-[hsl(var(--color-primary))]/[0.04]",
    error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/15",
    rows
      ? "py-3 sm:py-3.5 resize-none min-h-[120px] sm:min-h-[130px]"
      : "py-3 sm:py-3.5 h-[46px] sm:h-[50px]"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative"
    >
      {/* Icon */}
      <div
        className={cn(
          "pointer-events-none absolute left-3 sm:left-3.5 z-10 flex h-5 w-5 items-center justify-center transition-colors duration-300",
          rows ? "top-3 sm:top-4" : "top-1/2 -translate-y-1/2",
          isActive
            ? "text-[hsl(var(--color-primary))]"
            : "text-[var(--color-muted)]"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Floating label */}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-9 sm:left-10 z-10 px-1.5 text-xs sm:text-sm transition-all duration-200",
          rows ? "top-3 sm:top-4" : "top-1/2 -translate-y-1/2",
          isActive &&
            "!top-0 -translate-y-1/2 !text-[10px] sm:!text-[11px] font-semibold text-[hsl(var(--color-primary))] bg-[var(--color-surface)]",
          !isActive && "text-[var(--color-muted)]"
        )}
      >
        {label}
      </label>

      {rows ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          placeholder={placeholder}
          className={sharedClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={sharedClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {/* Focus line accent */}
      <div
        className={cn(
          "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] transition-all duration-300",
          isFocused ? "w-1/3 sm:w-1/2 opacity-100" : "w-0 opacity-0"
        )}
      />

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1 sm:mt-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-red-500"
          >
            <XCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Contact Detail Card ─── */
function ContactCard({
  item,
}: {
  item: (typeof contactDetails)[number];
}) {
  const Icon = item.icon;

  const inner = (
    <div className="group relative flex items-center gap-3 sm:gap-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-black/[0.04]">
      {/* Hover background fill */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          item.color
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-110",
          item.color,
          item.ringColor
        )}
      >
        <Icon className={cn("h-4 w-4", item.iconColor)} />
      </div>

      {/* Text */}
      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          {item.label}
        </p>
        <p className="truncate text-xs sm:text-sm font-semibold text-[var(--color-foreground)]">
          {item.value}
        </p>
      </div>

      {/* Arrow */}
      {item.href && (
        <ArrowUpRight className="relative z-10 ml-auto h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 translate-x-1 text-[var(--color-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      )}
    </div>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

/* ─── Main Component ─── */
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Please write a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setFormStatus(null);
    try {
      const result = await submitContactForm(formData);
      setFormStatus(result);
      if (result.success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      }
    } catch {
      setFormStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: string) => (val: string) =>
    setFormData((prev) => ({ ...prev, [field]: val }));

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Ambient blurs */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-20 sm:-left-40 top-20 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-[hsl(var(--color-primary))]/[0.025] blur-[80px] sm:blur-[140px]"
      />
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-20 sm:-right-40 bottom-20 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[hsl(var(--color-accent))]/[0.025] blur-[60px] sm:blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together"
        />

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Panel: Info ── */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--color-primary))]/50 via-[hsl(var(--color-accent))]/50 to-transparent" />

              {/* Header */}
              <div className="border-b border-[var(--color-border)]/50 px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsl(var(--color-primary))]/15 to-[hsl(var(--color-accent))]/15 ring-1 ring-[hsl(var(--color-primary))]/15">
                    <MessageSquare className="h-4 w-4 text-[hsl(var(--color-primary))]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold tracking-tight">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[var(--color-muted)]">
                      Choose your preferred way to reach out
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact cards */}
              <div className="flex-1 p-3 sm:p-4 lg:p-6">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {contactDetails.map((item) => (
                    <motion.div key={item.label} variants={itemSpring}>
                      <ContactCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Footer: Response + Socials */}
              <div className="border-t border-[var(--color-border)]/50 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                {/* Response time */}
                <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl bg-[var(--color-surface-elevated)]/60 px-3 sm:px-4 py-2.5 sm:py-3">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-emerald-500/10">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--color-muted)]">
                    Typical response within{" "}
                    <span className="font-bold text-[var(--color-foreground)]">
                      24 hours
                    </span>
                  </p>
                </div>

                {/* Socials */}
                <p className="mb-2.5 sm:mb-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                  Connect with me
                </p>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-2"
                >
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = socialIcons[link.icon];
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={socialPop}
                        whileHover={{ y: -3, scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-muted)] transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:text-[hsl(var(--color-primary))] hover:shadow-lg hover:shadow-[hsl(var(--color-primary))]/10"
                        aria-label={link.name}
                      >
                        <span className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl bg-[hsl(var(--color-primary))]/0 transition-colors duration-300 group-hover:bg-[hsl(var(--color-primary))]/[0.06]" />
                        {Icon && (
                          <Icon className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 sm:-bottom-16 sm:-right-16 h-32 w-32 sm:h-44 sm:w-44 rounded-full bg-gradient-to-br from-[hsl(var(--color-primary))]/[0.05] to-[hsl(var(--color-accent))]/[0.05] blur-2xl sm:blur-3xl" />
            </div>
          </motion.div>

          {/* ── Right Panel: Form ── */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--color-primary))]/40 to-transparent" />

              {/* Form header */}
              <div className="border-b border-[var(--color-border)]/50 px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsl(var(--color-primary))]/15 to-[hsl(var(--color-accent))]/15 ring-1 ring-[hsl(var(--color-primary))]/15">
                    <PenLine className="h-4 w-4 text-[hsl(var(--color-primary))]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[var(--color-muted)]">
                      Fill out the form and I&apos;ll get back to you
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5 p-4 sm:p-6 lg:p-8"
              >
                {/* Name & Email — stack on mobile, side-by-side on sm+ */}
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                  <FormField
                    id="name"
                    label="Your Name"
                    icon={User}
                    value={formData.name}
                    onChange={update("name")}
                    placeholder="John Doe"
                    error={errors.name}
                  />
                  <FormField
                    id="email"
                    label="Your Email"
                    icon={AtSign}
                    type="email"
                    value={formData.email}
                    onChange={update("email")}
                    placeholder="john@example.com"
                    error={errors.email}
                  />
                </div>

                <FormField
                  id="subject"
                  label="Subject"
                  icon={FileText}
                  value={formData.subject}
                  onChange={update("subject")}
                  placeholder="Project Inquiry"
                  error={errors.subject}
                />

                <FormField
                  id="message"
                  label="Your Message"
                  icon={MessageSquare}
                  value={formData.message}
                  onChange={update("message")}
                  placeholder="Tell me about your project..."
                  error={errors.message}
                  rows={5}
                />

                {/* Character count + required note */}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] sm:text-[11px] text-[var(--color-muted)]">
                    <span
                      className={cn(
                        "tabular-nums font-medium",
                        formData.message.length > 0 &&
                          "text-[var(--color-foreground)]"
                      )}
                    >
                      {formData.message.length}
                    </span>
                    /2000
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[var(--color-muted)]">
                    <span className="text-red-400">*</span> All fields required
                  </p>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className={cn(
                    "group relative inline-flex w-full items-center justify-center gap-2 sm:gap-2.5 overflow-hidden rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold shadow-xl transition-all duration-300 sm:w-auto",
                    isSubmitting
                      ? "cursor-not-allowed bg-[var(--color-muted)]/50 text-[var(--color-muted)]"
                      : "bg-[hsl(var(--color-foreground))] text-[hsl(var(--color-background))] hover:shadow-2xl hover:shadow-[hsl(var(--color-foreground))]/15"
                  )}
                >
                  {/* Shimmer */}
                  {!isSubmitting && (
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="hidden xs:inline">Sending...</span>
                        <span className="xs:hidden">Wait...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status */}
                <AnimatePresence mode="wait">
                  {formStatus && (
                    <motion.div
                      key={formStatus.success ? "ok" : "err"}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className={cn(
                        "flex items-start gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl border p-3 sm:p-4 text-xs sm:text-sm",
                        formStatus.success
                          ? "border-emerald-500/20 bg-emerald-500/[0.07]"
                          : "border-red-500/20 bg-red-500/[0.07]"
                      )}
                    >
                      {formStatus.success ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-500" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500" />
                      )}
                      <div>
                        <p
                          className={cn(
                            "font-semibold text-xs sm:text-sm",
                            formStatus.success
                              ? "text-emerald-600"
                              : "text-red-600"
                          )}
                        >
                          {formStatus.success
                            ? "Message sent!"
                            : "Failed to send"}
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-[10px] sm:text-xs",
                            formStatus.success
                              ? "text-emerald-600/70"
                              : "text-red-600/70"
                          )}
                        >
                          {formStatus.message}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA Banner ── */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-16"
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface)]/80 to-[var(--color-surface-elevated)]/80 backdrop-blur-sm">
            {/* Dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-foreground) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative flex flex-col items-center gap-4 sm:gap-5 px-4 py-6 text-center sm:flex-row sm:px-6 sm:py-8 sm:text-left lg:px-8">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))]/15 to-[hsl(var(--color-accent))]/15 ring-1 ring-[hsl(var(--color-primary))]/10 shadow-lg shadow-[hsl(var(--color-primary))]/5">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[hsl(var(--color-primary))]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold tracking-tight">
                  Prefer a quick conversation?
                </h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                  Schedule a free 15-minute call to discuss your project,
                  or drop me a message — I&apos;m always happy to help.
                </p>
              </div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--color-primary))]/30 hover:shadow-lg hover:shadow-[hsl(var(--color-primary))]/[0.06] sm:w-auto"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors group-hover:text-[hsl(var(--color-primary))]" />
                <span>Email Me</span>
                <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--color-primary))]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}