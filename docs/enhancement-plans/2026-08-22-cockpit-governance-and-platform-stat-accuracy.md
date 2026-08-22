# Enhancement Plan: Cockpit & Mission Control, Governance Section, and Platform Stat Accuracy

**Created:** 2026-08-22
**Revised:** 2026-08-22 (v2 — counts verified against the `cowork_plugin` AgentVault repo; headline finding inverted)
**Status:** Phases 1–5 implemented (2026-08-22) — awaiting sign-off on Cockpit copy before publish

**Implementation result:** All 4 recommendations applied. `npm test` 69/69 pass (+21 new); `npm run build` passes the prerender hard gate on all 18 routes; zero stale figures remain in `dist/`. Deferred as planned: new case studies (D), positioning (E), hero stat values (F).
**Author:** Claude
**Source:** `alphaspeedai-website-update-proposal.md` (local-agent-mode session output, 2026-08-22)

**Related Files:**
`src/lib/constants.ts`, `src/pages/AgentRoster.tsx`, `src/pages/AgentVaultSignup.tsx`, `src/components/AgentVaultPricing.tsx`, `src/components/StatsBar.tsx`, `src/components/DemoVideosSection.tsx`, `src/components/GovernanceSection.tsx` *(new)*, `src/components/CockpitSection.tsx` *(new)*, `src/pages/Index.tsx`, `src/components/Header.tsx`, `src/lib/seoRoutes.ts`, `public/alpha-speed-sales-kit.html`, `src/lib/__tests__/platform-stats.test.ts` *(new)*, `src/components/__tests__/GovernanceSection.test.tsx` *(new)*, `src/components/__tests__/CockpitSection.test.tsx` *(new)*

---

## 0. Architecture Context (correction to the command template)

The `/enhancement-plan` command declares a default architecture of **"Agent Overlay + Service-based + LangGraph"** and instructs the planner to read `.cursorrules` and `CLAUDE.md`. Verified: **neither file exists** in this repo or its parent, and there is **no LangGraph, agent overlay, or service layer** in this codebase.

`alpha-speed-ai-studio` is a **Vite + React 18 + TypeScript static marketing SPA** (shadcn/ui + Tailwind, `react-router-dom`, `react-helmet-async`), built with `npm run build` and deployed to GitHub Pages via `.github/workflows/deploy.yml`. The plan honors the standards this codebase actually enforces:

| Convention | Evidence | Binding rule |
|---|---|---|
| Content lives as typed exported consts | `src/lib/constants.ts` (`SERVICE_PILLARS`, `DEMO_VIDEOS`, …) | New copy goes in `constants.ts` with an exported interface — not inline JSX |
| Sections are presentational components | `UseCasesSection.tsx`, `WhyAgentsSection.tsx` | New sections reuse the same shape: `<section id>`, container, `Badge` eyebrow, `gradient-text` headline, `card-hover` cards |
| Below-fold sections lazy-load | `Index.tsx` — `lazy()` + `<Suspense fallback={null}>` | New homepage sections lazy-load to protect the Lighthouse budget |
| SEO routes centralized | `src/lib/seoRoutes.ts` → `vite.config.ts` `prerenderPlugin()` | Marker strings must match rendered copy verbatim |
| Prerender markers fail the build | `vite.config.ts:184` exits non-zero | Markers are the **last** edit in a phase, never the first |
| Colocated Vitest + Testing Library | `src/**/__tests__/*.test.{ts,tsx}` | Same location and naming |

**"Workflow engine constraints"** is interpreted as the **build + deploy pipeline** (`prerenderPlugin` → `vite-plugin-sitemap` → Pages Action) plus the **analytics flow** (`src/lib/analytics.ts`). Both treated as protected in Section 3.

---

## 0.5 Verified Counts — AgentVault repo (`cowork_plugin`)

All figures below were read directly from the AgentVault source of truth on 2026-08-22.

