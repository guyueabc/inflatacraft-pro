import { test, expect } from "@playwright/test";

test.describe("InflatableModel E2E Tests", () => {
  // ────────────────────────────────────────────────────────────
  // 1. Homepage loads with hero visible
  // ────────────────────────────────────────────────────────────
  test("homepage loads with hero carousel visible", async ({ page }) => {
    await page.goto("/");

    // Hero section should be rendered
    const hero = page.locator('[aria-roledescription="carousel"]');
    await expect(hero).toBeVisible({ timeout: 15000 });

    // At least one heading should be visible
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });

  // ────────────────────────────────────────────────────────────
  // 2. Gallery has gallery cards with images
  // ────────────────────────────────────────────────────────────
  test("gallery page shows gallery cards with images", async ({ page }) => {
    await page.goto("/gallery");

    // Gallery cards should be present
    const cards = page.locator('[data-testid="gallery-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // At least one card should be visible
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Cards should contain images (SmartImage or fallback)
    const firstCard = cards.first();
    const img = firstCard.locator("img").first();
    // Image should exist (either loaded or fallback rendered)
    const hasImageOrFallback =
      (await img.count()) > 0 ||
      (await firstCard.locator('[role="img"]').count()) > 0;
    expect(hasImageOrFallback).toBeTruthy();
  });

  // ────────────────────────────────────────────────────────────
  // 3. Quote form validates email
  // ────────────────────────────────────────────────────────────
  test("quote form validates email field", async ({ page }) => {
    await page.goto("/get-quote");

    // The email input should be present
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible({ timeout: 15000 });

    // Fill with invalid email
    await emailInput.fill("not-an-email");

    // Click submit button (has type="button", uses form.handleSubmit)
    const submitButton = page.locator('button:has-text("Submit Quote Request")');
    await submitButton.click();

    // Should show validation error from react-hook-form + zod
    const errorMessage = page.locator("text=请输入有效的邮箱地址");
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  // ────────────────────────────────────────────────────────────
  // 4. Mobile viewport renders hero properly
  // ────────────────────────────────────────────────────────────
  test("mobile viewport renders hero carousel properly", async ({
    page,
  }) => {
    // Set to Pixel 5 viewport (mobile)
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto("/");

    // Hero carousel should still be visible on mobile
    const hero = page.locator('[aria-roledescription="carousel"]');
    await expect(hero).toBeVisible({ timeout: 15000 });

    // Heading should be readable on mobile
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();

    // Navigation dots should be visible
    const dots = hero.locator('button[aria-label^="Go to slide"]');
    const dotCount = await dots.count();
    expect(dotCount).toBeGreaterThan(0);
  });

  // ────────────────────────────────────────────────────────────
  // 5. Safety-compliance page loads with H1
  // ────────────────────────────────────────────────────────────
  test("safety-compliance page loads with H1", async ({ page }) => {
    await page.goto("/safety-compliance");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 6. Downloads page loads with H1
  // ────────────────────────────────────────────────────────────
  test("downloads page loads with H1", async ({ page }) => {
    await page.goto("/downloads");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 7. Materials page loads with H1
  // ────────────────────────────────────────────────────────────
  test("materials page loads with H1", async ({ page }) => {
    await page.goto("/materials");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 8. AI builder page loads with H1
  // ────────────────────────────────────────────────────────────
  test("ai-builder page loads with H1", async ({ page }) => {
    await page.goto("/ai-builder");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 9. Quote pending page loads
  // ────────────────────────────────────────────────────────────
  test("quote pending page loads", async ({ page }) => {
    await page.goto("/quote/pending", { waitUntil: "domcontentloaded" });
    // Should not throw a 500 error; page renders some content
    const body = page.locator("body");
    await expect(body).toBeVisible({ timeout: 15000 });
    // H1 may or may not be present; just ensure body content exists
    const textContent = await body.textContent();
    expect(textContent!.length).toBeGreaterThan(0);
  });

  // ────────────────────────────────────────────────────────────
  // 10. Admin/login redirects to login page when accessing /admin/stats
  // ────────────────────────────────────────────────────────────
  test("admin/stats redirects to login when unauthenticated", async ({
    page,
  }) => {
    await page.goto("/admin/stats", { waitUntil: "domcontentloaded" });
    // Should redirect away from /admin/stats (to /admin/login or /login)
    await page.waitForURL(/\/(admin\/)?login/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/(admin\/)?login/);
  });
});
