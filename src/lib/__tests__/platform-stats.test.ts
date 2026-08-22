import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  DEVELOPER_LICENSE_PRODUCT_AGENTS,
  PLATFORM_CATALOG_COUNTS,
  PLATFORM_STATS,
  PLATFORM_STATS_VERIFIED_ON,
  TIER_ENTITLEMENTS,
  TIER_ENTITLEMENTS_VERIFIED_ON,
} from "../constants";

/**
 * Drift guard for every published AgentVault count.
 *
 * The site previously carried four mutually contradictory workflow figures
 * (38 on-site, 73 in the sales kit, 81 in a stale local registry, 83 in the
 * repo registry) because the numbers were hard-coded in nine places with no
 * single source of truth. These tests exist so that cannot recur silently.
 */
describe("platform catalog stats", () => {
  it("stamps a parseable verification date", () => {
    expect(Number.isNaN(Date.parse(PLATFORM_STATS_VERIFIED_ON))).toBe(false);
  });

  it("keeps the floor-framed stats consistent with the exact catalog counts", () => {
    const byLabel = Object.fromEntries(PLATFORM_STATS.map((s) => [s.label, s.value]));

    // Each "N+" tile must be a true floor for the real catalog count.
    const floors: Array<[string, number]> = [
      [byLabel.Workflows, PLATFORM_CATALOG_COUNTS.workflows],
      [byLabel.Skills, PLATFORM_CATALOG_COUNTS.skills],
      [byLabel.Agents, PLATFORM_CATALOG_COUNTS.agents],
    ];
    for (const [displayed, actual] of floors) {
      const floor = Number.parseInt(displayed.replace("+", ""), 10);
      expect(floor).toBeLessThanOrEqual(actual);
    }

    // MCP servers is exact, not floor-framed.
    expect(byLabel["MCP Servers"]).toBe(String(PLATFORM_CATALOG_COUNTS.mcpServers));
  });

  it("keeps the local/hybrid/remote split adding up to the workflow total", () => {
    const { workflowsLocal, workflowsHybrid, workflowsRemote, workflows } =
      PLATFORM_CATALOG_COUNTS;
    expect(workflowsLocal + workflowsHybrid + workflowsRemote).toBe(workflows);
  });

  it("no longer publishes any of the stale workflow figures", () => {
    const rendered = PLATFORM_STATS.map((s) => `${s.value} ${s.detail ?? ""}`).join(" ");
    for (const stale of ["38", "73", "81"]) {
      expect(rendered).not.toContain(stale);
    }
  });
});

describe("tier entitlements", () => {
  it("stamps a parseable verification date", () => {
    expect(Number.isNaN(Date.parse(TIER_ENTITLEMENTS_VERIFIED_ON))).toBe(false);
  });

  it("matches TIER_MANIFESTS in the AgentVault repo", () => {
    // Source: cowork_plugin/agentvault_platform/server.py → TIER_MANIFESTS
    // (counted from the real lists, NOT the drifted description strings).
    expect(TIER_ENTITLEMENTS.basic).toMatchObject({
      skills: 7,
      connectors: 8,
      agents: 0,
      workflows: 8,
      rateLimit: 100,
    });
    expect(TIER_ENTITLEMENTS.advanced).toMatchObject({
      skills: 23,
      connectors: 17,
      agents: 9,
      workflows: 34,
      rateLimit: 1000,
      workflowRuns: 20,
    });
  });

  it("never sells more than the catalog holds", () => {
    // An entitlement claim above the catalog total would be unfulfillable.
    expect(TIER_ENTITLEMENTS.advanced.workflows).toBeLessThanOrEqual(
      PLATFORM_CATALOG_COUNTS.workflows
    );
    expect(TIER_ENTITLEMENTS.advanced.skills).toBeLessThanOrEqual(
      PLATFORM_CATALOG_COUNTS.skills
    );
  });

  it("grants Basic strictly less than Advanced on every axis", () => {
    const axes = ["skills", "connectors", "agents", "workflows"] as const;
    for (const axis of axes) {
      expect(Number(TIER_ENTITLEMENTS.basic[axis])).toBeLessThanOrEqual(
        Number(TIER_ENTITLEMENTS.advanced[axis])
      );
    }
  });

  it("keeps the 13 AI Product Agents scoped to the Developer License", () => {
    // 13 is the Developer License figure (full runtime via repo access).
    // Advertising it against Advanced overstates that tier by 4 agents.
    expect(DEVELOPER_LICENSE_PRODUCT_AGENTS).toBe(13);
    expect(TIER_ENTITLEMENTS.advanced.agents).not.toBe(DEVELOPER_LICENSE_PRODUCT_AGENTS);
  });
});

describe("static sales kit", () => {
  // The sales kit is hand-maintained HTML and cannot import from constants.ts,
  // so it is guarded by reading the shipped file from disk instead.
  const salesKit = readFileSync(
    path.resolve(__dirname, "../../../public/alpha-speed-sales-kit.html"),
    "utf8"
  );

  it("no longer claims 73 pre-built workflows", () => {
    expect(salesKit).not.toContain("73 pre-built workflows");
  });

  it("agrees with the workflow figure published on the site", () => {
    const siteWorkflows = PLATFORM_STATS.find((s) => s.label === "Workflows")?.value;
    expect(siteWorkflows).toBeDefined();
    expect(salesKit).toContain(`${siteWorkflows} pre-built workflows`);
  });
});