**Sources**
| # | Source | State |
|---|---|---|
| S1 | `cowork_plugin/docs/canonical-workflow-registry.json` | **Committed** (`ead20c2`), generated 2026-08-19. Platform catalog totals. |
| S2 | `cowork_plugin/agentvault_platform/server.py` → `TIER_MANIFESTS` | **The actual license gate.** Defines exactly what each paying tier receives. |
| S3 | `cowork_plugin/agentvault_platform/tier_access.py` | Corroborates S2 entitlements. |
| S4 | `~/.agentvault/canonical-workflow-registry.json` | Local generated copy, **stale** (2026-08-10, 81 workflows). Not authoritative. |

### A. Platform catalog totals (S1, 2026-08-19)

| Entity | Count | Breakdown |
|---|---|---|
| Workflows | **83** | 54 local / 17 hybrid / 12 remote |
| Skills | **67** | — |
| Agents catalogued | **31** | across all surfaces |
| MCP servers | **10** | agentvault, alphaai-dashboard, browser-use, dataforseo, family-optimizer, firecrawl, gemini-cli, search-console-mcp, tavily, ai_product_agents (bundled) |
| AgentVault MCP tools | **217** | — |

*The 83 figure matches the proposal's live `list_canonical_workflows` pull exactly. The registry moves fast: the Aug-10 local copy shows 81. This is the empirical case for ageing-resistant framing.*

### B. Per-tier entitlement (S2 — computed from the actual `TIER_MANIFESTS` lists, not the description strings)

| Tier | Skills | Connectors | Agents | Workflows | Rate limit |
|---|---|---|---|---|---|
| Basic $99 | 7 | 8 | 0 | 8 | 100/hr |
| Advanced $199 | 23 | 17 | 9 | 34 | 1,000/hr |
| Custom $499+ | all | all | all | all | 10,000/hr |
| Developer License | all | all | all (13 via repo) | all | 5,000/hr |
| Pilot $0 *(hidden)* | 7 | 8 | 0 | 12 | 500/hr |

### C. 🔴 Site vs. truth — **the headline finding inverts**

The proposal's top recommendation was *"site says 38 workflows, registry says 83 — bump it up."* That is **correct for the platform stat bar and wrong for the pricing table**, because they are two different claims:

- **Stat bar** (`/agentvault` hero) = *platform catalog* → 83 is the right basis.
- **Pricing tier features** = *entitlement — what a paying customer actually receives* → the Advanced tier receives **34**, not 83.

Raising the Advanced tier's "38 canonical workflows" to 83 would overstate the entitlement by ~2.4×. And checked against S2, the Advanced tier copy is **already overstated on every capability count today**:

| Advanced tier claim | Site says | Actual (S2) | Direction |
|---|---|---|---|
| Skills | 30 | **23** | 🔴 Overstated |
| Connectors | 18 | **17** | 🔴 Overstated |
| AI Product Agents | 13 | **9** | 🔴 Overstated |
| Canonical workflows | 38 | **34** | 🔴 Overstated |
| Tool calls / hour | 1,000 | 1,000 | ✅ Correct |

| Basic tier claim | Site says | Actual (S2) | Direction |
|---|---|---|---|
| Skills | 6 | **7** | 🟡 Understated |
| Connectors | 2 named | **8** | 🟡 Understated |
| Canonical workflows | 5 | **8** | 🟡 Understated |
| Tool calls / hour | 100 | 100 | ✅ Correct |

**The `13 AI Product Agents` claim is the most exposed.** Per S2, 13 is the **Developer License** figure (`ai_product_agents_access: "full_via_repo"` — all 13 via the local `Development_agents` runtime). The Advanced tier's `agents` list contains exactly **9**. The site sells 13 at the $199 Advanced tier.

**Net effect:** the site currently **undersells Basic and oversells Advanced.** Correcting it makes Basic look materially better *and* removes four overstated claims from the paid tier.

### D. Stat-bar label defect

The stat bar reads **"18 MCP Connectors."** There are **10 MCP servers** (S1). The `18` traces to the *entitlement connector list* (now 17), not to MCP servers — two different taxonomies fused into one mislabeled tile. Recommend relabeling to **"Connectors"** and sourcing it from S2, or keeping "MCP Servers" and using 10.

### E. Upstream drift found in the AgentVault repo itself *(not a website bug)*

