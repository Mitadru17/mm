# Project audit — 11 November 2026

## Repository baseline

The workspace initially contained only `photos/`: 53 JPG photographs. There was no app, package manifest, routing, UI, booking backend, contact form, environment file, logo, or deployment configuration to preserve. Original photography is unchanged. React + TypeScript + Vite is the brief's specified fallback stack.

## Live website baseline

Inspected the actual site in the in-app Chromium browser, including its accessibility tree and screenshot. It is an externally operated ProExsus booking/search page with check-in/out, room and guest selection, a property slideshow, amenities text, policy accordions, and contact information. Its search showed “No rooms available on this date” for its default dates; that is not evidence that all future dates are unavailable. No supported embedding API, engine documentation or integration credentials were supplied.

Observed issues: oversized repeated hotel identity, unrelated purple controls, little editorial hierarchy, generic social links that lead to Instagram/Facebook rather than actual hotel profiles, no considered mobile storytelling, implausible check-in/out times, and policy/amenity content inconsistent with OTA listings. Retain the legitimate booking page as an external channel, the address, photo narrative and direct-contact email. Do not copy contradictory claims or generic social links.

## Photography audit

All 53 originals were inspected in `asset-contact-sheet.jpg`. SHA-256 found zero exact duplicates. Several photographs are near-duplicate angles of the same spaces. EXIF orientation matters: encoded pixel dimensions are not always the display orientation. Image processing explicitly auto-orients the derivatives.

- Rooms: IMG_8024–IMG_8069, IMG_8074–IMG_8078, IMG_8090–IMG_8094, IMG_8119–IMG_8131. Strongest: 8122/8123/8125 for timber detail; 8069 for room/window connection; 8093 for the warmer interior. Near-duplicate clusters: 8093/8094, 8119/8121, 8122/8123/8128/8131.
- Balconies/views/terrace: IMG_8072, 8082, 8084, 8085, 8088, 8095, 8114, 8118. Best hero: IMG_8084, a landscape crop of the real balcony view. IMG_8072 is the landscape interlude. These show green foothills; do not invent snow peaks or identify specific visible summits.
- Dining/lounge: IMG_8101–IMG_8105, IMG_8112–IMG_8113. Best: 8101 and 8105. 8102 is the sitting area. 8112/8113 are similar dining angles.
- Property approaches/surroundings: IMG_8106–IMG_8110. 8109 is the location/arrival image; 8107 supports the tea-country setting without pretending to depict the tea estate itself.
- Bathroom/facilities: IMG_8042, IMG_8100. Inspected, not promoted into the main editorial narrative.
- Architecture/details: doorways, panelling and balcony details are embedded in room and exterior groups.
- People/lifestyle, dedicated attraction photography, original logos and videos: none found. No substitute property photographs or AI-generated facilities were introduced.

`asset-inventory.json` records every original's filename, encoded dimensions, format and checksum. `asset-map.json` maps every selected derivative to its original, output dimensions and byte size. Contact sheet and scripts are reproducible.

## Content verification

| Information | Evidence and decision |
| --- | --- |
| Hotel name, Kausani, address opposite Tea Factory on Baijnath Road | User brief, live site, MakeMyTrip and Goibibo agree. Published. |
| +91 89418 76542 | Corroborated in the Google hotel entity search results below. Published as a telephone link; no WhatsApp claim. |
| hotelmysticmount@gmail.com | Visible in the live property's contact/footer content. Used for reviewed email inquiries. Inbox receipt has not been tested. |
| Phone 9627151538 | Live website contains this different number. Not published in redesign; owner should reconcile the two. |
| Postal code | Live site/OTAs use 263639; Google hotel entity uses 263641. Omitted pending confirmation. |
| Deluxe / Super Deluxe / 3 Bed categories | OTA labels exist, but no authoritative mapping to these photographs. Presented as descriptive photographic room stories, not bookable inventory categories. |
| Occupancy, bed allocation, dimensions, rates, availability | Conflicting or date-dependent. Not asserted. Guest selectors represent the inquiry party, not guaranteed capacity. |
| Meals/dining | Local photos confirm a dining space. Do not promise menus, inclusive meals or operating hours. |
| Wi-Fi, parking, AC, room service, timings and policies | Require owner confirmation; FAQ directs guests to ask. |
| Reviews | Link to actual sources. No copied quotations, fabricated guests, static ratings or review counts. |
| Tea-country and Baijnath destination ideas | Supported by official Uttarakhand Tourism. Independent explorations, not hotel-organized excursions. |

Sources inspected:

- [Existing property website](https://hotelmysticmountainkausani.proexsus.com/)
- [Google hotel entity](https://www.google.com/travel/hotels/entity/ChkIkM3b16yA7NYQGg0vZy8xMWZudGI0NTl3EAE?gsas=1)
- [MakeMyTrip property page](https://www.makemytrip.com/hotels/hotel_mystic_mountain_kausani-details-kausani.html)
- [Goibibo property page](https://www.goibibo.com/hotels/mystic-mountain-kausani-hotel-in-kausani-7059005018412787980/)
- [Official Kausani destination](https://uttarakhandtourism.gov.in/destination/kausani)
- [Official Baijnath destination](https://uttarakhandtourism.gov.in/destination/baijnath)
- [Supplied Google Maps directions](https://maps.app.goo.gl/YBLcZAejib3xQyRBA)

## Design and implementation plan

1. Inventory and inspect originals, verify property channels, establish data boundaries.
2. Build locally with React/TypeScript/Vite, self-hosted Instrument Serif and Manrope, responsive WebP assets, pine/linen/copper palette.
3. Compose a photographic hero, inquiry strip, asymmetric introduction, interactive room stories, native-scroll mountain interlude, destination/dining mosaic, gallery, guest-source links, location, FAQ and photographic closing/footer.
4. Use native dialogs, focus restoration, keyboard controls, native dates, explicit validation, copy fallback and honest email inquiry semantics. Avoid paid APIs and speculative availability.
5. Build, inspect desktop/tablet/mobile, fix observed issues, capture screenshots and record measured limits.

## Skills and optional creative tools

Searched the local skills and installed plugin skill catalogs for Impeccable, Taste, Emil Kowalski, React Bits and Ponytail: none were installed under those names. Applied installed Sites presentation-led design/local-preview guidance, browser control documentation, verification workflow, and React best-practices review. Native browser access was available through the in-app browser; Chrome was not connected.

Blender verified at `D:/bd/blender.exe`, also visible as an open unsaved Blender project in the app inventory. No interaction with that unsaved project was necessary. Real hotel imagery was a stronger and lower-complexity choice than supplemental 3D for this design.

Higgsfield read-only balance reported a free plan, zero credits, zero free-generation entitlements and no active unlimited allowance. A read-only image-to-video model query returned no results. Commercial rights, watermark conditions and export entitlements were not established, so no generation, trial activation, purchase or credit spend was attempted.
