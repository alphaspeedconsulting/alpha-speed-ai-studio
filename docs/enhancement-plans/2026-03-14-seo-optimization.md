# Enhancement Plan: SEO Optimization with Open Source Tools

**Created:** 2026-03-14
**Status:** Draft
**Author:** Claude
**Related Files:**
- `index.html` — static meta tags, JSON-LD schema, GA4 script
- `public/sitemap.xml` — manually maintained sitemap
- `public/robots.txt` — crawl rules
- `src/App.tsx` — route definitions
- `src/components/AnalyticsTracker.tsx` — page view tracking
- `src/lib/analytics.ts` — analytics utilities
- `vite.config.ts` — build configuration
- `package.json` — dependency management

---

## Context

Alpha Speed AI Website is a Vite + React SPA (TypeScript) deployed at `alphaspeedai.com`. It targets DFW-area businesses searching for AI automation services.

**Current SEO strengths:**
- Static meta tags, OG, Twitter Card in `index.html`
- JSON-LD `LocalBusiness` schema with service catalog
- `sitemap.xml` and `robots.txt` in `/public/`
- GA4 + custom UTM analytics

**Core SEO problems to solve:**
1. All pages share the same `<title>` and `<meta description>` — search engines cannot differentiate pages
2. Sitemap is manually maintained and missing 3 routes (`/assistant`, `/agents`, `/reels`)
3. SPA-only rendering — bots receive an empty `<div id="root">` unless JavaScript executes
4. No canonical tags — risk of duplicate content
5. No per-page structured data beyond the global LocalBusiness block
6. No automated SEO audit baseline to track regressions

---

## 1. Enhancement Breakdown

### 1a. Per-Page Dynamic Meta Tags (`react-helmet-async`)
**What:** Replace static `<title>` and `<meta>` in `index.html` with component-driven tags managed by `react-helmet-async`. Each page/route provides its own title, description, canonical URL, and OG tags.

**Affected:**
- `index.html` (remove static tags)
- `src/main.tsx` (add `<HelmetProvider>`)
- Every file in `src/pages/` (add `<Helmet>` block per page)
- `src/components/` hero/section components that should own sub-page context

---

### 1b. Auto-Generated Complete Sitemap (`vite-plugin-sitemap`)
**What:** Replace the hand-written `public/sitemap.xml` with auto-generated output driven by Vite build. Ensures sitemap always reflects actual routes and `lastmod` timestamps.

**Affected:**
- `vite.config.ts` (add plugin with route list)
- `public/sitemap.xml` (deleted — replaced by build artifact)
- `src/App.tsx` (route list used as source of truth)

---

### 1c. Static Prerendering (`vite-plugin-prerender`)
**What:** Pre-render each route to static HTML at build time so search engine crawlers receive fully populated HTML without needing to execute JavaScript. This is the single highest-impact SEO change for a Vite SPA.

**Tool options (evaluated):**
| Tool | Stars | Approach | Verdict |
|------|-------|----------|---------|
| `vite-plugin-prerender` | ~800 | Puppeteer-based, drop-in | ✅ Best fit — no framework migration |
| `vite-ssg` | ~1.2k | SSG w/ Vue origin, React adapter available | ⚠️ Requires refactor to entry pattern |
| `react-snap` | ~5k (archived) | Puppeteer, abandoned | ❌ No longer maintained |
| `@prerenderer/renderer-puppeteer` | broad use | Headless Chrome | ✅ Alternative if vite-plugin-prerender has issues |

**Recommended:** `vite-plugin-prerender` — integrates directly into `vite.config.ts`, requires no app code changes, renders real React output.

**Affected:**
- `vite.config.ts` (add plugin + route list)
- `dist/` output (each route gets an `index.html` snapshot)
- Hosting config (verify 200 responses for pre-rendered routes — if on Netlify/Vercel add rewrite rule)

---

### 1d. Canonical Tags & hreflang
**What:** Add `<link rel="canonical">` to every page via `react-helmet-async` to prevent duplicate content signals (e.g., `?utm_source=` variants indexing as separate pages).

**Affected:** Handled within the react-helmet-async Helmet blocks added in 1a — no separate files needed.

---

### 1e. Enhanced Structured Data (`schema-dts`)
**What:** Augment JSON-LD with additional schema types per page/section using `schema-dts` for TypeScript type safety:

