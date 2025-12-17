---
title: Fix Additional UI Issues
status: completed
description: Fixed duplicate language toggles, fleet images, proprietor photo, and partner carousel.
---

## Issues Fixed

### 1. Duplicate Language Toggle in Navbar
**Issue:** Two language toggle buttons appearing in navbar (one in desktop menu, one showing on mobile too).
**Root Cause:** Desktop language toggle was placed outside the desktop menu div, so it showed on both desktop and mobile.
**Fix:** Moved the desktop `<LanguageToggle>` component inside the desktop menu div (before the closing tag at line 523).
**File:** `src/layouts/Layout.astro`

### 2. Fleet Images Not Loading
**Issue:** Toyota Etios and Tata Sumo images not displaying in fleet section.
**Root Cause:** JSON referenced `.jpg` and `.png` extensions but actual files are `.webp`.
**Fix:** Updated image paths in `siteContent.json`:
- `toyoto-etios.jpg` → `toyoto-etios.webp`
- `Tata-Sumo.png` → `Tata-Sumo.webp`

### 3. Proprietor Photo in Mobile Sidebar
**Issue:** Proprietor photo not loading in mobile navigation drawer.
**Root Cause:** Path was `/images/mani-perumal.jpg` but file is in `/images/drivers/mani-perumal.webp`.
**Fix:** Updated path in `Layout.astro` line 716 to `/images/drivers/mani-perumal.webp`.

### 4. Pondicherry Day Trip Image
**Issue:** Image not loading for Pondicherry destination.
**Root Cause:** Using external Pexels URL which may be blocked or slow.
**Location:** `src/pages/services/category/[category].astro` line 69
**Note:** Currently using external URL: `https://images.pexels.com/photos/32009229/pexels-photo-32009229.jpeg`
**Recommendation:** Download and host image locally for better performance and reliability.

### 5. Partners Carousel Mobile Scrolling
**Issue:** Partners showing as duplicated grid on mobile instead of horizontal scroll.
**Fix Applied:** 
- Added mobile detection with `useState` and `useEffect`
- Changed scrolling partners array to single array on mobile, doubled on desktop
- Updated className to support both mobile horizontal scroll (`overflow-x-auto snap-x`) and desktop animation
**File:** `src/components/react/PartnersCarousel.jsx`
**Note:** Carousel now shows horizontal scroll on mobile (<768px) and auto-animation on desktop.

## Files Modified
1. `src/layouts/Layout.astro` - Fixed duplicate language toggle and proprietor photo
2. `src/data/siteContent.json` - Fixed fleet image extensions
3. `src/components/react/PartnersCarousel.jsx` - Added mobile horizontal scroll support

## Remaining Item
- Consider downloading Pondicherry image locally instead of using external Pexels URL for better performance
