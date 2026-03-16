# Enhancement Plan: GA4 Conversion Tracking & Engagement Optimization

**Created:** 2026-03-16
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/lib/analytics.ts` — extend with GA4 Key Event marking + new event types
- `src/components/Hero.tsx` — CTA restructure, Calendly embed
- `src/components/Contact.tsx` — replace mailto with embedded booking + email capture
- `src/pages/Index.tsx` — add email capture section, improve `/agents` linking
- `src/components/Header.tsx` — update nav CTA to Calendly
- `src/pages/AgentRoster.tsx` — add CTA, improve discoverability
- `index.html` — LinkedIn Insight Tag script
- `.env.example` — add `VITE_LINKEDIN_PARTNER_ID`

---

## Context & Problem Statement

GA4 data (Feb 16 – Mar 15, 2026) reveals three critical issues:

1. **Zero conversions tracked** — `trackLead()` and `trackEvent()` fire to Supabase and GA4 `dataLayer`, but none are marked as GA4 **Key Events**. GA4 shows 0 conversions because the events are not promoted to Key Events in the GA4 admin console, and the event names may not match GA4's recommended event taxonomy.
2. **4.9% return rate** — no re-engagement mechanism (email capture) exists on the site.
3. **Organic Social 0s engagement** — social traffic bounces immediately; the homepage hero doesn't match social content expectations.
4. **`/agents` page invisible** — 1 session in 28 days; no homepage linking.

The existing analytics infrastructure (`src/lib/analytics.ts`) is well-built with `trackEvent()`, `trackLead()`, UTM capture, consent gating, and Supabase persistence. The gap is primarily in (a) GA4 Key Event configuration, (b) conversion-generating UI elements, and (c) channel-specific landing alignment.

---

## 1. Enhancement Breakdown

### Phase 1 — GA4 Key Event Alignment (Code + Config)

**What:** Align event names with GA4 recommended events, add `send_to` parameter for GA4 Key Event eligibility, and document the GA4 Admin steps needed to mark events as Key Events.

**Changes to `src/lib/analytics.ts`:**
- Rename `lead_event` type to `generate_lead` (GA4 recommended event name)
- Add `form_submit` event type for form completions
- Add `schedule_appointment` event type for booking confirmations
- Add `sign_up` event type for email capture
- Ensure all conversion-relevant events push to `dataLayer` with the correct GA4 event name format
- Add a `trackConversion()` wrapper that fires both `gtag('event', ...)` and the existing Supabase + pixel pipelines

**GA4 Admin Config (documented, not code):**
- Mark `generate_lead`, `form_submit`, `schedule_appointment`, `sign_up` as Key Events in GA4 Admin → Events → Toggle "Mark as key event"

**Affected:** `src/lib/analytics.ts`
**Regression Risk:** Low — additive changes, existing event names still fire alongside new ones

---

### Phase 2 — Calendly Integration (Replace mailto CTAs)

**What:** Replace all `mailto:` CTAs with Calendly inline embed or popup. This creates a trackable conversion event when a booking is confirmed.

**Changes:**
- Add `react-calendly` package (or use Calendly's embed script directly)
- `src/components/Hero.tsx` — "Book a Free Strategy Call" opens Calendly popup instead of mailto
- `src/components/Contact.tsx` — replace mailto link with embedded Calendly inline widget
- `src/components/Header.tsx` — "Get Started" button opens Calendly popup
- Add Calendly confirmation callback → fires `trackConversion('schedule_appointment', { placement })`

**New Component:** `src/components/CalendlyBooking.tsx` — reusable wrapper around Calendly embed with analytics hooks

**Affected:** `Hero.tsx`, `Contact.tsx`, `Header.tsx`, `analytics.ts`
**Regression Risk:** Low — replaces static mailto links with interactive widget; existing analytics calls preserved

---

### Phase 3 — Email Capture Form

**What:** Add an email capture section to the homepage for re-engagement (newsletter, early access, free resource). Solves the 4.9% return rate problem.

**Changes:**
- New component: `src/components/EmailCapture.tsx`
  - Single email input + CTA button ("Get AI Automation Tips" or similar)
  - Validates with Zod (reuse existing `react-hook-form` + `zod` deps)
  - On submit: POST to Supabase `email_subscribers` table (new table)
  - Fires `trackConversion('sign_up', { method: 'email_capture', placement })`
  - Success state: "You're in!" confirmation message
- `src/pages/Index.tsx` — insert `<EmailCapture />` between existing sections (after `HowWeWorkSection`, before `PortfolioSection` — natural break point)
- Supabase: create `email_subscribers` table (email, source, utm_params, created_at)

**Reuse:** `react-hook-form`, `zod`, shadcn `Input`/`Button`/`Card`, `trackConversion()` from Phase 1, Supabase client from `src/lib/supabase.ts`
**Net-new:** `EmailCapture.tsx` component, Supabase table
**Regression Risk:** Low — additive section, no existing code modified

---

### Phase 4 — Homepage `/agents` Visibility

**What:** Add prominent link to `/agents` from the homepage hero or services section. Currently 99% of visitors never see it.

**Changes:**
- `src/components/Hero.tsx` — add tertiary CTA or badge link: "Meet Our AI Agents →" linking to `/agents`
- `src/pages/Index.tsx` — in `AgentsAsServiceSection`, ensure there's a clear "View Full Agent Roster →" link to `/agents`
- `src/pages/AgentRoster.tsx` — add a CTA at the bottom ("Ready to put these agents to work? Book a call") with Calendly popup from Phase 2

**Reuse:** Existing `AgentsAsServiceSection` component, `CalendlyBooking` from Phase 2
**Regression Risk:** Low — additive UI changes only

---

### Phase 5 — LinkedIn Insight Tag

**What:** Install LinkedIn Insight Tag for retargeting and conversion tracking from LinkedIn traffic. The GA analysis shows social traffic bounces at 0s engagement — retargeting can bring those visitors back.

**Changes:**
- `src/lib/analytics.ts` — add `injectLinkedInInsightTag(partnerId)` function following the same pattern as existing `injectMetaPixelScript()` and `injectTikTokPixelScript()`
- Gate behind cookie consent (same as Meta/TikTok pixels)
- Respect DNT setting (same as existing pixels)
- `src/main.tsx` — call `injectLinkedInInsightTag()` in the analytics init block
- `.env.example` — add `VITE_LINKEDIN_PARTNER_ID`

**Reuse:** Exact same pattern as `injectMetaPixelScript()` in `analytics.ts`
**Net-new:** ~20 lines in `analytics.ts`
**Regression Risk:** Low — optional pixel, consent-gated, follows existing pattern

---

### Phase 6 — Social Landing Page Alignment (Optional Dedicated Page)

**What:** Address the 0s engagement from Organic Social. Two options:

**Option A (Recommended — minimal):** Adjust the homepage hero to be more dynamic. Add a UTM-aware hero variant: when `?utm_source=linkedin` or `utm_source=instagram` is detected, show a hero message that matches social post copy (e.g., "See why DFW businesses are automating with AI agents" instead of the generic headline).

**Option B (Larger scope):** Create a dedicated `/lp/social` landing page with tailored messaging per campaign. This is heavier and should only be pursued if Option A doesn't improve engagement.

**Changes for Option A:**
- `src/components/Hero.tsx` — read UTM params from URL, conditionally render alternate headline/subheadline for social traffic
- UTM params already captured by `analytics.ts` — just need to expose them to the Hero component

**Reuse:** UTM extraction logic already in `analytics.ts`
**Net-new:** ~15 lines conditional rendering in `Hero.tsx`
**Regression Risk:** Low — default hero unchanged, variant only shows with UTM params

---

## 2. Reuse vs New Code Analysis

| Item | Status | Notes |
|------|--------|-------|
| `trackEvent()` / `trackLead()` | **Reuse** | Extend with `trackConversion()` wrapper |
| GA4 dataLayer push | **Reuse** | Already implemented in `sendToGA()` |
| Meta Pixel injection pattern | **Reuse** | Clone for LinkedIn Insight Tag |
| Cookie consent gating | **Reuse** | All new tracking gates behind existing consent |
| Supabase client | **Reuse** | For email_subscribers table |
| `react-hook-form` + `zod` | **Reuse** | For EmailCapture form |
| shadcn/ui components | **Reuse** | Input, Button, Card, Dialog for all new UI |
| UTM extraction | **Reuse** | Already in analytics.ts, expose for Hero variant |
| `CalendlyBooking.tsx` | **New** | ~60 lines, reusable across 3 placements |
| `EmailCapture.tsx` | **New** | ~80 lines, single placement |
| `trackConversion()` | **New** | ~15 lines wrapper in analytics.ts |
| LinkedIn Insight Tag | **New** | ~20 lines following Meta Pixel pattern |
| Supabase `email_subscribers` table | **New** | Schema + RLS policy |

**Ratio:** ~80% reuse, ~20% new code. No architectural changes.

---

## 3. Workflow Impact Analysis

### Workflow Steps Affected
- **Analytics pipeline:** New event types added (`generate_lead`, `schedule_appointment`, `sign_up`). Existing events unchanged.
- **Supabase writes:** New table `email_subscribers`. Existing `analytics_events` table gets new event types but schema unchanged.
- **Build pipeline:** No changes. No new routes (except possibly `/lp/social` in Phase 6 Option B, which is deferred).

### State Transitions
- Cookie consent flow: unchanged — all new tracking respects existing consent gate
- Navigation flow: Calendly popup overlays current page (no route change)
- Form submission: EmailCapture submits to Supabase, shows success state inline

### Regression Risk

| Phase | Risk | Reason |
|-------|------|--------|
| 1 — GA4 Key Events | Low | Additive event names, existing events still fire |
| 2 — Calendly | Low | Replaces static mailto links, no logic dependencies |
| 3 — Email Capture | Low | New section inserted between existing ones |
| 4 — /agents visibility | Low | Additive links and CTAs |
| 5 — LinkedIn Tag | Low | Follows proven pixel injection pattern |
| 6 — Social hero variant | Low | Default hero unchanged, variant behind UTM condition |

**Overall regression risk: Low.** All changes are additive. No existing functionality removed or refactored.

---

## 4. Implementation Order

```
Phase 1: GA4 Key Event Alignment
  ├── No dependencies
  └── Foundation for measuring all subsequent phases

