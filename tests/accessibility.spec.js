import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage Accessibility', () => {
    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/');

        // Wait for content to load
        await page.waitForSelector('main', { state: 'visible' });

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have a skip to content link', async ({ page }) => {
        await page.goto('/');
        // Press tab to focus the skip link
        await page.keyboard.press('Tab');
        const skipLink = page.locator('a[href="#main-content"]');
        await expect(skipLink).toBeVisible();
        await expect(skipLink).toBeFocused();
    });
});

test.describe('Keyboard Navigation', () => {
    test('Mobile menu should be keyboard accessible', async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        const menuBtn = page.getByLabel('Open mobile menu');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();

        const drawer = page.locator('#mobile-menu-drawer');
        await expect(drawer).toBeVisible();

        // Check if focus is trapped or moved to menu (implementation specific, checking visibility for now)
        const firstLink = drawer.getByRole('link').first();
        await expect(firstLink).toBeVisible();
    });
});
