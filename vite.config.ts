import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import sitemap from "vite-plugin-sitemap";
import {
  PRERENDER_CONTENT_MARKERS,
  PRERENDER_ROUTES,
  REDIRECT_ROUTES,
  SITEMAP_CHANGEFREQ,
  SITEMAP_DYNAMIC_ROUTES,
  SITEMAP_EXCLUDE_ROUTES,
  SITEMAP_PRIORITY,
} from "./src/lib/seoRoutes";

const require = createRequire(import.meta.url);

const alphaAISrcExists = fs.existsSync(
  path.resolve(__dirname, "./ai-assistant-local/src")
);

/**
 * When ai-assistant-local is not present (e.g. CI / clean clone),
 * resolve @alphaai/* imports to a stub that exports a noop component.
 */
function alphaAIStub(): Plugin {
  const prefix = "@alphaai";
  const stubId = "\0alphaai-stub";
  return {
    name: "alphaai-stub",
    enforce: "pre",
    resolveId(id) {
      if (!alphaAISrcExists && id.startsWith(prefix)) return stubId;
    },
    load(id) {
      if (id === stubId)
        return 'export default function(){return null}';
    },
  };
}

/** Serve & copy ai-assistant-local/public as an additional public dir */
function alphaAIPublic(): Plugin {
  const extraPublic = path.resolve(__dirname, "./ai-assistant-local/public");
  return {
    name: "alphaai-public",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();

        // Security: Strip query parameters and resolve to absolute path
        const requestedPath = req.url.split('?')[0];
        const filePath = path.resolve(extraPublic, requestedPath);

        // Security: Validate that resolved path is within extraPublic directory
        // This prevents path traversal attacks (e.g., /../../../etc/passwd)
        if (!filePath.startsWith(extraPublic)) {
          return next();
        }

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          // Determine proper MIME type based on file extension
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.mjs': 'application/javascript; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject',
          };
          const contentType = mimeTypes[ext] || 'application/octet-stream';

          _res.setHeader("Content-Type", contentType);
          fs.createReadStream(filePath).pipe(_res);
          return;
        }
        next();
      });
    },
    generateBundle() {
      // Copy extra public files into dist at build time
      const walk = (dir: string, base = "") => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const rel = path.join(base, entry.name);
          if (entry.isDirectory()) {
            walk(path.join(dir, entry.name), rel);
          } else {
            this.emitFile({
              type: "asset",
              fileName: rel,
              source: fs.readFileSync(path.join(dir, entry.name)),
            });
          }
        }
      };
      if (fs.existsSync(extraPublic)) walk(extraPublic);
    },
  };
}

/**
 * Custom static prerender plugin.
 * Starts a local Express server after the Vite build, uses Puppeteer to visit
 * each public route, waits for networkidle0 + 3s, then writes the fully-rendered
 * HTML back to dist/<route>/index.html so GitHub Pages serves real content to crawlers.
 */