| Schema Type | Target Location |
|---|---|
| `WebSite` + `SearchAction` | Global (index.html or HelmetProvider) |
| `Service` | Each service card / Services section |
| `FAQPage` | Any FAQ section |
| `BreadcrumbList` | Interior pages (/assistant, /agents) |
| `Organization` + `SameAs` | Global (enhance existing LocalBusiness) |

**Affected:**
- `index.html` (replace raw JSON-LD with managed version)
- New `src/lib/schema.ts` — typed schema builders using `schema-dts`
- Page components that own structured data (`ServicesSection`, `AgentRoster`, `Assistant`)

---

### 1f. Automated SEO Audit (`unlighthouse` + `lighthouse-ci`)
**What:** Add two open-source audit tools:

1. **`unlighthouse`** (CLI, ~3k stars) — Full-site crawl, runs Lighthouse on every URL, generates HTML report with scores per page. Run ad-hoc or in CI.
2. **`lighthouse-ci`** (Google, ~3.3k stars) — Integrates with CI pipeline (GitHub Actions / local scripts), asserts minimum scores, fails build on SEO regression.

**Affected:**
- `package.json` (devDependencies + npm scripts: `audit:seo`, `audit:full`)
- New `.lighthouserc.json` — thresholds config
- Optional: `.github/workflows/seo-audit.yml` if CI is configured

---

## 2. Reuse vs New Code Analysis

| Item | Reuse | Extend | Net-New |
|------|-------|--------|---------|
| `index.html` meta tags | Remove static tags | — | — |
| `public/sitemap.xml` | Delete (replaced by build plugin) | — | — |
| `public/robots.txt` | Keep as-is | — | — |
| `src/lib/analytics.ts` | Reuse entirely | — | — |
| `src/components/AnalyticsTracker.tsx` | Reuse | — | — |
| `vite.config.ts` | — | Add 2 plugins | — |
| `src/main.tsx` | — | Wrap with `HelmetProvider` | — |
| `src/pages/*.tsx` | — | Add `<Helmet>` to each | — |
| JSON-LD in `index.html` | — | Migrate to `src/lib/schema.ts` | `src/lib/schema.ts` |
| `.lighthouserc.json` | — | — | New config file |
| npm scripts | Extend | — | — |

---

## 3. Workflow Impact Analysis

### Steps Affected
This is a purely frontend + build-tool enhancement. No backend services, Supabase tables, or workflow engine steps are affected.

| Layer | Impact |
|-------|--------|
| React app runtime | Low — `react-helmet-async` adds lightweight wrapper |
| Vite build | Medium — prerendering adds build time (~30–90s for 6 routes) |
| `dist/` output | Medium — output shape changes (each route directory gets its own `index.html`) |
| Hosting / deploy | Low-Medium — verify rewrite rules handle prerendered HTML correctly |
| Analytics | None — existing GA4 + custom analytics unchanged |
| Workflows/agents | None |

### State Transitions & Side Effects
- Prerendering snapshots the DOM at build time — any content that requires runtime data (e.g., dynamic agent list from API) will render as its loading state in the prerendered HTML. This is acceptable for SEO (static content is captured) but should be noted.
- `react-helmet-async` overrides `<head>` on navigation — the static tags removed from `index.html` must be re-added via Helmet in `src/pages/Index.tsx` or they will be missing on first render (before hydration on non-prerendered deploys).

### Regression Risk
**Overall: Low**

- No changes to business logic, routing, state management, or API calls
- `react-helmet-async` is mature (1.4M weekly downloads), additive only
- Prerendering risk: if a component throws during prerender build, the build fails — test each route renders without errors before enabling

---

## 4. Implementation Order

### Phase 0 — Audit Baseline (Precondition)
Before any changes, capture the current Lighthouse scores per page to have a before/after comparison.

**Steps:**
1. Install `unlighthouse` globally: `npm i -g unlighthouse`
2. Run `unlighthouse --site https://alphaspeedai.com` (or local dev server)
3. Save the HTML report to `docs/seo-audit-baseline-2026-03-14.html`

**Preconditions:** None
**Dependencies:** None

---

