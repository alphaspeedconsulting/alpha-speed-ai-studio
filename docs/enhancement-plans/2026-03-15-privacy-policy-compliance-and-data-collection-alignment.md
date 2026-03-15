# Enhancement Plan: Privacy Policy Compliance & Data Collection Alignment

**Created:** 2026-03-15
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/TermsOfService.tsx`
- `src/lib/analytics.ts`
- `src/components/AnalyticsTracker.tsx`
- `src/lib/supabase.ts`
- `src/components/Contact.tsx`
- `src/components/Hero.tsx`
- `supabase/migrations/001_analytics_events.sql`
- `supabase/migrations/002_published_posts.sql`

---

## Executive Summary

A gap analysis between the live Privacy Policy and the actual data collection implementation reveals **5 critical gaps** and **3 medium-risk gaps**. The most urgent issue is the **absence of a cookie consent mechanism** — the site injects GA4, Meta Pixel, and TikTok Pixel on page load without user consent, which violates CCPA opt-out requirements and best-practice consent standards. Several data categories claimed in the Privacy Policy (IP address, device identifiers, OS version) are **not captured in the current analytics schema**, creating a mismatch that could expose the business to regulatory scrutiny.

---

## Gap Analysis: Privacy Policy vs. Actual Data Collection

### What the Policy Claims to Collect (but code does NOT capture)

| Claimed Category | Policy Section | Current Reality | Risk |
|-----------------|----------------|-----------------|------|
| IP addresses | "Usage data: log files, IP addresses" | Not stored in `analytics_events` schema | Medium — overstatement |
| Browser type / OS | "Usage data: browser type, OS" | Not in schema | Medium — overstatement |
| Device IDs / hardware model / OS version | "Device info" section | Not in schema | Medium — overstatement |
| Time spent on pages | "Usage data: time spent" | Not tracked in analytics.ts | Low |
| Account info (name, email, company, phone) | "Account information" section | No signup form on public site (may be AgentVault platform only) | Low — needs clarification |
| OAuth/SSO data (Google, GitHub) | "Third-Party Sources" | No OAuth flow on marketing site | Low — needs clarification |
| AgentVault agent configs / workflow runs | "Platform activity" | Relevant to AgentVault product, not marketing site | Low — scope clarification needed |

### What the Code DOES Collect (confirm it is documented in Policy)

| Mechanism | Data Captured | Documented in Policy? |
|-----------|--------------|----------------------|
| Supabase analytics_events | event type, path, UTM params, referrer, timestamp | ✅ Yes (usage data, marketing analytics) |
| Google Analytics 4 | page views, events, UTM, referrer (GA handles IP anonymization) | ✅ Yes |
| Meta Pixel | page views, events (optional) | ✅ Yes |
| TikTok Pixel | page views, events (optional) | ✅ Yes |
| localStorage cache (up to 5,000 events) | events before Supabase sync | ⚠️ Not explicitly mentioned |
| Scroll depth tracking | scroll depth percentage | ⚠️ Not explicitly mentioned |
| CTA click tracking with placement metadata | button clicks, placement labels | ✅ Covered under "Platform activity" |

### Critical Missing Implementation (Policy promises but code lacks)

| Policy Promise | Implementation Status | Risk |
|----------------|----------------------|------|
| Cookie consent / opt-out of marketing tracking | ❌ NO cookie banner exists — pixels fire immediately | **CRITICAL** |
| "Do Not Track honored where feasible" | ❌ No DNT check in analytics.ts | **High** |
| User rights portal (access/delete/opt-out) | ❌ Only email address provided — no automated mechanism | **High** |
| 90-day deletion after account closure | ❌ No automated retention enforcement | **Medium** |
| CCPA request submission flow | ❌ Manual email only — no structured intake | **Medium** |

---

## 1. Enhancement Breakdown

### Enhancement A: Cookie Consent Banner (CRITICAL)
**What:** Add a cookie consent component that fires before `initAnalytics()`. Visitors must accept or decline marketing/analytics cookies. Essential cookies (session auth) always allowed.

**Affected:**
- New component: `src/components/CookieConsent.tsx`
- `src/lib/analytics.ts` — guard `initAnalytics()` and pixel injection behind consent flag
- `src/App.tsx` or root layout — mount `CookieConsent` component
- `localStorage` — persist consent decision as `alpha_cookie_consent_v1`

---

### Enhancement B: Do Not Track (DNT) Signal Handling
**What:** Read `navigator.doNotTrack` before initializing third-party pixels. If DNT=1, skip Meta Pixel and TikTok Pixel injection. GA4 is optional too (or use GA4's IP anonymization + no-personalization mode).

**Affected:**
- `src/lib/analytics.ts` — add DNT guard in `initAnalytics()`

---

### Enhancement C: Fix Privacy Policy Data Inventory Accuracy
**What:** Audit and correct the Privacy Policy to match actual data collection. Either (a) remove claims about data not collected (IP, device IDs, OS), or (b) add the collection mechanisms to the schema. Recommended: remove overstatements — less data collection = less liability.

**Sub-decisions:**
- Remove IP address claim OR add IP capture to Supabase schema (with anonymization)
- Remove "browser type / OS version / device IDs" OR add to schema
- Remove "time spent" OR implement dwell-time tracking
- Clarify that "account information" and "AgentVault platform activity" apply to the SaaS product, not the marketing website
- Add localStorage caching disclosure
- Add scroll depth tracking disclosure

**Affected:**
- `src/pages/PrivacyPolicy.tsx` — content edits only

---

### Enhancement D: Analytics Schema — Add Missing Declared Fields (Optional)
**What:** If decision in Enhancement C is to *add* rather than *remove*, extend `analytics_events` schema.

Fields to add (if collecting):
- `ip_address` (TEXT, anonymized to /24 CIDR — e.g. "192.168.1.0")
- `user_agent` (TEXT)
- `session_duration_seconds` (INTEGER)

**Affected:**
- New migration: `supabase/migrations/003_analytics_schema_extensions.sql`
- `src/lib/analytics.ts` — capture and send new fields

> **Recommendation:** Option A (remove overstatements from policy) is lower-risk and requires less engineering.

---

### Enhancement E: User Rights / CCPA Self-Service Portal
**What:** Add a minimal data rights request form that submits structured intake requests. Captures: name, email, request type (access / delete / correct / opt-out), and timestamp. Stores to Supabase table `privacy_requests` and sends notification email.

**Affected:**
- New page: `src/pages/PrivacyRequest.tsx`
- New migration: `supabase/migrations/004_privacy_requests.sql`
- `src/pages/PrivacyPolicy.tsx` — link to new form instead of raw email

---

### Enhancement F: Automated Data Retention Enforcement
**What:** Implement a Supabase scheduled function (pg_cron or Edge Function on schedule) that deletes `analytics_events` older than 90 days. Aligns with "deleted/anonymized within 90 days" policy claim.

**Affected:**
- New migration: `supabase/migrations/005_data_retention_policy.sql` (pg_cron job)
- Or new Edge Function: `supabase/functions/data-retention/`

---

### Enhancement G: Terms of Service — Minor Accuracy Updates
**What:** Verify ToS references match current service state. Specific items to audit:
- "AI outputs must be reviewed before reliance" — ensure this is prominent, not buried
- Payment/billing section accuracy
- Third-party platform integrations list — ensure all current integrations are covered

**Affected:**
- `src/pages/TermsOfService.tsx` — content edits

---

## 2. Reuse vs. New Code Analysis

| Component | Reuse | Extend | Net-New |
|-----------|-------|--------|---------|
| `analytics.ts` — DNT guard | — | ✅ Add 5 lines | — |
| `analytics.ts` — consent gate | — | ✅ Wrap `initAnalytics` | — |
| `PrivacyPolicy.tsx` | ✅ Content edits only | — | — |
| `TermsOfService.tsx` | ✅ Content edits only | — | — |
| Cookie consent banner | — | — | ✅ New component |
| Privacy request form | — | — | ✅ New page + route |
| Supabase migrations | ✅ Follow existing pattern | — | ✅ 2-3 new files |
| Supabase Edge Function (retention) | — | — | ✅ New function |
| App.tsx / router | ✅ Existing router | ✅ Add route for `/privacy-request` | — |

---

## 3. Workflow Impact Analysis

### Analytics Initialization Flow

**Current:**
```
App loads → initAnalytics() → inject GA4 + Meta + TikTok → AnalyticsTracker fires page_view
```

**Proposed (after Enhancement A + B):**
```
App loads → check localStorage consent → if no consent: show CookieConsent banner
                                        → if consent=accepted: run DNT check → initAnalytics()
                                        → if consent=declined: skip pixels, skip Supabase events
