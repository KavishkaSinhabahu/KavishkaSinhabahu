export const animations = {
  easing: {
    smooth: [0.4, 0.0, 0.2, 1.0] as const,
    snappy: [0.2, 0.0, 0.0, 1.0] as const,
    bounce: [0.34, 1.56, 0.64, 1.0] as const,
  },

  fadeInUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1.0] },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1.0] },
  },

  scrollReveal: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1.0] },
  },

  hoverLift: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
  },

  hoverScale: {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 },
  },
} as const;
