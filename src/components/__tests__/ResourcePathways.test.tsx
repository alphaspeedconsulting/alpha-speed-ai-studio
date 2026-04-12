import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ResourcePathways from "../ResourcePathways";

describe("ResourcePathways", () => {
  it("surfaces the core commercial and content destinations", () => {
    render(
      <MemoryRouter>
        <ResourcePathways />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /browse ai automation insights/i })
    ).toHaveAttribute("href", "/blog");
    expect(
      screen.getByRole("link", { name: /review client case studies/i })
    ).toHaveAttribute("href", "/case-studies");
    expect(
      screen.getByRole("link", { name: /estimate your ai roi/i })
    ).toHaveAttribute("href", "/roi-calculator");
    expect(
      screen.getByRole("link", { name: /explore agentvault/i })
    ).toHaveAttribute("href", "/agentvault");
  });
});
