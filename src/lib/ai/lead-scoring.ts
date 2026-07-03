// ─── Lead Scoring System ────────────────────────────────────────────────────
//
// Pure TypeScript lead scoring — NO AI / LLM dependency.
// Deterministic, explainable, and tunable. Given a lead's contact input
// (name, email, deadline, etc.) plus a set of behavioural signals captured
// by the frontend analytics layer, produces a score, letter grade (A/B/C),
// human-readable reasons, and a recommended next sales action.
//
// Signal weights follow the inflatablemodel (qddjtx.com) sales playbook:
//   quoteSubmitted      30  (strongest intent — they filled the form)
//   quoteViewed         15  (came back to view their quote)
//   safetyPageViewed    12  (buying on compliance → high-quality lead)
//   productPagesViewed  10  (browsing catalog — escalating interest)
//   downloadsClicked     8  (grabbed spec sheet / guide)
//   repeatVisits         8  (returning visitor)
//   hasDeadline         10  (time-bound → purchase pressure)
//   hasArtwork           8  (ready to produce → closeable)
//   hasBudget            8  (budget stated → qualified)
//   whatsappProvided    10  (gave a direct line → high intent)
//   messageLength        8  (detailed message → serious inquiry)
//
// Category thresholds:
//   A (hot):      score >= 60   → immediate sales follow-up
//   B (warm):     score 30–59   → nurture + automated email sequence
//   C (cold):     score < 30    → newsletter / remarketing only

// ─── Types ──────────────────────────────────────────────────────────────────

export interface LeadSignals {
  /** Lead submitted the quote form. */
  quoteSubmitted: boolean;
  /** Lead returned to view their generated quote. */
  quoteViewed: boolean;
  /** Number of distinct product pages viewed (capped at 5 for scoring). */
  productPagesViewed: number;
  /** Lead viewed the safety / compliance / materials page. */
  safetyPageViewed: boolean;
  /** Lead clicked a download (spec sheet, guide, case study PDF). */
  downloadsClicked: boolean;
  /** Number of return visits in the last 14 days (capped at 3 for scoring). */
  repeatVisits: number;
  /** Lead stated a specific event deadline. */
  hasDeadline: boolean;
  /** Lead indicated final artwork is ready. */
  hasArtwork: boolean;
  /** Lead stated a budget range. */
  hasBudget: boolean;
  /** Lead provided a WhatsApp / direct phone number. */
  whatsappProvided: boolean;
  /** Character length of the lead's free-text message. */
  messageLength: number;
}

export interface LeadContactInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  productType?: string;
  quantity?: number;
  deadline?: string;
  budget?: string;
  message?: string;
  whatsapp?: string;
}

export type LeadCategory = "A" | "B" | "C";

export interface LeadScoreResult {
  /** 0–100 numeric score. */
  score: number;
  /** A (hot), B (warm), C (cold). */
  category: LeadCategory;
  /** Human-readable reasons for the score (one per contributing signal). */
  reasons: string[];
  /** Recommended next sales action. */
  nextAction: string;
}

// ─── Signal weights ─────────────────────────────────────────────────────────

export const SIGNAL_WEIGHTS = {
  quoteSubmitted: 30,
  quoteViewed: 15,
  safetyPageViewed: 12,
  productPagesViewed: 10, // per page, capped
  downloadsClicked: 8,
  repeatVisits: 8, // per visit, capped
  hasDeadline: 10,
  hasArtwork: 8,
  hasBudget: 8,
  whatsappProvided: 10,
  messageLength: 8, // threshold-based
} as const;

export const CATEGORY_THRESHOLDS = {
  A: 60,
  B: 30,
} as const;

// ─── Category resolver ──────────────────────────────────────────────────────

export function categoryForScore(score: number): LeadCategory {
  if (score >= CATEGORY_THRESHOLDS.A) return "A";
  if (score >= CATEGORY_THRESHOLDS.B) return "B";
  return "C";
}

// ─── Next-action resolver ───────────────────────────────────────────────────

export function nextActionFor(
  category: LeadCategory,
  signals: LeadSignals,
): string {
  switch (category) {
    case "A":
      if (signals.whatsappProvided) {
        return "Call/WhatsApp the lead within 2 business hours — quote submitted + direct line provided. Reference their stated deadline and confirm production slot.";
      }
      if (signals.hasDeadline) {
        return "Email + call within 4 business hours. Lead is time-bound. Send a firm production timeline and rush-production options.";
      }
      return "Email a personalized quote follow-up within 4 business hours. Lead shows high intent — include 3D rendering offer and direct calendar link.";
    case "B":
      return "Add to 3-day nurture sequence: send spec sheet + case study, then a check-in email. Re-evaluate if the lead returns to view their quote.";
    case "C":
      return "Add to newsletter + remarketing audience. No direct sales contact yet — lead is in research phase.";
  }
}

