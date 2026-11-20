import { describe, expect, it } from "vitest";
import {
  MAX_RANGE_DAYS,
  parseAnalyticsDate,
  resolveTrafficWindow,
  utcStartOfDay,
} from "@/lib/analytics/date-range";

function expectOk(window: ReturnType<typeof resolveTrafficWindow>) {
  if (!window.ok) throw new Error(`expected a window, got error: ${window.error}`);
  return window;
}

describe("traffic window resolution", () => {
  it("anchors a dateless day view on the current UTC day instead of the current instant", () => {
    const window = expectOk(resolveTrafficWindow({ view: "day" }));
    expect(window.start.getUTCHours()).toBe(0);
    expect(window.start.getUTCMinutes()).toBe(0);
    expect(window.start.getTime()).toBeLessThanOrEqual(Date.now());
    expect(window.end.getTime() - window.start.getTime()).toBe(86400000);
    expect(window.days).toBe(1);
    expect(window.start.toISOString().slice(0, 10)).toBe(new Date().toISOString().slice(0, 10));
  });

  it("defaults to the day view when no view is supplied", () => {
    const window = expectOk(resolveTrafficWindow({}));
    expect(window.view).toBe("day");
    expect(window.days).toBe(1);
  });

  it("keeps the requested day", () => {
    const window = expectOk(resolveTrafficWindow({ view: "day", date: "2026-11-19" }));
    expect(window.start.toISOString()).toBe("2026-11-19T00:00:00.000Z");
    expect(window.end.toISOString()).toBe("2026-11-20T00:00:00.000Z");
  });

  it("treats a malformed date as today rather than throwing", () => {
    const window = expectOk(resolveTrafficWindow({ view: "day", date: "2026-13-45" }));
    expect(window.start.toISOString().slice(0, 10)).toBe(new Date().toISOString().slice(0, 10));
  });

  it("starts weeks on Monday", () => {
    // 2026-11-19 is a Thursday
    const window = expectOk(resolveTrafficWindow({ view: "week", date: "2026-11-19" }));
    expect(window.start.toISOString()).toBe("2026-11-16T00:00:00.000Z");
    expect(window.end.toISOString()).toBe("2026-11-23T00:00:00.000Z");
    expect(window.days).toBe(7);
  });

  it("starts months on the first UTC day and never leaks into the next month", () => {
    const window = expectOk(resolveTrafficWindow({ view: "month", date: "2026-11-19" }));
    expect(window.start.toISOString()).toBe("2026-11-01T00:00:00.000Z");
    expect(window.end.toISOString()).toBe("2026-12-01T00:00:00.000Z");
    expect(window.days).toBe(30);
  });

  it("includes both ends of an explicit range", () => {
    const window = expectOk(resolveTrafficWindow({ view: "range", start: "2026-11-13", end: "2026-11-19" }));
    expect(window.start.toISOString()).toBe("2026-11-13T00:00:00.000Z");
    expect(window.end.toISOString()).toBe("2026-11-20T00:00:00.000Z");
    expect(window.days).toBe(7);
  });

  it("accepts a single-day range", () => {
    const window = expectOk(resolveTrafficWindow({ view: "range", start: "2026-11-19", end: "2026-11-19" }));
    expect(window.days).toBe(1);
  });

  it("rejects a range without both bounds", () => {
    expect(resolveTrafficWindow({ view: "range", start: "2026-11-13" })).toEqual({
      ok: false,
      error: "start and end are required (YYYY-MM-DD)",
    });
    expect(resolveTrafficWindow({ view: "range" }).ok).toBe(false);
  });

  it("rejects a reversed range", () => {
    expect(resolveTrafficWindow({ view: "range", start: "2026-11-19", end: "2026-11-13" })).toEqual({
      ok: false,
      error: "end must be on or after start",
    });
  });

  it("caps the range length", () => {
    const result = resolveTrafficWindow({ view: "range", start: "2024-01-01", end: "2026-11-19" });
    expect(result.ok).toBe(false);
    expect(resolveTrafficWindow({ view: "range", start: "2025-11-20", end: "2026-11-19" }).ok).toBe(
      MAX_RANGE_DAYS >= 365
    );
  });

  it("rejects unknown views", () => {
    expect(resolveTrafficWindow({ view: "year" })).toEqual({ ok: false, error: "Invalid view" });
  });

  it("parses only strict UTC date strings", () => {
    expect(parseAnalyticsDate("2026-11-20")?.toISOString()).toBe("2026-11-20T00:00:00.000Z");
    expect(parseAnalyticsDate("2026-11-32")).toBeNull();
    expect(parseAnalyticsDate("2026-1-2")).toBeNull();
    expect(parseAnalyticsDate("")).toBeNull();
    expect(parseAnalyticsDate(null)).toBeNull();
  });

  it("rounds a late-evening instant down to UTC midnight", () => {
    const instant = new Date("2026-11-19T23:30:00.000Z");
    expect(utcStartOfDay(instant).toISOString()).toBe("2026-11-19T00:00:00.000Z");
  });
});
