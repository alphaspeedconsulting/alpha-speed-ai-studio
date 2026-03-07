import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to element with ID matching the URL hash on navigation.
 * Useful for SPA hash-based anchor navigation.
 */
export function useScrollToAnchor() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.substring(1);
    const headerOffset = 96; // Fixed header + breathing room
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    const scrollToAnchor = () => {
      const element = document.getElementById(id);
      if (!element) return false;

      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, y), behavior });
      return true;
    };

    // Try immediately, then retry briefly while sections finish rendering.
    if (scrollToAnchor()) return;

    let attempts = 0;
    const maxAttempts = 10;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (scrollToAnchor() || attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [hash, pathname]);
}
