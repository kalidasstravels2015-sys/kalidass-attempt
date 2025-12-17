---
title: Add Location Pin Feature to Booking Form
status: in_progress
description: Implementation plan for adding "Use My Location" feature to pickup and drop location fields.
---

## Feature Overview
Add a location pin button next to pickup and drop location input fields that allows users to:
1. Click to get their current GPS location
2. Automatically reverse geocode to get the address
3. Fill the input field with the address
4. Calculate distance if both locations are filled

## Implementation Steps

### 1. Import Navigation Icon
```jsx
import { Navigation } from 'lucide-react';
```

### 2. Add State for Location Loading
```jsx
const [gettingLocation, setGettingLocation] = useState(null); // 'pickup' or 'drop'
```

### 3. Add getCurrentLocation Function
```jsx
const getCurrentLocation = (field) => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  setGettingLocation(field);
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get address
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };
        
        geocoder.geocode({ location: latlng }, (results, status) => {
          setGettingLocation(null);
          
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            
            if (field === 'pickup') {
              setPickup(sanitizeInput(address));
              if (drop) calculateDistance(address, drop);
            } else {
              setDrop(sanitizeInput(address));
              if (pickup) calculateDistance(pickup, address);
            }
            
            setShowResult(false);
            trackEvent('location_pin_used', { field });
          } else {
            alert('Could not get address from location');
          }
        });
      } else {
        setGettingLocation(null);
        alert('Google Maps not loaded');
      }
    },
    (error) => {
      setGettingLocation(null);
      let errorMsg = 'Unable to get location';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = 'Location permission denied. Please enable location access.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = 'Location information unavailable';
          break;
        case error.TIMEOUT:
          errorMsg = 'Location request timed out';
          break;
      }
      
      alert(errorMsg);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};
```

### 4. Add Location Pin Button to Input Fields

For Card Variant (lines ~395-420):
```jsx
<div className="relative group">
  <label htmlFor={`${formId}-${type.toLowerCase()}`} className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
    {type} Location
  </label>
  <div className={getInputClass('location')}>
    <MapPin className={`${type === 'Pickup' ? 'text-indigo-500' : 'text-slate-400'} mr-3 w-5 h-5`} aria-hidden="true" />
    <input
      id={`${formId}-${type.toLowerCase()}`}
      ref={type === 'Pickup' ? pickupInputRef : dropInputRef}
      type="text"
      value={type === 'Pickup' ? pickup : drop}
      onChange={(e) => {
        const val = e.target.value;
        type === 'Pickup' ? setPickup(val) : setDrop(val);
        setShowResult(false);
      }}
      placeholder="Enter City / Area"
      className="bg-transparent w-full outline-none text-sm text-slate-700 font-medium"
    />
    <button
      type="button"
      onClick={() => getCurrentLocation(type.toLowerCase())}
      disabled={gettingLocation === type.toLowerCase()}
      className="ml-2 p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
      title="Use my current location"
    >
      <Navigation 
        className={`w-4 h-4 ${gettingLocation === type.toLowerCase() ? 'text-indigo-600 animate-pulse' : 'text-slate-500'}`}
      />
    </button>
  </div>
</div>
```

For Mobile Variant (lines ~605-620):
```jsx
<div key={type} className="col-span-2 relative group">
  <label htmlFor={`${formId}-mobile-${type}`} className="text-[10px] font-bold text-gray-700 uppercase mb-0.5 block flex items-center justify-between">
    <span>{type}</span>
    <button
      type="button"
      onClick={() => getCurrentLocation(type.toLowerCase())}
      disabled={gettingLocation === type.toLowerCase()}
      className="text-red-600 hover:text-red-700 disabled:opacity-50"
      title="Use my location"
    >
      <Navigation className={`w-3 h-3 ${gettingLocation === type.toLowerCase() ? 'animate-pulse' : ''}`} />
    </button>
  </label>
  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-red-500 transition">
    <MapPin className="text-red-500 mr-2 w-4 h-4" aria-hidden="true" />
    <input
      id={`${formId}-mobile-${type}`}
      ref={type === 'Pickup' ? pickupInputRef : dropInputRef}
      value={type === 'Pickup' ? pickup : drop}
      onChange={(e) => type === 'Pickup' ? setPickup(e.target.value) : setDrop(e.target.value)}
      placeholder="Enter Location"
      className="bg-transparent w-full outline-none text-sm text-gray-700"
    />
  </div>
</div>
```

## User Experience

### Desktop (Card Variant)
- Location pin button appears inside the input field on the right
- Click to get current location
- Shows loading state with pulsing animation
- Auto-fills address when location is retrieved

### Mobile (Default Variant)
- Location pin button appears in the label next to field name
- Compact design for mobile screens
- Same functionality as desktop

## Error Handling
- Permission denied: Alert user to enable location access
- Position unavailable: Alert that location info is unavailable
- Timeout: Alert that request timed out
- No geolocation support: Alert that browser doesn't support it
- Google Maps not loaded: Alert to wait for maps to load

## Analytics
Track when users use the location pin feature:
```jsx
trackEvent('location_pin_used', { field: 'pickup' or 'drop' });
```

## Files to Modify
1. `src/components/QuotationEngine.jsx` - Main booking form component
2. Calculator pages that use similar location inputs (if any)

## Testing Checklist
- [ ] Location permission request works
- [ ] Reverse geocoding returns correct address
- [ ] Address fills in pickup/drop field correctly
- [ ] Distance calculation triggers after location is set
- [ ] Loading state shows during location fetch
- [ ] Error messages display for various error cases
- [ ] Works on both desktop and mobile variants
- [ ] Analytics tracking fires correctly
- [ ] Works with both pickup and drop fields
- [ ] Doesn't interfere with manual address entry
- [ ] Doesn't interfere with Google Places autocomplete
