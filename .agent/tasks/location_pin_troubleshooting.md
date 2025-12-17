---
title: Location Pin Feature - Troubleshooting Guide
status: in_progress
description: Guide to troubleshoot and fix the "Could not get address from location" error.
---

## Issue

The location pin feature is working (getting GPS coordinates) but failing at the geocoding step with error: "Could not get address from location"

## Root Cause Analysis

The error occurs in the `geocoder.geocode()` callback when:
1. **Status is not 'OK'** - API returned an error
2. **No results returned** - Empty results array
3. **Google Maps API issues** - Rate limits, permissions, or API key problems

## Possible Causes

### 1. Google Maps API Key Issues
- **Missing API key** - No key configured
- **Invalid API key** - Key is incorrect or expired
- **API not enabled** - Geocoding API not enabled in Google Cloud Console
- **Restrictions** - API key has domain/IP restrictions

### 2. Rate Limiting
- **OVER_QUERY_LIMIT** - Too many requests
- **Daily quota exceeded** - Free tier limits reached

### 3. Location Issues
- **ZERO_RESULTS** - No address found for coordinates
- **Invalid coordinates** - GPS returned bad data

### 4. Permission Issues
- **REQUEST_DENIED** - API key lacks permissions
- **Billing not enabled** - Google Cloud billing required

## Debugging Steps

### 1. Check Console Logs
Open browser console (F12) and look for:
```
Geocoding status: [STATUS]
Geocoding results: [RESULTS]
```

### 2. Check Google Maps API
Verify in `src/layouts/Layout.astro`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

### 3. Test API Key
Visit this URL (replace YOUR_API_KEY):
```
https://maps.googleapis.com/maps/api/geocode/json?latlng=13.0827,80.2707&key=YOUR_API_KEY
```

Should return JSON with address data.

## Solutions

### Solution 1: Add Better Error Logging

Update `getCurrentLocation` function to log detailed errors:

```jsx
geocoder.geocode({ location: latlng }, (results, status) => {
  setGettingLocation(null);
  
  console.log('Geocoding status:', status);
  console.log('Geocoding results:', results);
  console.log('Coordinates:', latitude, longitude);
  
  if (status === 'OK' && results && results.length > 0) {
    const address = results[0].formatted_address;
    // ... rest of code
  } else {
    console.error('Geocoding failed:', { status, results, latitude, longitude });
    
    let errorMsg = 'Could not get address from location.';
    
    switch(status) {
      case 'ZERO_RESULTS':
        errorMsg = 'No address found for your location. Please enter manually.';
        break;
      case 'OVER_QUERY_LIMIT':
        errorMsg = 'Too many requests. Please try again in a moment.';
        break;
      case 'REQUEST_DENIED':
        errorMsg = 'Location service denied. Please check API key.';
        break;
      case 'INVALID_REQUEST':
        errorMsg = 'Invalid location request. Please try again.';
        break;
      case 'UNKNOWN_ERROR':
        errorMsg = 'Server error. Please try again.';
        break;
    }
    
    alert(errorMsg);
  }
});
```

### Solution 2: Fallback to Simpler Address

If geocoding fails, use a simpler format:

```jsx
if (status === 'OK' && results && results.length > 0) {
  const address = results[0].formatted_address;
  // Use address
} else {
  // Fallback: Use coordinates as address
  const fallbackAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
  
  if (field === 'pickup') {
    setPickup(fallbackAddress);
  } else {
    setDrop(fallbackAddress);
  }
  
  alert('Using coordinates. Please refine the address manually.');
}
```

### Solution 3: Check API Key Configuration

1. **Verify API Key exists** in Layout.astro
2. **Enable Geocoding API** in Google Cloud Console
3. **Enable Billing** if required
4. **Check restrictions** - Allow your domain

### Solution 4: Add Retry Logic

```jsx
const geocodeWithRetry = (latlng, retries = 3) => {
  const geocoder = new window.google.maps.Geocoder();
  
  const attemptGeocode = (attempt) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        // Success - use address
        const address = results[0].formatted_address;
        // ... set address
      } else if (attempt < retries && status === 'OVER_QUERY_LIMIT') {
        // Retry after delay
        setTimeout(() => attemptGeocode(attempt + 1), 1000);
      } else {
        // Failed - show error
        alert('Could not get address. Please enter manually.');
      }
    });
  };
  
  attemptGeocode(1);
};
```

## Temporary Workaround

Until the geocoding issue is fixed, users can:
1. **Type address manually** - Input field still works
2. **Use autocomplete** - Google Places autocomplete is working
3. **Skip location pin** - Not required for booking

## Testing Checklist

- [ ] Check browser console for errors
- [ ] Verify Google Maps API key is present
- [ ] Test API key with direct URL
- [ ] Check Geocoding API is enabled
- [ ] Verify billing is enabled (if required)
- [ ] Test with different locations
- [ ] Check API quota/limits
- [ ] Test on different devices/browsers

## Expected Behavior

### Success Flow:
1. User clicks pin icon
2. Browser requests location permission
3. GPS coordinates retrieved (e.g., 13.0827, 80.2707)
4. Geocoder converts to address (e.g., "Chennai, Tamil Nadu, India")
5. Address fills in input field
6. Success!

### Current Issue:
1. User clicks pin icon ✅
2. Browser requests location permission ✅
3. GPS coordinates retrieved ✅
4. Geocoder fails ❌ - "Could not get address from location"

## Next Steps

1. **Add console logging** - See exact error
2. **Check API key** - Verify it's valid
3. **Test API directly** - Use test URL
4. **Enable APIs** - Geocoding + Places
5. **Add fallback** - Use coordinates if geocoding fails

## Files to Check

- `src/components/QuotationEngine.jsx` - getCurrentLocation function
- `src/layouts/Layout.astro` - Google Maps API script tag
- Google Cloud Console - API keys and billing

## Support

If issue persists:
1. Share console logs
2. Share API key status (enabled/disabled APIs)
3. Share exact error message
4. Share GPS coordinates being used
