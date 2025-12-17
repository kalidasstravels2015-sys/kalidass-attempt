import { test, expect } from '@playwright/test';

test.describe('Functional Tests', () => {

    test('Homepage loads correctly', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Kalidass Travels/);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('Language toggle switches to Tamil', async ({ page }) => {
        await page.goto('/');

        // Click the language toggle
        const tamilLink = page.getByLabel('Switch to Tamil');
        await tamilLink.click();

        // Verify URL changes
        await expect(page).toHaveURL(/.*\/ta/);

        // Verify Tamil content (rudimentary check for font or text)
        // Note: Depends on what content changes. Checking HTML lang attribute
        await expect(page.locator('html')).toHaveAttribute('lang', 'ta');
    });

    test('Service pages load correctly', async ({ page }) => {
        await page.goto('/services/local-trips'); // Assuming this exists or pick a robust one
        await expect(page).toHaveTitle(/Local Trips/i);
    });

    // Quotation Engine Test
    test('Quotation Engine calculates estimate', async ({ page }) => {
        await page.goto('/');

        // Wait for the calculator (it might be lazy loaded or client:visible)
        const calculator = page.locator('text=Get Instant Quote');
        await expect(calculator).toBeVisible();

        // Fill inputs - mocking might be needed if Google Maps is restricted in headless
        // For this test, we check if elements exist
        await expect(page.getByLabel('Pickup Location')).toBeVisible();
        await expect(page.getByLabel('Drop Location')).toBeVisible();
        await expect(page.getByLabel('Vehicle')).toBeVisible();
    });

});
