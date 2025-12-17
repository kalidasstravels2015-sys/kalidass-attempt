---
title: Fix Netlify Build Failures & Remove PWA
status: completed
description: Resolved import errors, deprecated web-vitals API usage, and removed PWA functionality from the site.
---

## Issues & Fixes

### 1. Relative Import Error
**Issue:** `src/pages/ta/services/[slug].astro` was using `../../layouts/Layout.astro`, failing to resolve because it needed to go up 3 levels.
**Fix:** Updated imports to `../../../layouts/Layout.astro` and `../../../data/serviceDetails.json`.

### 2. Analytics / Web Vitals Error
**Issue:** `onFID` is not exported by `web-vitals` (v5+), causing build failure in `src/lib/analytics.js`.
**Fix:** Removed `onFID` import and usage from `src/lib/analytics.js`. `onINP` is already present as the replacement metric.

### 3. PWA Removal (User Request)
**Issue:** User requested complete removal of PWA functionality from the site.
**Changes:**
- Removed `VitePWA` configuration from `astro.config.mjs`
- Removed `vite-plugin-pwa` import from config
- Uninstalled `vite-plugin-pwa` package (286 packages removed)
- Deleted `src/pwa.ts` file
- Cleaned up vite plugins array in config

### 4. Variable Initialization Order Error
**Issue:** `ReferenceError: Cannot access 'isTamil' before initialization` in `Layout.astro`
**Fix:** Reordered code in Layout.astro to ensure `isTamil` is defined before being used in the services map.

## Verification
✅ Build completed successfully in 111.12s
✅ No PWA-related files or configuration remain
✅ All import paths resolved correctly
✅ Web vitals analytics working with updated API
