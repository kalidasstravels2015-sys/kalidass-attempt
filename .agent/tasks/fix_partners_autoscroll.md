---
title: Enable Auto-Scroll for Partners Carousel on All Devices
status: completed
description: Simplified partners carousel to always show auto-scrolling animation on mobile and desktop.
---

## Issue
The partners section was showing as a static grid on mobile instead of auto-scrolling horizontally like on desktop.

## Root Cause
The component had mobile detection logic that was:
1. Showing a single array on mobile (no animation)
2. Showing doubled array with animation only on desktop
3. This caused partners to display as a grid on mobile

## Solution
Removed the mobile detection logic and simplified to:
- **Always use doubled partners array** for seamless infinite loop
- **Always apply auto-scroll animation** on all screen sizes
- Removed hover/focus pause functionality for simpler UX
- Reduced spacing between logos for better mobile fit

## Changes Made

### 1. Removed Mobile Detection
```jsx
// BEFORE
const [isMobile, setIsMobile] = React.useState(false);
useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
}, []);
const scrollingPartners = isMobile ? partners : [...partners, ...partners];

// AFTER
const scrollingPartners = [...partners, ...partners];
```

### 2. Simplified Animation Classes
```jsx
// BEFORE
className="flex w-max animate-scroll hover:pause focus:pause items-center focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
tabIndex={0}

// AFTER
className="flex w-max animate-scroll items-center gap-6 pb-8"
```

### 3. Reduced Logo Spacing
- Changed from `mx-8 md:mx-12` to `mx-4 md:mx-8`
- Better fit for mobile screens while maintaining desktop spacing

## Result
✅ Partners logos auto-scroll horizontally on **all devices**
✅ Seamless infinite loop animation
✅ Cleaner, simpler code
✅ Better mobile experience
✅ Consistent behavior across all screen sizes

## File Modified
- `src/components/react/PartnersCarousel.jsx`

## Animation Details
- **Speed**: 30 seconds for full loop
- **Direction**: Right to left (translateX -50%)
- **Behavior**: Continuous infinite scroll
- **Accessibility**: Respects `prefers-reduced-motion` setting
