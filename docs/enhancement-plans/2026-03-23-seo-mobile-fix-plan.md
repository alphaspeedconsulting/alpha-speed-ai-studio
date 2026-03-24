# Enhancement Plan: SEO & Mobile Fixes — alphaspeedai.com

**Created:** 2026-03-23
**Status:** Draft
**Author:** Claude
**Supersedes:** `2026-03-14-seo-optimization.md` (most items from that plan are now implemented)
**Related Files:**
- `src/lib/schema.ts` — JSON-LD schema builders
- `src/pages/Index.tsx` — Homepage (needs FAQ schema, AggregateRating)
- `src/pages/AgentRoster.tsx` — Agents page (needs FAQ schema)
- `src/components/marketing/CaseStudies.tsx` — Case studies (needs ItemList schema)
- `src/components/Header.tsx` — Navigation (desktop touch target audit)
- `src/components/ThemeToggle.tsx` — Theme toggle (accessibility gap)
- `src/components/CookieConsent.tsx` — Cookie banner (accessibility gap)
- `vite.config.ts` — Sitemap plugin configuration
- `src/components/PortfolioSection.tsx` — Image lazy loading audit

---

## Audit Triage: What's Already Done vs. What's Needed

The SEO audit document (2026-03-23) was run against the live site. Cross-referencing against the **actual codebase** reveals that many "critical" items are already implemented. This plan only covers **genuine gaps**.

### Already Implemented (No Action Needed)
| Audit Item | Status | Evidence |
|---|---|---|
| FIX-001 · Meta Descriptions | **Done** | All 4 inner pages have `<meta name="description">` via `react-helmet-async` |
| FIX-002 · Canonical Tags | **Done** | All 4 inner pages have `<link rel="canonical">` via `react-helmet-async` |
| FIX-003 · Duplicate H1 | **Not an issue** | Case studies has 1 `<h1>` — "Real Work, Real Results" is in a `<Badge>` component, not an H1 |
| FIX-004 · Image Alt Text | **Not applicable** | Case studies page has zero `<img>` tags — content is text-only with Lucide icons |
| MOB-001 · Touch Targets | **Done** | Mobile nav items use `min-h-[44px] flex items-center`. Desktop breakpoint is `lg:` (1024px), not 600px |
| MOB-002 · Hamburger Nav | **Done** | Proper `aria-expanded`, `aria-controls`, close-on-navigate, close-on-desktop-resize, body scroll lock |
| MOB-004 · Cookie Banner CLS | **Done** | Uses `position: fixed; bottom: 0` — no layout shift possible |

### Genuine Gaps (This Plan)
| ID | Description | Priority | Phase |
|---|---|---|---|
| SEO-1 | FAQPage schema on homepage + `/agents` | High | 1 |
| SEO-2 | AggregateRating in LocalBusiness schema | High | 1 |
| SEO-3 | ItemList + Article schema on `/case-studies` | High | 1 |
| SEO-4 | Sitemap priority/changefreq tuning | High | 1 |
| SEO-5 | `/traffic` sitemap exclusion cleanup | Medium | 2 |
| A11Y-1 | Theme toggle `aria-pressed` attribute | Medium | 2 |
| A11Y-2 | Cookie banner keyboard dismiss + `aria-label` | Medium | 2 |
| PERF-1 | Portfolio image lazy-load boundary audit | Medium | 2 |
| CONTENT-1 | Expand case study content (800+ words each) | Medium | 3 |
| STRAT-1 | DFW city landing pages (7 cities) | Strategic | 4 |
| STRAT-2 | Blog infrastructure + 3 pillar posts | Strategic | 4 |
| STRAT-3 | Pricing page | Strategic | 4 |

---

## 1. Enhancement Breakdown

### Phase 1 — Structured Data & Sitemap (SEO-1 through SEO-4)

