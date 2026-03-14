# Enhancement Plan: alphaspeedai.com CRO — Marketing Landing Page & Conversion Infrastructure

**Created:** 2026-03-14
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/App.tsx` — router (add `/roi-calculator`, `/case-studies` routes)
- `src/pages/Index.tsx` — existing landing page (CRO improvements)
- `src/components/Hero.tsx` — DFW geo-targeting, stats bar
- `src/lib/analytics.ts` — extend with Meta Pixel + TikTok Pixel
- `index.html` — SEO meta updates, pixel script tags
- `public/robots.txt` — add Sitemap reference
- `public/sitemap.xml` — new file

---

## Architecture Reality Check (Corrections to Original Draft)

The original plan contained several incorrect assumptions. The actual codebase state:

| Assumption in Draft | Actual State |
|---------------------|-------------|
| "No marketing landing page — `*` redirects to `/alphaai`" | **WRONG** — `App.tsx:29` has `<Route path="/" element={<Index />} />`. Full landing page exists at `src/pages/Index.tsx` with 12+ sections. |
| "Router is in `src/main.tsx`" | **WRONG** — `src/main.tsx` only mounts React root. Routing is in `src/App.tsx`. |
| "Analytics wrapper is new code" | **WRONG** — `src/lib/analytics.ts` exists with full GA4, Supabase, UTM, `trackEvent`, `trackPageView`, `trackLead` functions. |
| "Analytics tracking not wired up" | **WRONG** — `AnalyticsTracker` component is imported and mounted in `App.tsx`. `Hero.tsx` already calls `trackEvent` and `trackLead`. |
| "Vite base is `/alpha-speed-ai-studio/`" | **WRONG** — `vite.config.ts:104` sets `base: "/"`. |
| "No `robots.txt`" | **WRONG** — `public/robots.txt` exists, allows all crawlers. |
| "No meta tags in `index.html`" | **WRONG** — Title, description, og:*, twitter:* all present. GA4 script hardcoded with `G-19LZ95L7MC`. |

---

## 1. Enhancement Breakdown

### Phase 0 — SEO Precision Fixes
**What:** The existing meta tags, `robots.txt`, and analytics are in place but need DFW geo-targeting and structural completions that are currently missing.

**Gaps:**
- `<title>` lacks DFW geo signal: "Alpha Speed AI | Automate Your Business" → should include "DFW"
- `<meta name="description">` is generic — no Dallas/DFW mention
- `og:image` URL still points to GitHub Pages CDN path (`alphaspeedconsulting.github.io/alpha-speed-ai-studio/`) — should use `https://alphaspeedai.com/og-image.jpeg`
- `og:url` tag missing entirely
- `application/ld+json` LocalBusiness schema missing (zero structured data)
- `public/robots.txt` has no `Sitemap:` reference
- `public/sitemap.xml` does not exist
- `<meta name="keywords">` missing

**Affected:** `index.html`, `public/robots.txt`, `public/sitemap.xml` (new)

---

### Phase 1 — Landing Page CRO Improvements
**What:** The existing `Index.tsx` landing page has strong bones (12 sections) but lacks conversion-focused elements that competitors (HiVergent AI, AutomateNexus) deploy. Improvements to existing components only — no new page.

**Gaps:**
- `Hero.tsx` H1 is "AI That Works For Your Business" — no DFW geo signal
- No quantified stats bar above the fold (competitors show "40% productivity gain", "3x ROI", "98% satisfaction")
- Primary CTA is "Try the Assistant" → `/assistant`. Should be "Book a Free Strategy Call" as primary with the assistant as secondary
- No scroll-trigger CTA (competitors trigger consultation form at ~12% scroll)
- `Contact.tsx` section likely needs a "Book Strategy Call" upgrade (need to verify)

**Affected:** `src/components/Hero.tsx` (H1 + CTA order), new `src/components/StatsBar.tsx`, `src/pages/Index.tsx` (insert StatsBar), `src/components/Contact.tsx` (audit)

---

### Phase 2 — ROI Calculator Lead Magnet
**What:** New route `/roi-calculator`. Interactive React component with 3 inputs → estimated annual savings formula → email gate before revealing full results. Degrades gracefully if API unavailable.

**What is new:** `src/components/marketing/RoiCalculator.tsx`, new `/roi-calculator` route in `App.tsx`
**What is reused:** `trackEvent` + `trackLead` from existing `analytics.ts`, shadcn/ui Input/Button/Card, brand tokens from `index.css`

