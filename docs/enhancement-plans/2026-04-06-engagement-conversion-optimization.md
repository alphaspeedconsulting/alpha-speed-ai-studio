# Enhancement Plan: Engagement & Conversion Optimization

**Created:** 2026-04-06
**Status:** Complete
**Author:** Claude
**Related Files:** `src/pages/Index.tsx`, `src/components/Hero.tsx`, `src/components/Contact.tsx`, `src/components/EmailCapture.tsx`, `src/components/InstagramFeed.tsx`, `src/components/Header.tsx`, `src/lib/analytics.ts`, `vite.config.ts`, `src/App.tsx`

---

## Problem Statement

GA4 data (Mar 9 – Apr 5, 2026) shows catastrophic engagement failure:

| Metric | Value | Benchmark |
|--------|-------|-----------|
| **Engagement rate** | 36% | 50-60% target |
| **Avg engagement time** | 17s | 45-90s target |
| **Organic Search sessions** | 9 (3.27%) | Should be 30-50% |
| **Organic Social engagement** | 1s avg | Immediate bounce |
| **Google indexed pages** | 0 | 9 pages exist |
| **Key events (conversions)** | 0 | Zero across all channels |

Root causes identified:
1. **Zero Google indexation** — pre-rendering exists but output likely broken or not deployed correctly
2. **4,500-word megapage** — visitors can't find what they need in 3-5 seconds
3. **No content funnel** — 9 pages, no blog, every visitor enters via homepage
4. **Social→Homepage intent mismatch** — IG/social visitors expect specific content, get megapage
5. **No urgency or progressive engagement** — page is a wall of content with no guided journey

---

## 1. Enhancement Breakdown

### Enhancement A: Fix Pre-rendering & Indexation (CRITICAL)
**What:** Verify pre-rendered HTML contains actual content, fix deployment pipeline, submit to GSC
**Affected:** `vite.config.ts` (prerender plugin), `index.html`, deployment config
**Why:** Every other optimization is meaningless if Google can't see the site

### Enhancement B: Above-the-Fold Engagement Overhaul
**What:** Redesign first 3 seconds of visitor experience — tighter hero, immediate social proof, single clear CTA, reduced visual noise
**Affected:** `Hero.tsx`, `StatsBar.tsx`, `Header.tsx`

### Enhancement C: Homepage Content Triage — Reduce to Convert
**What:** Remove/collapse low-value sections from homepage, add sticky CTA, implement progressive disclosure
**Affected:** `Index.tsx`, new `StickyCtaBanner.tsx`, section components

### Enhancement D: Exit-Intent & Micro-Engagement Hooks
**What:** Add exit-intent popup, scroll-triggered CTAs, and engagement nudges
**Affected:** New components, `analytics.ts`

### Enhancement E: Instagram Feed Performance Fix
**What:** Replace dynamic Instagram loading with static thumbnails + lazy loading to save 1-4s load time
**Affected:** `InstagramFeed.tsx`

### Enhancement F: Social Landing Pages (Intent Matching)
**What:** Create lightweight landing pages for social traffic with specific, matching content
**Affected:** `App.tsx` (new routes), new page components

### Enhancement G: ROI Calculator Page Expansion
**What:** Add content depth to thin /roi-calculator page (currently ~150 words)
**Affected:** `src/pages/RoiCalculator.tsx`

---

## 2. Reuse vs New Code Analysis

### Reuse As-Is
- **Analytics infrastructure** (`src/lib/analytics.ts`) — GA4 tracking, conversion events, UTM capture all fully built. Just need to fire more events at the right moments
- **CalendlyBooking component** — Already lazy-loaded, tracked. Can be reused in sticky CTA and exit-intent
- **EmailCapture component** — Reuse in exit-intent modal and social landing pages
- **Schema helpers** (`src/lib/schema.ts`) — Reuse for new pages
- **Button variants** — `hero` and `heroOutline` variants already exist
- **Pre-render plugin** — Architecture is sound, may just need debugging/verification
- **UTM-aware Hero headlines** — Pattern can extend to landing pages

### Needs Extension
- **Hero.tsx** — Simplify copy, reduce sections, add testimonial/social proof snippet
- **Index.tsx** — Remove or lazy-load below-fold sections that add cognitive load without conversion value
- **InstagramFeed.tsx** — Convert from Supabase-fetched dynamic feed to static thumbnails with lazy load
- **vite.config.ts** — Add verification step to pre-render plugin that checks output HTML contains expected content markers
- **Header.tsx** — May need sticky CTA variant for scroll state

