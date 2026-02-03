# Enhancement Plan: αlphaspeed AI Marketing Site (PRD-Aligned)

**Created:** 2026-02-02  
**Status:** Draft  
**Author:** Claude  
**Related Files:**
- `src/pages/Index.tsx`, `src/App.tsx`
- `src/components/Header.tsx`, `Hero.tsx`, `Footer.tsx`, `Services.tsx`, `About.tsx`, `Contact.tsx`
- `src/pages/Assistant.tsx`, `src/components/assistant/*`
- `vite.config.ts`, `index.html`
- PRD: `/Users/miguelfranco/Alpha AI Website/alpha-speed-ai-studio/prd.md`

---

> **Note:** No `.cursorrules` or project-specific rules file detected in the repo. Plan follows PRD constraints and existing codebase patterns.

> **Current State:** `vite.config.ts` does not have base path configured. `App.tsx` uses `BrowserRouter` without `basename` prop. Phase 1 will add these configurations.

---

## 1. Enhancement Breakdown

For each PRD-driven request, what is being added or changed, which components/pages are affected, and why this approach was chosen.

| Request | What Changes | Affected Areas | Justification |
|--------|--------------|----------------|---------------|
| **FR-1: Existing style only** | No new design system; extend `index.css`, Tailwind, shadcn only. | Global: `src/index.css`, `tailwind.config.ts`, all section components. | PRD mandates “extend existing only”; avoids drift and maintenance of a second theme. |
| **FR-2: Roofing-chatbot & platform benefits** | New “Why αlphaspeed AI” / “Platform” section: flexibility, ease of automation, AI-powered workflows; optional “Built for flexibility” subsection. | New section component; `Index.tsx` composition. | Dedicated section gives benefits clear placement (Hero subhead/badge + body) per PRD 4.1. |
| **FR-3: AI ops platform as backbone** | Same or extended Platform section: unified agents (14+8), single control plane, deployment (Render, Mac Mini), simple diagram/list (“One platform – PRD, architecture, lead qualification, WhatsApp, dashboard”). | New/combined Platform section. | Single “Platform” section satisfies “How it works” and keeps technical depth in one place. |
| **FR-4: Use cases (3–5)** | New “Use cases” or “What you can automate” section: 3–5 cards (lead follow-up, scheduling, 24/7 chat, estimates/intake, reporting) in plain language. | New `UseCasesSection` (or similar); `Index.tsx`. | Cards match PRD “short scenarios and one-line outcomes” and NFR plain language. |
| **FR-5: Assistant / chat** | Prominent CTA “Try the assistant” in Header/Hero; keep `/assistant` and existing layouts (A/B/C); optional intro copy on Assistant page. | `Header.tsx`, `Hero.tsx`, `Assistant.tsx`, `Index.tsx`. | Reuse existing route and layouts; CTAs drive traffic without new backend (PRD: no backend for marketing site). |
| **FR-6: Workflow examples (2–4)** | New “Workflow examples” or “How automation works” section: 2–4 visual flows (e.g. roofing lead flow, estimate request, appointment confirmation) as steps/diagrams/cards; optional “See demo” link. | New `WorkflowExamplesSection`; `Index.tsx`. | Visual section meets “visually appealing, easy-to-understand” and supports trust (US-4). |
| **FR-7: Demo videos** | New “See it in action” / “Demos” section: at least one embedded/linked video (e.g. YouTube/Vimeo), responsive player, captions preferred. | New `DemoVideosSection`; `Index.tsx`. | Dedicated section satisfies “at least one demo video” and optional Hero/workflow clip. |
| **FR-8: Header CTAs** | Header: “Try the assistant,” “Get started,” “View demos” (or equivalent). | `Header.tsx`. | Clear CTAs in one place; reuse existing Header structure and nav pattern. |
| **FR-9: Footer links** | Footer: Services, About, Contact, optional Privacy. | `Footer.tsx`. | Already has these; ensure anchors/links match section ids and add Privacy if required. |
| **FR-10: Content editable (P2)** | Copy/media in components or CMS-ready structure (e.g. constants, props, or later CMS). | Section components; optional `src/content/` or config. | Keeps content out of design system so marketing can change copy without touching layout code. |
| **FR-11: GitHub Pages + base path** | Static build; configurable `base` (e.g. `/repo-name/`); React Router `basename`. | `vite.config.ts`, `App.tsx` (or router setup), `index.html` if needed. | Required for project-site URLs; single place for base path avoids broken assets and routes. |
| **FR-12 / Phase 2: Custom domain** | Plan only: GitHub Pages custom domain + DNS + HTTPS. | Docs / runbook; no code in Phase 1. | PRD Phase 2; no implementation in this plan. |

