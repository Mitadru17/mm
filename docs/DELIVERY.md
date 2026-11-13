# Delivery and QA report

Completed locally on 11 November 2026. Production preview: **http://localhost:4174/**. The production output is `dist/`; no public deployment, DNS change, purchase or external message was performed.

## Implemented experience

An editorial hotel introduction built from authentic local photography: responsive navigation, mountain hero, date/guest inquiry strip, asymmetric property story, three interactive photographic room stories, landscape interlude, destination/dining composition, filterable photo gallery, guest-review source links, location/directions, practical FAQ, photographic closing and substantial footer.

Instrument Serif, including its natural italic, provides the editorial headings; Manrope handles controls and body text. Both are self-hosted. Deep Pine `#1B2925`, Forest Moss `#45564A`, Warm Linen `#EEE8DB`, Copper `#BD906A` and Soft White `#FAF8F3` establish the palette. A new lightweight SVG mountain identity is supplied for owner review. Photography carries the design: no fabricated rooms, facilities, landscapes, testimonials or ratings.

Motion uses CSS, IntersectionObserver and optional native scroll timelines: modest text/image entrances, image hover depth and a desktop landscape drift. Native scrolling remains intact. Reduced-motion CSS removes animations/transitions; the room-to-inquiry scroll also observes the preference.

## Architecture and dependencies

React 19, TypeScript and Vite; Lucide icons; local Fontsource fonts. Sharp is a development-only image preparation tool. Prettier formats the source. No UI framework, animation package, booking SDK, map API, backend, analytics service or environment credentials are required.

Property identity, contact channels, room stories, photo captions and FAQ copy are centralized in `src/data.ts`. Inquiry logic lives in `src/booking.mjs`, with dedicated tests. Native dialogs provide modal focus containment; custom cleanup restores focus, and the room inquiry action deliberately transfers focus to the date form after closing.

Originals in `photos/` remain untouched. There are 18 selected original photographs, 54 responsive WebP derivatives and one additional editorial hero crop. `asset-map.json` records their sources, sizes, dimensions and cropping. `asset-inventory.json` records all 53 original files, categories, encoded/display dimensions, orientation and hashes. Zero exact duplicates; similar angles were identified during the visual inventory. Total derivative files on disk are approximately 15.5 MB; browsers select responsive sources and lazy-load below-fold media rather than downloading this collection at entry.

## Functionality verified

| Feature | Actual behavior |
| --- | --- |
| Desktop navigation | Native anchors reach existing section IDs; header compacts on scroll. |
| Mobile/tablet navigation | Menu opens/closes, Escape closes, keyboard focus is contained in the header; background content becomes inert. |
| Room stories | Three selectable presentations; arrow-key tab switching; photo detail dialogs and previous/next controls. |
| Room-to-inquiry action | Closes the dialog, scrolls to the form, then focuses the check-in input. Observed focus transfer was tested after refinement. |
| Dates | Native date controls; arrivals cannot be in the past; checkout must follow check-in. Moving arrival past a selected checkout advances checkout to the next day. Invalid/missing dates cannot produce an inquiry preview. |
| Guests | Adult range 1–12, children 0–8; requested party size is included in the email. These limits do not promise room capacity. |
| Inquiry | Reviewed summary, selectable room preference and correctly encoded `mailto:` link to `hotelmysticmount@gmail.com`. A test preview contained 10–13 December 2026, 3 adults and 1 child. No email was sent. |
| Clipboard | Copy details produces the visible “Copied” state. A readable/selectable summary and an inline error are available if the Clipboard API is denied. |
| Booking portal | Legitimate original ProExsus site opens externally. No API integration, live inventory or reservation confirmation is claimed. |
| Gallery | All six filters; 12 photographs after expand-all; detail dialog, previous/next, keyboard arrows, Escape and focus restoration. Keyboard navigation works even when the close button has focus. |
| Touch | Gallery swipe handlers are implemented. Physical touchscreen gesture testing was not available. |
| Reviews | Direct source links; no republished guest quotes or stale aggregate rating. |
| Location/contact | Provided Google Maps URL, corroborated telephone link and property-site email. |
| FAQ | Native disclosure elements expand/collapse using pointer or keyboard. |

## Build, code and browser results