// ─── Derive signals from contact input ──────────────────────────────────────

/**
 * Derive LeadSignals from the raw contact form submission when behavioural
 * analytics aren't available (e.g. first-touch, no tracking consent).
 */
export function deriveSignalsFromInput(
  input: LeadContactInput,
): LeadSignals {
  const message = input.message ?? "";
  return {
    quoteSubmitted: true, // they submitted the form
    quoteViewed: false,
    productPagesViewed: 0,
    safetyPageViewed: false,
    downloadsClicked: false,
    repeatVisits: 0,
    hasDeadline: Boolean(input.deadline && input.deadline.trim().length > 0),
    hasArtwork: /artwork|logo|vector|ai file|eps|svg|ready/i.test(message),
    hasBudget: Boolean(input.budget && !/not sure|unknown|n\/a/i.test(input.budget)),
    whatsappProvided: Boolean(input.whatsapp && input.whatsapp.trim().length > 0),
    messageLength: message.length,
  };
}

// ─── Main entry: scoreLead ──────────────────────────────────────────────────

export function scoreLead(
  input: LeadContactInput,
  signals: LeadSignals,
): LeadScoreResult {
  const reasons: string[] = [];
  let score = 0;

  // quoteSubmitted — 30
  if (signals.quoteSubmitted) {
    score += SIGNAL_WEIGHTS.quoteSubmitted;
    reasons.push("Submitted a quote request (+30)");
  }

  // quoteViewed — 15
  if (signals.quoteViewed) {
    score += SIGNAL_WEIGHTS.quoteViewed;
    reasons.push("Returned to view their quote (+15)");
  }

  // safetyPageViewed — 12
  if (signals.safetyPageViewed) {
    score += SIGNAL_WEIGHTS.safetyPageViewed;
    reasons.push("Viewed safety/compliance page — buying on standards (+12)");
  }

  // productPagesViewed — 10 per page, capped at 5
  const productPages = Math.min(signals.productPagesViewed, 5);
  if (productPages > 0) {
    score += productPages * SIGNAL_WEIGHTS.productPagesViewed;
    reasons.push(`Viewed ${productPages} product page(s) (+${productPages * SIGNAL_WEIGHTS.productPagesViewed})`);
  }

  // downloadsClicked — 8
  if (signals.downloadsClicked) {
    score += SIGNAL_WEIGHTS.downloadsClicked;
    reasons.push("Downloaded a spec sheet / guide (+8)");
  }

  // repeatVisits — 8 per visit, capped at 3
  const repeatVisits = Math.min(signals.repeatVisits, 3);
  if (repeatVisits > 0) {
    score += repeatVisits * SIGNAL_WEIGHTS.repeatVisits;
    reasons.push(`${repeatVisits} return visit(s) in 14 days (+${repeatVisits * SIGNAL_WEIGHTS.repeatVisits})`);
  }

  // hasDeadline — 10
  if (signals.hasDeadline) {
    score += SIGNAL_WEIGHTS.hasDeadline;
    reasons.push("Stated a specific event deadline (+10)");
  }

  // hasArtwork — 8
  if (signals.hasArtwork) {
    score += SIGNAL_WEIGHTS.hasArtwork;
    reasons.push("Indicated artwork is ready (+8)");
  }

  // hasBudget — 8
  if (signals.hasBudget) {
    score += SIGNAL_WEIGHTS.hasBudget;
    reasons.push("Stated a budget range (+8)");
  }

  // whatsappProvided — 10
  if (signals.whatsappProvided) {
    score += SIGNAL_WEIGHTS.whatsappProvided;
    reasons.push("Provided a WhatsApp / direct number (+10)");
  }

  // messageLength — 8 (threshold: detailed message >= 80 chars)
  if (signals.messageLength >= 80) {
    score += SIGNAL_WEIGHTS.messageLength;
    reasons.push("Detailed inquiry message (80+ chars) (+8)");
  } else if (signals.messageLength >= 20) {
    // Partial credit for a short-but-present message.
    score += 4;
    reasons.push("Short inquiry message (+4)");
  }

  // Cap at 100.
  score = Math.min(score, 100);

  const category = categoryForScore(score);
  const nextAction = nextActionFor(category, signals);

  return { score, category, reasons, nextAction };
}
