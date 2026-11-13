# Mystic Mountain — Jägerhof revision

Local route: http://localhost:4174/ . Run from D:/code/MYSTIC: npm run build, then npm run preview -- --port 4174. Development: npm run dev -- --port 5174. The active React entry is src/jagerhof/JagerhofApp.tsx, CSS src/jagerhof/styles.css, editorial motion src/jagerhof/motion.ts. DESIGN.md is the current visual authority; earlier Bend documents are archived in docs/jagerhof-reference.

## Result

Rebuilt the full homepage around the Jägerhof composition: oversized mixed-type hero, original hotel signature, four full-screen hover/focus photographs, measured cream/pine/rust palette, locally bundled Ronzino, green inline-link introduction with floating photo previews, centered looping Embla rail, five alternating4:5 photo collages, large opposing scrolling titles, guest-information/FAQ area, expanding location landscape, optional existing colorful3D map, oversized contact CTA and floating appearance/booking dock. Supporting routes remain available with the new tokens. All runtime photography is supplied hotel photography; no unrelated reference images, video, logo, reviews, awards, spa or packages are presented as this hotel.

Hero scenery uses a gentle pan/zoom of the genuine supplied landscape, not fabricated hotel footage. It has a pause/play control and suspends offscreen or when the document is hidden. Custom soft cursor, one Lenis/GSAP ticker, text entrances and parallax honor reduced motion. Existing React Bits components remain in retained pages/map; custom GSAP components match this reference's section requirements without introducing another animation engine.

Preserved verified contacts, external booking portal, original gallery and reviewed email inquiry. Fixed native dialog cancel-event propagation so Escape in the nested inquiry review leaves the planner open. Fixed mobile hero grid minimum sizing and menu contact links. Fixed elevation404 requests by explicitly capping Mapterhorn DEM sources at locally verified available zoom12; the renderer overzooms actual data for closer camera views. Satellite tiles, building footprints and trees retain their existing provenance/attribution.

## Verification

- Production TypeScript/Vite build passed. Latest app JS575.08kB /199.04kB gzip, CSS107.63kB /21.12kB gzip. Terrain remains a separate318.56kB gzip JS chunk loaded on expansion. Vite's500kB chunk-size notice remains; no unmeasured60fps claim is made.
- All8 existing inquiry/date tests passed. Production dependency audit:0 vulnerabilities.
- Actual Chrome rendering reviewed at320,390,768,1024,1440px; all homepage hero links remain within the viewport, with no document overflow. Supporting pages plus fallback:28 route/width checks at320/1440px.
- Hero focus/hover photo, scenery pause, carousel next/previous/arrow-key selection, theme controls, FAQ, gallery/lightbox, mobile menu/section navigation, planner dates, nested review, copying, correctly encoded mailto, Escape and focus restoration passed. No message or reservation was submitted.
- Reduced-motion context: no Lenis/cursor, no hidden essential headings/reveal content. Native dialogs provide keyboard focus containment. See touch-qa.json for the final touch/context check.
- Terrain ready=true with6000 trees in the desktop check; selection,2D/3D, satellite/illustrated and detail controls passed. Phone map has no horizontal overflow. Final targeted run recorded0 page exceptions and0 failed HTTP resources. Timing from expansion through readiness plus scripted waits/control checks: approximately20s on this test connection.
- Evidence: docs/jagerhof-reference/interaction-qa.json, final-qa.json, touch-qa.json and mystic-*.jpg screenshots. Earlier initial-qa/debug images are intermediate work; use mystic-desktop.jpg, mystic-phone.jpg, mystic-menu.jpg and mystic-map.jpg as the final views.

## Fidelity and verification limits

Bon Vivant Serif is commercial; no licensed copy was located in the accessible font folders. The CSS local-font hook is present, with bundled OFL Cormorant Garamond as fallback. Exact reference letterforms require a licensed Bon Vivant webfont. Ronzino is from the official Collletttivo OFL repository; Pinyon Script is an OFL signature-only adaptation of the reference's custom handwritten artwork.

The reference's South Tyrol video is replaced by the hotel's genuine landscape with camera drift. Unverified seasonal inventory, sauna facilities, testimonials, certifications and offers are replaced by honest hotel topics in the same section progression. The appearance switch changes interface colors rather than inventing winter assets. The measured rust/white14.4px primary-button pairing is retained as requested; its approximate3.58:1 contrast means a full WCAG AA color audit cannot be claimed. Small editorial labels use pine/cream for stronger contrast. Map elevation/geography still depend on public provider availability; satellite imagery/buildings/tree positions are local. Geographic building heights and individual tree placements remain illustrative. Automated touch emulation and Chrome checks do not substitute for testing every physical device. Nothing was deployed.

## Source inspection and licenses

Jägerhof public page, stylesheet and motion modules were inspected for layout/quantitative behavior under docs/jagerhof-reference. The runtime is an original implementation; no copied reference scripts or proprietary font binaries are loaded. Ronzino: https://github.com/collletttivo/ronzino (public/licenses/ronzino.txt). Commercial display font: https://nickylaatz.com/eula . Mapterhorn zoom validation: live HTTP tile probes11/12=200 and13/14=404 in this region; explicit-maxzoom source matches https://github.com/mapterhorn/mapterhorn/blob/main/website/examples/contour/example.html . Existing React Bits, GSAP, Lenis, Embla, Vengeance, Skiper and geographic source notices remain in public/licenses. No paid source or external media-generation credit was used.
