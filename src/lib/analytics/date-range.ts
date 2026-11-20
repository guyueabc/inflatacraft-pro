/**
 * Pure date-window resolution for the admin traffic API.
 *
 * Kept separate from the route handler so it can be unit tested without a
 * database. All boundaries are UTC because the analytics tables store
 * timestamps without a display timezone and the dashboard sends UTC dates.
 */

export type TrafficView = "day" | "week" | "month" | "range";

export const TRAFFIC_VIEWS: readonly TrafficView[] = ["day", "week", "month", "range"];

export const MAX_RANGE_DAYS = 366;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** UTC midnight of the given instant. Never returns "now", so windows are never in the future. */
export function utcStartOfDay(base: Date = new Date()): Date {
  return new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate()));
}

/** Parses `YYYY-MM-DD` as UTC midnight. Returns null for missing or invalid input. */
export function parseAnalyticsDate(value: string | null | undefined): Date | null {
  if (!value || !DATE_PATTERN.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function addUtcDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

export type TrafficWindow =
  | { ok: true; view: TrafficView; start: Date; end: Date; days: number }
  | { ok: false; error: string };

export type TrafficWindowParams = {
  view?: string | null;
  date?: string | null;
  start?: string | null;
  end?: string | null;
};

export function resolveTrafficWindow(params: TrafficWindowParams): TrafficWindow {
  const requestedView = params.view || "day";
  if (!TRAFFIC_VIEWS.includes(requestedView as TrafficView)) {
    return { ok: false, error: "Invalid view" };
  }
  const view = requestedView as TrafficView;

  // A missing/invalid `date` anchors on the current UTC day, so `view=day`
  // covers [today 00:00Z, tomorrow 00:00Z) instead of starting at "now".
  const anchor = parseAnalyticsDate(params.date) ?? utcStartOfDay();

  let start = anchor;
  let end = addUtcDays(anchor, 1);

  if (view === "week") {
    const weekday = anchor.getUTCDay() || 7; // Monday = 1 ... Sunday = 7
    start = addUtcDays(anchor, 1 - weekday);
    end = addUtcDays(start, 7);
  } else if (view === "month") {
    start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
    end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 1));
  } else if (view === "range") {
    const from = parseAnalyticsDate(params.start);
    const to = parseAnalyticsDate(params.end);
    if (!from || !to) return { ok: false, error: "start and end are required (YYYY-MM-DD)" };
    if (to.getTime() < from.getTime()) return { ok: false, error: "end must be on or after start" };
    start = from;
    end = addUtcDays(to, 1);
  }

  const days = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  if (days < 1 || days > MAX_RANGE_DAYS) {
    return { ok: false, error: `Range must be 1-${MAX_RANGE_DAYS} days` };
  }

  return { ok: true, view, start, end, days };
}
