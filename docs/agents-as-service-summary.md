# Agents as a Service — Section Summary & Registry Scope

## Overview

An **Agents as a Service** section surfaces a **registry** of all agents, MCP (Model Context Protocol) servers, and tools available across your codebase. It positions αlphaspeed AI as a platform that delivers AI capabilities as discoverable, composable services.

## Goals

- **Discoverability** — One place to see every agent, MCP server, and tool.
- **Transparency** — Show what’s available, where it lives, and how it’s used.
- **Sales & onboarding** — Support “agents as a service” messaging and demos.
- **Extensibility** — Registry can be driven by config or build-time scan so new repos/agents show up automatically.

## Registry Contents

### 1. Agents

| Source | Description |
|--------|-------------|
| **Platform sub-agents** (`.cursor/agents/`) | Specialized agents: Architecture, Product, Sales, Quality, Code Reviewer, Debugging, TDD, UI/UX. Each has a role and optional MCP tool usage. |
| **Claude / AI Product Agents** | Pipeline-style agents (e.g. PRD → Architect → Developer → Security → Deployment) orchestrated via MCP. |
| **Skills** (`.claude/skills/`, `.cursor/skills-cursor/`) | Reusable prompts/skills that act like “micro-agents” (e.g. brainstorming, code review, writing plans). |

**Example agents (from this repo):**

- **Architecture Agent** — Analyzes architecture options, reviews designs; uses `analyze_architecture`, `review_architecture`, `profile_performance`, etc.
- **Product Agent** — Generates PRDs; uses `generate_prd`.
- **Sales Agent** — Custom pitches and batch outreach; uses `generate_pitch`, `batch_generate_pitches`.
- **Quality Agent** — Best-practices and Agent Overlay compliance; uses `validate_best_practices`.
- **Code Reviewer Agent** — Structured code review (skill-based).
- **Debugging Agent** — Systematic debugging (skill-based).
- **TDD Agent** — Test-driven development (skill-based).
- **UI/UX Agent** — Frontend and accessibility; uses `analyze_ui_ux`.

### 2. MCP Servers

| Server | Purpose | Location / config |
|--------|---------|-------------------|
| **ai-product-agents** | PRD generation, architecture analysis, pitches, security/code review, refactor, etc. | `.claude/mcp.json`; runs from `Development_agents` |
| **Render** (if present) | Deployments, logs, Postgres, env (e.g. `mcp_render_*`) | MCP config |
| **Browser** (if present) | Navigate, snapshot, click, type (e.g. browser automation tools) | MCP config |
| **Web fetch** | Read URL content (e.g. `mcp_web_fetch`) | MCP config |

**Note:** A full “across /Users/miguelfranco” registry would also scan other project dirs (e.g. `Development_agents`, other repos) for `mcp.json` / `package.json` MCP definitions and list them with source path.

### 3. Tools

Tools are the callable capabilities exposed by MCP servers (and optionally by agents that wrap them).

**From ai-product-agents (examples):**

- `generate_prd`, `analyze_architecture`, `generate_pitch`, `batch_generate_pitches`
- `review_code_security`, `profile_performance`, `refactor_code`, `track_tech_debt`
- `audit_dependencies`, `validate_best_practices`, `review_architecture`
- `generate_integration_tests`, `instrument_observability`, `manage_db_migration`
- `analyze_ui_ux`, `orchestrate_pipeline` (full PRD → deploy pipeline)

**From Render (examples):**  
`list_services`, `get_service`, `list_deploys`, `list_logs`, `create_web_service`, `query_render_postgres`, etc.

**From Browser (examples):**  
`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, etc.

The registry would list **tool name**, **short description**, **MCP server**, and optionally **used by agents**.

## Scope: “Across all our code in /Users/miguelfranco”

- **In-repo (alpha-speed-ai-studio):**  
  Agents from platform agent configs, MCP from `.claude/mcp.json`, and tools inferred from docs (e.g. `AI_PRODUCT_AGENTS_GUIDE.md`) and MCP tool lists.
- **Broader scope (optional):**  
  A script or build step could:
  - Scan `/Users/miguelfranco` (or a configurable root) for:
    - `**/.cursor/agents/*.md`
    - `**/.claude/mcp.json` and `**/mcp.json`
    - Repos that declare MCP in `package.json` or similar
  - Output a single JSON/YAML registry (agents, mcpServers, tools) that the site consumes.

For the **mockup**, we use only what’s already in this repo and referenced docs; the UI should still be designed so it can later be wired to a generated registry (e.g. from a script that scans /Users/miguelfranco).

## Section Placement

- **Suggested:** After **Platform** (“Why αlphaspeed AI”) and before or after **Use Cases**.
- **Anchor:** `#agents` (or `#agents-as-service`).
- **Header nav:** Add “Agents” or “Agent Registry” in Header/Footer.

## UI Concept (Mockup)

- **Section title:** e.g. “Agents as a Service” with subhead: “A single registry of agents, MCP servers, and tools across our platform.”
- **Tabs or subsections:**  
  - **Agents** — Cards/list: name, short description, source (Platform / Claude / Skill), “Tools used” if any.  
  - **MCP Servers** — Name, purpose, config path or “Configured in project X”.  
  - **Tools** — Name, description, server, optional “Used by” agents.
- **Visual style:** Match existing site: dark theme, teal accent, `Badge`, `gradient-text`, card grid, `card-hover`.
- **Data:** Mockup uses static data from this repo; later replace with props or fetch from a generated `registry.json`.

## Implementation Options

1. **Static section** — Hard-coded list from this repo (fast, good for mockup).
2. **Config-driven** — `src/data/agent-registry.json` (or YAML) committed and updated by a script that scans /Users/miguelfranco.
3. **Build-time** — Script in `package.json` pre-build that generates `registry.json` from disk scan; section reads it at build time.
4. **Runtime API** — Backend or serverless endpoint that scans or reads a stored registry; section fetches on load (only if you add a backend).

Recommendation: start with **static/mockup** (this doc + `AgentsAsServiceSection.tsx`), then move to **config-driven** or **build-time** once the scan scope (e.g. /Users/miguelfranco) and output format are fixed.

---

*Summary and mockup prepared for the αlphaspeed AI marketing site.*
