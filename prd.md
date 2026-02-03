# PRD: αlphaspeed AI Marketing Site

**Product:** αlphaspeed AI Marketing Website  
**Status:** Draft  
**Created:** February 2, 2026  
**Source:** AI Product Agents PRD pipeline + manual requirements merge  
**References:** Alpha AI Website codebase (`/Users/miguelfranco/Alpha AI Website`), Roofing-chatbot-stage-render, Moltbot/Openclaw, AI Product Agents

---

## 1. Overview

**Problem Statement:** Visitors need a clear understanding of the key benefits of the αlphaspeed AI platform to determine if it meets their business needs. The site must: (1) use the existing Alpha AI Website style, (2) highlight Roofing-chatbot flexibility and AI-powered workflows, (3) position the AI ops platform as the backbone, (4) demonstrate the art of the possible for non-technical users and small business, (5) showcase a personal AI assistant/chat interface, (6) present workflow examples visually, and (7) include demo videos.

**Definition of Success:**
- **Primary KPI:** Increase visitor engagement by 30% within the first quarter post-launch.
- **Secondary KPI:** 20% increase in demo requests from the website.
- **Qualitative:** Visitors can articulate “what αlphaspeed AI does” and “what I could automate” after one visit; platform and Roofing-chatbot/Moltbot/Openclaw clearly positioned; chat demo and workflow visuals drive time-on-site and CTAs.

**Priority:** P0  
**Owner:** Marketing Team  
**Created:** February 2, 2026

---

## 2. User Stories

- **US-1:** As a visitor, I want to understand the key benefits of the Roofing-chatbot and AI ops platform, so that I can decide if the platform meets my business needs.
- **US-2:** As a non-technical user, I want to explore simple use cases of the platform, so that I can see how it can automate my business processes.
- **US-3:** As a small business owner, I want to try the personal AI assistant chat interface, so that I can experience the platform's capabilities firsthand.
- **US-4:** As a prospect, I want to see workflow examples and demo videos, so that I can trust that the platform delivers real outcomes.

---

## 3. Design & Style Requirements (Existing Codebase)

The website **must** utilize the existing style and structure from the Alpha AI Website codebase at **`/Users/miguelfranco/Alpha AI Website`** (alpha-speed-ai-studio). No new design system; extend only.

### 3.1 Design System to Reuse

| Element | Specification | Source |
|--------|----------------|--------|
| **Theme** | Dark default; Black, Teal, Grey palette | `src/index.css` |
| **Primary / Accent** | Teal `174 72% 46%`, teal-glow; CSS variables `--primary`, `--teal`, `--teal-glow` | `index.css`, `tailwind.config.ts` |
| **Background** | `--background: 220 20% 6%`, `--card: 220 20% 8%` | `index.css` |
| **Typography** | Bold, tracking-tight headings; Inter (or configured sans) | `tailwind.config.ts`, `index.css` |
| **Components** | shadcn/ui (Button, Card, Badge, Progress, Tabs, etc.); existing Hero, Header, Footer, Services, About, Contact | `components/`, `components/ui/` |
| **Effects** | `.gradient-text`, `.hero-gradient`, `.grid-pattern`, `.card-hover`, `.glow-teal`, `.glow-teal-sm` | `index.css` |
| **Buttons** | `variant="hero"` (gradient teal), `variant="heroOutline"` (outline); sizes including `xl` | `components/ui/button.tsx` |
| **Layout** | Container center, responsive padding; sections with `py-24`, consistent spacing | Hero, Services, About, Footer |
| **Routing** | React Router; existing routes `/`, `/assistant` | `App.tsx` |

### 3.2 Mandatory Consistency

- **No new design system.** Extend the existing one (new sections, new content) only.
- **Assets:** Reuse logo, favicon, and existing imagery from Alpha AI Website `public/` and `src/assets/`.
- **Responsive:** Preserve mobile-first, responsive patterns already in Header, Hero, Services, and Footer.

---

## 4. Content & Messaging Requirements

### 4.1 Roofing-Chatbot & Platform Benefits

- **Flexibility:** Same platform can power roofing, siding, gutters, or other verticals; config-driven workflows (e.g. YAML specs) and extensible agents.
- **Ease to automate:** Add new workflows in hours, not days; auto-discovery, shared utilities, optional code generation.
- **AI-powered workflows:** End-to-end automation from lead capture → qualification → scheduling → follow-up; powered by AI Product Agents MCP, roofing agents, openclaw/Moltbot.
- **Placement:** Hero subhead or badge, “Why αlphaspeed AI” / “Platform” section, and at least one dedicated subsection (e.g. “Built for flexibility”).

