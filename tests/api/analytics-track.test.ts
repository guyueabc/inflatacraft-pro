import { NextRequest, NextResponse } from "next/server";
import { describe, expect, it, vi } from "vitest";

const { transaction, executeRaw } = vi.hoisted(() => ({
  transaction: vi.fn(),
  executeRaw: vi.fn(() => Promise.resolve(1)),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: transaction,
    $executeRawUnsafe: executeRaw,
  },
}));

vi.mock("@/lib/admin-auth", () => ({
  requireAdmin: vi.fn(async () => NextResponse.json({ error: "Unauthorized" }, { status: 401 })),
}));

import { GET } from "../../src/app/api/analytics/track/route";

describe("analytics page-view beacon", () => {
  it("keeps the visitor log insert compatible with the deployed legacy table", async () => {
    transaction.mockResolvedValueOnce([]);

    const request = new NextRequest(
      "https://qddjtx.com/api/analytics/track?p=%2Ffaq&vid=visitor_test_identifier&sid=session_test_identifier"
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(executeRaw).toHaveBeenCalledTimes(2);
    const call = executeRaw.mock.calls.at(1);
    expect(call).toBeDefined();
    const [query, ...values] = call as unknown as [string, ...unknown[]];
    expect(query).toContain(
      "INSERT INTO visitor_logs (visitor_id, is_owner, is_test, traffic_type, created_at)"
    );
    expect(query).not.toContain("ip_address");
    expect(values).toHaveLength(4);
  });
});