**SEO-1: FAQPage Schema — Homepage + `/agents`**
- **What changes:** Add new `buildFAQPageSchema()` function to `src/lib/schema.ts`. Inject it via `<Helmet>` in `Index.tsx` and `AgentRoster.tsx`.
- **Files affected:** `src/lib/schema.ts`, `src/pages/Index.tsx`, `src/pages/AgentRoster.tsx`
- **Notes:** FAQ content must match visible page content. Homepage FAQ covers general AI automation questions. Agents FAQ covers agent-specific questions.

**SEO-2: AggregateRating in LocalBusiness Schema**
- **What changes:** Extend `buildLocalBusinessSchema()` in `src/lib/schema.ts` to accept an optional `aggregateRating` parameter. Only inject if real Google Business Profile data is available.
- **Files affected:** `src/lib/schema.ts`
- **Blocker:** Requires actual Google Business Profile rating values from the business owner. Do NOT hardcode fabricated ratings — Google will penalize.
- **Decision needed:** What are the current GBP rating and review count?

**SEO-3: ItemList + Article Schema on `/case-studies`**
- **What changes:** Add `buildCaseStudyListSchema()` to `src/lib/schema.ts`. Inject via `<Helmet>` in `CaseStudies.tsx`. Schema headlines must match the `CASE_STUDIES` data array titles exactly.
- **Files affected:** `src/lib/schema.ts`, `src/components/marketing/CaseStudies.tsx`
- **Notes:** Derive schema data from the existing `CASE_STUDIES` constant — no hardcoded duplicates.

**SEO-4: Sitemap Priority & Changefreq Tuning**
- **What changes:** Configure the `vite-plugin-sitemap` options in `vite.config.ts` to set per-route `priority` and `changefreq` values. The plugin accepts `changefreq` and `priority` as route-level options.
- **Files affected:** `vite.config.ts`
- **Current state:** Plugin uses default values (likely `0.5` priority, `daily` changefreq for all routes).
- **Target values:**
  - `/` → priority 1.0, weekly
  - `/agents` → 0.9, weekly
  - `/case-studies` → 0.9, monthly
  - `/assistant` → 0.8, monthly
  - `/roi-calculator` → 0.7, monthly
  - `/reels` → 0.6, monthly
  - `/privacy-policy`, `/terms-of-service` → 0.2, yearly
  - `/privacy-request` → 0.1, yearly

### Phase 2 — Accessibility & Performance (SEO-5, A11Y-1, A11Y-2, PERF-1)

**SEO-5: `/traffic` Cleanup**
- **What changes:** `/traffic` is already excluded from sitemap via `vite.config.ts` line 192. Verify no internal `<a href="/traffic">` links exist in public-facing pages. If they do, remove them.
- **Files affected:** Possibly `src/components/Header.tsx` or page components (needs grep verification at implementation time)
- **Risk:** Low — `/traffic` is excluded from sitemap and prerender.

**A11Y-1: Theme Toggle `aria-pressed`**
- **What changes:** Add `aria-pressed={theme === current.value}` or equivalent to the `DropdownMenuTrigger` in `ThemeToggle.tsx`. The current implementation has `sr-only` text but no `aria-pressed` state.
- **Files affected:** `src/components/ThemeToggle.tsx`
- **Notes:** Since this is a dropdown (not a binary toggle), `aria-pressed` may not be the right pattern. The dropdown already announces the selected item visually. Consider adding `aria-label={`Theme: ${current.label}`}` instead for screen reader context.

**A11Y-2: Cookie Banner Keyboard Accessibility**
- **What changes:** Add `role="alertdialog"`, `aria-label="Cookie consent"`, and ensure the Decline/Accept buttons are focusable with visible focus rings. Add Escape key handler to dismiss.
- **Files affected:** `src/components/CookieConsent.tsx`
- **Notes:** Banner already uses native `<button>` elements (keyboard accessible by default). Main gap is the `role` and `aria-label` attributes, and Escape key dismiss.

