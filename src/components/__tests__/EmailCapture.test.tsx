import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmailCapture from "../EmailCapture";

// Mock analytics
vi.mock("@/lib/analytics", () => ({
  trackConversion: vi.fn(),
}));

describe("EmailCapture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the email input and subscribe button", () => {
    render(<EmailCapture />);
    expect(
      screen.getByPlaceholderText("your@email.com"),
    ).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("shows validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<EmailCapture />);

    // Submit without typing anything — zod catches empty string
    await user.click(screen.getByText("Subscribe"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address"),
      ).toBeInTheDocument();
    });
  });

  it("shows success state after valid submission", async () => {
    // Mock Supabase fetch
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    const user = userEvent.setup();
    render(<EmailCapture />);

    await user.type(
      screen.getByPlaceholderText("your@email.com"),
      "test@example.com",
    );
    await user.click(screen.getByText("Subscribe"));

    await waitFor(() => {
      expect(screen.getByText(/You're in!/)).toBeInTheDocument();
    });
  });

  it("fires trackConversion on successful submit", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    const { trackConversion } = await import("@/lib/analytics");

    const user = userEvent.setup();
    render(<EmailCapture />);

    await user.type(
      screen.getByPlaceholderText("your@email.com"),
      "test@example.com",
    );
    await user.click(screen.getByText("Subscribe"));

    await waitFor(() => {
      expect(trackConversion).toHaveBeenCalledWith(
        "sign_up",
        "email_capture_submit",
        { placement: "homepage_email_capture" },
      );
    });
  });
});
