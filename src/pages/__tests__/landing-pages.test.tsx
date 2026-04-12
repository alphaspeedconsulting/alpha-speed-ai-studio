import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContractorsAIAutomation from "../ContractorsAIAutomation";
import DfwAIAutomationServices from "../DfwAIAutomationServices";

const renderPage = (ui: React.ReactElement) => {
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>
  );
};

describe("organic landing pages", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    document.head.innerHTML = "";
    document.title = "";
  });

  it("renders the DFW services page with a dedicated canonical URL", () => {
    renderPage(<DfwAIAutomationServices />);

    expect(
      screen.getByRole("heading", { name: /DFW AI Automation Services/i })
    ).toBeInTheDocument();
    return waitFor(() => {
      expect(document.title).toMatch(/DFW AI Automation Services/i);
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://alphaspeedai.com/dfw-ai-automation-services/"
      );
    });
  });

  it("renders the contractors page with a dedicated canonical URL", () => {
    renderPage(<ContractorsAIAutomation />);

    expect(
      screen.getByRole("heading", { name: /AI Automation for Contractors/i })
    ).toBeInTheDocument();
    return waitFor(() => {
      expect(document.title).toMatch(/AI Automation for Contractors/i);
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://alphaspeedai.com/ai-automation-for-contractors/"
      );
    });
  });
});