### 4.2 AI Ops Platform

- **Position** as backbone: unified agents (14 AI Product Agents + 8 roofing agents), single control plane, monitoring, deployment (Render, Mac Mini).
- **Mention** deployment options: Render (roofing-chatbot-stage-render), on-prem/openclaw (Mac Mini), or hybrid.
- **Include** a simple diagram or list: “One platform – PRD generation, architecture analysis, security review, lead qualification, WhatsApp, dashboard.”
- **Placement:** “Platform” or “How it works” section.

### 4.3 Art of the Possible (Non-Technical, Small Business)

- **Use cases (3–5):** Lead follow-up; scheduling & reminders; customer communication 24/7 (chat/WhatsApp); estimates & intake; reporting.
- **Tone:** Plain language; “you” and “your team”; no jargon (e.g. no “MCP,” “orchestrator”) in hero/main copy.
- **Placement:** “Use cases” or “What you can automate” section with cards or short scenarios and one-line outcomes.

### 4.4 Personal AI Assistant / Chat Interface

- **Showcase** chat experience like agent-chat (Roofing-chatbot-stage-render) or Moltbot/Openclaw.
- **Requirements:** At least one dedicated section or page (“Try the assistant”); reuse existing Assistant page and layouts (AssistantLayoutA, B, C) or link to live demo; prominent CTA in Header/Hero.
- **Placement:** CTA “Try the assistant” in Header/Hero; dedicated section or route for assistant demo.

### 4.5 Workflow Examples

- **Requirement:** Present 2–4 workflow examples in a **visually appealing, easy-to-understand** way (step-by-step, diagrams, cards).
- **Content:** Real workflows (e.g. roofing lead flow, estimate request, appointment confirmation) with optional “See demo” link.
- **Placement:** “Workflow examples” or “How automation works” section; above or beside demo video section.

### 4.6 Demo Videos

- **Requirement:** At least one end-to-end workflow video; optionally chat in action, platform/dashboard.
- **Specs:** Hosted (e.g. YouTube, Vimeo); responsive player; captions preferred.
- **Placement:** Dedicated “See it in action” or “Demos” section; optional short clip in Hero or workflow cards.

---

## 5. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| **FR-1** | The system shall utilize the existing Alpha AI Website codebase style (dark theme, teal/grey palette, shadcn/ui, Hero/Header/Services/About/Footer, effects, button variants). | P0 |
| **FR-2** | The system shall highlight flexibility, ease of automation, and AI-powered workflows (Roofing-chatbot-stage-render / related code). | P0 |
| **FR-3** | The system shall include a section that positions the AI ops platform (unified agents, deployment options, monitoring). | P0 |
| **FR-4** | The system shall include a “Use cases” or “What you can automate” section with 3–5 simple small-business use cases in non-technical language. | P0 |
| **FR-5** | The system shall provide access to a personal AI assistant / chat interface (existing Assistant page or link to live demo). | P0 |
| **FR-6** | The system shall present 2–4 workflow examples in a visual, easy-to-understand format (steps/diagrams/cards). | P0 |
| **FR-7** | The system shall include at least one demo video section with embedded or linked videos. | P0 |
| **FR-8** | Header shall include clear CTAs (e.g. “Try the assistant,” “Get started,” “View demos”). | P1 |
| **FR-9** | Footer shall include links to Services, About, Contact, and optional Privacy. | P1 |
| **FR-10** | New copy and media shall be reviewable and editable without changing the design system (content in components or CMS-ready structure). | P2 |
| **FR-11** | The build shall produce static output compatible with GitHub Pages; base path shall be configurable for project sites (e.g. `base: '/repo-name/'`). | P0 |
| **FR-12** | Phase 2: The system shall support serving the site at a custom domain with HTTPS (GitHub Pages custom domain + DNS). | P1 |

---

## 6. Non-Functional Requirements