**Formula:** `annual_savings = employees × hours_per_week × hourly_cost × 52 × 0.40`

**Email gate:** Shows blurred results + email input. On submit: `POST /api/v1/leads/roi-calculator` with `{ email, inputs, result }`. On API failure OR if endpoint skipped: reveals results anyway (no hard gate).

**Affected:** `src/components/marketing/RoiCalculator.tsx` (new), `src/App.tsx` (add route), optional backend endpoint

---

### Phase 3 — Case Studies Page
**What:** New route `/case-studies`. Two static anonymized case studies in Challenge / Solution / Result / CTA structure. Zero DB, zero API — fully static content.

**What is new:** `src/components/marketing/CaseStudies.tsx`, `src/pages/CaseStudies.tsx` (or inline), `/case-studies` route in `App.tsx`
**What is reused:** shadcn/ui Card, brand tokens, Header/Footer components if extracted

**Content dependency:** User must provide 2 anonymized case study descriptions before this phase can be executed. See Open Questions §9.

**Affected:** `src/components/marketing/CaseStudies.tsx` (new), `src/App.tsx` (add route), `src/pages/Index.tsx` (link from SocialProof section)

---

### Phase 4 — Instagram Feed: Behold.so → Supabase
**What:** Replace the unconfigured `@behold/widget` (Behold.so, never set up) with a Supabase-backed feed component. The Alpha AI content gen flow writes published posts to a `published_posts` table; `InstagramFeed.tsx` queries that table directly. Zero third-party dependency, no token rotation, no subscription cost.

**Why not Behold.so:** The content gen flow already creates and publishes the assets. Pulling them back from Instagram via a third-party service is unnecessary indirection.

**What is new:**
- `supabase/migrations/002_published_posts.sql` — new table + RLS policy
- `InstagramFeed.tsx` updated — replace `<behold-widget>` with Supabase query + grid render

**What is removed:** `@behold/widget` import and `INSTAGRAM_FEED_ID` constant (replaced by Supabase query)

**What is reused:** `getSupabase()` from `src/lib/supabase.ts`, existing shadcn/ui Card, brand tokens

**Content gen flow contract:**
```
POST https://{SUPABASE_URL}/rest/v1/published_posts
Headers: apikey: SERVICE_ROLE_KEY, Authorization: Bearer SERVICE_ROLE_KEY
Body: { platform, image_url, caption, post_url, posted_at, tags[] }
```
Service role key is used by the content gen flow (server-side only — never in the frontend).

**Table schema:**
```sql
published_posts(id uuid, created_at timestamptz, posted_at timestamptz,
  platform text, image_url text, caption text, post_url text, tags text[])
```
RLS: anon SELECT allowed (public feed), INSERT restricted to service role.

**Precondition:** Content gen flow writes at least one test row before `InstagramFeed.tsx` is updated.

**Affected:** `src/components/InstagramFeed.tsx`, `src/lib/constants.ts` (remove `INSTAGRAM_FEED_ID`), `supabase/migrations/002_published_posts.sql` (new)

---

### Phase 5 — Pixel Infrastructure Extension
**What:** The existing `analytics.ts` supports GA4 and Supabase. Extend it to also support Meta Pixel (`fbq`) and TikTok Pixel (`ttq`). Add `VITE_ANALYTICS_ENABLED` flag to gate all pixel injection in dev/test.

**Critical architectural note:** GA4 is currently hardcoded in `index.html` (line 25–40) AND dynamically injected by `analytics.ts:initAnalytics()`. This creates a double-injection risk. Phase 4 must consolidate to one source of truth.

**What is extended:** `src/lib/analytics.ts` (add `fbq`/`ttq` declarations + injection), `index.html` (remove hardcoded GA4 script → move to env-var pattern)
**What is new:** No new files required (analytics.ts already exists)

**Affected:** `src/lib/analytics.ts`, `index.html`, `.env.local` (pixel IDs — never committed)

---

## 2. Reuse vs New Code Analysis