function prerenderPlugin(): Plugin {
  const RENDER_WAIT_MS = 3000;

  return {
    name: "seo-prerender",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const express = require("express") as typeof import("express");
      const puppeteer = require("puppeteer") as typeof import("puppeteer");
      const portfinder = require("portfinder") as { getPortPromise: () => Promise<number> };

      const distDir = path.resolve(__dirname, "dist");
      const app = express();
      app.use(express.static(distDir));
      app.use((_req, res) => res.sendFile(path.join(distDir, "index.html")));

      const port = await portfinder.getPortPromise();
      const server = await new Promise<ReturnType<typeof app.listen>>((resolve) => {
        const s = app.listen(port, () => resolve(s));
      });

      const browser = await puppeteer.launch({
        headless: true,
        // Required for Linux CI environments (GitHub Actions)
        args: process.platform === "linux" ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
      });
      console.log(`[seo-prerender] Rendering ${PRERENDER_ROUTES.length} routes on port ${port}…`);

      let failures = 0;
      for (const route of PRERENDER_ROUTES) {
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle0" });
        await new Promise((r) => setTimeout(r, RENDER_WAIT_MS));
        const html = await page.content();
        await page.close();

        // Content verification: ensure pre-rendered HTML contains expected markers
        const markers = PRERENDER_CONTENT_MARKERS[route];
        if (markers) {
          const missing = markers.filter((m) => !html.includes(m));
          if (missing.length > 0) {
            console.error(`[seo-prerender] ✗ ${route} MISSING CONTENT: ${missing.join(", ")}`);
            console.error(`[seo-prerender]   HTML length: ${html.length} chars — page may have rendered as empty shell`);
            failures++;
          }
        }

        // Indexability gate (PRP domain 27, prp.seo.per-route-metadata): every route that
        // is NOT noindex must ship a <title>, a meta description and a self-referencing
        // canonical in the FIRST response. Missing any of them is a build failure, not a
        // warning — a warning was the previous behaviour and it let regressions deploy.
        const isNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
        if (!isNoindex) {
          const missingMeta = [
            !/<title>[^<]+<\/title>/.test(html) && "<title>",
            !/<meta\s+name="description"\s+content="[^"]+"/i.test(html) && "meta description",
            !/<link\s+rel="canonical"\s+href="https:\/\/alphaspeedai\.com\//i.test(html) && "canonical",
          ].filter(Boolean);
          if (missingMeta.length > 0) {
            console.error(`[seo-prerender] ✗ ${route} MISSING METADATA: ${missingMeta.join(", ")}`);
            failures++;
          }
        }

        const outDir = route === "/" ? distDir : path.join(distDir, route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
        console.log(`[seo-prerender] ✓ ${route} (${(html.length / 1024).toFixed(0)} kB)`);
      }

      await browser.close();
      await new Promise<void>((resolve) => server.close(() => resolve()));

      // Host-side redirect stubs (prp.seo.hard-404-and-redirect-integrity). GitHub Pages
      // cannot 301, so a prerendered meta-refresh + canonical stub is the strongest
      // redirect signal available; the SPA's <Navigate> still handles in-app navigation.
      for (const [from, to] of Object.entries(REDIRECT_ROUTES)) {
        // Route targets use the same trailing-slash canonical form the pages declare
        // (buildCanonicalUrl); static files (.html) keep their exact path.
        const target = to.startsWith("http")
          ? to
          : `https://alphaspeedai.com${to.endsWith(".html") || to.endsWith("/") ? to : `${to}/`}`;
        const stubDir = path.join(distDir, from);
        fs.mkdirSync(stubDir, { recursive: true });
        fs.writeFileSync(
          path.join(stubDir, "index.html"),
          `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
            `<title>Redirecting to ${target}</title>` +
            `<meta http-equiv="refresh" content="0; url=${target}">` +
            `<link rel="canonical" href="${target}">` +
            `<meta name="robots" content="noindex">` +
            `</head><body><p>This page has moved to <a href="${target}">${target}</a>.</p></body></html>`,
          "utf8"
        );
        console.log(`[seo-prerender] ↪ ${from} → ${target} (meta-refresh stub)`);
      }

      // Sitemap <loc> must be the EXACT canonical URL (prp.seo.sitemap-route-parity).
      // vite-plugin-sitemap emits `/route`; every page's canonical is `/route/`, and
      // GitHub Pages 301s the former to the latter — so without this rewrite the sitemap
      // submitted nothing but redirects. Also assert no noindex route slipped in.
      const sitemapPath = path.join(distDir, "sitemap.xml");
      if (fs.existsSync(sitemapPath)) {
        let sitemap = fs.readFileSync(sitemapPath, "utf8");
        sitemap = sitemap.replace(
          /<loc>(https:\/\/alphaspeedai\.com)(\/[^<]*?)?<\/loc>/g,
          (_m, origin: string, p: string | undefined) => {
            const pathname = p && p !== "/" ? p.replace(/\/+$/, "") + "/" : "/";
            return `<loc>${origin}${pathname}</loc>`;
          }
        );
        const noindexRoutes = PRERENDER_ROUTES.filter((r) => {
          const f = path.join(r === "/" ? distDir : path.join(distDir, r), "index.html");
          return fs.existsSync(f) && /name="robots"\s+content="[^"]*noindex/i.test(fs.readFileSync(f, "utf8"));
        });
        const leaked = noindexRoutes.filter((r) => sitemap.includes(`<loc>https://alphaspeedai.com${r}/</loc>`));
        if (leaked.length > 0) {
          console.error(`[seo-prerender] ✗ noindex route(s) listed in sitemap.xml: ${leaked.join(", ")}`);
          failures++;
        }
        fs.writeFileSync(sitemapPath, sitemap, "utf8");
        console.log(`[seo-prerender] ✓ sitemap.xml <loc> values normalised to canonical (trailing-slash) form`);
      }

      if (failures > 0) {
        // Hard failure: a silent deploy of empty shells would mean Google indexes nothing.
        // Force the build to fail so CI catches the problem before deployment.
        throw new Error(
          `[seo-prerender] ${failures} route(s) failed content verification. ` +
          `Fix rendering before deploying to prevent empty Google index shells.`
        );
      }
      console.log("[seo-prerender] Done.");
    },
  };
}

/**
 * Injects the Google Search Console verification meta tag into index.html.
 * Set VITE_GSC_VERIFICATION=<token> in .env.local — never commit the value.
 * The placeholder %VITE_GSC_TAG% is replaced at build time.
 */
function gscVerificationPlugin(): Plugin {
  return {
    name: "gsc-verification",
    transformIndexHtml(html) {
      const token = process.env.VITE_GSC_VERIFICATION;
      const tag = token
        ? `<meta name="google-site-verification" content="${token}" />`
        : "";
      return html.replace(/%VITE_GSC_TAG%/g, tag);
    },
  };
}

// https://vitejs.dev/config/
// Use base "/" for root domain (e.g. alphaspeedai.com). For GitHub Pages subpath
// use: base: process.env.VITE_BASE_PATH || (mode === "production" ? "/alpha-speed-ai-studio/" : "/")
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    // Only use alphaAIStub plugin if ai-assistant-local exists.
    // On CI/GitHub Pages where it's missing, skip the plugin entirely to prevent
    // Vite from creating an unreachable virtual module chunk that 404s.
    ...(alphaAISrcExists ? [alphaAIStub()] : []),
    gscVerificationPlugin(),
    react(),
    alphaAIPublic(),
    sitemap({
      hostname: "https://alphaspeedai.com",
      dynamicRoutes: [...SITEMAP_DYNAMIC_ROUTES],
      // Internal/private pages, social landing pages (noindex), and error pages — excluded from sitemap
      exclude: [...SITEMAP_EXCLUDE_ROUTES],
      changefreq: SITEMAP_CHANGEFREQ,
      priority: SITEMAP_PRIORITY,
      // public/robots.txt is the source of truth (explicit AI-crawler policy); the plugin's
      // generated robots.txt would silently overwrite it in dist/.
      generateRobotsTxt: false,
    }),
    prerenderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Only register @alphaai alias when the directory exists (not on CI)
      ...(alphaAISrcExists
        ? { "@alphaai": path.resolve(__dirname, "./ai-assistant-local/src") }
        : {}),
    },
  },
}));