### Phase 1 — Dynamic Meta Tags (Highest ROI, lowest risk)
**Steps:**
1. Install: `npm install react-helmet-async`
2. Wrap `<App />` in `src/main.tsx` with `<HelmetProvider>`
3. Remove static `<title>`, `<meta name="description">`, `<meta name="keywords">`, OG tags, and Twitter tags from `index.html` (keep as fallback defaults)
4. Add `<Helmet>` block to each page:
   - `Index.tsx` — home page tags
   - `Assistant.tsx` — assistant-specific title/description
   - `AgentRoster.tsx` — agents page tags
   - `AlphaAIDashboard.tsx` — noindex (internal page)
   - `TrafficMetricsDashboard.tsx` — noindex (internal page)
   - `Reels.tsx` — reels page tags
5. Add `<link rel="canonical">` in each Helmet block using `window.location.href` or a constant base URL

**Preconditions:** None
**Dependencies:** None
**Estimated effort:** 2–3 hours

---

### Phase 2 — Structured Data Enhancement
**Steps:**
1. Install: `npm install schema-dts`
2. Create `src/lib/schema.ts` with typed schema builders:
   - `buildLocalBusinessSchema()` — enhanced version of existing JSON-LD
   - `buildWebSiteSchema()` — with SearchAction
   - `buildServiceSchema(name, description)` — for Services section
   - `buildFAQSchema(items)` — if FAQ section exists or is added
3. Replace raw JSON-LD `<script>` in `index.html` with component-managed version injected via Helmet
4. Add `Service` schemas to the Services section component
5. Add `BreadcrumbList` to `/assistant` and `/agents` pages

**Preconditions:** Phase 1 complete (Helmet is available)
**Dependencies:** Phase 1
**Estimated effort:** 3–4 hours

---

### Phase 3 — Auto-Generated Sitemap
**Steps:**
1. Install: `npm install -D vite-plugin-sitemap`
2. Add to `vite.config.ts`:
   ```ts
   import sitemap from 'vite-plugin-sitemap'
   // in plugins array:
   sitemap({
     hostname: 'https://alphaspeedai.com',
     dynamicRoutes: ['/', '/assistant', '/agents', '/reels'],
     // exclude internal pages:
     exclude: ['/alphaai', '/traffic']
   })
   ```
3. Delete `public/sitemap.xml` (now generated at build time to `dist/sitemap.xml`)
4. Verify `robots.txt` sitemap pointer is correct

**Preconditions:** None (independent)
**Dependencies:** None
**Estimated effort:** 30 minutes

---

### Phase 4 — Static Prerendering
**Steps:**
1. Install: `npm install -D vite-plugin-prerender`
2. Add to `vite.config.ts`:
   ```ts
   import prerender from 'vite-plugin-prerender'
   // in plugins array:
   prerender({
     staticDir: path.join(__dirname, 'dist'),
     routes: ['/', '/assistant', '/agents', '/reels'],
   })
   ```
3. Run `npm run build` and verify each route directory in `dist/` contains populated HTML
4. Spot-check: open `dist/index.html` and `dist/agents/index.html` — confirm `<h1>` tags are present (not empty)
5. Test hosting rewrite rules: ensure server returns 200 (not 404) for `/agents`

**Preconditions:** Phase 1 complete (Helmet must render correctly before prerender snapshot)
**Dependencies:** Phase 1
**Estimated effort:** 1–2 hours + hosting config time

---

### Phase 5 — Automated Audit Integration
**Steps:**
1. Install devDependencies:
   ```bash
   npm install -D @lhci/cli unlighthouse
   ```
2. Add npm scripts to `package.json`:
   ```json
   "audit:seo": "unlighthouse --site http://localhost:5173 --reporter html",
   "audit:ci": "lhci autorun"
   ```
3. Create `.lighthouserc.json`:
   ```json
   {
     "ci": {
       "collect": { "url": ["http://localhost:5173/", "http://localhost:5173/agents", "http://localhost:5173/assistant"] },
       "assert": {
         "assertions": {
           "categories:seo": ["error", {"minScore": 0.9}],
           "categories:performance": ["warn", {"minScore": 0.8}],
           "categories:accessibility": ["warn", {"minScore": 0.9}]
         }
       }
     }
   }
   ```
4. Run baseline audit after Phase 4 to capture post-optimization scores

**Preconditions:** Phases 1–4 complete
**Dependencies:** Working build
**Estimated effort:** 1 hour

---

## 5. Testing Strategy

### Unit Tests
| Test | What to verify |
|------|---------------|
| `src/lib/schema.ts` | Each builder returns valid JSON-LD with required fields |
| Helmet blocks | Each page renders the correct `<title>` (use `@testing-library/react` + `react-helmet-async` test utilities) |

