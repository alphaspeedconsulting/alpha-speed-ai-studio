import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  it("includes high-intent navigation links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: /case studies/i })).toHaveAttribute(
      "href",
      "/case-studies"
    );
    expect(screen.getByRole("link", { name: /roi calculator/i })).toHaveAttribute(
      "href",
      "/roi-calculator"
    );
    expect(screen.getByRole("link", { name: /agentvault/i })).toHaveAttribute(
      "href",
      "/agentvault"
    );
  });
});
