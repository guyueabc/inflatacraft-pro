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
    const emailInput = page.getByRole("textbox", { name: "Email *" });
    await expect(emailInput).toBeVisible({ timeout: 15000 });

    // Fill with invalid email
    await emailInput.fill("not-an-email");

    // Click submit button (has type="button", uses form.handleSubmit)
    const submitButton = page.locator('button:has-text("Submit Quote Request")');
    await submitButton.click();

    // Should show validation error from react-hook-form + zod
    const errorMessage = page.getByText("Please enter a valid email address.");
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
  // 6. Downloads page exposes verified online resources and canonical
  // ────────────────────────────────────────────────────────────
  test("downloads page exposes working online resources and its own canonical", async ({ page }) => {
    await page.goto("/downloads");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://qddjtx.com/downloads"
    );

    const expectedResources = [
      "/buying-guide",
      "/materials",
      "/setup-guide",
      "/quality-process",
      "/blog/inflatable-maintenance-guide",
    ];
    for (const href of expectedResources) {
      const resourceLink = page.locator(`a[href="${href}"]`, {
        hasText: "Open Resource",
      });
      await expect(resourceLink).toHaveCount(1);
      await expect(resourceLink).toBeVisible();

      const response = await page.request.get(href);
      expect(response.status(), `${href} should return HTTP 200`).toBe(200);
    }
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  });

  // ────────────────────────────────────────────────────────────
  // 7. Products page does not expose unsupported fixed lead-time filters
  // ────────────────────────────────────────────────────────────
  test("products page omits unsupported fixed lead-time filters", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Lead Time", { exact: true })).toHaveCount(0);
    await expect(page.getByText(/^(1-2|3-4|5-6) Weeks$/)).toHaveCount(0);
  });

  // ────────────────────────────────────────────────────────────
  // 8. Cart uses quote-only commercial terms without blank totals
  // ────────────────────────────────────────────────────────────
  test("cart presents a complete quote request summary", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "inflatacraft-cart",
        JSON.stringify({
          state: {
            items: [
              {
                id: "e2e-cart-item",
                productId: "inflatable-arch",
                name: "Inflatable Arch",
                price: null,
                quantity: 2,
                image: "",
                isCustom: true,
              },
            ],
          },
          version: 0,
        })
      );
    });

    await page.goto("/cart");
    const summary = page
      .getByRole("heading", { name: "Quote Request Summary" })
      .locator("..");
    await expect(summary).toBeVisible({ timeout: 15000 });
    await expect(summary.getByText("Selected items", { exact: true })).toBeVisible();
    await expect(
      summary.getByText("Confirmed in written quote", { exact: true })
    ).toHaveCount(2);
    await expect(
      summary.getByRole("link", { name: "Request Project Quote" })
    ).toHaveAttribute("href", "/get-quote");
    await expect(
      summary.getByText(/^(Subtotal|Tax \(estimated\)|Total)$/)
    ).toHaveCount(0);
    expect((await page.locator("body").innerText()).toLowerCase()).not.toContain(
      "checkout"
    );
  });

  // ────────────────────────────────────────────────────────────
  // 9. llms.txt only publishes working product links and neutral gallery copy
  // ────────────────────────────────────────────────────────────
  test("llms.txt publishes working product links and neutral gallery copy", async ({
    page,
  }) => {
    const response = await page.request.get("/llms.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain(
      "Gallery: https://qddjtx.com/gallery — Visual references for product forms and customization options"
    );
    expect(text).not.toContain("Case studies and past projects");

    const productPaths = [
      ...new Set(text.match(/\/products\/[a-z0-9-]+/g) ?? []),
    ];
    expect(productPaths).toHaveLength(6);
    for (const productPath of productPaths) {
      const productResponse = await page.request.get(productPath);
      expect(
        productResponse.status(),
        `${productPath} should return HTTP 200`
      ).toBe(200);
    }
  });

  // ────────────────────────────────────────────────────────────
  // 10. Materials page loads with H1
  // ────────────────────────────────────────────────────────────
  test("materials page loads with H1", async ({ page }) => {
    await page.goto("/materials");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 11. AI builder page loads with H1
  // ────────────────────────────────────────────────────────────
  test("ai-builder page loads with H1", async ({ page }) => {
    await page.goto("/ai-builder");
    await expect(
      page.getByRole("heading", { level: 1 })
    ).toBeVisible({ timeout: 15000 });
  });

  // ────────────────────────────────────────────────────────────
  // 12. Quote pending page loads
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
  // 13. Admin/login redirects to login page when accessing /admin/stats
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