### Net-New Code Required
- **`StickyCtaBanner.tsx`** — Floating bottom CTA that appears after scroll past hero
- **`ExitIntentModal.tsx`** — Modal triggered on mouse-leave (desktop) or back-button (mobile)
- **`ScrollProgressBar.tsx`** — Visual indicator of page progress (optional)
- **Social landing page templates** — 1-2 new page components for `/from/instagram`, `/from/linkedin`
- **`TestimonialBadge.tsx`** — Small inline social proof component for hero area

---

## 3. Workflow Impact Analysis

### Workflow Steps Affected

| Area | Impact | Risk |
|------|--------|------|
| **Pre-render build** | Plugin modification to add content verification | Low — additive check, no breaking change |
| **Homepage render** | Section removal/reordering in Index.tsx | Medium — visual regression risk, needs review |
| **Routing** | New routes for social landing pages | Low — additive, no existing routes affected |
| **Analytics** | New events for exit-intent, sticky CTA, scroll depth | Low — additive event firing |
| **Supabase** | No schema changes — email_subscribers table reused | Low |
| **Build pipeline** | Pre-render routes list grows with social landing pages | Low |

### State Transitions
- **Cookie consent** — Exit-intent modal must respect existing consent state
- **Scroll state** — New scroll listeners for sticky CTA + scroll progress (memory-safe cleanup needed)
- **LocalStorage** — Exit-intent should store dismissal to avoid repeat shows (`alpha_exit_intent_dismissed_v1`)

### Regression Risk: **Medium**
- Homepage visual changes require careful testing across themes (dark, soft, corporate)
- Section removal may break anchor links in nav (`#services`, `#portfolio`, etc.)
- Pre-render changes need end-to-end verification before deploy

---

## 4. Implementation Order

### Phase 1: Pre-rendering Fix & Verification (Day 1-2)
**Preconditions:** None
**Dependencies:** None

1. Build site locally and inspect pre-rendered HTML output in `dist/` — verify it contains actual page content (not empty React root)
2. If pre-rendered HTML is empty/broken:
   - Debug Puppeteer wait conditions in `prerenderPlugin()`
   - Increase `RENDER_WAIT_MS` or switch to content-based wait (`waitForSelector`)
   - Verify all React components hydrate without errors
3. If pre-rendered HTML is correct:
   - Problem is deployment — verify GitHub Pages serves `dist/<route>/index.html` files, not just the SPA shell
   - Check that `index.html` in subdirectories isn't being overridden by SPA fallback
4. Add a **content verification step** to the prerender plugin that checks for expected text markers in output HTML (e.g., "DFW's AI Automation Studio")
5. Verify meta tags render in pre-rendered output (title, description, OG tags, canonical URLs)
6. After deploy: use Google Search Console URL Inspection tool to verify Googlebot sees rendered content

### Phase 2: Above-the-Fold Optimization (Day 2-3)
**Preconditions:** Phase 1 complete (pre-rendering verified)
**Dependencies:** None

1. **Simplify Hero.tsx:**
   - Reduce headline options to one strong default: "AI Automation for DFW Businesses"
   - Shorten subheadline to 1 line (currently 2 lines)
   - Single primary CTA: "Book Free Consultation" (Calendly) — remove "Try the Assistant" from hero (move to nav only)
   - Add a micro-testimonial or result stat below CTA: "Saved DCR Roofing 20+ hrs/week" or "90% faster lead response"
2. **Enhance StatsBar.tsx:**
   - Make stats more specific and outcome-oriented (e.g., "3 Active Clients" → "20+ Hours Saved per Client per Week")
   - Add subtle animation (count-up on scroll into view)
3. **Reduce animated background noise:**
   - Reduce glow orb opacity on mobile by 50%
   - Ensure hero text contrast ratio meets WCAG AA

### Phase 3: Homepage Content Triage (Day 3-5)
**Preconditions:** Phase 2 complete
**Dependencies:** Phase 2 (Hero changes)

