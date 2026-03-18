"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevScroll, setPrevScroll] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const threshold = 10;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll < 50);

      if (Math.abs(currentScroll - prevScroll) < threshold) return;

      setScrollDirection(currentScroll > prevScroll ? "down" : "up");
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return { scrollDirection, isAtTop };
}
