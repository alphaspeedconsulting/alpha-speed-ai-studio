import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GovernanceSection from "../GovernanceSection";
import { DEMO_VIDEOS, GOVERNANCE_FACTS } from "@/lib/constants";

const renderSection = () =>
  render(
    <MemoryRouter>
      <GovernanceSection />
    </MemoryRouter>
  );

describe("GovernanceSection", () => {
  it("renders every governance fact", () => {
    renderSection();
    for (const fact of GOVERNANCE_FACTS) {
      expect(screen.getByText(fact.title)).toBeInTheDocument();
      expect(screen.getByText(fact.stat)).toBeInTheDocument();
    }
  });

  it("exposes the #governance anchor used by the header nav", () => {
    const { container } = renderSection();
    expect(container.querySelector("section#governance")).toBeTruthy();
  });

  it("keeps the video lazy and labelled so it does not regress LCP or a11y", () => {
    const { container } = renderSection();
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("aria-label");
  });

  it("renders the single featured video, so the demo carousel cannot duplicate it", () => {
    const featured = DEMO_VIDEOS.filter((video) => video.featured);
    expect(featured).toHaveLength(1);

    const { container } = renderSection();
    expect(container.querySelectorAll("video")).toHaveLength(1);
  });
});
