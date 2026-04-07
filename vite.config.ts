import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import sitemap from "vite-plugin-sitemap";

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
  const ROUTES = ["/", "/assistant", "/agentvault", "/reels", "/roi-calculator", "/case-studies", "/from/instagram", "/from/linkedin", "/privacy-policy", "/terms-of-service", "/privacy-request"];
  const RENDER_WAIT_MS = 3000;

  // Content markers that MUST appear in pre-rendered HTML for each route.
  // If a marker is missing, the build will warn (the page likely rendered an empty shell).
  const CONTENT_MARKERS: Record<string, string[]> = {
    "/": ["Alpha Speed AI", "DFW", "AI Automation"],
    "/roi-calculator": ["ROI Calculator", "Save with AI"],
    "/case-studies": ["Case Studies", "Real Work"],
    "/agentvault": ["AgentVault"],
    "/assistant": ["Assistant"],
    "/privacy-policy": ["Privacy Policy"],
    "/terms-of-service": ["Terms of Service"],
  };

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
      console.log(`[seo-prerender] Rendering ${ROUTES.length} routes on port ${port}…`);

      let failures = 0;
      for (const route of ROUTES) {
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle0" });
        await new Promise((r) => setTimeout(r, RENDER_WAIT_MS));
        const html = await page.content();
        await page.close();

        // Content verification: ensure pre-rendered HTML contains expected markers
        const markers = CONTENT_MARKERS[route];
        if (markers) {
          const missing = markers.filter((m) => !html.includes(m));
          if (missing.length > 0) {
            console.error(`[seo-prerender] ✗ ${route} MISSING CONTENT: ${missing.join(", ")}`);
            console.error(`[seo-prerender]   HTML length: ${html.length} chars — page may have rendered as empty shell`);
            failures++;
          }
        }

        // Verify meta tags are present in pre-rendered output
        if (!html.includes("<title>") || !html.includes('meta name="description"')) {
          console.warn(`[seo-prerender] ⚠ ${route} missing <title> or meta description in rendered HTML`);
        }

        const outDir = route === "/" ? distDir : path.join(distDir, route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
        console.log(`[seo-prerender] ✓ ${route} (${(html.length / 1024).toFixed(0)} kB)`);
      }

      await browser.close();
      await new Promise<void>((resolve) => server.close(() => resolve()));

      if (failures > 0) {
        console.error(`\n[seo-prerender] ⚠ ${failures} route(s) failed content verification. Google may index empty shells.`);
      }
      console.log("[seo-prerender] Done.");
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
    react(),
    alphaAIPublic(),
    sitemap({
      hostname: "https://alphaspeedai.com",
      dynamicRoutes: [
        "/roi-calculator",
        "/case-studies",
        "/assistant",
        "/agentvault",
        "/reels",
        "/privacy-policy",
        "/terms-of-service",
        "/privacy-request",
      ],
      // Internal/private pages and error pages — excluded from sitemap
      exclude: ["/alphaai", "/traffic", "/404"],
      changefreq: {
        "/": "weekly",
        "/agentvault": "weekly",
        "/case-studies": "monthly",
        "/assistant": "monthly",
        "/roi-calculator": "monthly",
        "/reels": "monthly",
        "/privacy-policy": "yearly",
        "/terms-of-service": "yearly",
        "/privacy-request": "yearly",
      },
      priority: {
        "/": 1.0,
        "/agentvault": 0.9,
        "/case-studies": 0.9,
        "/assistant": 0.8,
        "/roi-calculator": 0.7,
        "/reels": 0.6,
        "/privacy-policy": 0.2,
        "/terms-of-service": 0.2,
        "/privacy-request": 0.1,
      },
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
