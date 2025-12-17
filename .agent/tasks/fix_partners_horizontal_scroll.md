---
title: Fix Partners Carousel Horizontal Scrolling
status: completed
description: Fixed CSS animation to ensure partners always scroll horizontally without wrapping into a grid.
---

## Issue
Partners logos were displaying in a grid layout instead of scrolling horizontally, especially on mobile devices.

## Root Cause
The `prefers-reduced-motion` media query was:
1. Stopping the animation completely (`animation: none`)
2. Wrapping the content (`flex-wrap: wrap`)
3. Centering items (`justify-content: center`)
4. Setting width to 100% instead of `w-max`

This caused the partners to display as a static grid instead of an animated horizontal scroll.

## Solution
Updated the CSS to:
- **Keep the animation running** even with `prefers-reduced-motion`
- **Slow down the animation** to 60s instead of stopping it
- **Remove flex-wrap** to prevent grid layout
- **Keep w-max width** to maintain horizontal scroll

## Changes Made

### Before
```css
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
    transform: translateX(0);
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
}
```

### After
```css
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: scroll 60s linear infinite;
  }
}
```

## Result
✅ Partners logos **always scroll horizontally**
✅ **No grid wrapping** on any device
✅ **Continuous infinite loop** animation
✅ **Slower animation** (60s) for users who prefer reduced motion
✅ **Consistent behavior** across all screen sizes

## Animation Speeds
- **Normal**: 30 seconds per full loop
- **Reduced Motion**: 60 seconds per full loop (slower, more gentle)

## File Modified
- `src/components/react/PartnersCarousel.jsx`

## Testing
The partners section should now show a smooth, continuous horizontal scroll on:
- ✅ Mobile devices
- ✅ Tablets
- ✅ Desktop browsers
- ✅ All screen sizes
