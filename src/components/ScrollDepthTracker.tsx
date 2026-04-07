import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100];

const ScrollDepthTracker = () => {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const sentinels: HTMLDivElement[] = [];
    const fired = firedRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const depth = Number(entry.target.getAttribute("data-depth"));
          if (!depth || fired.has(depth)) continue;

          fired.add(depth);
          trackEvent("scroll_depth", "scroll_milestone", { depth: `${depth}%` });

          // Stop observing once fired
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0 }
    );

    // Place sentinel elements at each milestone depth
    const main = document.querySelector("main");
    if (!main) return;

    for (const milestone of MILESTONES) {
      const sentinel = document.createElement("div");
      sentinel.setAttribute("data-depth", String(milestone));
      sentinel.style.cssText = "position:absolute;width:1px;height:1px;pointer-events:none;opacity:0;";
      sentinel.style.top = `${milestone}%`;
      main.style.position = "relative";
      main.appendChild(sentinel);
      sentinels.push(sentinel);
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
      for (const s of sentinels) s.remove();
    };
  }, []);

  return null;
};

export default ScrollDepthTracker;
