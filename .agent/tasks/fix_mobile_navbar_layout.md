---
title: Fix Mobile Navbar Layout - All Elements in One Row
status: completed
description: Moved language toggle and hamburger menu into main navbar flex container so all elements appear in one row on mobile.
---

## Issue
The language toggle button and hamburger menu were in a separate div below the logo, causing them to appear on a different row on mobile.

## Root Cause
The mobile controls were placed in a separate `<div>` outside the main `flex justify-between` container:
```astro
<div class="flex justify-between items-center h-16">
  <!-- Logo here -->
  <!-- Desktop menu here -->
</div>
<!-- Mobile controls were here - separate div! -->
```

## Solution
Moved the mobile controls div **inside** the main flex container, so it participates in the `justify-between` layout:
```astro
<div class="flex justify-between items-center h-16">
  <!-- Logo (left side) -->
  <div class="flex-shrink-0 flex items-center gap-3">
    <a href="/">Logo</a>
  </div>

  <!-- Desktop Menu (right side, hidden on mobile) -->
  <div class="hidden md:flex items-center space-x-8">
    ...menu items...
  </div>

  <!-- Mobile Controls (right side, visible only on mobile) -->
  <div class="flex items-center gap-3 md:hidden">
    <LanguageToggle />
    <button>Hamburger</button>
  </div>
</div>
```

## Result
✅ Logo on the left
✅ Language toggle and hamburger menu on the right
✅ All three elements in one horizontal row on mobile
✅ Proper spacing with `gap-3` between translate button and hamburger

## File Modified
- `src/layouts/Layout.astro` (lines 524-566)
