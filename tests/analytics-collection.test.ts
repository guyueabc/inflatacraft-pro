import { describe, expect, it } from "vitest";
import { classifyCountry, sanitizeAnalyticsValue } from "@/lib/analytics/collection";

describe("analytics collection", () => {
  it("keeps an unverified public IP country unknown instead of inventing US", () => {
    expect(classifyCountry("8.8.8.8")).toBe("unknown");
  });

  it("classifies local and Chinese IPs only when there is direct evidence", () => {
    expect(classifyCountry("192.168.1.20")).toBe("local");
    expect(classifyCountry("14.1.2.3")).toBe("CN");
  });

  it("bounds analytics dimensions before persistence", () => {
    expect(sanitizeAnalyticsValue("x".repeat(600), 20)).toBe("x".repeat(20));
    expect(sanitizeAnalyticsValue(null, 20)).toBe("");
  });
});
