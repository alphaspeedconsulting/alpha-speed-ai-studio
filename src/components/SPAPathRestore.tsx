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
      // pathParam carries only the pathname — the original query string is in sessionStorage.redirect
      const routePath = BASE_PATH && pathParam.startsWith(BASE_PATH)
        ? pathParam.slice(BASE_PATH.length) || "/"
        : pathParam;

      // Pull original query string from sessionStorage.redirect when available.
      // 404.html encodes only the pathname in ?path= but stores the full URL (with query)
      // in sessionStorage so we can recover ?tier=, ?coupon=, etc.
      let search = "";
      const savedFull = sessionStorage.redirect;
      if (savedFull) {
        sessionStorage.removeItem("redirect");
        try {
          const saved = new URL(savedFull);
          const savedPath = BASE_PATH && saved.pathname.startsWith(BASE_PATH)
            ? saved.pathname.slice(BASE_PATH.length) || "/"
            : saved.pathname;
          if (savedPath === routePath) {
            search = saved.search; // e.g. "?tier=developer_license"
          }
        } catch { /* ignore malformed URL */ }
      }

      // Final fallback: any extra query params on the current URL besides ?path=
      if (!search) {
        const remaining = new URLSearchParams(params);
        remaining.delete("path");
        search = remaining.toString() ? `?${remaining.toString()}` : "";
      }

      navigate(routePath + search, { replace: true });
      return;
    }

    // No ?path= param: try sessionStorage.redirect directly (set by 404.html on deep links
    // where the path param was not used, e.g. hash-based fallback paths)
    const redirectUrl = sessionStorage.redirect;
    if (redirectUrl) {
      sessionStorage.removeItem("redirect");
      try {
        const url = new URL(redirectUrl);
        const pathname = url.pathname;
        const routePath = BASE_PATH && pathname.startsWith(BASE_PATH)
          ? pathname.slice(BASE_PATH.length) || "/"
          : pathname;
        const search = url.search;
        if (routePath && routePath !== location.pathname) {
          didRestore.current = true;
          navigate(routePath + search, { replace: true });
        }
      } catch {
        // ignore invalid URL
      }
    }
  }, [location.search, location.pathname, navigate]);

  return null;
}
