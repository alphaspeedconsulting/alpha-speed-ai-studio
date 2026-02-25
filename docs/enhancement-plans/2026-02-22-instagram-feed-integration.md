# Enhancement Plan: Instagram Feed Integration

**Created:** 2026-02-22
**Status:** Draft
**Author:** Claude
**Related Files:** `src/pages/Index.tsx`, `src/components/InstagramFeed.tsx` (new), `src/lib/constants.ts`, `package.json`, `index.html`

---

## Context

Alpha Speed AI Studio is a fully client-side React/Vite marketing site with **no backend** and **no existing API integrations**. The goal is to display Instagram content on the website to showcase the brand's social presence and keep the site feeling fresh with regularly updated content.

### Instagram API Landscape (2026)

- **Instagram Basic Display API was retired** on December 4, 2024
- The **Instagram Graph API** is now the only official API, requiring a Business/Creator account + Meta App with approved permissions
- Graph API requires **server-side token management** (access tokens must be refreshed and cannot be safely exposed client-side)

---

## 1. Enhancement Breakdown

### What is being added
A new **Instagram Feed section** on the homepage that displays recent posts from the Alpha Speed AI Instagram account (images, captions, links back to Instagram).

### Approach Options (Recommended: Option A)

#### Option A: Third-Party Widget Service (Behold.so) — RECOMMENDED
- No backend needed — runs entirely client-side via web component
- Managed token refresh, caching, and Instagram API auth handled by the service
- React-native component available (`@behold/widget`)
- Free tier: 1 feed, up to 15 posts
- Customization done via Behold dashboard (no code changes for style updates)

#### Option B: Serverless Proxy + Instagram Graph API (DIY)
- Create a Meta App, get Instagram Graph API access token
- Deploy a serverless function (Vercel/Netlify/Cloudflare Workers) to:
  - Store the long-lived access token securely
  - Refresh the token automatically (tokens expire every 60 days)
  - Proxy `/api/instagram` requests to the Graph API
- React component fetches from the proxy using TanStack React Query
- Full control over data, styling, and caching
- Requires ongoing maintenance of the serverless function and token lifecycle

#### Option C: Instagram oEmbed (Individual Posts Only)
- Embed specific posts using Instagram's oEmbed endpoint
- No feed auto-refresh — posts must be manually curated
- Good for showcasing specific highlight posts, not a live feed

### Services/components affected
- **Index.tsx** — Add new section to homepage layout
- **New: InstagramFeed.tsx** — New section component
- **constants.ts** — Configuration values (feed ID or API endpoint)
- **package.json** — New dependency (`@behold/widget` for Option A, or TanStack Query activation for Option B)
- **index.html** — Script tag if using Behold embedded widget approach

---

## 2. Reuse vs New Code Analysis

### Can be reused as-is
- **Section layout patterns** — All existing homepage sections follow a consistent structure (container, heading, grid/cards). The Instagram section will follow the same pattern
- **Tailwind theme system** — Existing CSS variables and theme support
- **TanStack React Query** — Already installed, unused. Perfect for Option B data fetching
- **Embla Carousel** — Already installed. Could be reused for a carousel-style feed display
- **shadcn/ui Card components** — For individual post cards

### Needs extension
- **constants.ts** — Add Instagram configuration (feed ID, section copy)
- **Index.tsx** — Import and place the new section component

### Net-new code
- **`src/components/InstagramFeed.tsx`** — New section component (~80-150 lines depending on approach)
- For Option B only: Serverless function file + deployment config

---

## 3. Workflow Impact Analysis

### Workflow steps affected
- **Homepage rendering** — New section added to the scroll flow
- **Build pipeline** — New dependency added to bundle

### State transitions / side effects
- **Option A (Behold):** External script loads asynchronously; no React state impact. Widget renders independently
- **Option B (Serverless):** Introduces async data fetching with loading/error states via React Query. Adds external network dependency at runtime

### Regression risk level
- **Option A: LOW** — Self-contained web component, no impact on existing components
- **Option B: MEDIUM** — Introduces server dependency, token expiration risk, and network error handling
- **Option C: LOW** — Static embeds, minimal risk

