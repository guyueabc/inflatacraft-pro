"use client";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export function readAttributionValue(key: string): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(key);
    if (fromUrl) {
      try { sessionStorage.setItem(key, fromUrl); } catch {}
      return fromUrl;
    }
    return sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export function getExternalReferrer(): string {
  const current = document.referrer;
  try {
    if (current && !current.startsWith(window.location.origin)) {
      sessionStorage.setItem("analytics_external_referrer", current);
      return current;
    }
    return sessionStorage.getItem("analytics_external_referrer") || "";
  } catch {
    return current && !current.startsWith(window.location.origin) ? current : "";
  }
}

export function getLeadTrackingPayload() {
  const payload: Record<string, string> = {
    page: window.location.pathname,
    referrer: getExternalReferrer(),
  };
  for (const key of ATTRIBUTION_KEYS) {
    const value = readAttributionValue(key);
    if (value) payload[key] = value;
  }
  return payload;
}

export function getPartialLeadTrackingPayload() {
  const full = getLeadTrackingPayload();
  return {
    page: full.page,
    referrer: full.referrer,
    utmSource: full.utm_source || "",
    utmMedium: full.utm_medium || "",
  };
}

export function partialLeadAlreadySent(): boolean {
  try {
    return sessionStorage.getItem("partial_sent") === "1";
  } catch {
    return false;
  }
}

export function markPartialLeadSent(): void {
  try { sessionStorage.setItem("partial_sent", "1"); } catch {}
}

export function trackClientEvent(event: string, parameters: Record<string, unknown> = {}) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer?.push({ event, ...parameters });
  analyticsWindow.gtag?.("event", event, parameters);
}