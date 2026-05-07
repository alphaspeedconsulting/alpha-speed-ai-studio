import { useEffect } from "react";

const STATIC_FILE = "alpha-speed-sales-kit.html";

/**
 * GitHub Pages sends unknown paths through 404.html → SPA with ?path=…
 * React has no route for the sales kit HTML asset, so we hard-navigate to
 * the static file in /public (copied to dist root on build).
 */
export default function SalesKitRedirect() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    const prefix = base.endsWith("/") ? base : `${base}/`;
    window.location.replace(`${prefix}${STATIC_FILE}`);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted text-muted-foreground text-sm">
      Opening sales kit…
    </div>
  );
}