`server.py`'s own Advanced description string reads *"23 skills, 17 connectors, 9 AI Product Agents + 4 connector tools, 28 workflows"* while its actual `workflows` list has **34** entries. The description string has drifted from the list it describes. Worth a separate fix in `cowork_plugin` — **flagged, out of scope here**, but it means the website must derive from the **lists**, never from the description strings.

### F. Governance — now backed by hard numbers (S1)

| Governance fact | Value |
|---|---|
| Workflows carrying a required `audit_chain` control | **82 of 83** |
| Workflows carrying a required `evidence_gate` | **29** |
| Autonomy levels | L1: 13 · L2: 52 · L3: 17 |
| Risk tiers | low: 7 · medium: 53 · high: 22 |
| `governance_visibility` connector | Entitled on **every paying tier** since 2026-08-03 (S2, S3) |

This converts Request C from a copywriting exercise into a **sourced, quantified trust claim**.

### G. Cockpit — capability categories confirmed in code (S2 repo)

`agentvault_platform/cockpit/` contains 28 modules, including `capture.py`, `brief.py`, `portfolio.py`, `cost.py`, `task_launch.py`, `worker_loops.py`, `read_api.py`, `webhooks.py`, `actions.py`, `status_map.py`. `runtime.py` carries an explicit approval guard (`create_operational_app()`, with an inline note that the guard exists to close an unapproved-action class).

The four capability categories in the proposal — task capture, backlog/briefing, governance gates, delivery tracking — **map to real modules**, not to memory. Copy still requires Miguel's approval (module names are not public copy), but the claims are now grounded.

---

## 1. Enhancement Breakdown

### Request A — Align every published count with the AgentVault repo *(scope materially changed in v2)*

**What is being added or changed**

Not "fix 38 → 83." The site publishes **two different kinds of claim** that were conflated, and both are wrong in opposite directions:

1. **Platform catalog stats** (`/agentvault` hero stat bar) — must derive from S1.
2. **Tier entitlement claims** (pricing table, signup page) — must derive from S2. **These are contractual: they describe what a customer's money buys.** Four of them are currently overstated.

**Hard-coded occurrences audited in this repo:**

| File | Line | Occurrence | Claim type | Correct source |
|---|---|---|---|---|
| `src/pages/AgentRoster.tsx` | 195–198 | stat tiles `10+` / `30+` / `18` / `38` | Catalog | S1 |
| `src/pages/AgentRoster.tsx` | 133 | meta description — "10+ agents … 30+ skills" | Catalog | S1 |
| `src/pages/AgentRoster.tsx` | 136 | `og:description` — "38 canonical workflows" | Catalog | S1 |
| `src/pages/AgentRoster.tsx` | 141 | `twitter:description` — "38 canonical workflows" | Catalog | S1 |
| `src/components/AgentVaultPricing.tsx` | 14–20 | Basic features (6 skills, 2 connectors, 5 workflows) | **Entitlement** | S2 |
| `src/components/AgentVaultPricing.tsx` | 31–36 | Advanced features (30 / 18 / 13 / 38) | **Entitlement** | S2 |
| `src/pages/AgentVaultSignup.tsx` | 19–21 | Basic tier detail | **Entitlement** | S2 |
| `src/pages/AgentVaultSignup.tsx` | 25–26 | Advanced tier detail (30 / 18 / 13 / 38) | **Entitlement** | S2 |
| `public/alpha-speed-sales-kit.html` | 669, 1007 | "73 pre-built workflows" | Catalog | S1 |

Four numbers — 38 (site), 73 (sales kit), 81 (stale local registry), 83 (repo registry) — currently coexist.

**Change:** add `PLATFORM_STATS` (catalog, from S1) and `TIER_ENTITLEMENTS` (from S2) to `src/lib/constants.ts` as two clearly separated sources of truth, each stamped with `verifiedOn` and its source path. Refactor all nine sites to consume them. Correct the sales kit by hand.

### Request B — "AgentVault Cockpit & Mission Control" section

Capability-level section describing the command center: unified task capture, backlog and briefing, governance gate approvals, delivery and cost tracking. Positioned as *"we don't just build agents for you — we run our business on the same command center."*

**Hard content constraint:** capability categories only. No client names, no deal terms, no internal screenshots, no KDI figures tied to a named account. Per §0.5-G the categories are now code-grounded, which lowers the invention risk — but the **copy approval gate stands**, since module names are not marketing copy.

