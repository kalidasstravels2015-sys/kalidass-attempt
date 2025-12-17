---
title: Fix Form Toggle Text and Image Loading Issues
status: completed
description: Fixed missing toggle button text in booking form and corrected image paths for drivers and partner logos.
---

## Issues Fixed

### 1. Book Your Ride Form - Missing Toggle Text
**Issue:** Toggle buttons (One Way/Round Trip and Airport/Outstation) were showing only icons, no text labels.
**Root Cause:** The text was wrapped in `<span className="hidden xs:inline">` but `xs:` breakpoint doesn't exist in Tailwind CSS, so text was always hidden.
**Fix:** Removed the `hidden` class entirely so toggle text is always visible alongside icons.
**File:** `src/components/QuotationEngine.jsx` (line 575)

### 2. Driver Images Not Loading
**Issue:** Driver profile images were not displaying on home page and drivers page.
**Root Causes:**
- Image paths in JSON referenced `.jpg` and `.png` extensions
- Actual files in `/public/images/drivers/` are all `.webp` format
- One path had a trailing space: `"Perumal Karthik Kumar.jpg "` 

**Fix:** Updated all 18 driver image paths in `siteContent.json` to use `.webp` extension:
- mani-perumal.jpg → mani-perumal.webp
- Perumal Karthik Kumar.jpg → Perumal Karthik Kumar.webp
- Hari.png → Hari.webp
- Raj.png → Raj.webp
- munish.png → munish.webp
- Vishnu.png → Vishnu.webp
- thangaraj.jpg → thangaraj.webp
- senthamil.png → senthamil.webp
- Prakash.png → Prakash.webp
- Elumalai.png → Elumalai.webp
- venkatesh.png → venkatesh.webp
- Mani.png → Mani.webp
- neelakandan.jpg → neelakandan.webp
- karthick.png → karthick.webp
- Natraj.png → Natraj.webp
- vijay.png → vijay.webp
- Murugan.png → Murugan.webp
- Vadivel.png → Vadivel.webp

### 3. Partner/Client Logos Not Loading
**Issue:** Partner logos in "Trusted By Industry Leaders" section were not displaying.
**Root Cause:** Same as drivers - paths referenced `.png`/`.jpg` but actual files are `.webp`
**Fix:** Updated all 7 partner logo paths in `PartnersCarousel.jsx`:
- airport-chennai.png → airport-chennai.webp
- jio.jpg → jio.webp
- Savaari.png → Savaari.webp
- saravn.png → saravn.webp
- Cognizant.png → Cognizant.webp
- tn-police.png → tn-police.webp

## Verification
All images should now load correctly and toggle buttons should display their text labels properly.
