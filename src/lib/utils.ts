import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const normalizedId = id.startsWith("#") ? id.substring(1) : id;
  const el = document.getElementById(normalizedId);
  if (!el) return;
  
  if (normalizedId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  const y = el.getBoundingClientRect().top + window.scrollY;
  const isDesktop = window.innerWidth >= 1024;
  
  // Custom offset to push the section title closer to the top of the viewport
  const offset = isDesktop ? 64 : 0; 
  
  window.scrollTo({
    top: y + offset,
    behavior: "smooth"
  });
}
