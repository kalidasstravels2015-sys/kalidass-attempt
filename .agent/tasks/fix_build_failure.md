---
title: Fix Netlify Build Failures
status: completed
description: Resolved import errors, deprecated web-vitals API usage, and PWA cache limit issues.
---

## Issues & Fixes

### 1. Relative Import Error
**Issue:** `src/pages/ta/services/[slug].astro` was using `../../layouts/Layout.astro`, failing to resolve because it needed to go up 3 levels.
**Fix:** Updated imports to `../../../layouts/Layout.astro` and `../../../data/serviceDetails.json`.

### 2. Analytics / Web Vitals Error
**Issue:** `onFID` is not exported by `web-vitals` (v5+), causing build failure in `src/lib/analytics.js`.
**Fix:** Removed `onFID` import and usage from `src/lib/analytics.js`. `onINP` is already present as the replacement metric.

### 3. PWA Generation Failure
**Issue:** Large image asset (`images/services/temple-tours.webp`, ~3MB) exceeded the default Workbox cache limit of 2MB, causing `vite-plugin-pwa` to fail during Service Worker generation.
**Fix:** Updated `astro.config.mjs` to increase `workbox.maximumFileSizeToCacheInBytes` to 5MB (5000000 bytes).

## Verification
- Local build passed static entrypoint generation.
- PWA generation issues addressed by config update.