### Request C — Governance as its own feature section

`Videos/AgentVault_Governance_Layer.mp4` is currently entry 8 of 10 in `DEMO_VIDEOS`, an undifferentiated card in a 2-column grid. Promote it to a dedicated section anchored by the §0.5-F numbers: 82 of 83 workflows carry an audit-chain control, 29 require an evidence gate, three autonomy levels, and governance visibility on every paying tier.

**Reuse:** `public/alpha-speed-sales-kit.html:680` already ships approved public copy — *"Nothing sends without your approval — every workflow has a human gate built in."* Reusable without a new approval cycle.

### Request D — New case studies

**Out of scope.** Harvest, DocsHempRx, Briar Construction, Phoenix Insurance, EllieMd are internal ops notes; EllieMd is HIPAA-adjacent; two further names are flagged as **former** clients. Sign-off checklist in Section 6. Existing case studies unchanged.

### Request E — DFW-consultancy vs. productized-SaaS positioning

**Out of scope — decision gate only** (Section 6). Requests A–C are authored positioning-neutral and remain valid under either outcome.

### Request F — Remaining unverified stats

Homepage hero stats (`StatsBar.tsx` — 20+ hrs/week, 90% faster lead response, 3× ROI) are **customer-outcome claims with no registry equivalent**; the AgentVault repo cannot verify them. Values unchanged; `verifiedOn` metadata added so staleness is visible. Routed to Section 6.

---

## 2. Reuse vs New Code Analysis

### Reused as-is

| Asset | Why it covers the need |
|---|---|
| `Badge`, `Button`, `Card` (`src/components/ui/*`) | Full shadcn set installed; zero new primitives needed |
| `UseCasesSection.tsx` layout pattern | Icon tile + title + `Badge` + description + `border-t` outcome line is exactly the shape both new sections need |
| `lucide-react` icons | `ShieldCheck`, `Workflow`, `BarChart3` already imported in `WhyAgentsSection.tsx`; `LayoutDashboard`, `GitBranch`, `ClipboardCheck` ship in the same package |
| `SectionCTA.tsx` | Already supports `text` / `to` / `trackingName` |
| `src/lib/analytics.ts`, `src/lib/schema.ts` | No extension required |
| `Videos/AgentVault_Governance_Layer.mp4` | Governance asset already exists and is already public |
| Sales-kit governance line (`:680`) | Already public-facing — no new approval cycle |
| Existing case studies | Confirmed current; untouched |

### Extended

| File | Extension |
|---|---|
| `src/lib/constants.ts` | Add `PlatformStat` + `PLATFORM_STATS` (S1); add `TierEntitlement` + `TIER_ENTITLEMENTS` (S2); add `GOVERNANCE_FACTS`; add `COCKPIT_CAPABILITIES`; add optional `featured?: boolean` to `DemoVideo` |
| `src/pages/AgentRoster.tsx` | Stat tiles map `PLATFORM_STATS`; correct meta/`og:`/`twitter:` strings; mount new sections |
| `src/components/AgentVaultPricing.tsx` | Derive Basic and Advanced feature counts from `TIER_ENTITLEMENTS` |
| `src/pages/AgentVaultSignup.tsx` | Same derivation for `tierDetails` |
| `src/components/DemoVideosSection.tsx` | `DEMO_VIDEOS.filter(v => !v.featured)` |
| `src/pages/Index.tsx` | Lazy-mount `<GovernanceSection />` and `<CockpitSection />` in the existing `<Suspense>` |
| `src/components/Header.tsx` | Add `{ label: "Governance", hash: "governance" }` |
| `src/components/StatsBar.tsx` | Add `verifiedOn` metadata (**values unchanged**) |
| `public/alpha-speed-sales-kit.html` | Correct the two "73 pre-built workflows" strings |

### Net-new

