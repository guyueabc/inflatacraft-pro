import { describe, expect, it } from "vitest";
import { POST as upload } from "@/app/api/upload/route";
import { POST as stripeWebhook } from "@/app/api/webhooks/stripe/route";

describe("unfinished external integrations", () => {
  it("does not report a successful upload before storage is implemented", async () => {
    const response = await upload();
    const body = await response.json();

    expect(response.status).toBe(501);
    expect(body.success).toBe(false);
    expect(body.url).toBeUndefined();
  });

  it("does not acknowledge Stripe events before signature verification is implemented", async () => {
    const response = await stripeWebhook();
    const body = await response.json();

    expect(response.status).toBe(501);
    expect(body.received).toBe(false);
  });
});
