type AnalyticsEventType = "page_view" | "lead_event" | "cta_click" | "scroll_depth";

export type AnalyticsEvent = {
  type: AnalyticsEventType;
  name: string;
  path: string;
  timestamp: number;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
};

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "alpha_traffic_events_v1";
const MAX_EVENTS = 5000;

let initialized = false;

const safeWindow = () => (typeof window !== "undefined" ? window : null);

const getAttribution = () => {
  const win = safeWindow();
  if (!win) {
    return {};
  }

  const params = new URLSearchParams(win.location.search);
  const source = params.get("utm_source") ?? undefined;
  const medium = params.get("utm_medium") ?? undefined;
  const campaign = params.get("utm_campaign") ?? undefined;
  const content = params.get("utm_content") ?? undefined;
  const term = params.get("utm_term") ?? undefined;
  const referrer = document.referrer || undefined;

  return { source, medium, campaign, content, term, referrer };
};

const readStoredEvents = (): AnalyticsEvent[] => {
  const win = safeWindow();
  if (!win) {
    return [];
  }

  try {
    const raw = win.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as AnalyticsEvent[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

const writeStoredEvents = (events: AnalyticsEvent[]) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  try {
    win.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    // Ignore quota errors to avoid breaking UX.
  }
};

const persistEvent = (event: AnalyticsEvent) => {
  const events = readStoredEvents();
  events.push(event);
  writeStoredEvents(events);
};

const injectGtagScript = (measurementId: string) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  const existing = document.querySelector(`script[data-ga-id="${measurementId}"]`);
  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);

  win.dataLayer = win.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    win.dataLayer?.push(args);
  };
  win.gtag = gtag;

  gtag("js", new Date());
  gtag("config", measurementId, { send_page_view: false });
};

export const initAnalytics = () => {
  if (initialized) {
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    injectGtagScript(measurementId);
  }

  initialized = true;
};

export const trackEvent = (type: AnalyticsEventType, name: string, params: EventParams = {}) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  const attribution = getAttribution();
  const event: AnalyticsEvent = {
    type,
    name,
    path: win.location.pathname,
    timestamp: Date.now(),
    ...attribution,
  };
  persistEvent(event);

  if (win.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    win.gtag("event", name, {
      ...params,
      event_category: type,
      page_path: win.location.pathname,
      page_location: win.location.href,
      page_title: document.title,
      ...attribution,
    });
  }
};

export const trackPageView = (path: string, title: string) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  const attribution = getAttribution();
  persistEvent({
    type: "page_view",
    name: "page_view",
    path,
    timestamp: Date.now(),
    ...attribution,
  });

  if (win.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    win.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: win.location.href,
      ...attribution,
    });
  }
};

export const trackLead = (name: string, params: EventParams = {}) => {
  trackEvent("lead_event", name, params);
};

export const getStoredAnalyticsEvents = () => readStoredEvents();

export const clearStoredAnalyticsEvents = () => {
  const win = safeWindow();
  if (!win) {
    return;
  }
  win.localStorage.removeItem(STORAGE_KEY);
};