| File | Why |
|---|---|
| `src/components/GovernanceSection.tsx` | No governance surface exists in `src/` beyond the carousel video |
| `src/components/CockpitSection.tsx` | "cockpit" / "Mission Control" appear nowhere in `src/` (verified by grep) |
| `src/lib/__tests__/platform-stats.test.ts` | Drift guard across both stat systems + the static sales kit |
| `src/components/__tests__/GovernanceSection.test.tsx` | Render coverage |
| `src/components/__tests__/CockpitSection.test.tsx` | Render coverage + confidentiality negative assertion |

**Net-new components: 2. New dependencies: 0. New routes: 0.**

---

## 3. Workflow Impact Analysis

### Pipeline 1 — SEO prerender + sitemap (`vite.config.ts` → `seoRoutes.ts`)

**Affected:** `prerenderPlugin()` renders `PRERENDER_ROUTES` via Puppeteer and verifies `PRERENDER_CONTENT_MARKERS`. Both `/` and `/agentvault` receive new sections.

**Side effects:** larger prerendered HTML; a marker string that does not match rendered copy **verbatim** throws at `vite.config.ts:184`, failing `npm run build` and blocking deploy. Lazy sections must resolve inside Puppeteer's capture window or they prerender as empty shells.

**Regression risk: MEDIUM.** Mitigation: markers are added only after copy is final, always as the last edit in a phase.

### Pipeline 2 — GitHub Pages deploy

No workflow-file change; marginally larger artifact; no new secrets. **Risk: LOW.**

### Pipeline 3 — Analytics (`src/lib/analytics.ts`)

`ScrollDepthTracker` fires milestones as a percentage of page height. Two new homepage sections shift where 25/50/75/100% land, making historical `/` scroll-depth series **non-comparable across the deploy boundary**. Element-anchored CTA/lead events unaffected.

**Risk: LOW (functional) / MEDIUM (data continuity).** Mitigation: annotate the deploy in GA4 and `/traffic`; use distinct `trackingName` values (`section_cta_governance`, `section_cta_cockpit`).

### Pipeline 4 — Lighthouse CI (`.lighthouserc.json`)

The governance `<video>` on `/` must reuse the existing `preload="metadata"` pattern (`DemoVideosSection.tsx:37`) or LCP and byte-weight budgets regress. **Risk: MEDIUM if added naively, LOW with the existing pattern.**

### Pipeline 5 — Existing Vitest suite

No existing test asserts on `38`, `DEMO_VIDEOS` length, or `Index.tsx` composition (verified). **Risk: LOW.**

### 🔴 Pipeline 6 — Commercial/contractual surface *(new in v2)*

Tier feature lists are **pre-sale representations of what $99 and $199 buy.** Correcting four overstated Advanced-tier claims is a customer-facing commitment change, not a copy tweak.

**Side effects:** existing Advanced subscribers were sold against 30 skills / 18 connectors / 13 agents / 38 workflows. The corrected page reads *lower* on all four. `AgentVaultSignup.tsx` posts to a live license server (`agentvault-license-server.onrender.com`) whose issued entitlements already follow S2 — so **the product is unchanged; only the description becomes accurate.**

**Regression risk: LOW technically, MEDIUM commercially.** Mitigation: Miguel reviews the corrected tier copy before publish (gate G0.2). No entitlement code is touched by this plan.

### Overall: **MEDIUM**, concentrated in the prerender marker gate, the governance video's performance cost, and the commercial review of corrected tier copy.

---

## 4. Implementation Order

### Precondition Gate 0 — Confirmations before any code

- **G0.1 — Catalog stat framing.** Publish `83` (54/17/12) or `80+`? *Recommendation: **`80+`.* The count was 81 on Aug 10 and 83 on Aug 19 — it moves faster than the site refreshes, which is what produced 38 and 73. Same reasoning for skills (`65+`) and agents.
- **G0.2 — 🔴 Tier copy correction sign-off (commercial).** Confirm publishing Advanced as **23 skills / 17 connectors / 9 AI Product Agents / 34 workflows**, down from 30 / 18 / 13 / 38. Confirm Basic moves **up** to 7 / 8 / 8. **This is the decision with real-world consequences — everything else is mechanical.**
- **G0.3 — Stat-bar taxonomy.** Relabel the mislabeled tile "Connectors" (17, S2) or "MCP Servers" (10, S1)? *Recommendation: **"MCP Servers — 10"** in the catalog stat bar, since the tile sits beside other catalog figures; connectors then appear only in tier features where they belong.*
- **G0.4 — Cockpit copy approval.** Approve the capability-level wording drafted in Phase 4.