| Item | Status | Notes |
|------|--------|-------|
| Brand tokens (`--brand`, `--background`, etc.) | **Reuse** | `src/index.css` has all tokens |
| Font (Inter) | **Reuse** | Already loaded in `index.html` |
| shadcn/ui Button, Badge, Card, Input | **Reuse** | Installed, same design system |
| `tailwind.config.ts` custom tokens | **Reuse** | `alphaai-*` font sizes, color classes |
| `BrowserRouter` routing in `App.tsx` | **Extend** | Add `/roi-calculator`, `/case-studies` routes |
| `src/lib/analytics.ts` | **Extend** | Add `fbq`/`ttq` support; fix double-GA4-injection |
| `src/components/Hero.tsx` | **Modify** | H1 DFW geo-signal, CTA reorder |
| `src/pages/Index.tsx` | **Modify** | Insert `<StatsBar />` after Hero |
| `src/components/StatsBar.tsx` | **New** | Quantified stats (3 claims) |
| `src/components/marketing/RoiCalculator.tsx` | **New** | Phase 2 |
| `src/components/marketing/CaseStudies.tsx` | **New** | Phase 3 |
| `src/components/InstagramFeed.tsx` | **Replace** | Phase 4 — Behold.so → Supabase query |
| `supabase/migrations/002_published_posts.sql` | **New** | Phase 4 |
| `@behold/widget` import | **Remove** | Phase 4 — replaced by Supabase |
| `public/sitemap.xml` | **New** | Phase 0 |
| Dashboard `/alphaai/*` routes | **No change** | Zero modifications |
| Backend lead capture endpoint | **New (optional)** | Phase 2 — simple POST, no workflow impact |

---

## 3. Workflow Impact Analysis

| Phase | Components Affected | Side Effects | Regression Risk |
|-------|-------------------|-------------|----------------|
| 0 | `index.html`, `robots.txt`, `sitemap.xml` | None | **Low** — meta tag changes only |
| 1 | `Hero.tsx`, `Index.tsx`, new `StatsBar.tsx` | H1 text change (SEO signal change) | **Low** — visual only, no routing |
| 2 | `App.tsx`, new `RoiCalculator.tsx` | New `/roi-calculator` route | **Low** — additive, no existing route collision |
| 3 | `App.tsx`, new `CaseStudies.tsx` | New `/case-studies` route | **Low** — additive |
| 4 | `InstagramFeed.tsx`, `constants.ts`, new migration | Removes Behold.so; queries Supabase instead | **Low** — preconditioned on test row existing in DB |
| 5 | `analytics.ts`, `index.html` | GA4 consolidation changes injection timing | **Medium** — double-injection removal could affect event firing order; must verify GA4 events still fire correctly |

No LangGraph workflows, no cron jobs, no MCP tools are involved. Phase 4 requires one new DB table (additive migration, no existing schema changes).

**Phase 5 regression risk is Medium** due to the GA4 consolidation. The existing hardcoded script in `index.html` fires before React hydrates; the dynamic injection in `analytics.ts` fires after. Removing the `index.html` script changes the timing window. Must verify GA4 events from `AnalyticsTracker` and `Hero.tsx` still record correctly in GA4 dashboard after change.

---

## 4. Implementation Order

### Phase 0 — SEO Precision Fixes — **S** (<30 min)

**Steps:**
1. Update `index.html`:
   - `<title>`: "Alpha Speed AI | DFW AI Automation Studio"
   - `<meta name="description">`: include "Dallas-Fort Worth" + service keywords
   - Add `<meta name="keywords">`: "DFW AI automation, Dallas AI agency, AI workflow automation Texas, ..."
   - Fix `og:image` URL → `https://alphaspeedai.com/og-image.jpeg`
   - Add `<meta property="og:url" content="https://alphaspeedai.com/" />`
   - Add `application/ld+json` LocalBusiness schema (DFW service area, services, contact)
2. Update `public/robots.txt`: add `Sitemap: https://alphaspeedai.com/sitemap.xml`
3. Create `public/sitemap.xml` with URLs: `/`, `/roi-calculator`, `/case-studies`, `/assistant`, `/agents`

*Preconditions:* None
*Dependency for:* All phases — makes new pages indexable immediately on deploy

---

### Phase 1 — Landing Page CRO — **M** (30–90 min)

**Steps:**
1. Read `src/components/Contact.tsx` — audit current CTA and booking mechanism
2. Update `src/components/Hero.tsx`:
   - H1: "DFW's AI Automation Studio" (or variant with geo signal)
   - Reorder CTAs: primary = "Book a Free Strategy Call", secondary = "Try the Assistant"