**PERF-1: Portfolio Image Lazy Loading Audit**
- **What changes:** Verify that `PortfolioSection.tsx` images below the fold use `loading="lazy"` (they do) and that the hero/LCP image (if any) uses `loading="eager"` or `fetchpriority="high"`.
- **Files affected:** `src/components/PortfolioSection.tsx`, possibly hero section in `Index.tsx`
- **Notes:** Portfolio images already have `loading="lazy"`. The main hero section appears to be text-only (no hero image). This may be a no-op after verification.

### Phase 3 — Content Expansion (CONTENT-1)

**CONTENT-1: Expand Case Study Content**
- **What changes:** Expand the `CASE_STUDIES` array entries in `CaseStudies.tsx` from ~225 words each to 800–1,200 words. Add structured sections: Problem, Solution, Results (with metrics), How It Works, CTA.
- **Files affected:** `src/components/marketing/CaseStudies.tsx`
- **Blocker:** Requires real client data, metrics, and potentially testimonials from the business owner.
- **Also:** Add internal links to `/roi-calculator` and `/agents` within case study content.

### Phase 4 — Strategic (STRAT-1, STRAT-2, STRAT-3)

These are larger initiatives that require new page components, routing, and content creation. Defer to a separate planning cycle.

**STRAT-1: DFW City Landing Pages** — 7 new page components following a template pattern. New routes in `App.tsx`. City-specific `LocalBusiness` schema. Significant content creation effort.

**STRAT-2: Blog Infrastructure** — New `/blog` route, blog post component template, MDX or similar content format, RSS feed generation, sitemap additions. Requires architectural decision on content management approach.

**STRAT-3: Pricing Page** — New `/pricing` route and component. Requires business decisions on pricing tiers and packaging.

---

## 2. Reuse vs. New Code Analysis

### Reuse As-Is
- `react-helmet-async` pattern — already used on every page for meta injection
- `schema-dts` types — already imported in `src/lib/schema.ts`
- `CASE_STUDIES` data array — drive schema generation from this existing data
- `vite-plugin-sitemap` — already configured, just needs per-route options
- Mobile nav touch targets — already compliant at 44px minimum

### Extend
- `src/lib/schema.ts` — Add 3 new builder functions:
  1. `buildFAQPageSchema(questions: {question: string, answer: string}[])`
  2. `buildCaseStudyListSchema(studies: {title: string, description: string, url: string}[])`
  3. Extend `buildLocalBusinessSchema()` with optional `aggregateRating` param
- `vite.config.ts` sitemap config — Add route-level priority/changefreq overrides

### Net-New
- FAQ content arrays (homepage + agents) — new data constants
- Phase 4 items (city pages, blog, pricing) — entirely new components and routes

---

## 3. Workflow Impact Analysis

### Workflow Steps Affected
- **Build pipeline:** Sitemap config change affects `vite-plugin-sitemap` output at build time. Low risk — change is configuration only.
- **Prerender plugin:** No impact — same routes, same rendering. Schema scripts are rendered by React Helmet during prerender.
- **Analytics:** No impact — no tracking changes.

### State Transitions / Side Effects
- Adding JSON-LD blocks increases the `<head>` size per page. Negligible performance impact.
- Sitemap priority changes signal crawl preference to Google but do not change routing or rendering.

### Regression Risk
- **Phase 1:** Low — additive changes only (new schema, sitemap config). No existing functionality modified.
- **Phase 2:** Low — small attribute additions to existing components.
- **Phase 3:** Low — content changes within existing component structure.
- **Phase 4:** Medium — new routes and components could affect bundle size, routing, and navigation.

---

## 4. Implementation Order