### Phase 1 — Two sources of truth in `constants.ts` *(depends on G0.1, G0.2, G0.3)*

1. Add `PLATFORM_STATS` (catalog, S1) with `verifiedOn: "2026-08-19"` and `source: "cowork_plugin/docs/canonical-workflow-registry.json"`.
2. Add `TIER_ENTITLEMENTS` (S2) with `verifiedOn: "2026-08-22"` and `source: "cowork_plugin/agentvault_platform/server.py TIER_MANIFESTS"`.
3. Refactor `AgentRoster.tsx:195-198` to map `PLATFORM_STATS`; apply the G0.3 relabel.
4. Correct `AgentRoster.tsx:133/136/141` meta, `og:`, `twitter:` strings.
5. Refactor `AgentVaultPricing.tsx` Basic + Advanced features from `TIER_ENTITLEMENTS`.
6. Refactor `AgentVaultSignup.tsx` `tierDetails` likewise.
7. Hand-correct `public/alpha-speed-sales-kit.html:669` and `:1007`.

**Exit:** `grep -rn "38 canonical\|38 workflows\|73 pre-built\|13 AI Product Agents" src public` returns zero hits. `npm run build` passes.

### Phase 2 — Drift guard *(depends on Phase 1)*

8. `src/lib/__tests__/platform-stats.test.ts`: assert both stat objects are internally consistent; assert `verifiedOn` parses; assert no entry retains `38`, `73`, or `13`; **read `public/alpha-speed-sales-kit.html` from disk** and assert the workflow figure agrees.
9. Add `verifiedOn` to `StatsBar.tsx` `STATS` (**values unchanged**).

**Exit:** `npm test` green; deliberately editing the sales-kit number fails the test.

### Phase 3 — Governance section *(no blocking dependency — start immediately)*

10. Add `featured?: boolean` to `DemoVideo`; set it on the governance entry.
11. `DemoVideosSection.tsx:26` → `DEMO_VIDEOS.filter(v => !v.featured)`.
12. Add `GOVERNANCE_FACTS` to `constants.ts` from §0.5-F, plus the already-public sales-kit line.
13. Create `GovernanceSection.tsx` (`id="governance"`), reusing the `UseCasesSection` card and `preload="metadata"` video patterns.
14. Lazy-mount in `Index.tsx` (after `UseCasesSection`) and in `AgentRoster.tsx`.
15. Add `{ label: "Governance", hash: "governance" }` to `Header.tsx`.
16. **Last:** add `"Governance"` to `PRERENDER_CONTENT_MARKERS["/"]` and `["/agentvault"]`.

**Exit:** video appears exactly once per page; build prerenders both routes; `npm run audit:ci` shows no budget regression.

### Phase 4 — Cockpit section *(depends on G0.4; sequence after Phase 3)*

17. Draft `COCKPIT_CAPABILITIES` — four capability entries grounded in §0.5-G, **no client names, no deal terms, no account-tied metrics**.
18. **Submit to Miguel. Stop until approved.**
19. Create `CockpitSection.tsx` (`id="cockpit"`).
20. Lazy-mount in `Index.tsx` directly after `GovernanceSection` — command center plus the gates that make it safe.
21. **Last:** add the cockpit marker.

### Phase 5 — Tests and verification *(depends on Phases 3–4)*

22. `GovernanceSection.test.tsx` — renders all facts; video has `preload="metadata"` and `aria-label`.
23. `CockpitSection.test.tsx` — renders all capabilities **plus a negative assertion** that no internal client-name string appears.
24. Extend `src/lib/__tests__/seoRoutes.test.ts` for the new markers.
25. `npm test` → `npm run lint` → `npm run build` → `npm run preview` visual check → `npm run audit:ci`.

### Deliberately excluded

Positioning rewrite (E); new case studies (D); changing hero stat **values** (F); the upstream `server.py` description-string drift (§0.5-E) — a `cowork_plugin` fix, not a website fix.

---

## 5. Testing Strategy

### Unit / component tests