**Summary of net-new sections on Home:**  
(1) Platform / Why αlphaspeed AI, (2) Use cases, (3) Workflow examples, (4) Demo videos — plus Header/Footer and Assistant refinements.

---

## 2. Reuse vs New Code Analysis

| Item | Reuse | Extend | New | Justification |
|------|--------|--------|-----|----------------|
| **Theme / design** | `index.css`, `tailwind.config.ts`, `components/ui/*` | — | — | Use as-is; no new design system. |
| **Layout / routing** | `App.tsx`, `Index.tsx`, `NotFound.tsx` | `Index.tsx` (add sections) | — | Add sections to existing home page. |
| **Header** | Structure, logo, mobile menu | Nav items + CTAs (“Try the assistant,” “View demos”) | — | Extend nav config and buttons. |
| **Hero** | Gradient, grid, badge, buttons | Copy + primary CTA (e.g. Try assistant / Schedule) | — | Keep one Hero; adjust copy and CTA. |
| **Footer** | Layout, logo | Link list (Privacy if needed) | — | Minor copy/link updates. |
| **Services, About, Contact** | As-is | Optional copy tweaks for “platform” messaging | — | Reuse; no structural change. |
| **Assistant page** | Route, Layouts A/B/C | Intro copy, optional default layout | — | No new route; improve discoverability from home. |
| **Platform section** | Card, Badge, typography from existing | — | New section component | No existing “Platform” block; one new section. |
| **Use cases section** | Card, grid from Services/About | — | New section component | Content and structure are new; reuse Card/grid patterns. |
| **Workflow examples** | Card, Tabs or Stepper, icons | — | New section component | New content and visual pattern (steps/diagrams); reuse UI primitives. |
| **Demo videos** | — | — | New section component | No current video block; use iframe/embed or link list. |
| **Base path / SPA** | Vite, React Router | `vite.config.ts` base; Router `basename` | Optional `404.html` for GH Pages | New config only; 404 handling only if GH Pages requires it. |
| **Content/copy** | — | — | Optional `src/content/*` or constants | New only if we want CMS-ready structure (P2); else copy inside components. |

**Justification for new code:**  
Four new section components (Platform, UseCases, WorkflowExamples, DemoVideos) are necessary because the current home page has Hero, Services, About, Contact only. Reuse is maximized at the level of shadcn components, CSS classes, and page layout; no new design system or new routes beyond existing `/` and `/assistant`.

---

## 3. Workflow Impact Analysis

- **User flows:** Visit home → scroll sections → click “Try the assistant” → `/assistant`; or click “View demos” → scroll to demo section. No backend or auth.
- **Workflow steps affected:** None (no workflow engine in this repo). “Workflow” here means page composition and navigation.
- **State transitions / side effects:** None beyond client-side routing and scroll. Optional: analytics or mailto for Contact (already out of scope for backend).
- **Regression risk:** **Low** for content/section adds; **Low–Medium** for base path (wrong base breaks assets/routes on GitHub Pages).
- **Mitigation:**  
  - Keep existing sections and routes unchanged; add new sections as siblings.  
  - Test build with `base: '/alpha-speed-ai-studio/'` (or actual repo name) and verify assets and `/assistant` deep link.  
  - Smoke test Header/Footer links and Assistant entry from home.

---

## 4. Implementation Phases

### Phase 1: Preparation — Pages, Sections, and Config (1–2 days)