### Phase 1: Structured Data & Sitemap (~3 hours)
**Preconditions:** None
1. Add `buildFAQPageSchema()` to `src/lib/schema.ts`
2. Add FAQ schema to `Index.tsx` `<Helmet>` block
3. Add FAQ schema to `AgentRoster.tsx` `<Helmet>` block
4. Add `buildCaseStudyListSchema()` to `src/lib/schema.ts`
5. Add case study schema to `CaseStudies.tsx` `<Helmet>` block (derived from `CASE_STUDIES` array)
6. Update sitemap config in `vite.config.ts` with per-route priority/changefreq
7. **Deferred:** AggregateRating — blocked on GBP data from business owner

### Phase 2: Accessibility & Performance (~1.5 hours)
**Preconditions:** Phase 1 complete
1. Add `aria-label` to ThemeToggle trigger
2. Add `role="alertdialog"` and `aria-label` to CookieConsent
3. Add Escape key handler to CookieConsent
4. Verify `/traffic` has no public-facing internal links (grep + remove if found)
5. Audit portfolio images for lazy-load boundaries (likely no-op)

### Phase 3: Content Expansion (~4–6 hours)
**Preconditions:** Business owner provides expanded case study content, metrics, testimonials
1. Expand `CASE_STUDIES` array with full-length content
2. Update `CaseStudies.tsx` UI to render new sections (Problem, Solution, Results, How It Works, CTA)
3. Add internal links to `/roi-calculator` and `/agents`
4. Update case study schema to match new headlines

### Phase 4: Strategic Pages (separate planning cycle)
**Preconditions:** Phase 1–3 complete; architectural decisions on blog CMS, pricing tiers, city content
- Separate enhancement plan recommended for each strategic initiative

---

## 5. Testing Strategy

### Unit Tests
- `src/lib/schema.ts` — Test each new builder function returns valid JSON-LD structure with correct `@type`
- Validate FAQ schema has `mainEntity` array with `Question`/`Answer` types
- Validate ItemList schema positions are sequential integers starting at 1

### Manual Verification (Post-Deploy)
- **Schema validation:** Run each page URL through https://validator.schema.org — zero errors
- **Sitemap validation:** `curl` the sitemap and verify priority values differ per route
- **Lighthouse audit:** Run on all pages — verify no regressions in Performance, Accessibility, SEO scores
- **PageSpeed Insights (mobile):** Verify LCP < 2.5s, CLS < 0.1

### E2E / Workflow Tests
- Verify prerender still captures JSON-LD scripts in static HTML output (run build locally and check `dist/*/index.html`)
- Verify sitemap XML is well-formed after config changes

### Existing Tests to Update
- None — this project does not appear to have an automated test suite. Consider adding schema validation tests as part of this work.

---

## 6. Open Questions / Risks

### Questions for Business Owner
1. **AggregateRating (SEO-2):** What is the current Google Business Profile rating and review count? Do NOT add this schema until we have real numbers.
2. **Case Study Content (CONTENT-1):** Can you provide expanded narratives (800+ words each) with specific metrics, timelines, and optionally client testimonials?
3. **Pricing (STRAT-3):** Are the tier prices ($2,500 / $7,500 / custom) accurate and approved for public display?
4. **City Pages (STRAT-1):** Which DFW cities are highest priority? Do you have geo-specific case studies or client references?

### Assumptions
- The `vite-plugin-sitemap` supports per-route configuration for `priority` and `changefreq` — needs verification in plugin docs at implementation time.
- FAQ content provided in the audit document is factually accurate and approved for publication.
- The site will be rebuilt and redeployed after changes (prerender must run to capture new schema in static HTML).

### Risks
- **Schema accuracy:** Publishing incorrect FAQ answers or fabricated ratings will trigger Google penalties. All schema content must be reviewed before deploy.
- **Build regression:** Changes to `vite.config.ts` sitemap config could break the build if plugin API differs from expected. Mitigated by testing locally before deploy.
- **Content freshness:** Phase 3 content expansion requires business input — this is the most likely bottleneck.
