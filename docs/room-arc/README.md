# Curved room browser — 13 November 2026

The latest user-supplied Arc Card Carousel supersedes the previous Works Wheel
on both the homepage `#stay` and `/suites`. The older source and its historical
QA remain archived, but are not imported by the active room listing.

## Composition and behavior

`src/components/ui/arc-card-carousel.tsx` retains the supplied offset/wrap/slot
helpers and off-left circular hub. Its tangent cards show the selected room
flat in the foreground and curved neighboring previews above and below. It
starts as an arc; there is no ring-opening prerequisite.

Three real photographic stories repeat into twelve physical slots, solely for
continuous visual wrapping. This is not twelve rooms or an availability feed.
Selecting a card, numbered selector, arrow, keyboard command or drag updates the
open right column. It shows the selected description, photographed features,
three gallery thumbnails, rate-on-request explanation, room enquiry, existing
photo-story route and verified external booking link. Clicking a preview selects
it; the explicit photograph action and thumbnails open the existing lightbox.
Focus returns to those triggers after dismissal. Room enquiry preserves the
selected descriptive preference.

Desktop supports vertical drag along the arc; phones support horizontal swipes
with native vertical page scrolling. Arrow keys, Home/End and visible previous/
next controls provide keyboard alternatives. Focus moves to the stable stage
when a physical card is selected. Below 768px the information stacks
under the carousel. No horizontal page overflow at the tested widths.

The user's later seamless-layout correction supersedes the original inset
composition. The arc now meets the viewport's left edge, the selected image
bleeds slightly beyond it, photograph frames are removed and a static top/bottom
alpha mask blends the arc into the cream page. The heading, compact numbered
selector and details share one right column at 768px and above, including the
reported 929px viewport. The details have no card background, border, blur,
shadow or inset panel padding. On phones the heading precedes the full-width
arc; text below retains readable gutters. Outer visual entrance uses Motion
for850ms, separately from the GSAP card transforms. Details swap with a320ms
fade/12px rise. Reduced motion removes travel. Surrounding section order remains.

## Data, source and runtime

All room images and descriptions come from existing `src/data.ts` records.
The owner accepted `Rate on request` while confirmed inventory/rates are pending.
No room category, price, availability, amenity or confirmation was invented.
Source provenance is retained in `public/licenses/arc-card-carousel.txt`.

The official React Bits GlassSurface installed in the previous room task remains
active for the foreground caption only; the glass information box is removed.
Frosted mode is used
with `refraction={false}`; no WebGL context or new dependency is added. Local
Newsreader/Manrope, cream/pine/rust and reduced-transparency fallbacks remain.

The shared GSAP runtime owns an on-demand 850ms position tween. Geometry is
cached by ResizeObserver; frame callbacks write transforms without layout reads
or React frame updates. Completed/offscreen/hidden motion sleeps. System reduced
motion settles selection directly while keeping the static curved composition.
Lenis remains on the existing single GSAP ticker. The supplied demo's perpetual
page-scroll looping and always-running ticker are deliberately replaced by
embedded manual card selection so guests can continue down the hotel page.

## Verification

- `npm run build`: TypeScript and production build pass. Existing main-chunk
  size warning remains (~605kB minified); this task adds no dependency.
- `node scripts/room-arc-qa.cjs`: 15 browser checks, recorded in `qa.json`.
- `node scripts/room-arc-visual.cjs`: actual Chrome screenshots at 320, 390,
  768, 929, 1024 and 1440px, inspected for arc geometry, text and column alignment.
  Additional929px entry/exit screenshots inspect the surrounding sections.
- Earlier `node scripts/enquiry-redesign-qa.cjs`: all 10 enquiry checks passed,
  including dates/guests, personalised review/copy, contact deep links, phone
  completion, responsive layout and reduced motion.
- `npm test`: all 8 existing date, guest and enquiry unit checks pass.

Checks cover preview clicks, controlled selections, wrapped arrows, Home/End,
mouse dragging, real touch gestures, gallery/focus restoration, selected enquiry,
standalone routing, responsive bounds, reduced motion/transparency, offscreen
writes and local asset/browser errors. No enquiry was sent and no booking made.
Headless Chrome touch emulation is not a physical iOS/Safari performance test;
no fixed frame-rate guarantee is claimed.
