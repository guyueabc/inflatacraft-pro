import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "@/lib/auth";

/**
 * POST /api/upload — File upload handler (placeholder for Uploadthing / S3 integration).
 *
 * In production this route should delegate to an external file-storage service.
 * Current placeholder returns a stub response so front-end integration can proceed.
 */

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Replace with actual upload logic:
    //
    //   Option A — Uploadthing:
    //     1. Import `utapi` from "@/lib/uploadthing"
    //     2. Parse multipart/form-data
    //     3. Call `utapi.uploadFiles(files)`
    //     4. Return the resulting URLs
    //
    //   Option B — AWS S3 via @aws-sdk/client-s3:
    //     1. Generate pre-signed POST URL
    //     2. Return URL + fields for client-side direct upload
    //
    //   Option C — Local filesystem (dev only):
    //     1. Write file to public/uploads/
    //     2. Return /uploads/<filename>

    // Placeholder response
    const placeholderUrl = `https://placehold.co/600x400/1a365d/c53030?text=Upload+Placeholder`;

    return NextResponse.json(
      {
        success: true,
        url: placeholderUrl,
        message: "Upload handler placeholder — integrate Uploadthing or S3",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/upload]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/upload — Return upload configuration (optional, for pre-signed URLs).
 *
 * Placed here so the route file fully supports the upload API surface.
 */
export async function GET() {
  return NextResponse.json({
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    maxFiles: 20,
  });
}
