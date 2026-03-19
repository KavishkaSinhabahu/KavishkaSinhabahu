import type {
  NavLink,
  SocialLink,
  Experience,
  Education,
  Project,
  SkillCategory,
  Stat,
  ContactInfo,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/KavishkaSinhabahu",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kavishka-sinhabahu",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:hello@kavishkasinhabahu.com",
    icon: "mail",
  },
];

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: "Kavishka Sinhabahu",
  roles: ["Full-Stack Developer", "Tech Entrepreneur", "Software Engineer"],
  tagline:
    "Final-year Software Engineering student at Birmingham City University. Founder of Wideech (Pvt) Ltd — building real products for real clients.",
};

export const ABOUT_BIO = `I'm a final-year BSc (Hons) Full-Stack Software Engineering undergraduate at Birmingham City University (UK) with hands-on experience building full-stack web and mobile applications across diverse domains.

I'm also the Founder and Director of Wideech (Pvt) Ltd — a government-registered tech startup in Sri Lanka — where I've delivered 10+ production projects for real clients including tourism businesses, entertainment artists, and service sector companies.

I specialize in end-to-end development from architecture to deployment, with expertise spanning React/Next.js frontends, Node.js backends, and React Native mobile applications.`;

export const STATS: Stat[] = [
  { value: "10+", label: "Projects Delivered" },
  { value: "1", label: "Company Founded" },
  { value: "3+", label: "Years Experience" },
  { value: "2026", label: "Expected Graduation" },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Founder & Software Engineer",
    company: "Wideech (Pvt) Ltd, Sri Lanka",
    period: "2023 — Present",
    description: [
      "Founded and operate a government-registered private limited technology company delivering web and mobile solutions across multiple industries",
      "Managed full project lifecycle — requirements gathering, architecture, development, testing, and deployment",
      "Delivered 10+ production projects for real clients including tourism businesses, entertainment artists, and service sector companies",
    ],
    tags: ["Next.js", "React Native", "Firebase", "Node.js"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "BSc (Hons) in Software Engineering",
    institution: "Birmingham City University, UK",
    period: "2022 — 2026 (Expected)",
  },
  {
    degree: "Diploma in English",
    institution: "BritishWay English Academy",
    period: "2022",
  },
  {
    degree: "Certificate in Web Development",
    institution: "University of Moratuwa",
    period: "2022",
  },
  {
    degree: "G.C.E. Advanced Level",
    institution: "Mahanama College, Colombo 03, Sri Lanka",
    period: "2021",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Wideech Corporate Website",
    description:
      "Company website for Wideech (Pvt) Ltd — a modern corporate web presence showcasing services and portfolio.",
    type: "Web",
    tech: ["Next.js", "Tailwind CSS"],
    live: "https://www.wideech.com",
  },
  {
    title: "Cleaning Company Website & Admin Panel",
    description:
      "Full-featured business website with integrated admin panel for managing bookings, services, and client communications.",
    type: "Web",
    tech: ["Next.js", "Firebase"],
    live: "https://www.mknscleaningsolution.com.au/",
  },
  {
    title: "Tourism Villa Website",
    description:
      "Hospitality website for a tourism villa featuring online booking capabilities, gallery, and guest information.",
    type: "Web",
    tech: ["Next.js", "Tailwind CSS"],
    live: "https://www.echohomerelax.com/",
  },
  {
    title: "Artist Portfolio Websites",
    description:
      "Multiple portfolio websites crafted for entertainment industry professionals — actors, actresses, singers, and photographers.",
    type: "Web",
    tech: ["Next.js", "Tailwind CSS"],
    live: "https://www.raveentharuka.com/",
  },
  {
    title: "E-Commerce Platform & Admin Panel",
    description:
      "Full-featured online store with product management, order processing, shopping cart, payment flow, and dedicated admin dashboard backed by a normalized MySQL database.",
    type: "Web",
    tech: ["Java", "HTML/CSS", "JavaScript", "MySQL"],
    github: "https://github.com/KavishkaSinhabahu/E-Commerce-Platform-with-Admin-Panel",
  },
  {
    title: "Mobile Chat Application",
    description:
      "Real-time messaging app with user registration, contact lists, and message history powered by a REST API backend.",
    type: "Mobile",
    tech: ["React Native", "Java", "MySQL"],
    github: "https://github.com/KavishkaSinhabahu/Mobile-Chat-Application",
  },
  {
    title: "M-Commerce App with Admin & Seller Panels",
    description:
      "Marketplace application with three distinct user roles (buyer, seller, admin), each with dedicated panels. Firebase Realtime Database for scalable cloud-hosted data.",
    type: "Mobile",
    tech: ["Android", "Java", "Firebase"],
    github: "https://github.com/KavishkaSinhabahu/M-Commerce-Application-with-Seller-Panel",
  },
  {
    title: "Movie & TV Series Streaming App",
    description:
      "Media streaming app with video delivery via Backblaze B2 cloud storage, content browsing, adaptive streaming, and offline download features.",
    type: "Mobile",
    tech: ["React Native", "Firebase", "Backblaze B2"],
    live: "https://www.kdramasl.site/",
  },
  {
    title: "Library Management System",
    description:
      "Desktop application to manage book catalogues, member records, and lending workflows built with Java Swing GUI.",
    type: "Desktop",
    tech: ["Java", "MySQL"],
    github: "https://github.com/KavishkaSinhabahu/Library-Management-System",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "C++", "PHP"],
  },
  {
    category: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "jQuery",
      "Bootstrap",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Firebase", "Supabase"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Android Development"],
  },
  {
    category: "Cloud & Tools",
    items: ["Firebase", "Supabase", "Git", "GitHub"],
  },
];

export const CONTACT_INFO: ContactInfo = {
  email: "hello@kavishkasinhabahu.com",
  phone: "+94 77 372 0462",
  location: "Sri Lanka",
  website: "www.kavishkasinhabahu.com",
};

export const SITE_CONFIG = {
  name: "Kavishka Sinhabahu",
  title: "Kavishka Sinhabahu — Full-Stack Developer & Tech Entrepreneur",
  description:
    "Final-year Software Engineering student at Birmingham City University. Founder of Wideech (Pvt) Ltd — building real products for real clients. Specializing in React, Next.js, Node.js, and React Native.",
  url: "https://www.kavishkasinhabahu.com",
  ogImage: "/images/og/og-image.png",
};
