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
});
