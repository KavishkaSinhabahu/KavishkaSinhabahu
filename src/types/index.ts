export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Project {
  title: string;
  description: string;
  type: "Web" | "Mobile" | "Desktop";
  tech: string[];
  github?: string;
  live?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website: string;
}
