import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to element with ID matching the URL hash on navigation.
 * Useful for SPA hash-based anchor navigation.
 */
export function useScrollToAnchor() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Add small delay to allow DOM to settle after route change
    const timer = setTimeout(() => {
      if (hash) {
        const id = hash.substring(1); // Remove the '#'
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [hash, pathname]);
}