Phase 2: Calendly Integration
  ├── Depends on: Phase 1 (trackConversion)
  └── Highest conversion impact — replaces dead mailto links

Phase 3: Email Capture Form
  ├── Depends on: Phase 1 (trackConversion)
  ├── Requires: Supabase table created first
  └── Solves retention problem

Phase 4: /agents Visibility
  ├── Depends on: Phase 2 (CalendlyBooking for AgentRoster CTA)
  └── Quick win, small scope

Phase 5: LinkedIn Insight Tag
  ├── No code dependencies
  ├── Requires: LinkedIn Campaign Manager account + Partner ID
  └── Can run in parallel with Phases 2-4

Phase 6: Social Hero Variant
  ├── No code dependencies
  ├── Should be done AFTER UTM tags are deployed on social posts
  └── Lowest priority — impact depends on UTM adoption
```

**Recommended execution:** Phases 1 → 2 → 3 (sequential), then Phase 4 + 5 (parallel), then Phase 6 after UTM deployment is confirmed.

---

## 5. Testing Strategy

### Unit Tests
- `analytics.ts` — test `trackConversion()` fires to GA4 dataLayer, Supabase, and pixel pipelines
- `analytics.ts` — test LinkedIn Insight Tag injection respects consent + DNT
- `EmailCapture.tsx` — test form validation (empty, invalid email, valid email)
- `EmailCapture.tsx` — test successful submission fires `trackConversion('sign_up')`
- `CalendlyBooking.tsx` — test popup opens, test confirmation callback fires analytics
- `Hero.tsx` — test UTM-aware variant renders correct headline when `?utm_source=linkedin` present
- `Hero.tsx` — test default hero renders when no UTM params

### E2E / Integration Tests
- Full homepage load → verify GA4 events fire for page_view (existing test, verify not broken)
- Click "Book a Free Strategy Call" → verify Calendly popup opens (not mailto)
- Submit email capture → verify Supabase `email_subscribers` insert
- Visit `/?utm_source=linkedin` → verify social-specific hero variant renders
- Navigate from homepage to `/agents` → verify link exists and works

### Existing Tests to Update
- Any tests mocking `trackLead()` or `trackEvent()` should also verify `trackConversion()` for conversion-type events
- Snapshot tests for `Hero.tsx`, `Contact.tsx`, `Header.tsx` will need updating after CTA changes

---

## 6. Open Questions / Risks

### Assumptions
- **Calendly account exists or will be created.** If a different booking tool is preferred (Cal.com, Acuity), the `CalendlyBooking` component needs adjustment. Recommend confirming tool choice before Phase 2.
- **Supabase project has capacity** for new `email_subscribers` table and RLS policies.
- **GA4 property admin access is available** to mark events as Key Events in the GA4 console. This is a manual step, not automatable via code.

### Unknowns
- **Which social platforms are active?** The UTM hero variant (Phase 6) needs to know which `utm_source` values to support (linkedin, instagram, facebook, twitter, etc.).
- **Email provider integration?** The `email_subscribers` table captures emails but doesn't integrate with an email marketing tool (Mailchimp, ConvertKit, Resend). This should be planned as a follow-up if email nurture campaigns are a goal.
- **Calendly event type URL?** The embed requires a specific Calendly event URL (e.g., `calendly.com/alphaspeedai/30min`). Need this before implementing.

### Architectural Risks
- **None significant.** All changes are additive, follow existing patterns, and don't modify core architecture.
- **Minor risk:** If Calendly's embed script is heavy, it could impact page load time. Mitigate by lazy-loading the Calendly script only when the popup is triggered (not on page load).

### Non-Code Actions Required (Outside This Plan)
These are critical but cannot be implemented via code changes:

1. **GA4 Admin:** Mark `generate_lead`, `schedule_appointment`, `sign_up`, `form_submit` as Key Events
2. **UTM Discipline:** Add `?utm_source=...&utm_medium=...&utm_campaign=...` to every social post, email, and bio link
3. **LinkedIn Campaign Manager:** Create account, get Partner ID for Insight Tag
4. **Calendly Setup:** Create account, configure event type, get embed URL
5. **Monthly GA4 Report:** Set up automated export or dashboard for month-over-month tracking