AnalyticsTracker fires page_view → guarded behind consent flag
```

**State transitions introduced:**
- `consent: null | 'accepted' | 'declined'` — read from localStorage at startup
- Banner UI state: visible/hidden

**Regression risk: Medium** — existing analytics events will stop firing until user accepts consent. This is intentional and correct behavior. Plan for a brief metrics gap during rollout.

### Page Navigation / Routing
- Add `/privacy-request` route to router
- ToS and Privacy Policy pages: content-only edits, no routing changes

**Regression risk: Low**

### Supabase Schema
- New tables: `privacy_requests` (insert-only for anonymous users)
- New pg_cron job: runs daily, deletes rows older than 90 days from `analytics_events`
- Existing tables and RLS unchanged

**Regression risk: Low** (additive migrations only)

---

## 4. Implementation Order

### Phase 1 — Privacy Policy Accuracy (No code risk, immediate)
**Precondition:** None
**Steps:**
1. Edit `PrivacyPolicy.tsx` to remove data categories not actually collected (IP, device IDs, OS version, browser type) OR scope them clearly to the AgentVault platform (not the marketing site).
2. Add disclosure for localStorage caching.
3. Add disclosure for scroll depth tracking.
4. Replace raw email with link to upcoming `/privacy-request` page (can be a placeholder initially).
5. Audit ToS for accuracy (`TermsOfService.tsx`).

---

### Phase 2 — Cookie Consent + DNT (Frontend, isolated)
**Precondition:** Phase 1 complete (policy should reflect consent controls before UI ships)
**Steps:**
1. Add `CONSENT_KEY = 'alpha_cookie_consent_v1'` to `analytics.ts`.
2. Add `getConsent()` / `setConsent()` helpers.
3. Add DNT detection guard in `initAnalytics()`.
4. Gate `initAnalytics()` call behind consent check in `App.tsx`.
5. Build `CookieConsent.tsx` component (minimal: "We use cookies for analytics. [Accept] [Decline] [Learn More]").
6. Mount `CookieConsent` in root layout — renders only when consent is null.
7. Test: accept flow → pixels fire. Decline flow → no pixels, no Supabase events. DNT=1 → no third-party pixels.

---

### Phase 3 — User Rights Form (Supabase + new page)
**Precondition:** Phase 1 complete (policy links to form)
**Steps:**
1. Create Supabase migration `004_privacy_requests.sql`:
   - Table: `privacy_requests (id, created_at, name, email, request_type, details, status)`
   - RLS: anon INSERT only; service role SELECT/UPDATE for admin review
2. Build `src/pages/PrivacyRequest.tsx` with form fields.
3. Add route `/privacy-request` to router.
4. Add success state: "We received your request. Response within 45 days."
5. Update `PrivacyPolicy.tsx` to link to `/privacy-request`.

---

### Phase 4 — Data Retention Automation (Supabase backend)
**Precondition:** Phase 3 complete (privacy_requests table exists)
**Steps:**
1. Create migration `005_data_retention_policy.sql` using `pg_cron`:
   ```sql
   SELECT cron.schedule('0 3 * * *', $$ DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days'; $$);
   ```
2. Verify pg_cron is enabled on Supabase project.
3. Document in Privacy Policy that automated retention runs daily.

---

## 5. Testing Strategy

### Unit Tests (Manual / Component Level)

| Test | File | What to Verify |
|------|------|----------------|
| Consent gate | `analytics.ts` | `initAnalytics()` does NOT fire when consent=null or declined |
| DNT guard | `analytics.ts` | Pixels NOT injected when `navigator.doNotTrack === "1"` |
| Consent persistence | `analytics.ts` | `setConsent('accepted')` persists to localStorage; reload resumes analytics |
| CookieConsent display | `CookieConsent.tsx` | Banner renders when consent=null; hidden after accept/decline |
| Privacy request form | `PrivacyRequest.tsx` | Form validates required fields; submits to Supabase; shows success state |

### Integration Tests

| Test | What to Verify |
|------|----------------|
| Supabase `privacy_requests` RLS | Anon can INSERT; cannot SELECT |
| Supabase `analytics_events` retention | Rows with `created_at < 90 days` are deleted by cron |
| Analytics flow end-to-end | Accept consent → events appear in Supabase; Decline → no events |

### Existing Tests to Update
- None known (no existing test suite found in `src/`) — add new test files as tests are written.

### Manual QA Checklist
- [ ] Visit site in fresh incognito window → consent banner appears
- [ ] Decline → open DevTools → confirm no GA4/Meta/TikTok network calls
- [ ] Accept → confirm GA4 fires `page_view` in network tab
- [ ] Set `navigator.doNotTrack = "1"` in browser → confirm third-party pixels not injected
- [ ] Submit privacy request form → confirm row appears in Supabase `privacy_requests`
- [ ] Verify Privacy Policy page accurately reflects data collected (no phantom categories)

---

## 6. Open Questions / Risks

### Questions

1. **AgentVault vs. Marketing Site scope**: The Privacy Policy and ToS cover both the marketing website AND the AgentVault SaaS platform. Should these be split into two separate policies, or kept unified? A unified policy is simpler but harder to keep accurate as one product is a static marketing site and the other is a full SaaS platform.

2. **IP address collection**: Does GA4 collect IPs on your behalf? GA4 does anonymize IPs by default, but Google still processes them. Should the policy reference "IP anonymization via Google Analytics" rather than claiming you directly store IPs?

3. **User accounts on marketing site**: The Privacy Policy references account registration, but there is no signup form on the marketing site. Is account creation handled only within the AgentVault platform (separate app)? If so, scope the privacy policy sections accordingly.

4. **Meta Pixel and TikTok Pixel status**: Are these pixels currently active in production (env vars set)? If not currently configured, the policy references to them may be pre-emptive — confirm production state.

5. **GDPR applicability**: The policy covers CCPA but not GDPR. If any EU visitors use the site or purchase services, GDPR compliance (legal basis for processing, right to be forgotten, DPA obligations) may apply. Out of scope for this plan but worth noting.

6. **Supabase pg_cron availability**: pg_cron is available on Supabase Pro plans. Confirm the project plan before implementing Phase 4. Alternative: Supabase Edge Functions with a cron schedule.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Analytics gap after consent rollout | High | Low | Expected — document for stakeholders; first-party Supabase data resumes for consenting users |
| pg_cron not available on current Supabase plan | Medium | Low | Use Edge Function with schedule as fallback |
| Privacy Policy edits create new legal exposure | Low | Medium | Have a lawyer review final policy text before publishing |
| Phase 2 breaks existing AnalyticsTracker behavior | Medium | Medium | Gate consent check carefully; test in staging before production |

### Assumptions
- Supabase project has RLS enabled (confirmed from migration review)
- The marketing site has no existing backend session/auth for visitors (no account portal on public site)
- Meta Pixel and TikTok Pixel are optional/conditional (confirmed: injected only when env vars present)
- No existing test suite exists for the frontend (confirmed: no `*.test.ts` files found in `src/`)

---

## Effort Estimate

| Phase | Effort | Risk |
|-------|--------|------|
| Phase 1: Policy accuracy edits | 2–3 hours | Low |
| Phase 2: Cookie consent + DNT | 4–6 hours | Medium |
| Phase 3: User rights form | 3–4 hours | Low |
| Phase 4: Data retention automation | 1–2 hours | Low |
| **Total** | **10–15 hours** | **Medium overall** |

---

## Priority Order (Recommended)

1. **Phase 1** — Immediate: fix policy accuracy before any marketing pushes
2. **Phase 2** — High priority: consent banner is the biggest compliance gap
3. **Phase 3** — Medium priority: user rights form formalizes CCPA self-service
4. **Phase 4** — Low priority: retention automation is a "nice to have" in the near-term (manual deletion is acceptable short-term)