**Tasks:**
- **Base path configuration:**
  - Add `base` to `vite.config.ts`: `base: process.env.NODE_ENV === 'production' ? '/alpha-speed-ai-studio/' : '/'`
  - Set `basename` prop on `BrowserRouter` in `App.tsx`: `<BrowserRouter basename={import.meta.env.BASE_URL}>`
  - Verify vite injects `BASE_URL` correctly in production builds
- Ensure `index.html` and asset paths work with base (Vite handles this automatically with proper base config).
- Create placeholder section components in `src/components/`:
  - `PlatformSection.tsx` - "Why αlphaspeed AI" / platform benefits
  - `UseCasesSection.tsx` - 3-5 use case cards
  - `WorkflowExamplesSection.tsx` - 2-4 visual workflow examples
  - `DemoVideosSection.tsx` - embedded video section
- Compose new sections in `Index.tsx` in order: Hero → Platform → Use cases → Workflow examples → Demo videos → Services → About → Contact.
- Add section ids as props (e.g. `id="platform"`, `id="use-cases"`, `id="workflows"`, `id="demos"`) for anchor links.
- Optional: Add `docs/enhancement-plans` and this plan; no code dependency.

**Dependencies:** None.

**Success criteria:**  
- ✅ Build succeeds with `npm run build` (or equivalent) with base path set.  
- ✅ Local run with base path shows all sections in order; no console errors.  
- ✅ Risk: Low.

**Verified by:** Manual run + build; optional shallow unit test for `Index` rendering.

---

### Phase 2: Header, Hero, and Assistant CTAs (0.5–1 day)

**Tasks:**  
- In `Header.tsx`: Add “Try the assistant” (link to `/assistant` or `#assistant` if you add an anchor), “View demos” (link to `#demos`), keep or rename “Get started” (e.g. to `#contact` or primary CTA). Use `Link` from React Router if app uses router for internal routes.  
- In `Hero.tsx`: Set primary CTA to “Try the assistant” (or “Schedule a consultation” if product decision) and ensure at least one CTA matches PRD.  
- In `Assistant.tsx`: Add short intro copy (“Personal AI assistant we build for you” or similar); optional: set default layout to A.

**Dependencies:** Phase 1 (section ids for `#demos`).

**Success criteria:**  
- ✅ Header shows three CTAs; “Try the assistant” opens Assistant page; “View demos” scrolls to demo section.  
- ✅ Hero has at least one prominent CTA.  
- ✅ Assistant page shows intro copy.  
- ✅ Risk: Low.

**Verified by:** Manual click-through; optional E2E or component test for Header links.

---

### Phase 3: Platform and Use Cases Content (1–2 days)

**Tasks:**  
- **PlatformSection:** Implement “Why αlphaspeed AI” / “Platform”: flexibility (Roofing-chatbot, verticals, config-driven), ease of automation, AI-powered workflows (lead → qualification → scheduling → follow-up). Add “One platform” list/diagram (PRD, architecture, security review, lead qualification, WhatsApp, dashboard). Mention deployment: Render, on-prem/Mac Mini, hybrid. Use existing Card/Badge/typography; no new design system.  
- **UseCasesSection:** Implement 3–5 use cases (lead follow-up, scheduling & reminders, 24/7 chat/WhatsApp, estimates & intake, reporting) as cards with plain-language titles and one-line outcomes. Tone: “you” and “your team”; no jargon.

**Dependencies:** Phase 1.

**Success criteria:**  
- ✅ Platform section visible with benefits and deployment options.  
- ✅ At least 3 use cases in plain language; no MCP/orchestrator in main copy.  
- ✅ Matches FR-2, FR-3, FR-4.  
- ✅ Risk: Low.

**Verified by:** Content review; accessibility (heading order, contrast); optional snapshot test.

---

### Phase 4: Workflow Examples and Demo Videos (1–2 days)

**Tasks:**  
- **WorkflowExamplesSection:** Implement 2–4 workflow examples (e.g. roofing lead flow, estimate request, appointment confirmation) as step-by-step or diagram-style cards; optional “See demo” link to `#demos` or external. Reuse Card, icons, spacing.  
- **DemoVideosSection:** Add “See it in action” / “Demos” section; embed or link at least one video (YouTube/Vimeo); use responsive wrapper (aspect-ratio or iframe); prefer captions. Optional: short clip in Hero or in workflow cards (can be same video).