3. Create `src/components/StatsBar.tsx` — 3 quantified stats (content TBD — see Open Questions §9 #3)
4. Update `src/pages/Index.tsx` — insert `<StatsBar />` immediately after `<Hero />`
5. (Optional) Add scroll-trigger CTA: `useEffect` with `IntersectionObserver` or scroll % check → show sticky CTA bar

*Preconditions:* Phase 0 complete (so H1 change is indexed with correct meta)
*Content dependency:* Stats bar copy requires user confirmation (see Open Questions)

---

### Phase 2 — ROI Calculator — **M** (30–90 min)

**Steps:**
1. Create `src/components/marketing/RoiCalculator.tsx`:
   - 3 controlled inputs: `employees`, `hoursPerWeek`, `hourlyCost`
   - `annualSavings = employees × hoursPerWeek × hourlyCost × 52 × 0.40`
   - Blurred results overlay + email input until submission
   - On submit: `POST /api/v1/leads/roi-calculator` → on success or failure, reveal results
   - Call `trackLead("roi_calculator_email_submitted", { result: annualSavings })`
2. Update `src/App.tsx`: add `<Route path="/roi-calculator" element={<RoiCalculator />} />`
3. Update `src/components/Hero.tsx` or `StatsBar`: add "Calculate Your Savings →" link
4. (Optional) Backend: add `POST /api/v1/leads/roi-calculator` endpoint — stores `{ email, inputs, result, created_at }` in DB

*Preconditions:* Phase 1 complete
*Note on optional endpoint:* If skipped, email field shows blurred-then-reveal UI but data is not stored. Mark clearly in PR.

---

### Phase 3 — Case Studies Page — **S** (<30 min once content is ready)

**Steps:**
1. Create `src/components/marketing/CaseStudies.tsx` — 2 static case studies, each with: Industry badge, Challenge, Solution, Result (quantified), CTA button → `/assistant` or `#contact`
2. Update `src/App.tsx`: add `<Route path="/case-studies" element={<CaseStudies />} />`
3. Update `src/pages/Index.tsx`: link from `PortfolioSection` or add case studies teaser card

*Preconditions:* Phase 1 complete; **content from user required** (see Open Questions §9 #1)

---

### Phase 4 — Instagram Feed: Behold.so → Supabase — **S** (<30 min, after content gen writes first row)

**Steps:**
1. Run `supabase/migrations/002_published_posts.sql` in Supabase SQL Editor (table + RLS policy)
2. Confirm content gen flow has written at least one test row to `published_posts`
3. Update `src/components/InstagramFeed.tsx`:
   - Remove `import "@behold/widget"` and `<behold-widget>` JSX
   - Add `useEffect` → `getSupabase().from('published_posts').select('image_url,caption,post_url,posted_at').eq('platform','instagram').order('posted_at',{ascending:false}).limit(9)`
   - Render results as 3-column image grid with caption overlay on hover
   - Graceful empty state: if no rows, show existing "Follow Us on Instagram" link fallback
4. Remove `INSTAGRAM_FEED_ID` from `src/lib/constants.ts`

*Preconditions:* Content gen flow tested and writing rows to Supabase

---

### Phase 5 — Pixel Infrastructure Extension — **S** (<30 min)

**Steps:**
1. Remove hardcoded GA4 script block from `index.html` (lines 23–41)
2. Update `src/lib/analytics.ts`:
   - Add `Window` type declarations for `fbq` and `ttq`
   - Add `injectMetaPixelScript(pixelId)` function (mirrors existing `injectGtagScript` pattern)
   - Add `injectTikTokPixelScript(pixelId)` function
   - Update `initAnalytics()`: read `VITE_META_PIXEL_ID`, `VITE_TIKTOK_PIXEL_ID`, and existing `VITE_GA_MEASUREMENT_ID` — inject all three only when IDs are set
   - Add `VITE_ANALYTICS_ENABLED` guard: if `=== "false"`, skip all injections
3. Update `trackEvent()` in `analytics.ts`: also call `fbq('trackCustom', name, params)` and `ttq.track(name, params)` when present
4. Add pixel IDs to `.env.local` (never committed) — user provides IDs (see Open Questions §9 #4)

*Preconditions:* Phase 0 complete
*Critical:* After removing `index.html` GA4 script, manually verify in browser Network tab that GA4 events (`page_view`, `cta_click`) still appear in GA4 Real-Time dashboard.

---

## 5. Testing Strategy

### Phase 0
- Manual: `curl https://alphaspeedai.com | grep "Dallas\|DFW"` — confirm geo-targeted text in response
- Manual: `https://alphaspeedai.com/sitemap.xml` returns valid XML
- Manual: `https://alphaspeedai.com/robots.txt` contains `Sitemap:` line
- Tool: Google Rich Results Test → submit homepage → confirm LocalBusiness schema parses correctly

### Phase 1
- `npx tsc --noEmit` — zero errors after changes to Hero.tsx and Index.tsx
- `npm run build` — successful build with StatsBar included in dist
- Visual check: Navigate to `/` — DFW H1 visible, stats bar renders above the fold
- Regression: `/alphaai` dashboard still loads correctly

### Phase 2
- **Unit tests** (`src/components/marketing/__tests__/RoiCalculator.test.tsx`):
  - `test_roi_formula_correct`: 5 employees × 10hr/wk × $50/hr → `5 × 10 × 50 × 52 × 0.40 = $52,000`
  - `test_email_gate_shows_blurred_results`: before email submission, result div has blur CSS class
  - `test_email_gate_clears_on_submit`: after email entered + submitted, blur removed
  - `test_api_failure_still_reveals_results`: mock `fetch` to reject → results still visible
- `npx tsc --noEmit` — zero errors

### Phase 3
- `npx tsc --noEmit` — zero errors
- `npm run build` — case studies page included in dist
- Visual check: `/case-studies` renders both case studies with full structure

### Phase 4
- Visual check: Instagram feed grid renders on `/` with real images from Supabase
- Empty state check: if `published_posts` is empty, fallback "Follow Us" link renders (no crash)
- `npx tsc --noEmit` — zero errors after removing `@behold/widget` types

### Phase 5
- **Unit tests** (`src/lib/__tests__/analytics.test.ts` — extend existing test file):
  - `test_trackEvent_noops_when_fbq_not_loaded`: `window.fbq` undefined → no exception
  - `test_trackEvent_noops_when_ttq_not_loaded`: `window.ttq` undefined → no exception
  - `test_trackEvent_calls_fbq_when_loaded`: mock `window.fbq` → verify called with correct event name
  - `test_trackEvent_calls_ttq_when_loaded`: mock `window.ttq` → verify called
  - `test_initAnalytics_skips_injection_when_disabled`: `VITE_ANALYTICS_ENABLED=false` → no scripts injected
- Manual: After GA4 consolidation, open Chrome DevTools → Network → confirm `gtag/js` loads and GA4 Real-Time shows events

### Existing tests to update
- `src/lib/__tests__/dynamicImportWithFallback.test.ts` — verify still passes after analytics.ts changes
- `npx tsc --noEmit` must pass after every phase — treat as CI gate

---

## 6. Acceptance Criteria

### Phase 0
- [ ] `<title>` contains "DFW" or "Dallas-Fort Worth"
- [ ] `<meta name="description">` contains DFW geo keyword
- [ ] `application/ld+json` LocalBusiness block present with DFW service area
- [ ] `og:image` points to `alphaspeedai.com` domain (not GitHub Pages)
- [ ] `og:url` tag present
- [ ] `public/robots.txt` contains `Sitemap: https://alphaspeedai.com/sitemap.xml`
- [ ] `public/sitemap.xml` contains at minimum `/` and `/case-studies`

### Phase 1
- [ ] H1 contains "DFW" or "Dallas" geo signal
- [ ] Stats bar visible above the fold with ≥3 quantified claims
- [ ] Primary CTA is "Book a Free Strategy Call"
- [ ] `/alphaai` dashboard still loads correctly (regression check)
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run build` succeeds

### Phase 2
- [ ] ROI calculator inputs render correctly (employees, hours/week, cost)
- [ ] Formula result matches: 5 × 10 × 50 × 52 × 0.40 = $52,000
- [ ] Email gate renders blurred state before submission
- [ ] Full result revealed after email submitted regardless of API success/failure
- [ ] Unit tests pass
- [ ] `npx tsc --noEmit` — zero errors

### Phase 3
- [ ] `/case-studies` route renders two case studies
- [ ] Each case study has Challenge / Solution / Result / CTA structure
- [ ] Linked from Index.tsx

### Phase 4
- [ ] Instagram feed grid renders with images from `published_posts` Supabase table
- [ ] Empty state (no rows) shows fallback link — no crash, no blank section
- [ ] `@behold/widget` package no longer imported or referenced
- [ ] `INSTAGRAM_FEED_ID` constant removed from `constants.ts`
- [ ] `npx tsc --noEmit` — zero errors

### Phase 5
- [ ] GA4 events fire correctly after hardcoded script removal (verified in GA4 Real-Time)
- [ ] `VITE_ANALYTICS_ENABLED=false` → no analytics scripts injected (verify in Network tab)
- [ ] `VITE_ANALYTICS_ENABLED=true` + pixel IDs set → `fbq`, `ttq`, `gtag` scripts injected
- [ ] `trackEvent` does not throw when pixel globals are absent
- [ ] Analytics unit tests pass

---

## 7. Rollback Strategy

All phases are frontend-only (except optional Phase 2 backend endpoint). Each is independently revertable via `git revert`.

- **Phase 0:** Revert `index.html` meta tag changes; restore `robots.txt`; delete `sitemap.xml`. No data migration.
- **Phase 1:** Revert `Hero.tsx` H1 and CTA changes; remove `<StatsBar />` from `Index.tsx`; delete `StatsBar.tsx`.
- **Phase 2:** Remove `/roi-calculator` route from `App.tsx`; delete `RoiCalculator.tsx`. Optional backend endpoint remains dormant (additive only).
- **Phase 3:** Remove `/case-studies` route from `App.tsx`; delete `CaseStudies.tsx`.
- **Phase 4:** Restore `@behold/widget` import and `INSTAGRAM_FEED_ID` constant; revert `InstagramFeed.tsx`. `published_posts` table remains in Supabase (additive — safe to leave).
- **Phase 5:** Restore hardcoded GA4 script to `index.html`; revert `analytics.ts` pixel additions. Zero data stored locally.

**Phase 5 feature flag:** Set `VITE_ANALYTICS_ENABLED=false` in `.env.local` to instantly disable all pixel tracking without a code deploy.

---

## 8. Open Questions — Requires User Input Before Execution

1. **Case study content** (Phase 3 blocker) — Two anonymized case studies needed. Provide: client industry, challenge description, solution summary, quantified result (e.g., "70% reduction in invoice processing time").

2. **Calendly / booking link** (Phase 1) — What URL should "Book a Free Strategy Call" CTA link to? Options:
   - Calendly embed URL (e.g., `https://calendly.com/alphaspeedai/...`)
   - Scroll to existing `#contact` section (zero-config fallback)
   - New `/contact` page

3. **Stats bar copy** (Phase 1) — Confirm which claims to display:
   - "40% avg productivity gain" (industry benchmark)
   - "20+ DFW clients served"
   - "$50K+ avg annual savings"
   - Or provide actual Alpha Speed AI numbers if available.

4. **Instagram feed precondition** (Phase 4) — Phase 4 is blocked until the Alpha AI content gen flow successfully writes at least one row to `published_posts`. Confirm when ready.

5. **Pixel IDs** (Phase 5) — Provide when ready (go in `.env.local`, never committed):
   - Meta Pixel ID
   - TikTok Pixel ID
   - GA4 Measurement ID already in `index.html` as `G-19LZ95L7MC` — confirm this is correct or provide updated ID.

6. **Backend lead capture** (Phase 2) — Is the optional `POST /api/v1/leads/roi-calculator` endpoint wanted, or is email-reveal-without-storage sufficient for now?

---

## 9. Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Phase 4 feed empty on launch | Low | Keep fallback "Follow Us" link in component; goes live only after content gen confirms rows exist |
| Phase 5 GA4 consolidation breaks event firing | Medium | Verify in GA4 Real-Time before merging; keep old `index.html` script on a feature branch as rollback |
| Google rendering delay | Low | Even with correct meta tags, indexing takes 2–4 weeks. SEO gains are not instant. |
| Privacy compliance (EU visitors) | Low-Medium | Meta/TikTok pixels on page load require cookie consent banner for GDPR. Out of scope for this plan — flag before Phase 4 production deployment if site serves EU traffic. |
| Stats bar credibility | Low | Using unverified industry benchmarks risks credibility damage. Strongly prefer using real Alpha Speed AI client data where available. |
| ROI formula automation rate assumption | Low | 40% is HiVergent's claimed benchmark, not Alpha Speed AI's. Label clearly in UI: "Based on industry average 40% task automation rate." |