| ID | Requirement | Metric/Target |
|----|-------------|----------------|
| **NFR-1** | Usability | Plain language without jargon in hero/main copy; readability score > 60. |
| **NFR-2** | Performance | Page load time < 3s; LCP < 2.5s on 4G; no blocking scripts that prevent first paint. |
| **NFR-3** | Accessibility | WCAG 2.1 AA for new content; keyboard navigation, focus order, alt text for images/videos. |
| **NFR-4** | Responsiveness | Usable on 320px–1920px width; touch-friendly CTAs. |
| **NFR-5** | SEO | Semantic headings (one h1 per page); meta title/description for main and assistant pages. |

---

## 7. Constraints

- **Budget:** Not specified.
- **Timeline:** Ship by [date].
- **Tech Stack:** React, React Router, shadcn/ui, Tailwind; existing Alpha AI Website (alpha-speed-ai-studio) codebase.
- **Compliance:** No new design system; extend existing only. Contact form via mailto or third-party; no backend/API for marketing site.
- **Deployment:** Phase 1 — GitHub Pages; Phase 2 — add real custom domain (see Section 8).

---

## 8. Deployment

### 8.1 Phase 1: GitHub Pages

- **Initial hosting:** Deploy the site from GitHub Pages to get a live URL quickly.
- **Requirements:**
  - Build produces **static output** compatible with GitHub Pages (e.g. Vite `build` output, or static export).
  - Repository is configured for GitHub Pages (Settings → Pages → source: branch/folder, e.g. `main` / `docs` or `gh-pages`).
  - If the repo is a **project site** (e.g. `username.github.io/repo-name`), the app **must** use the correct **base path** (e.g. `base: '/repo-name/'` in Vite, `basename` in React Router) so routes like `/` and `/assistant` resolve correctly.
  - CI/CD (e.g. GitHub Actions) optional for Phase 1: push to branch can trigger Pages deploy, or manual upload of build artifact.
- **Outcome:** Site is live at `https://<username>.github.io/<repo>/` (project site) or `https://<username>.github.io/` (user/org site).

### 8.2 Phase 2: Custom Domain

- **Follow-on:** Add a **real custom domain** (e.g. `alphaspeedai.com` or `www.alphaspeedai.com`) so the site is served at the branded URL.
- **Requirements:**
  - Custom domain configured in GitHub Pages (Settings → Pages → Custom domain).
  - DNS at the domain registrar: add the records GitHub specifies (e.g. A/CNAME for `username.github.io` or Pages apex).
  - **Enforce HTTPS** (GitHub Pages supports custom domain over HTTPS once DNS is verified).
- **Outcome:** Site is reachable at the custom domain with HTTPS. GitHub Pages continues to serve the same static content.

### 8.3 Technical Notes

- **Single-page app (SPA):** If using client-side routing (React Router), ensure GitHub Pages is configured for **404 handling** so deep links (e.g. `/assistant`) work when loaded directly or refreshed. Use a `404.html` that redirects to `index.html` with the path preserved, or host from a root that serves `index.html` for all routes (GitHub Pages supports custom 404 for this).
- **Base path:** For project sites, set `base` in Vite config and `basename` in React Router to the repo name so assets and routes resolve correctly.

---

## 9. Stakeholders & Impact

- **Primary Users:** Visitors, non-technical users, small business owners.
- **Secondary Users:** Marketing team, sales team.
- **Internal Teams:** Development team, design team.

---

## 10. Structure & Pages (Suggested)

- **Home (`/`):** Hero, Platform/Why αlphaspeed AI, Use cases (small business), Workflow examples, Demo videos, Assistant CTA, Services, About, Contact.
- **Assistant (`/assistant`):** Keep existing Assistant page and layout selector (A/B/C); optionally add intro copy tying to “Personal AI assistant we build for you.”
- **Optional:** `/demos` (all demo videos in one place) or `/use-cases` (long-form use case pages). Prefer extending the single-page flow first.

---

## 11. Out of Scope

- Building a new design system or rebrand.
- Backend or API for the marketing site (contact form: mailto or third-party).
- Detailed deployment runbooks (separate doc); deployment strategy is in-scope (Section 8). Custom domain DNS/SSL setup is Phase 2.
- New AI agents or new chatbot backends; we are showcasing existing capabilities (Roofing-chatbot-stage-render, Moltbot, Openclaw, agent-chat).

---

## 12. Definition of Done & Acceptance Criteria

