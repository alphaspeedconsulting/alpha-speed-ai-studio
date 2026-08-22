import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CockpitSection from "../CockpitSection";
import { COCKPIT_CAPABILITIES } from "@/lib/constants";

describe("CockpitSection", () => {
  it("renders every capability with its outcome", () => {
    render(<CockpitSection />);
    for (const capability of COCKPIT_CAPABILITIES) {
      expect(screen.getByText(capability.title)).toBeInTheDocument();
      expect(screen.getByText(`→ ${capability.outcome}`)).toBeInTheDocument();
    }
  });

  it("exposes the #cockpit anchor", () => {
    const { container } = render(<CockpitSection />);
    expect(container.querySelector("section#cockpit")).toBeTruthy();
  });

  /**
   * The cockpit describes a system holding live client and commercial data.
   * Public copy must stay at the capability level. This is the automated
   * backstop on that constraint — it fails loudly if internal detail is ever
   * pasted into the marketing copy.
   */
  it("never leaks client names or commercial detail into public copy", () => {
    const { container } = render(<CockpitSection />);
    const copy = (container.textContent ?? "").toLowerCase();

    const mustNeverAppear = [
      "harvest",
      "docshemprx",
      "briar",
      "phoenix",
      "elliemd",
      "giant vapes",
      "marcelena",
      "dcr roofing",
    ];
    for (const term of mustNeverAppear) {
      expect(copy).not.toContain(term);
    }

    // Commercial detail and contact info have no place in this section either.
    expect(copy).not.toMatch(/\$\s?\d/);
    expect(copy).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(copy).not.toMatch(/\b(retainer|invoice|contract value|deal size)\b/);
  });
});