**Dependencies:** Phase 1.

**Success criteria:**  
- ✅ 2–4 workflow examples visible and easy to understand.  
- ✅ At least one playable or linked demo video in dedicated section.  
- ✅ Matches FR-6, FR-7.  
- ✅ Risk: Low.

**Verified by:** Manual check on viewport sizes; optional a11y check on embed (title, focus).

---

### Phase 5: Footer, Content Structure, and Polish (0.5–1 day)

**Tasks:**
- **Footer:** Ensure links to Services, About, Contact; add Privacy if required. Use anchor links or React Router Links matching section ids/routes.
- **Content structure (P2 - optional for Phase 1):**
  - If implementing FR-10 now: Create `src/content/` directory with content files:
    - `src/content/platform.ts` - export platform benefits, deployment options
    - `src/content/useCases.ts` - export array of use case objects
    - `src/content/workflows.ts` - export workflow step definitions
  - Import content into section components as props or constants
  - Alternative: Keep content inline for Phase 1, extract in Phase 2 iteration
  - **Recommendation:** Keep content inline initially for faster implementation, extract later when marketing needs to edit frequently
- **Copy and SEO:**
  - One `<h1>` per page (check Index and Assistant pages)
  - Update `index.html` `<title>` and `<meta name="description">` tags
  - Consider `react-helmet-async` if dynamic meta tags needed per route (not required for Phase 1)
- **Code cleanup:**
  - Remove unused imports
  - Run `npm run lint` or equivalent and fix errors
  - Verify all TypeScript types are correct

**Dependencies:** Phases 1–4.

**Success criteria:**  
- ✅ Footer links work; Privacy linked if required.  
- ✅ One h1 per page; meta tags set.  
- ✅ No new lint errors; existing tests pass.  
- ✅ Risk: Low.

**Verified by:** Lint; manual link check; optional Lighthouse or readability check for NFR-1.

---

### Phase 6: GitHub Pages Deployment (1 day)

**Tasks:**
- Confirm build output is static (`dist/`) and works with base path.
- **404.html for SPA routing:**
  - Create `public/404.html` with redirect script that preserves path for client-side routing
  - Script should read `window.location.pathname` and redirect to `/index.html` with path as query param or hash
  - React Router will handle routing once the app loads
  - Example: Redirect `/assistant` → `/index.html?path=/assistant`, then parse and navigate client-side
- **GitHub Actions workflow (optional but recommended):**
  - Create `.github/workflows/deploy.yml`
  - Trigger on push to `main`
  - Build with `npm run build`
  - Deploy `dist/` to `gh-pages` branch using `peaceiris/actions-gh-pages@v3` or similar
- **GitHub Pages configuration:**
  - Settings → Pages → Source: `gh-pages` branch / root
  - Or: Source: `main` branch / `docs` folder (if building to `docs/` instead of `dist/`)
- **Verification checklist:**
  - ✅ Visit `https://alphaspeedconsulting.github.io/alpha-speed-ai-studio/`
  - ✅ Home page loads with all sections visible
  - ✅ All assets (CSS, JS, images) load correctly (check Network tab)
  - ✅ Click "Try the assistant" → `/assistant` route works
  - ✅ Refresh on `/assistant` → page loads correctly (not 404)
  - ✅ All anchor links (e.g., "View demos") scroll to correct sections

**Dependencies:** Phases 1–5.

**Success criteria:**  
- ✅ Site deployable to GitHub Pages; live at `https://<user>.github.io/<repo>/`.  
- ✅ Deep link `/assistant` works after refresh.  
- ✅ FR-11 satisfied.  
- ✅ Risk: Medium (base path and 404 handling).

**Verified by:** Deploy to test branch; manual verification of routes and assets.

---

## 5. Testing Strategy

- **Unit tests:**  
  - Optional: `Index.tsx` renders without error and contains main sections (Hero, Platform, Use cases, Workflows, Demos, Services, About, Contact).  
  - Optional: Section components render with minimal props/children.  
  - Existing `src/test/` and `vitest.config.ts`: keep current tests passing; add only if value is clear (e.g. regression on base path).

