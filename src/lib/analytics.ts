type AnalyticsEventType = "page_view" | "lead_event" | "cta_click" | "scroll_depth" | "generate_lead" | "form_submit" | "schedule_appointment" | "sign_up";

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
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  }
}

const STORAGE_KEY = "alpha_traffic_events_v1";
const MAX_EVENTS = 5000;
export const CONSENT_KEY = "alpha_cookie_consent_v1";

export type ConsentState = "accepted" | "declined" | null;

export const getConsent = (): ConsentState => {
  const win = safeWindow();
  if (!win) return null;
  const value = win.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
};

export const setConsent = (state: "accepted" | "declined") => {
  const win = safeWindow();
  if (!win) return;
  win.localStorage.setItem(CONSENT_KEY, state);
  if (state === "declined") {
    win.localStorage.removeItem(STORAGE_KEY);
  }
};

const isDNT = (): boolean => {
  const win = safeWindow();
  if (!win) return false;
  return win.navigator.doNotTrack === "1";
};

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
  if (getConsent() !== "accepted") {
    return;
  }
  const events = readStoredEvents();
  events.push(event);
  writeStoredEvents(events);
  sendEventToSupabase(event);
};

function sendEventToSupabase(event: AnalyticsEvent) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  const body = {
    type: event.type,
    name: event.name,
    path: event.path,
    source: event.source ?? null,
    medium: event.medium ?? null,
    campaign: event.campaign ?? null,
    content: event.content ?? null,
    term: event.term ?? null,
    referrer: event.referrer ?? null,
    created_at: new Date(event.timestamp).toISOString(),
  };
  fetch(`${url.replace(/\/$/, "")}/rest/v1/analytics_events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  }).catch(() => {});
}

const injectMetaPixelScript = (pixelId: string) => {
  const win = safeWindow();
  if (!win) return;
  if (typeof win.fbq === "function") return;
  if (document.querySelector(`script[data-meta-pixel-id="${pixelId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.metaPixelId = pixelId;
  script.textContent = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','${pixelId}');fbq('track','PageView');
  `;
  document.head.appendChild(script);
};

const injectTikTokPixelScript = (pixelId: string) => {
  const win = safeWindow();
  if (!win) return;
  if (win.ttq) return;
  if (document.querySelector(`script[data-tiktok-pixel-id="${pixelId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.tiktokPixelId = pixelId;
  script.textContent = `
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement('script');o.type='text/javascript';o.async=!0;o.src=i+'?sdkid='+e+'&lib='+t;var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};ttq.load('${pixelId}');ttq.page();}(window,document,'ttq');
  `;
  document.head.appendChild(script);
};

const injectLinkedInInsightTag = (partnerId: string) => {
  const win = safeWindow();
  if (!win) return;
  if (document.querySelector(`script[data-linkedin-partner-id="${partnerId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.linkedinPartnerId = partnerId;
  script.textContent = `
    _linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);
  `;
  document.head.appendChild(script);

  // LinkedIn noscript pixel
  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.height = 1;
  img.width = 1;
  img.style.display = "none";
  img.alt = "";
  img.src = `https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);
};

const injectGtagScript = (measurementId: string, consentGranted: boolean) => {
  const win = safeWindow();
  if (!win) {
    return;
  }

  if (typeof win.gtag === "function") {
    return;
  }

  const srcMatch = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`);
  if (srcMatch) {
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

  // Consent Mode v2: must be set before gtag('config') so GA4 can model
  // estimated traffic even for visitors who have not yet consented.
  gtag("consent", "default", {
    analytics_storage: consentGranted ? "granted" : "denied",
    ad_storage: "denied",
    wait_for_update: 500,
  });

  gtag("js", new Date());
  gtag("config", measurementId, { send_page_view: false });
};

/**
 * Loads the GA4 script unconditionally with Consent Mode v2.
 * Call this on every page load so GA4 can model traffic regardless of
 * whether the visitor has accepted the cookie banner.
 */
export const initGtagBase = () => {
  if (import.meta.env.VITE_ANALYTICS_ENABLED === "false") return;
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  injectGtagScript(measurementId, getConsent() === "accepted");
};

export const initAnalytics = () => {
  if (initialized) {
    return;
  }

  // Gate all pixel injection when explicitly disabled (e.g. in dev/test)
  if (import.meta.env.VITE_ANALYTICS_ENABLED === "false") {
    initialized = true;
    return;
  }

  // Require explicit consent before enabling full tracking
  if (getConsent() !== "accepted") {
    return;
  }

  // Upgrade consent so GA4 switches from modeled to full data collection
  const win = safeWindow();
  if (win?.gtag) {
    win.gtag("consent", "update", { analytics_storage: "granted" });
  } else {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      injectGtagScript(measurementId, true);
    }
  }

  // Skip third-party marketing pixels when DNT is enabled
  if (!isDNT()) {
    const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (metaPixelId) {
      injectMetaPixelScript(metaPixelId);
    }

    const tikTokPixelId = import.meta.env.VITE_TIKTOK_PIXEL_ID;
    if (tikTokPixelId) {
      injectTikTokPixelScript(tikTokPixelId);
    }

    const linkedInPartnerId = import.meta.env.VITE_LINKEDIN_PARTNER_ID;
    if (linkedInPartnerId) {
      injectLinkedInInsightTag(linkedInPartnerId);
    }
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

  if (win.gtag) {
    win.gtag("event", name, {
      ...params,
      event_category: type,
      page_path: win.location.pathname,
      page_location: win.location.href,
      page_title: document.title,
      ...attribution,
    });
  }

  if (win.fbq) {
    win.fbq("trackCustom", name, { event_category: type, ...params });
  }

  if (win.ttq) {
    win.ttq.track(name, { event_category: type, ...params });
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

  if (win.gtag) {
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

/**
 * Fires a GA4-recommended conversion event. These event types should be marked
 * as Key Events in GA4 Admin → Events to appear in conversion reports.
 *
 * Supported types: "generate_lead", "form_submit", "schedule_appointment", "sign_up"
 */
export const trackConversion = (
  type: "generate_lead" | "form_submit" | "schedule_appointment" | "sign_up",
  name: string,
  params: EventParams = {},
) => {
  // Fire through the standard pipeline (Supabase + localStorage + pixels)
  trackEvent(type, name, params);

  // Also push the GA4 recommended event name directly so GA4 recognises it
  // as a Key Event candidate (GA4 expects the event name to match its type).
  const win = safeWindow();
  if (win?.gtag) {
    win.gtag("event", type, {
      ...params,
      event_label: name,
      page_path: win.location.pathname,
      page_location: win.location.href,
    });
  }

  // Fire Facebook standard events for matching conversion types
  if (win?.fbq) {
    const fbEventMap: Record<string, string> = {
      generate_lead: "Lead",
      schedule_appointment: "Schedule",
      sign_up: "CompleteRegistration",
      form_submit: "SubmitApplication",
    };
    const fbEvent = fbEventMap[type];
    if (fbEvent) {
      win.fbq("track", fbEvent, { content_name: name, ...params });
    }
  }
};

export const getStoredAnalyticsEvents = () => readStoredEvents();

export const clearStoredAnalyticsEvents = () => {
  const win = safeWindow();
  if (!win) {
    return;
  }
  win.localStorage.removeItem(STORAGE_KEY);
};
