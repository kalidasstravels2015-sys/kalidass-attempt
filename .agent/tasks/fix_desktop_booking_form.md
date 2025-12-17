---
title: Fix Desktop Booking Form Stretching
status: completed
description: Added max-width constraint to prevent booking form from stretching too wide on desktop screens.
---

## Issue
The "Book Your Ride" booking form was stretching too wide on desktop screens, making it look unbalanced and hard to use.

## Root Cause
The form card had `w-full` (width: 100%) which made it expand to fill the entire container width. On large desktop screens, this resulted in an excessively wide form.

## Solution
Added `max-w-2xl mx-auto` to the form card to:
- **Limit maximum width** to 672px (Tailwind's `max-w-2xl`)
- **Center the form** horizontally with `mx-auto`
- **Maintain responsive behavior** - still full width on mobile/tablet

## Changes Made

### Before
```jsx
<div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden font-sans">
```

### After
```jsx
<div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden font-sans">
```

## Result
✅ **Compact, centered form** on desktop
✅ **Better visual balance** with hero section
✅ **Improved usability** - form fields not stretched too wide
✅ **Responsive** - still full width on mobile/tablet
✅ **Professional appearance** on all screen sizes

## Responsive Behavior
- **Mobile (<640px)**: Full width
- **Tablet (640px-1024px)**: Full width
- **Desktop (>1024px)**: Max 672px width, centered

## File Modified
- `src/components/QuotationEngine.jsx` (line 347)

## Visual Impact
The form now appears as a nicely proportioned card floating over the hero image, rather than stretching edge-to-edge on wide screens.
