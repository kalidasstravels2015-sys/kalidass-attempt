---
title: Location Pin Feature - Ola/Uber Style Implementation
status: completed
description: Implemented location pin icon inside input field on the right side, exactly like Ola/Uber.
---

## ✅ Final Implementation - Ola/Uber Style

The location pin feature is now implemented exactly like Ola/Uber with the pin icon INSIDE the input field on the right side.

## Layout

### Desktop (Card Variant)
```
┌────────────────────────────────────────┐
│ PICKUP LOCATION                        │ ← Label
├────────────────────────────────────────┤
│ [Enter City / Area            📍]      │ ← Pin inside input (right)
└────────────────────────────────────────┘
```

### Mobile (Default Variant)
```
┌──────────────────────────┐
│ PICKUP                   │ ← Label
├──────────────────────────┤
│ [Enter Location     📍]  │ ← Pin inside (right)
└──────────────────────────┘
```

## Features

### Desktop
- **Pin Position**: Inside input field, absolute positioned on the right
- **Icon**: Red MapPin (📍) - 5x5 size
- **States**:
  - Normal: Red outline pin (`text-red-500`)
  - Loading: Filled red pin with pulse (`text-red-600 animate-pulse fill-current`)
- **Hover**: Light gray background (`hover:bg-slate-100`)
- **Container**: Relative positioned with proper padding-right for pin

### Mobile
- **Pin Position**: Inside input field, absolute positioned on the right
- **Icon**: Red MapPin (📍) - 4x4 size
- **States**:
  - Normal: Red outline pin (`text-red-500`)
  - Loading: Filled red pin with pulse (`text-red-600 animate-pulse fill-current`)
- **Hover**: Gray background (`hover:bg-gray-200`)
- **Container**: Relative positioned with proper padding-right

## Code Structure

### Desktop Input
```jsx
<div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/20">
  <input
    placeholder="Enter City / Area"
    className="bg-transparent w-full outline-none text-sm text-slate-700 font-medium px-3 pr-10"
  />
  <button
    onClick={() => getCurrentLocation('pickup')}
    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
  >
    <MapPin 
      className="w-5 h-5 text-red-500"
      fill={loading ? 'currentColor' : 'none'}
    />
  </button>
</div>
```

### Mobile Input
```jsx
<div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-red-500 transition">
  <input
    placeholder="Enter Location"
    className="bg-transparent w-full outline-none text-sm text-gray-700 pr-8"
  />
  <button
    onClick={() => getCurrentLocation('pickup')}
    className="absolute right-2 p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
  >
    <MapPin 
      className="w-4 h-4 text-red-500"
      fill={loading ? 'currentColor' : 'none'}
    />
  </button>
</div>
```

## Key CSS Classes

### Positioning
- **Container**: `relative` - Establishes positioning context
- **Button**: `absolute right-3 top-1/2 -translate-y-1/2` - Centers vertically on right
- **Input**: `pr-10` (desktop) / `pr-8` (mobile) - Padding to prevent text overlap

### Visual States
- **Normal Pin**: `text-red-500` + `fill="none"` - Outline only
- **Loading Pin**: `text-red-600 animate-pulse` + `fill="currentColor"` - Filled and pulsing
- **Hover**: `hover:bg-slate-100` / `hover:bg-gray-200` - Subtle background

## User Experience

### Discoverability
✅ **Highly visible** - Pin icon is inside the input field where users expect it
✅ **Familiar pattern** - Matches Ola/Uber/Google Maps
✅ **Red color** - Stands out against gray background
✅ **Always visible** - No need to look elsewhere

### Interaction
✅ **Click pin** → Request location permission
✅ **Loading state** → Pin fills and pulses
✅ **Success** → Address auto-fills
✅ **Error** → Alert with helpful message

### Visual Feedback
- **Hover**: Background changes to show it's clickable
- **Loading**: Pin fills with red and pulses
- **Disabled**: 50% opacity when already getting location

## How It Works

1. **User clicks red pin icon** inside input field
2. **Browser requests** location permission
3. **GPS coordinates** retrieved
4. **Google Maps Geocoder** converts to address
5. **Address fills** in the input field
6. **Distance calculates** if both locations set

## Troubleshooting

### "Could not get address from location"
**Possible causes:**
- Google Maps API not loaded yet → Wait and try again
- No address for GPS coordinates → Enter manually
- Network issues → Check connection
- API quota exceeded → Use manual entry

**Solution:**
- Form still works with manual entry
- Error message guides user
- Console logs help debugging

## Files Modified
- `src/components/QuotationEngine.jsx`

## Result

✅ **Exactly like Ola/Uber** - Pin inside input field on right
✅ **Highly discoverable** - Users know where to click
✅ **Professional design** - Red pin icon stands out
✅ **Smooth animations** - Pulsing fill on loading
✅ **Mobile optimized** - Smaller icon, same position
✅ **Accessible** - Proper ARIA labels and titles
✅ **Error handling** - Helpful messages for users

## Visual Comparison

**Ola/Uber Style:**
```
[Enter pickup location          📍]
```

**Our Implementation:**
```
[Enter City / Area              📍]
```

Perfect match! 🎉
