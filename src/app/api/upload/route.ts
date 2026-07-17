import { NextResponse } from "next/server";

/**
 * File storage is intentionally unavailable until authenticated, validated,
 * private object storage is configured. Returning a placeholder URL would lose
 * customer artwork while falsely reporting success.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      code: "UPLOAD_NOT_CONFIGURED",
      error: "File upload is temporarily unavailable. Please submit the inquiry without an attachment.",
    },
    { status: 501 }
  );
}
