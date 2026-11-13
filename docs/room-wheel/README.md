# Room wheel, glass surfaces and section rhythm — 13 November 2026

Historical implementation: the later supplied Arc Card Carousel replaces this wheel. See [current room browser](../room-arc/README.md).

The supplied Works Wheel is integrated into the existing React/Vite/TypeScript stack. The homepage's old stay collage is replaced, and the same room browser is used on `/suites`. Existing photo-story URLs, the gallery/lightbox, the native enquiry modal, dates/guest validation and external booking portal are preserved.

## Content and pricing

The three existing entries in `src/data.ts` are **photographic room stories**, with three genuine hotel photographs each. They are not verified inventory categories or nine separately bookable rooms. The UI identifies them as room photographs, shows what is visible in the images and gives each story a detailed enquiry action.

The hotel's existing [booking portal](https://hotelmysticmountainkausani.proexsus.com/) was opened in Chrome during this task. It did not expose a usable dated room quote or verified room-category/rate data. No availability statement from that page is copied into this website. The user accepted continuing with **Rate on request** pending confirmed category names/prices. No nightly rates, inventory counts, occupancy, bed categories, amenities or availability have been invented. Existing verified contacts remain unchanged.

`roomEnquiryPreferences` in `src/data.ts` centralizes the existing preference strings used by the modal and `/contact?room=…#plan`. Choosing a story preselects its preference; a subsequent generic header/footer enquiry starts with the normal default. Story preferences remain subject to confirmation by the hotel.

## Source and project structure

- User attachment: `10571dd1-7c53-4d2c-8527-5920a5c004ee/Pasted text.txt`.
- Adapted supplied wheel: `src/components/ui/works-wheel.tsx` and its scoped CSS. The original single-turn ring/drum/bow geometry, perspective and culling model are retained. Card/ring sizing is adapted to hotel photography.
- Feature and styles: `src/jagerhof/RoomListings.tsx`, `room-listings.css`.
- The existing shadcn aliases map `@/components/ui` to `src/components/ui`, and `@/lib/utils` to the shared helper. Tailwind v4 is already installed (`src/tailwind.css`, `tw:` prefix, no Preflight). No CLI/framework migration or duplicate `/components/ui` folder is needed.
- The supplied wheel did not name an independent author/license. Its provenance/adaptation is recorded in `public/licenses/works-wheel.txt`. The unrelated demo artwork/portfolio names are not used.

## React Bits glass integration

Official **GlassSurface-TS-CSS** was inspected with the installed React Bits skill/helper before installation. The reviewed registry JSON/source are in `.codex/react-bits/reviews`. Installation explicitly targeted `D:/code/MYSTIC`; the official source is in `src/components/GlassSurface.tsx` and its CSS. The upstream **MIT + Commons Clause** notice is retained at `public/licenses/react-bits.txt`. Website use is supported; this is not a claim that the component itself may be resold separately.

Two GlassSurface instances are rendered: the front photograph's caption and the selected room-information panel. Both use `refraction={false}` deliberately, selecting the official frosted renderer. The room panel sits over the actual selected room photo, with a milk-glass fill, backdrop blur, specular rim and controlled contrast. The card frames use translucent edges. Text is not distorted and no new WebGL context is created. Unsupported blur/reduced transparency gets a solid readable surface.

Integration fixes: private classes are namespaced `rb-glass-surface` to avoid the existing map's `glass-surface` rules. The shadcn CLI's automatic `tw:` prefixes on these custom CSS classes were removed (they are not utility classes). SVG channel IDs are unique, and displacement-map work is skipped when refraction is disabled. Optional source renderers remain available for future appropriate uses.

## Behavior and motion

Desktop starts with a quiet ring of the nine real photographs. Explicit selection expands it into the supplied perspective drum. Room buttons, previous/next, Home/End, arrow keys and mouse dragging choose photos; opening the front image uses the existing lightbox and restores focus afterward. A short transform/opacity transition updates room details.

Below1024px and for reduced motion, the viewer becomes a large flat photograph with the same controls. Horizontal touch dragging changes the image; vertical gestures scroll the page normally. Transferring implicit touch capture from the photo to the stage ignores the child's bubbled `lostpointercapture`, avoiding a premature snap. Drag completion does not accidentally open the gallery. The old component's cancellable vertical wheel trap is deliberately removed so Lenis/page scrolling stays continuous.

The original unconditional frame loop is replaced with on-demand frames. It writes transforms from cached stage measurements, sleeps after settling and stops offscreen/when hidden. No competing animation engine is installed. Existing GSAP/Lenis choreography owns the editorial sections; Motion owns the retained interactive fades.

## Page composition and alignment

Homepage order is now: hero → introduction → rooms → nature → dining → experience carousel → exploring → unwinding → marquee → FAQs → guest reviews → nearby → footer. The two interactive photo browsers have quiet editorial chapters between them. No extra duplicate room listing or stay collage is appended.

The shared rhythm is `clamp(76px,7vw,112px)`, with restrained chapter margins. Body text aligns with the heading in each chapter rather than using the previous25% indent. FAQ copy loses its extra inset; room, FAQ and nearby content share the page gutters. Mobile reading size, stable controls and the current Newsreader/Manrope palette/type system are retained.

## Verification

- `npm run build`: TypeScript and production build pass. Existing large-main-chunk advisory remains (~605kB minified). The room/glass feature is lazy-loaded on the homepage and shared with the supporting route: ~27.3kB JS/10.6kB gzip, ~13.5kB CSS/3.2kB gzip; no new npm runtime dependencies.
- `npm test`:8 date/guest/enquiry tests pass.
- `node scripts/room-wheel-qa.cjs`:13 browser checks in `qa.json`: all nine real assets load, ring/drum controls, keyboard front-card semantics, gallery/focus restoration, selected and generic enquiry preferences, `/suites`/contact handoff, real GlassSurface/no room WebGL, native scrolling/offscreen sleeping,320/390/768/1024/1440px overflow/targets, reduced motion/transparency, real emulated horizontal/vertical touch gestures, no uncaught errors or failed local assets.
- `node scripts/enquiry-redesign-qa.cjs`:10 existing enquiry/menu/footer regression checks pass; current results in `../enquiry-redesign/qa.json`.
- Actual desktop, tablet and phone screenshots are saved in this folder. Physical iOS/Safari, field frame rates and a live numeric booking quote were not certified. No messages or reservations were sent.
- Taste guidance informs real imagery, restrained glass, common reading edges and quiet section spacing. The explicit supplied wheel/carousel/footer compositions supersede its generic place-template defaults; no global Taste gate pass is claimed.

Preview homepage: `http://localhost:4174/?view=room-wheel#stay`; room page: `http://localhost:4174/suites`. Development: `npm run dev`; production preview: `npm run build` then `npm run preview -- --port 4174`.

Final visual pass: `scripts/room-wheel-final-visual.cjs` saves the desktop ring/front, room-route, phone gallery/details and nature transition. It checks that the room heading, nature heading and nature paragraph share the same outer reading edge (51.40625px at1440px), and that the phone has no horizontal overflow. Final component screenshots use the shipped CSS and genuine assets. The last change aligns chapter copy to the shared page gutter; no interaction behavior changed after the13-check room run.
