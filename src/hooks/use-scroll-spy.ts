"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(
  ids: string[],
  options: IntersectionObserverInit = { rootMargin: "-40% 0px -40% 0px" }
) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Flatten IDs and get elements
    const elements = ids.map((id) => document.getElementById(id)).filter((el) => el !== null) as HTMLElement[];
    
    // Fallback if no elements
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), JSON.stringify(options)]); 

  return activeId;
}
