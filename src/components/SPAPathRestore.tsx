import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.BASE_URL || "/";
const BASE_PATH = BASE_URL.replace(/\/$/, "") || ""; // e.g. "" or "/alpha-speed-ai-studio"

/**
 * Restores the intended route when the app loads after a GitHub Pages 404 redirect.
 * 404.html redirects to index.html?path=/base/agents; we read ?path= and navigate
 * so the user sees the correct page instead of Home.
 */
export function SPAPathRestore() {
  const navigate = useNavigate();
  const location = useLocation();
  const didRestore = useRef(false);

  useEffect(() => {
    if (didRestore.current) return;

    const params = new URLSearchParams(location.search);
    const pathParam = params.get("path");

    if (pathParam) {
      didRestore.current = true;
      // pathParam may be "/agents" or "/alpha-speed-ai-studio/agents"; strip base to get route path
      const routePath = BASE_PATH && pathParam.startsWith(BASE_PATH)
        ? pathParam.slice(BASE_PATH.length) || "/"
        : pathParam;
      navigate(routePath, { replace: true });
      return;
    }

    // Fallback: sessionStorage.redirect (set by 404.html) contains full URL
    const redirectUrl = sessionStorage.redirect;
    if (redirectUrl) {
      delete sessionStorage.redirect;
      try {
        const url = new URL(redirectUrl);
        const pathname = url.pathname;
        const routePath = BASE_PATH && pathname.startsWith(BASE_PATH)
          ? pathname.slice(BASE_PATH.length) || "/"
          : pathname;
        if (routePath && routePath !== location.pathname) {
          didRestore.current = true;
          navigate(routePath, { replace: true });
        }
      } catch {
        // ignore invalid URL
      }
    }
  }, [location.search, location.pathname, navigate]);

  return null;
}
