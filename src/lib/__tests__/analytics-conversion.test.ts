import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { setConsent, CONSENT_KEY } from "../analytics";

describe("trackConversion", () => {
  beforeEach(() => {
    setConsent("accepted");
  });

  afterEach(() => {
    delete (window as Window & { fbq?: unknown }).fbq;
    delete (window as Window & { ttq?: unknown }).ttq;
    delete (window as Window & { gtag?: unknown }).gtag;
    window.localStorage.removeItem(CONSENT_KEY);
    window.localStorage.removeItem("alpha_traffic_events_v1");
  });

  it("fires gtag with the GA4 recommended event name", async () => {
    const gtagMock = vi.fn();
    (window as Window & { gtag: typeof gtagMock }).gtag = gtagMock;

    const { trackConversion } = await import("../analytics");
    trackConversion("generate_lead", "calendly_popup_opened", {
      placement: "hero",
    });

    // trackEvent fires gtag once, then trackConversion fires it again with the type as event name
    const gtagCalls = gtagMock.mock.calls.filter(
      (call) => call[0] === "event" && call[1] === "generate_lead",
    );
    expect(gtagCalls.length).toBeGreaterThanOrEqual(1);
    expect(gtagCalls[0][2]).toMatchObject({
      event_label: "calendly_popup_opened",
    });
  });

  it("fires fbq standard event for generate_lead", async () => {
    const fbqMock = vi.fn();
    (window as Window & { fbq: typeof fbqMock }).fbq = fbqMock;

    const { trackConversion } = await import("../analytics");
    trackConversion("generate_lead", "test_lead", { placement: "test" });

    const trackCalls = fbqMock.mock.calls.filter(
      (call) => call[0] === "track" && call[1] === "Lead",
    );
    expect(trackCalls.length).toBe(1);
  });

  it("fires fbq CompleteRegistration for sign_up", async () => {
    const fbqMock = vi.fn();
    (window as Window & { fbq: typeof fbqMock }).fbq = fbqMock;

    const { trackConversion } = await import("../analytics");
    trackConversion("sign_up", "email_capture", { placement: "homepage" });

    const trackCalls = fbqMock.mock.calls.filter(
      (call) => call[0] === "track" && call[1] === "CompleteRegistration",
    );
    expect(trackCalls.length).toBe(1);
  });

  it("does not throw when no pixels are loaded", async () => {
    const { trackConversion } = await import("../analytics");
    expect(() =>
      trackConversion("schedule_appointment", "test", {}),
    ).not.toThrow();
  });

  it("persists event to localStorage when consent accepted", async () => {
    const { trackConversion } = await import("../analytics");
    trackConversion("sign_up", "email_capture_submit", {
      placement: "homepage",
    });

    const stored = window.localStorage.getItem("alpha_traffic_events_v1");
    expect(stored).not.toBeNull();
    const events = JSON.parse(stored!);
    const signUpEvents = events.filter(
      (e: { type: string }) => e.type === "sign_up",
    );
    expect(signUpEvents.length).toBeGreaterThan(0);
  });
});

describe("LinkedIn Insight Tag injection", () => {
  afterEach(() => {
    // Clean up injected scripts
    document
      .querySelectorAll("script[data-linkedin-partner-id]")
      .forEach((el) => el.remove());
    window.localStorage.removeItem(CONSENT_KEY);
  });

  it("does not inject when VITE_LINKEDIN_PARTNER_ID is not set", () => {
    // By default in test env, no env vars are set
    const scripts = document.querySelectorAll(
      "script[data-linkedin-partner-id]",
    );
    expect(scripts.length).toBe(0);
  });
});