**The Destination (Final State):** The marketing site clearly communicates the benefits of the αlphaspeed AI platform, includes interactive elements like the AI assistant chat, and visually demonstrates workflows and platform capabilities using only the existing Alpha AI Website design system.

### Binary Acceptance Criteria

- [ ] The site uses the existing Alpha AI Website style (dark theme, teal/grey palette, components, no new design system).
- [ ] Key benefits of the Roofing-chatbot and AI ops platform are highlighted on the site.
- [ ] A section or page for trying the personal AI assistant chat interface is present; user can open it from the main site in one click.
- [ ] 2–4 workflow examples are presented visually (steps or diagrams).
- [ ] Demo videos are included in a dedicated section; at least one is playable.
- [ ] At least 3 small-business use cases are listed in plain language.
- [ ] A non-technical reader can state “what αlphaspeed AI does” and “what I could automate” after reading the site.
- [ ] All P0 functional requirements (FR-1–FR-7) are implemented and verified.
- [ ] Responsive and accessibility checks (NFR-3, NFR-4) are completed.
- [ ] **Phase 1 deployment:** Site is deployable to and live on GitHub Pages; routes and assets work (including base path if project site).

---

## 13. Open Questions

- **Q1:** What is the specific launch date for the marketing site?
- **Q2:** Final hosting URL and environment for “Try the assistant” and demo links?
- **Q3:** Who supplies and edits demo videos (product, marketing, dev)?
- **Q4:** Is the Assistant page sufficient, or do we need an embedded chat widget on the home page?
- **Q5:** Any compliance or legal copy required (e.g. AI disclaimer, privacy policy) for the chat/assistant section?
- **Q6:** Target custom domain for Phase 2 (e.g. alphaspeedai.com)? Who owns DNS and will configure the records?

---

## 14. References

| Reference | Location / Note |
|-----------|------------------|
| Alpha AI Website (style & components) | `/Users/miguelfranco/Alpha AI Website/alpha-speed-ai-studio` |
| Roofing chatbot extensibility | `projects/roofing-chatbot-extensibility/EXECUTIVE_SUMMARY.md` |
| Openclaw integration | `projects/openclaw-integration/README.md`, `prd.md` |
| Moltbot / Roofing chatbot docs | `projects/moltbot-integration-strategy/*.md` |
| AI Product Agents (MCP) | `src/ai_product_agents_mcp/`, `CLAUDE.md` |

---

## Appendix A: Implementation Prompt (from PRD Agent)

**Goal:** Develop a marketing site for αlphaspeed AI that clearly communicates platform benefits, includes interactive elements, and visually demonstrates workflows.

**Success criteria:** Every task under 15 minutes; every “Code” task has a “Test”/“Verification” task; no magic steps (specific files/functions); plan ends with Definition of Done.

**Implementation steps (high level):**
- **Phase 1 (Preparation):** Create/align pages and components (HomePage, BenefitsSection, AIChatInterface/Assistant, WorkflowExamples, DemoVideosSection); ensure routing and env config.
- **Phase 2 (Core):** Implement or extend theme to match design system; implement BenefitsSection, chat/Assistant integration, WorkflowExamples (2–4 visual examples), DemoVideosSection; verify each component.
- **Phase 3 (Integration):** Integrate all components into HomePage; manual test for usability and performance (load within 3s).
- **Phase 4 (Finalization):** Cleanup unused imports; final review with marketing for content accuracy.
- **Phase 5 (Deployment – GitHub Pages):** Configure build for static output; set base path if project site (`base: '/repo-name/'`, React Router `basename`); add 404 handling for SPA deep links; enable GitHub Pages (branch/folder); verify site live at `https://<username>.github.io/<repo>/`. **Phase 2 (later):** Add custom domain in GitHub Pages settings; configure DNS; enforce HTTPS.

**Definition of Done:** All tests pass; site uses existing style; key benefits highlighted; assistant section present; 2–4 workflow examples visible; demo videos in dedicated section; no new lint errors; site deployable to and live on GitHub Pages (Phase 1); custom domain planned for Phase 2.

**Update (2026-02-03):** All instances of "Alpha Speed" changed to "αlphaspeed" (Greek alpha character + lowercase) throughout the site for branding consistency with the logo.

---

**Document version:** 2.1  
**Last updated:** February 2, 2026  
**Generated with:** AI Product Agents `generate_prd` + requirements merge. Deployment (GitHub Pages + custom domain) added v2.1.