### Build Verification
- After Phase 3: `dist/sitemap.xml` contains all 4 public routes with correct `<loc>` values
- After Phase 4: `dist/agents/index.html` contains non-empty `<h1>` and `<title>` — no empty `<div id="root">`

### Lighthouse CI Assertions (Phase 5)
- SEO score ≥ 0.90 on all public routes
- No missing meta descriptions
- No missing canonical links
- No duplicate titles across routes

### Existing Tests to Update
- Run `npm run test` (Vitest) after each phase — no existing tests should break since changes are additive
- Visually verify all routes in browser after prerendering (Phase 4) — ensure hydration is seamless

### Manual QA Checklist
- [ ] Google Rich Results Test: validate JSON-LD at `https://search.google.com/test/rich-results`
- [ ] Open Graph Debugger: validate OG tags at `https://developers.facebook.com/tools/debug/`
- [ ] Twitter Card Validator: validate Twitter meta tags
- [ ] Google Search Console: submit updated sitemap
- [ ] Mobile-friendly test: all pages pass

---

## 6. Open Questions / Risks

### Assumptions
- Site is deployed as static files (Netlify, Vercel, GitHub Pages, or similar) — prerendering approach depends on server support for route-based HTML delivery
- No server-side rendering (Next.js/Remix) is in scope — this plan keeps the Vite SPA architecture
- Routes `/alphaai` and `/traffic` are internal tools and should be excluded from sitemap and marked `noindex`
- No i18n/multi-language requirement (hreflang not needed)

### Unknowns
1. **Hosting environment**: The prerendering strategy (Phase 4) requires the host to serve `dist/agents/index.html` when a user requests `/agents`. Netlify and Vercel handle this automatically; GitHub Pages requires a `404.html` redirect trick (already partially in place via `SPAPathRestore`). **Confirm hosting provider before Phase 4.**
2. **`vite-plugin-prerender` maturity**: The package is functional but less battle-tested than `react-snap` (archived). Fallback option: `@prerenderer/renderer-puppeteer` via `@prerenderer/plugin-vite`. Evaluate during Phase 4 spike.
3. **Dynamic content in components**: The AI assistant simulation and any data loaded from Supabase will render as loading state in prerendered HTML. This is acceptable for SEO but should be documented.

### Architectural Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Prerender build fails due to component error | Medium | Build broken | Test each page renders in isolation before adding to prerender route list |
| Helmet tags missing on first paint (SSR flash) | Low | Minor | Ensure fallback defaults remain in `index.html` |
| Sitemap plugin generates wrong URLs | Low | Low | Verify `dist/sitemap.xml` after first build |
| Prerendered HTML diverges from runtime HTML (hydration mismatch) | Low-Medium | UX glitch | Run `npm run build && npm run preview` and check console for React hydration warnings |
| Lighthouse CI too strict, blocks deploys | Low | Dev friction | Start with `warn` thresholds, promote to `error` after baseline is established |

---

## Tool Summary

| Tool | License | Weekly Downloads | Purpose |
|------|---------|-----------------|---------|
| `react-helmet-async` | Apache 2.0 | 1.4M | Per-page meta tags |
| `vite-plugin-sitemap` | MIT | 15K | Auto sitemap generation |
| `vite-plugin-prerender` | MIT | 8K | Static HTML prerendering |
| `schema-dts` | Apache 2.0 (Google) | 120K | Type-safe structured data |
| `unlighthouse` | MIT | 5K | Full-site SEO audit |
| `@lhci/cli` | Apache 2.0 (Google) | 180K | CI/CD SEO score enforcement |

All tools are open source, actively maintained (as of March 2026), and require zero licensing cost.

---

## Estimated Effort Summary

| Phase | Description | Effort |
|-------|-------------|--------|
| Phase 0 | Audit baseline | 30 min |
| Phase 1 | Dynamic meta tags | 2–3 hrs |
| Phase 2 | Enhanced structured data | 3–4 hrs |
| Phase 3 | Auto-generated sitemap | 30 min |
| Phase 4 | Static prerendering | 1–2 hrs |
| Phase 5 | Automated audit integration | 1 hr |
| **Total** | | **~9–11 hours** |

**Recommended execution order:** Phase 0 → Phase 3 → Phase 1 → Phase 2 → Phase 4 → Phase 5
(Phase 3 is quickest win with no risk; Phase 1 must precede Phase 4)
