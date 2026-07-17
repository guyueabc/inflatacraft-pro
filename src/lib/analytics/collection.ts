const LOCAL_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^169\.254\./,
  /^::1$/,
];

const CHINA_IP_PATTERNS = [
  /^1\.(0|1|2|4|5|6|8|9|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|10[0-9]|11[0-9]|12[0-7])\./,
  /^14\./,
  /^27\./,
  /^36\./,
  /^39\./,
  /^42\./,
  /^49\./,
  /^58\./,
  /^59\./,
  /^60\./,
  /^61\./,
  /^10[6-9]\./,
  /^11[0-9]\./,
  /^12[0-6]\./,
  /^171\./,
  /^175\./,
  /^180\./,
  /^182\./,
  /^183\./,
  /^202\./,
  /^210\./,
  /^211\./,
  /^21[8-9]\./,
  /^22[0-3]\./,
];

export function classifyCountry(ip: string): "CN" | "local" | "unknown" {
  if (!ip || ip === "0.0.0.0") return "unknown";
  if (LOCAL_IP_PATTERNS.some((pattern) => pattern.test(ip))) return "local";
  if (CHINA_IP_PATTERNS.some((pattern) => pattern.test(ip))) return "CN";
  return "unknown";
}

export function sanitizeAnalyticsValue(value: string | null, maxLength: number): string {
  return (value ?? "").trim().slice(0, maxLength);
}

export function sanitizePath(value: string | null): string {
  const path = sanitizeAnalyticsValue(value, 500);
  return path.startsWith("/") ? path : "/";
}

export function sanitizeVisitorId(value: string | null): string | null {
  if (!value || !/^[a-zA-Z0-9_-]{16,64}$/.test(value)) return null;
  return value;
}