- `npm run build`: **PASS**, TypeScript and production Vite build.
- `npm run test`: **7 PASS**, covering valid/today arrivals, same-day/reversed departures, past dates, impossible/missing dates, guest bounds, leap-year/month/year date boundaries and inquiry contents.
- Dependency installation/audit: **0 reported vulnerabilities** after updating Sharp to the patched 0.35.5 release. Production dependency audit also passed.
- Final production preview: HTTP **200**.
- In-app Chromium console at final review: **no captured warnings or errors**.
- No missing internal anchor targets, empty image alt text or failed loaded images in final DOM checks.
- Applied the installed React review checklist: stable list keys, effect cleanup, passive scroll listener, controlled inputs, named controls, tab semantics, focus restoration and no unnecessary runtime libraries.

## Responsive and visual verification

Actual production-browser viewports tested: 360 × 800, 390 × 844, 768 × 1024, 1280 × 800, 1440 × 1000 and 1920 × 1080. Document width equalled layout viewport width in all six, with no horizontal overflow. The browser reserves 15 pixels for its vertical scrollbar, so `clientWidth` is correspondingly smaller than `innerWidth`.

Screenshots are in `docs/screenshots/`, including desktop hero/story/stays/experiences/location, tablet hero/gallery, phone hero/stays/inquiry/footer, laptop and large desktop. See `browser-qa.json` for the captured checks and measurements.

The deliberate refinement pass improved readable copy, touch targets, responsive hero delivery and image dimensions; fixed lightbox keyboard navigation when the close control was focused; made date input events reliably update their state and validation; added mobile focus isolation; and fixed room-dialog-to-form focus timing. All originals were preserved.

Browser coverage is Chromium in the app. Safari, Firefox, physical iOS/Android hardware and full screen-reader testing were not available. Semantic/keyboard checks do not constitute a formal WCAG certification.

## Performance measurements

These are **local production-preview observations**, using the same Chromium session with caching allowed, without network/CPU throttling. They are not a Lighthouse score, real-world mobile benchmark or field Core Web Vitals report.

| Viewport | Observed LCP | Accumulated unexpected layout shift |
| --- | ---: | ---: |
| 360 × 800 | 96 ms | 0.000598 |
| 390 × 844 | 176 ms | 0.000242 |
| 768 × 1024 | 188 ms | 0 |
| 1280 × 800 | 196 ms | 0.002266 |
| 1440 × 1000 | 148 ms | 0 |
| 1920 × 1080 | 164 ms | 0 |

The local-only `?measure` observer records Largest Contentful Paint, a sum of unexpected layout shifts, and maximum observed interaction duration. Its shift sum is a conservative simple accumulation, not a complete session-window CLS implementation. The final phone interaction sample observed a maximum event duration of **40 ms**. That is **not a field INP result**; representative traffic and a full session-window/percentile implementation are needed for formal Core Web Vitals reporting.

The production JavaScript is approximately **261.86 kB / 81.71 kB gzip** and CSS **40.77 kB / 8.65 kB gzip**. The desktop hero is 422,152 bytes. Phones request the 480- or 960-pixel responsive original-balcony derivative; the browser selected the 480-pixel version at the tested 360/390 widths. Only appropriate hero media is preloaded. Below-fold images are lazy-loaded, fonts are local, and there are no blocking third-party services.

Before launch, test a cold load on a realistic mobile connection and CPU, configure static-host compression/cache headers, and measure the deployed site. The requested LCP ≤2.5 seconds, CLS <0.1 and good INP remain deployment/field targets rather than guarantees.

## Business confirmation and release requirements

1. Confirm exact room category names, inventory, photo-to-category mapping, occupancy, bed arrangements, dimensions and which rooms have particular views/balconies.
2. Confirm current prices, availability, deposits, payment methods, cancellation/refund terms, check-in/out, child and extra-guest rules.
3. Confirm current dining/meal arrangements, Wi-Fi, parking, accessibility and other amenities before making specific promises.
4. Confirm the postal code: sources disagree between 263639 and 263641. The website omits it.
5. Resolve the telephone discrepancy: Google corroborates +91 89418 76542; the old site also lists 9627151538. No WhatsApp number has been verified.
6. Confirm the published email inbox receives inquiries, and approve photography usage and the newly drawn identity. No live delivery test was sent.
7. If replacing the old ProExsus domain, preserve the actual booking engine at a separate verified URL and update `hotel.booking`. The current portal link must not point back to a replacement homepage. Configure canonical/Open Graph/sitemap/robots origins for the actual deployment.
8. Provide approved social profiles and legal/privacy terms if wanted; none were invented.

There is no payment backend or server email delivery. Guests send their reviewed inquiry through their own email service, or call the hotel; only the hotel can confirm a stay. No paid 3D/video/AI integration is required. Blender's unrelated unsaved project was left untouched and no Higgsfield credits or trial were used.