1. **Audit each section for conversion contribution.** Current 15 sections → target 8-10:
   - **KEEP (high value):** Hero, StatsBar, Services, HowWeWorkSection, PortfolioSection, Contact, Footer
   - **KEEP but relocate:** EmailCapture (move above Contact as final capture before footer)
   - **COLLAPSE/SIMPLIFY:** WhyAgentsSection (merge key points into Hero subtext), AgentsAsServiceSection (move to /agentvault page only), PlatformSection (merge into Services)
   - **LAZY-LOAD below fold:** WorkflowExamplesSection, DemoVideosSection, UseCasesSection
   - **REMOVE from homepage:** InstagramFeed (link to /reels instead)
   - **KEEP:** About (but move higher, before Contact)
2. **Add section anchors verification** — ensure nav hash links still work after reorder
3. **Add `StickyCtaBanner.tsx`:**
   - Appears after user scrolls past hero (IntersectionObserver)
   - Fixed bottom bar: "Ready to automate? [Book Free Consultation]"
   - Dismissible (X button), respects dismissal for session
   - Hidden when Contact section is in viewport (avoid CTA stacking)
   - Track `cta_click` with placement="sticky_banner"

### Phase 4: Exit-Intent & Micro-Engagement (Day 5-6)
**Preconditions:** Phase 3 complete
**Dependencies:** EmailCapture component (reused)

1. **Build `ExitIntentModal.tsx`:**
   - **Desktop trigger:** `mouseleave` event on document (cursor moves toward browser chrome)
   - **Mobile trigger:** None initially (exit-intent unreliable on mobile)
   - **Content:** "Before you go — get a free AI automation assessment for your business" + EmailCapture form
   - **Rules:**
     - Only fires once per session (localStorage flag)
     - Doesn't fire if user has already submitted email or booked Calendly
     - Doesn't fire within first 15 seconds (avoid annoying fast visitors)
     - Respects cookie consent state
   - Track `lead_event` with name="exit_intent_shown" and "exit_intent_converted"
2. **Implement scroll depth tracking:**
   - Fire analytics events at 25%, 50%, 75%, 100% scroll depth
   - `trackEvent("scroll_depth", "scroll_milestone", { depth: "50%" })`
   - Use IntersectionObserver on sentinel elements (not scroll listeners)
3. **Add contextual micro-CTAs between sections:**
   - After Services: "See how we built this for DCR Roofing →" (link to case study)
   - After HowWeWorkSection: "Calculate your potential savings →" (link to ROI calculator)

### Phase 5: Instagram Performance Fix (Day 6-7)
**Preconditions:** None (independent)
**Dependencies:** None

1. **Remove InstagramFeed from homepage** (Phase 3 already does this)
2. **On /reels page:** Convert InstagramFeed to use static image thumbnails:
   - Pre-fetch images at build time or use Supabase image URLs with `loading="lazy"`
   - Remove runtime Supabase query from component — pass data as props from page
   - Add `decoding="async"` and explicit width/height to prevent CLS
3. **Add "Follow @alphaspeedai" CTA card** at end of reels grid

### Phase 6: Social Landing Pages (Day 7-9)
**Preconditions:** Phase 2 (Hero pattern), Phase 4 (EmailCapture reuse)
**Dependencies:** Routing in App.tsx

1. **Create `/from/instagram` landing page:**
   - Short, focused: headline matching IG content style + 1 key value prop + CTA
   - Reuse CalendlyBooking + EmailCapture
   - Include relevant case study thumbnail
   - Track UTM source automatically
2. **Create `/from/linkedin` landing page:**
   - Professional tone, focus on ROI/business outcomes
   - Include stats, testimonial snippet, Calendly CTA
3. **Add routes to App.tsx** and prerender config
4. **Update social media bio links** to point to these pages instead of homepage

### Phase 7: ROI Calculator Expansion (Day 9-10)
**Preconditions:** None (independent)
**Dependencies:** None

1. Add 500+ words of supporting content:
   - "How We Calculate Your AI ROI" methodology section
   - 2-3 example scenarios with before/after numbers
   - FAQ section (3-5 questions) with FAQPage schema
2. Add schema markup (FAQPage, HowTo)
3. Add CTA after calculator results: "Want to see these savings for your business? [Book Consultation]"
4. Add meta description targeting "AI automation ROI calculator"

---

## 5. Testing Strategy