---

## 4. Implementation Order

### Phase 1: Prerequisites (Before any code)
1. **Convert Instagram account to Business/Creator account** (if not already)
2. **Choose approach** (A, B, or C) — Recommendation: **Option A (Behold.so)**
3. For Option A: Sign up at behold.so, connect Instagram account, create feed, get feed ID
4. For Option B: Register Meta App, complete app review, obtain long-lived access token

### Phase 2: Component Development
1. Create `src/components/InstagramFeed.tsx` section component
2. Add configuration to `src/lib/constants.ts`
3. Install dependency (`npm install @behold/widget` for Option A)

### Phase 3: Homepage Integration
1. Import and add `<InstagramFeed />` to `src/pages/Index.tsx`
2. Position in section order (recommended: after Portfolio, before About)

### Phase 4: Styling & Responsiveness
1. Style the feed section to match existing site design patterns
2. Ensure responsive grid (1 col mobile, 2-3 cols tablet, 4 cols desktop)
3. Add loading skeleton/placeholder while feed loads
4. Test across themes (dark, soft, corporate)

### Phase 5: Option B Only — Serverless Backend
1. Create serverless function for Instagram Graph API proxy
2. Implement token refresh logic
3. Deploy to hosting provider
4. Configure environment variables for token storage

---

## 5. Testing Strategy

### Unit tests required
- `InstagramFeed.tsx` renders without crashing
- Loading state displays correctly
- Error state displays fallback UI gracefully
- Feed configuration values are valid

### E2E / visual tests
- Section appears in correct homepage position
- Feed loads and displays posts on desktop and mobile
- Clicking a post opens Instagram in a new tab
- Section renders correctly across all 3 themes
- Graceful degradation if feed service is unavailable (no broken UI)

### Existing tests to update
- None — this is a new additive section with no impact on existing components

---

## 6. Open Questions / Risks

### Assumptions
- Alpha Speed AI has an Instagram account with content to display
- The account can be converted to Business/Creator (required for all approaches)
- A free tier service (Behold) is acceptable, or there is budget for a paid plan

### Unknowns
- **Instagram account type** — Is it currently Personal, Creator, or Business?
- **Content volume** — How many posts should be displayed? (Recommend 4-8)
- **Content filtering** — Should all posts be shown, or only specific ones (e.g., tagged/hashtagged)?
- **Update frequency** — How often should the feed refresh? (Behold: automatic; Option B: configurable)
- **Section placement** — Where exactly in the homepage flow should this appear?

### Architectural Risks
- **Option A:** Vendor dependency on Behold.so — if the service goes down or changes pricing, the feed breaks. Mitigation: Graceful fallback UI that hides the section or shows a "Follow us on Instagram" CTA instead
- **Option B:** Token expiration (60-day lifecycle) requires automated refresh. If refresh fails, feed goes dark. Mitigation: Monitoring + alerting on token health
- **Rate limiting** — Instagram Graph API has call limits. Not a concern for Option A (handled by vendor), but relevant for Option B with high traffic
- **Performance** — External widget/API adds to page load time. Mitigation: Lazy load the section (IntersectionObserver or React.lazy)

---

## Recommended Approach: Option A (Behold.so)

Given that the site is fully client-side with no backend infrastructure, **Option A (Behold.so)** is the strongest fit because:

1. **Zero backend required** — No serverless functions to deploy or maintain
2. **No token management** — Behold handles Instagram auth and token refresh
3. **React component available** — First-class `@behold/widget` package
4. **Free tier sufficient** — 1 feed with up to 15 posts covers the use case
5. **Minimal code** — ~50-80 lines for the section component
6. **Fast implementation** — Can be live in a single session

If full control over data and styling is needed later, the team can migrate to Option B (serverless proxy) without changing the component interface — just swap the data source.

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Prerequisites (account setup) | User action (15 min) |
| Phase 2: Component development | ~1 hour |
| Phase 3: Homepage integration | ~15 min |
| Phase 4: Styling & responsiveness | ~1 hour |
| **Total (Option A)** | **~2.5 hours + account setup** |
| Phase 5 (Option B only) | Additional ~3-4 hours |