| Test file | Assertions | Phase |
|---|---|---|
| `src/lib/__tests__/platform-stats.test.ts` *(new)* | `PLATFORM_STATS` and `TIER_ENTITLEMENTS` are structurally valid and **distinct objects** (guards the catalog-vs-entitlement conflation that caused this bug); `verifiedOn` parses; no retained `38` / `73` / `13`; sales-kit HTML read from disk agrees | 2 |
| `src/components/__tests__/GovernanceSection.test.tsx` *(new)* | Renders every `GOVERNANCE_FACTS` entry; `<video>` has `preload="metadata"` + `aria-label`; `id="governance"` | 5 |
| `src/components/__tests__/CockpitSection.test.tsx` *(new)* | Renders every capability; `id="cockpit"`; **negative assertion** — rendered text matches no internal client-name string | 5 |

### Existing tests requiring update

| File | Change |
|---|---|
| `src/lib/__tests__/seoRoutes.test.ts` | Extend with the new `PRERENDER_CONTENT_MARKERS` entries |
| `Footer.test.tsx`, `EmailCapture.test.tsx`, `ResourcePathways.test.tsx` | **No change** — verified none assert on homepage composition or platform stats |

### Build / pipeline tests (the real E2E layer for a static site)

| Check | Command | Gate |
|---|---|---|
| Prerender marker verification | `npm run build` | **Hard gate** — the E2E proof that new sections render in prerendered HTML |
| Type check | `tsc` via `npm run build` | New interfaces type-check against all consumers |
| Lint | `npm run lint` | ESLint 9 flat config |
| Performance budget | `npm run preview` + `npm run audit:ci` | Guards the governance-video cost |

### Manual verification

1. `/agentvault` stat bar matches §0.5-A under the G0.1/G0.3 decisions.
2. Pricing table matches §0.5-B exactly — **check Advanced against `TIER_MANIFESTS` line by line**, since these are contractual.
3. `view-source` the built `/agentvault` — `og:`/`twitter:` descriptions carry corrected figures (social cards are prerendered; a stale card survives a passing test suite).
4. Governance video plays and appears **exactly once** on `/`.
5. Header "Governance" anchor scrolls correctly, including from a non-homepage route.
6. Mobile viewport check on both new sections.

### Recommended upstream follow-up (not this plan)

A `cowork_plugin` CI check asserting each tier's description string matches its own list length would have caught §0.5-E at source. Filed as a note for that repo.

---

## 6. Open Questions / Risks

### Blocking questions

| # | Question | Blocks | Recommendation |
|---|---|---|---|
| Q1 | `83` or `80+` for catalog stats? | Phase 1 | **`80+`** — 81 on Aug 10, 83 on Aug 19; it outpaces content refreshes |
| Q2 | 🔴 Sign off on correcting Advanced **down** (30→23, 18→17, 13→9, 38→34) and Basic **up** (6→7, 2→8, 5→8)? | Phase 1 | **Yes.** The overstatement is live today; the license server already issues the lower numbers |
| Q3 | Stat-bar tile: "Connectors" (17) or "MCP Servers" (10)? | Phase 1 | **"MCP Servers — 10"** — keeps the catalog stat bar internally consistent |
| Q4 | Approve cockpit capability copy? | Phase 4 | Draft delivered in Phase 4 step 17 |

### Assumptions

