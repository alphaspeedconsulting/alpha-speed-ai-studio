import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGtagBase, trackPageView } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  // Load GA4 unconditionally with Consent Mode v2 on first render
  useEffect(() => {
    initGtagBase();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path, document.title);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default AnalyticsTracker;
