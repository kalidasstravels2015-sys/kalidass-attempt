---
title: Fix Netlify Build Failure
status: completed
description: Resolved a file path resolution error that was causing the Netlify build to fail.
---

## Issue
The build was failing with the error:
`Could not resolve "../../layouts/Layout.astro" from "src/pages/ta/services/[slug].astro"`

## Root Cause
The file `src/pages/ta/services/[slug].astro` was using a relative path `../../layouts/Layout.astro` which incorrectly pointed to `src/pages/ta/layouts/Layout.astro` (which does not exist) instead of `src/layouts/Layout.astro`.
The correct path from that directory (`src/pages/ta/services`) to `src/layouts` requires going up 3 levels: `../../../`.

## Changes Applied
- Updated `src/pages/ta/services/[slug].astro`:
    - Changed `import Layout from '../../layouts/Layout.astro'` to `import Layout from '../../../layouts/Layout.astro'`
    - Changed `import serviceDetails from '../../data/serviceDetails.json'` to `import serviceDetails from '../../../data/serviceDetails.json'`

## Verification
- Verified file structure and confirmed `src/layouts` and `src/data` exist at the root of `src`.
- Verified other similar files; `src/pages/services/[slug].astro` was already using the correct relative path (`../../`) because it is one level shallower.
- Local `astro check` indicates TypeScript errors exist but the build-blocking resolution error is addressed.