1. **A1 — RESOLVED (v2).** The prior open question — *does 83 count the same population the site means?* — is answered: **no.** 83 is the platform catalog; the Advanced tier entitles 34. Both numbers are correct for their own context. This was the plan's highest-severity assumption and it resolved in the dangerous direction; publishing 83 on the pricing table would have overstated the entitlement ~2.4×.
2. **A2** — `TIER_MANIFESTS` in `server.py` is the live production entitlement config (not a fixture or a stale branch). Corroborated by `tier_access.py` and by `AgentVaultSignup.tsx` posting to the live license server. **Worth one confirmation from Miguel** that the working tree matches deployed.
3. **A3** — Homepage hero stats (20+ hrs/week, 90%, 3×) are customer-outcome claims with no registry equivalent; unverifiable from the AgentVault repo. Unchanged.
4. **A4** — The governance video's content is consistent with the new section copy.

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| 🔴 **Advanced tier overstated on four counts, live today** | **HIGH** | Phase 1 corrects all four from S2; Q2 is the sign-off gate |
| **Confidential ops data leaks into cockpit copy** | **HIGH** | Capability-level copy only; explicit approval gate; automated negative-assertion test |
| Catalog and entitlement stats get re-conflated later | MEDIUM | Two separately named constants + a test asserting they stay distinct |
| Prerender marker mismatch breaks deploy | MEDIUM | Markers are the last edit in each phase |
| Governance `<video>` regresses homepage LCP | MEDIUM | Reuse `preload="metadata"`; lazy section; verify with `audit:ci` |
| Static sales kit drifts again | MEDIUM | Phase 2 test reads the HTML from disk |
| Scroll-depth analytics discontinuity | LOW–MEDIUM | Annotate the deploy; distinct `trackingName` values |
| Stats go stale again | MEDIUM | `verifiedOn` + `source` fields; add a quarterly refresh to the README's existing weekly SEO/content loop |

### Architectural risks

- **AR1 — Marketing claims still have no live binding.** `PLATFORM_STATS` / `TIER_ENTITLEMENTS` centralize the numbers but remain manually synced from a repo the website cannot import (Python + JSON in a different repo). The structural fix is a build-time or CI check reading `cowork_plugin`. **Out of scope** — it introduces a cross-repo dependency into a currently hermetic Pages build — but it is the only permanent cure for the recurring staleness. The `verifiedOn` + `source` fields are the deliberate half-measure.
- **AR2 — Homepage section count** reaches ~13 after this plan. Two more is fine; a third round warrants IA work.
- **AR3 — Static/React content duplication.** The 1,000-line hand-maintained sales kit duplicates claims that also live in React. Phase 2's test contains the damage; it does not remove the duplication.

### Deferred: case-study sign-off checklist (D)

Each engagement needs, in writing: (1) permission to be named; (2) approved wording for problem, work, results; (3) approval of every metric quoted; (4) current-vs-former status. **EllieMd additionally requires explicit written consent** (HIPAA-adjacent). Elizabeth Marcelena and Giant Vapes are flagged **former** clients and must not appear as current-client case studies.

### Deferred: positioning decision (E)

| Option | Consequence |
|---|---|
| **Keep DFW-consultancy as lead**, AgentVault as upsell | No change to `Index.tsx` Helmet, `buildLocalBusinessSchema()`, or DFW keyword targeting. Lowest risk; preserves local SEO equity. |
| **Elevate AgentVault to co-lead** | Touches `Index.tsx`, `Hero.tsx`, `Header.tsx` nav priority, `schema.ts` (`LocalBusiness` → possibly `SoftwareApplication`); risks existing DFW rankings. Separate, larger plan. |

---

## Effort Summary

| Phase | Scope | Effort | Blocked by |
|---|---|---|---|
| **G0** | Four confirmations (G0.2 is commercial, not technical) | — | — |
| **1** | Two constants (catalog + entitlement); 9 hard-coded sites; 4 overstated Advanced claims; 3 understated Basic claims; sales kit | ~3–4 h | G0.1–G0.3 |
| **2** | Drift guard incl. static sales kit; `verifiedOn` metadata | ~1–2 h | Phase 1 |
| **3** | Governance section w/ sourced numbers, `featured` flag, carousel filter, nav anchor, markers | ~3–4 h | none |
| **4** | Cockpit section (draft → approval → build → mount) | ~3–4 h + approval | G0.4 |
| **5** | Component tests, seoRoutes extension, full build/lint/Lighthouse | ~2–3 h | Phases 3–4 |

**Total engineering: ~12–17 hours** across 5 phases, plus approval turnaround.
**Net-new components: 2. New dependencies: 0. New routes: 0.**

**Fastest path to value:** Phase 3 (governance) is unblocked and can start immediately — and it got *stronger* in v2, since §0.5-F supplies real numbers instead of adjectives.

**Most urgent:** Phase 1's Advanced-tier correction. The site currently oversells the $199 tier on four separate counts. That is a live commercial exposure, and it is the opposite of the problem the original proposal set out to fix.
