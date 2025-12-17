---
title: Fix Navbar Mobile Layout and Floating Call Button
status: completed
description: Improved mobile navbar spacing and reduced floating call button size with better shadows.
---

## Changes Made

### 1. Mobile Navbar Layout
**Issue:** Logo, hamburger menu, and translate button were not aligned properly in one row.
**Fix:** Reduced gap between mobile controls from `gap-6` to `gap-3` for tighter, more compact layout.
**File:** `src/layouts/Layout.astro` line 535
**Result:** All three elements (logo, translate button, hamburger) now sit nicely in one row on mobile.

### 2. Floating Call Button
**Issue:** Call button was too large with distracting ping animation.
**Changes:**
- **Removed** the ping animation layer (`animate-ping` div)
- **Reduced size** from `w-16 h-16` to `w-14 h-14`
- **Reduced padding** from `p-4` to `p-3`
- **Reduced icon size** from `w-8 h-8` to `w-6 h-6`
- **Enhanced shadow** from `shadow-lg` to `shadow-xl` for better depth
- **Reduced hover scale** from `scale-110` to `scale-105` for subtler interaction
**File:** `src/layouts/Layout.astro` lines 787-812
**Result:** Smaller, cleaner call button with better shadow and no distracting animation.

## Visual Improvements
- ✅ Mobile navbar is more compact and organized
- ✅ Floating call button is less intrusive
- ✅ Better shadow depth on call button
- ✅ Smoother, subtler hover animation
- ✅ No more distracting ping animation
