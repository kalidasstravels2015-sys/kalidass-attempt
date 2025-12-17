# Comprehensive Testing Checklist

## 1. Security Testing
- [ ] **Security Headers**: Verify presence of headers like `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`. (Note: Can be set in `netlify.toml`).
- [ ] **Form Validation**:
    - [ ] Test "Quotation Engine" with empty fields.
    - [ ] Test with excessively long strings (Buffer overflow prevention check).
    - [ ] Test with special characters `<script>alert(1)</script>` (XSS check).
- [ ] **HTTPS**: Verify that `http://kalidasstravels.in` redirects to `https://`.
- [ ] **Data Privacy**: Ensure no Sensitive PII is logged to console or sent to analytics (checked in `analytics.js`).

## 2. Performance Testing
- [ ] **Lighthouse Audit**: Run Chrome DevTools -> Lighthouse.
    - [ ] Performance > 90
    - [ ] Accessibility > 95
    - [ ] Best Practices > 90
    - [ ] SEO > 95
- [ ] **Real World Load Times**:
    - [ ] Test on 4G Mobile Network.
    - [ ] Test on Desktop WiFi.
- [ ] **Asset Optimization**:
    - [ ] Verify images are WebP/AVIF.
    - [ ] Verify static assets have `Cache-Control: max-age=31536000`.

## 3. SEO Testing
- [ ] **Google Search Console**: Check for crawl errors.
- [ ] **Schema Markup**: Run [Schema Validator](https://validator.schema.org/) on Homepage and Service pages.
- [ ] **Meta Tags**:
    - [ ] Verify unique `Title` and `Description` for every page.
    - [ ] Verify `canonical` tags are self-referencing.
    - [ ] Verify `hreflang` tags on bilingual pages (`en-IN`, `ta-IN`).
- [ ] **Sitemap**: Verify `sitemap-0.xml` is accessible and contains all pages.

## 4. Accessibility Testing
- [ ] **Automated Scan**: Run `npx playwright test` (includes Axe scans).
- [ ] **Keyboard Navigation**:
    - [ ] Can tab through the entire menu?
    - [ ] Can open/close "Services" dropdown with keyboard?
    - [ ] Can open/close "Calculator" modal with keyboard?
    - [ ] Does `Esc` close modals?
- [ ] **Screen Reader**:
    - [ ] Verify "Skip to Content" link works.
    - [ ] Listen to page with NVDA/VoiceOver. Are image alt texts descriptive?

## 5. Browser Compatibility
- [ ] **Desktop**: Chrome, Firefox, Safari, Edge.
- [ ] **Mobile**:
    - [ ] iOS Safari (iPhone).
    - [ ] Chrome on Android.
- [ ] **Responsive Design**: Check layouts at 320px, 375px, 768px, 1024px break points.

## 6. Functional Testing
- [ ] **Forms**:
    - [ ] Convert "One Way" trip to WhatsApp message.
    - [ ] Convert "Round Trip" trip to WhatsApp message.
- [ ] **Calculators**:
    - [ ] Verify Tariff Calculator math for Etios/Innova.
    - [ ] Verify Driver Bata logic (Day/Night).
- [ ] **Localization**:
    - [ ] Switch to Tamil -> URL changes to `/ta/...`.
    - [ ] Content changes to Tamil.
    - [ ] Switch back to English.
- [ ] **Navigation**:
    - [ ] Click all Footer links.
    - [ ] Click all Menu links.
    - [ ] Check for 404s.

## Automated Tests
Run the following command to execute the automated suite:
```bash
npx playwright test
```
