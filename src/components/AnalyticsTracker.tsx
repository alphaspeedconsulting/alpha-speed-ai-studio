import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial mount — gtag('config') in index.html already fires the
    // first page_view. Only track subsequent SPA navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path, document.title);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default AnalyticsTracker;
