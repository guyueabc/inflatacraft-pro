import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { estimateInflatableQuote } from "@/lib/ai/pricing-engine";
import { scoreLead } from "@/lib/ai/lead-scoring";

const MAX_SUBMISSIONS_PER_IP = 5;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

/**
 * POST /api/quote
 * 接收询盘数据 → 生成预算报价 + 客户评分 → 存入数据库 → 返回报价
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ message: "Spam detected." }, { status: 400 });
    }

    // Rate limit check
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.formSubmission.count({
      where: {
        formType: "quote",
        ipAddress: ip,
        createdAt: { gte: twentyFourHoursAgo },
      },
    });

    if (recentCount >= MAX_SUBMISSIONS_PER_IP) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate pricing estimate
    const quoteInput = {
      productType: body.productType || "other",
      intendedUse: body.intendedUse || "other",
      indoorOutdoor: body.indoorOutdoor || "unknown",
      targetDimensions: body.size || "",
      quantity: body.quantity ? parseInt(body.quantity) : 1,
      country: body.country || "",
      peopleInteract: body.peopleInteract || "unknown",
      voltagePlug: body.voltagePlug || "",
      artworkReady: body.artworkReady || "",
      requiredDocuments: body.requiredDocuments || [],
    };

    const estimate = estimateInflatableQuote(quoteInput as any);

    // Generate lead score
    const leadScore = scoreLead(quoteInput as any, {
      quoteSubmitted: true,
      hasDeadline: Boolean(body.deadline),
      hasArtwork: body.artworkReady?.includes("Yes"),
      hasBudget: Boolean(body.budgetRange),
      whatsappProvided: Boolean(body.phone),
      messageLength: body.description?.length || 0,
    });

    // Extract UTM params
    const utmSource = body.utm_source || "";
    const utmMedium = body.utm_medium || "";
    const utmCampaign = body.utm_campaign || "";

    // Store in database
    const submission = await prisma.formSubmission.create({
      data: {
        formType: "quote",
        data: {
          email: body.email,
          phone: body.phone || "",
          name: body.name || "",
          company: body.company || "",
          country: body.country || "",
          productType: body.productType || "",
          intendedUse: body.intendedUse || "",
          indoorOutdoor: body.indoorOutdoor || "",
          peopleInteract: body.peopleInteract || "",
          installationSurface: body.installationSurface || "",
          voltagePlug: body.voltagePlug || "",
          artworkReady: body.artworkReady || "",
          description: body.description || "",
          size: body.size || "",
          quantity: body.quantity || "",
          budgetRange: body.budgetRange || "",
          deadline: body.deadline || "",
          estimate: estimate,
          leadScore: leadScore,
        },
        ipAddress: ip,
        gclid: body.gclid || "",
        utmSource,
        utmMedium,
        utmCampaign,
      },
    });

    const quoteId = submission.id;

    return NextResponse.json({
      quoteId,
      estimate,
      leadScore,
      nextUrl: `/quote/pending?id=${quoteId}`,
    }, { status: 201 });

  } catch (error) {
    console.error("[POST /api/quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/quote?id=xxx
 * 查看报价详情
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Quote ID required" }, { status: 400 });
  }

  try {
    const submission = await prisma.formSubmission.findUnique({
      where: { id },
      select: {
        id: true,
        data: true,
        createdAt: true,
      },
    });

    if (!submission) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ quote: submission });
  } catch (error) {
    console.error("[GET /api/quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
