---
title: Fix Desktop Navbar Spacing and Booking Form Width
status: completed
description: Added proper spacing to language toggle button and reduced booking form container width for better desktop layout.
---

## Issues Fixed

### 1. Language Toggle Too Close to Calculator
**Issue:** The language toggle button was appearing right next to the Calculator link with no spacing.
**Fix:** Wrapped the LanguageToggle component in a div with `ml-4` (margin-left: 1rem) to add proper spacing.

**Before:**
```astro
<a href="/calculator">Calculator</a>
<LanguageToggle />
```

**After:**
```astro
<a href="/calculator">Calculator</a>
<div class="ml-4">
  <LanguageToggle />
</div>
```

### 2. Booking Form Still Too Wide on Desktop
**Issue:** Despite adding `max-w-2xl` to the form card, it was still stretching too wide because the parent container had `max-w-6xl`.
**Fix:** Reduced the BookingPanel container from `max-w-6xl` (1152px) to `max-w-3xl` (768px).

**Before:**
```astro
<section class="... max-w-6xl mx-auto ...">
  <QuotationEngine />
</section>
```

**After:**
```astro
<section class="... max-w-3xl mx-auto ...">
  <QuotationEngine />
</section>
```

## Result

### Desktop Navbar
✅ **Proper spacing** between Calculator and language toggle
✅ **Better visual hierarchy** in navigation
✅ **Cleaner, more professional** appearance

### Booking Form
✅ **Compact, centered form** on desktop
✅ **Max width of 768px** (max-w-3xl container)
✅ **Form card max 672px** (max-w-2xl on card itself)
✅ **Better proportions** relative to hero image
✅ **Improved usability** - not stretched too wide
✅ **Still responsive** - full width on mobile/tablet

## Files Modified
1. `src/layouts/Layout.astro` - Added `ml-4` wrapper to desktop language toggle
2. `src/components/BookingPanel.astro` - Changed container from `max-w-6xl` to `max-w-3xl`

## Width Hierarchy
```
BookingPanel container: max-w-3xl (768px)
  └─ QuotationEngine card: max-w-2xl (672px)
      └─ Form content: Responsive padding
```

This creates a nice visual hierarchy where the form appears as a compact, centered card floating over the hero image.