### Unit Tests Required
| Component | Test |
|-----------|------|
| `ExitIntentModal` | Fires on mouseleave, respects session flag, respects 15s delay, respects prior conversion |
| `StickyCtaBanner` | Shows after scroll threshold, hides when Contact visible, dismiss persists for session |
| `ScrollDepthTracker` | Fires events at correct thresholds, fires each only once |

### E2E / Visual Tests Required
| Scenario | Method |
|----------|--------|
| Homepage loads and hero is visible within 2s | Lighthouse CI (existing `npm run audit:seo`) |
| Pre-rendered HTML contains expected content markers | Build verification script in prerender plugin |
| All nav anchor links still work after section reorder | Manual smoke test across 3 themes |
| Social landing pages render with correct UTM-aware content | Manual test with URL params |
| Exit-intent modal appears on desktop mouse-leave | Manual test |
| Sticky CTA appears/disappears at correct scroll positions | Manual test across breakpoints |
| Mobile: no layout shift from sticky CTA | Chrome DevTools mobile emulation |

### Existing Tests to Update
| Test File | Update Needed |
|-----------|---------------|
| Homepage snapshot tests (if any) | Update for removed/reordered sections |
| Pre-render verification | Add content marker checks |
| Analytics event tests | Add new event types to expected set |

---

## 6. Open Questions / Risks

### Assumptions
1. **Pre-rendered HTML is being generated but not served correctly** — needs verification. If the prerender plugin itself is broken, Phase 1 scope increases.
2. **Supabase email_subscribers table schema unchanged** — reusing for exit-intent email capture
3. **GitHub Pages deployment** is the hosting platform — affects how pre-rendered HTML is served
4. **Google Business Profile does not exist** — SEO report says "not verified." This is outside codebase scope but critical for local SEO

### Unknowns
1. **Actual Core Web Vitals scores** — SEO audit couldn't measure (API quota). Need to run PageSpeed Insights manually to establish baseline before/after
2. **Why zero indexation despite pre-rendering?** Could be:
   - Pre-render output is empty (Puppeteer timing issue)
   - GitHub Pages SPA fallback overrides pre-rendered files
   - Google hasn't been asked to index (no GSC verification)
   - robots.txt or meta robots blocking (unlikely — robots.txt is permissive)
3. **Calendly conversion tracking accuracy** — the `react-calendly` widget fires events, but are they reaching GA4 correctly? Need to verify in GA4 DebugView

### Architectural Risks
| Risk | Severity | Mitigation |
|------|----------|------------|
| Section removal breaks deep links shared externally | Medium | Add redirect anchors or keep section IDs as invisible markers |
| Exit-intent popup perceived as spam | Medium | 15s delay + once-per-session + skip-if-converted rules |
| Sticky CTA conflicts with cookie consent banner | Low | Z-index management + hide sticky when consent banner visible |
| Pre-render content verification adds build time | Low | Only adds ~1s of string checking per route |
| Social landing pages increase maintenance surface | Low | Use shared layout components, minimal unique content |

### Out-of-Scope (Important but Not Code Changes)
- Google Search Console verification and sitemap submission
- Google Business Profile creation and optimization
- Blog content creation (infrastructure can be built, but content is a business decision)
- Link-building strategy (Clutch.co, Built In Dallas, etc.)
- Facebook/TikTok pixel activation (already wired in analytics.ts, just needs IDs configured)

---

## Estimated Effort by Phase

| Phase | Effort | Priority |
|-------|--------|----------|
| Phase 1: Pre-rendering Fix | 1-2 days | CRITICAL |
| Phase 2: Above-the-Fold | 1 day | CRITICAL |
| Phase 3: Homepage Triage | 2 days | HIGH |
| Phase 4: Exit-Intent & Engagement | 1-2 days | HIGH |
| Phase 5: Instagram Fix | 0.5 days | MEDIUM |
| Phase 6: Social Landing Pages | 2 days | HIGH |
| Phase 7: ROI Calculator | 1 day | MEDIUM |
| **Total** | **~10 days** | |

---

## Expected Impact

| Metric | Current | 30-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|
| Engagement rate | 36% | 50% | 60%+ |
| Avg engagement time | 17s | 35s | 60s+ |
| Google indexed pages | 0 | 9 | 15-20 |
| Organic Search sessions | 9/mo | 50/mo | 200/mo |
| Key events (conversions) | 0 | 5-10/mo | 20-30/mo |
| Organic Social engagement time | 1s | 15s | 30s+ |