- **Integration tests:**  
  - Not required by PRD for a static marketing site; optional “smoke” test that app mounts and Router resolves `/` and `/assistant`.

- **E2E / manual:**
  - **Local development testing:**
    - Navigate home → scroll each section → click "Try the assistant" → confirm Assistant page
    - Click "View demos" → confirm scroll to demo section; play (or open) one video
    - Test all Header CTAs and anchor links
  - **Production build testing (critical for base path):**
    - Build: `npm run build`
    - Serve with base path simulation: `npx serve -s dist -l 8080`
    - Test routes: open `http://localhost:8080/alpha-speed-ai-studio/` (with trailing slash)
    - Click navigation to `/assistant` → verify it resolves to `/alpha-speed-ai-studio/assistant`
    - Refresh on `/assistant` page → verify 404.html redirect works
    - Check browser Network tab: all assets load from correct paths (with base path prefix)
  - **Responsiveness:** Test on 320px–1920px viewports; touch-friendly CTAs (NFR-4)
  - **Accessibility:** Heading order, focus order, alt text for images/video, keyboard navigation (NFR-3)

- **Existing tests:**  
  - `src/test/example.test.ts` and setup: ensure still pass; no changes unless adding section tests.

- **Test data:**  
  - No backend; use static copy in components or in `src/content/*`. Video URLs are config (env or constants).

---

## 6. Open Questions / Risks

- **Assumptions:**
  - Repo name is `alpha-speed-ai-studio` (confirmed from git remote); base path is `/alpha-speed-ai-studio/`.
  - GitHub Pages will be deployed at `https://alphaspeedconsulting.github.io/alpha-speed-ai-studio/`.
  - "Try the assistant" goes to existing `/assistant` page (no embedded widget on home in Phase 1).
  - Demo video URL(s) will be provided by marketing/product; placeholder or single known URL is acceptable for implementation.
  - No existing `.cursorrules` or project-specific rules file detected (plan follows general best practices and PRD constraints).

- **Unknowns:**  
  - Exact launch date and final copy for Platform/Use cases/Workflows (can use placeholders).  
  - Whether Assistant should be embedded on home (PRD Q4); plan assumes link to `/assistant` only.  
  - Legal/compliance copy (AI disclaimer, privacy) for assistant section (PRD Q5).

- **Risks:**
  - **HIGH:** Base path misconfiguration breaks production assets and routes
    - Mitigation: Test production build locally with simulated base path before deploying
    - Mitigation: Document exact base path value (`/alpha-speed-ai-studio/`) in deployment docs
    - Mitigation: Add verification checklist (see Phase 6)
  - **MEDIUM:** GitHub Pages 404 behavior for SPA: if not configured, deep links break on refresh
    - Mitigation: Implement 404.html redirect in Phase 6
    - Mitigation: Test direct navigation to `/assistant` after deployment
  - **LOW:** Demo video URLs not available at implementation time
    - Mitigation: Use placeholder YouTube embeds or "Coming soon" message
    - Mitigation: Make video URLs configurable/easy to update

- **Deployment:**  
  - Phase 1: Static export; no migrations. Rollback: revert deploy branch or re-deploy previous build.  
  - Phase 2 (custom domain): DNS and GitHub Pages settings only; no code change in this plan.

---

## Summary

| Phase | Description | Est. Effort |
|-------|-------------|-------------|
| 1 | Preparation — sections, base path, composition | 1–2 days |
| 2 | Header, Hero, Assistant CTAs | 0.5–1 day |
| 3 | Platform + Use cases content | 1–2 days |
| 4 | Workflow examples + Demo videos | 1–2 days |
| 5 | Footer, content structure, polish, SEO | 0.5–1 day |
| 6 | GitHub Pages deployment | 1 day |
| **Total** | | **5–9 days** |

Plan is architecture-compliant with the PRD: extends existing design system and codebase only, reuses Header/Footer/Hero/Assistant and shadcn, adds four new section components and base path support, and defers custom domain to Phase 2.
