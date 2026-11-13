# Current preview — Mystic Mountain / Jägerhof reference

Open http://localhost:4174/ for the production preview. From D:/code/MYSTIC run `npm run build`, then `npm run preview -- --port 4174`. Development: `npm run dev -- --port 5174`.

Current entry: src/jagerhof/JagerhofApp.tsx. Visual authority: DESIGN.md. Delivery and QA: docs/JAGERHOF-DELIVERY.md. The historical notes below describe earlier revisions.

---

# Hotel Mystic Mountain Kausani

The current website follows the user's **The Bend Club** reference: a light cream and pine single page, full-screen photo carousel, scrolling editorial introduction, sticky three-part image story, staggered photo columns and a dark glass inquiry panel. [DESIGN.md](DESIGN.md) records the exact supplied tokens. Mystic Mountain's genuine photography, verified contact details, inquiry planner and booking portal are retained. Lexend is bundled locally; the commercial PP Writer font has an explicit local hook with Georgia fallback pending a licensed webfont. The earlier Capsules revision is historical.

The current entry is `src/bend/BendApp.tsx`, with the expressive home hero in `src/bend/PremiumHero.tsx`. Open `/` for the single page. The hero uses genuine hotel photography, a short cinematic entrance, a floating next-photo preview, a stay CTA and soft circular cursor. See [the hero notes](docs/PREMIUM-HERO.md). Supporting routes retain the light palette. Place's **Explore Kausani in 3D** control opens the existing satellite terrain, buildings, trees and nearby-location interactions on demand.

## Run

```powershell
npm install
npm run dev -- --port 5174
```

```powershell
npm test
npm run build
npm run preview -- --port 4174
```

The production preview is at `http://localhost:4174/`. The deployable output is `dist/`. This is a static React application; no environment variables or account credentials are required. Configure the host to serve `index.html` for client-side routes.

## Current experience

- Fourteen routes: home, about, room collection, three room stories, services, activities, gallery, journal, three articles and contact. An additional fallback handles missing pages.
- A large photographic hero, real room cards, destination suggestions, hotel spaces and a photo carousel.
- Lexend 400/500 body text at 16px/24px; writer/Georgia editorial headings, with 100.8px H1 and 51.84px H2 at 1440px. Phone typography adapts without shrinking form inputs.
- The exact cream/pine color roles, 12px corners, glass-panel shadow, 1280px content cap and reference spacing from `DESIGN.md`.
- Lenis uses 850ms smooth scrolling; the main hero uses Embla's Fade plugin with touch/pointer dragging and keyboard controls. React Bits text/cursor/magnetic/glare adaptations support the editorial composition. Longer story transitions follow the reference; small control feedback remains150ms.
- Native lightbox and inquiry dialogs with keyboard navigation, Escape, focus restoration and the light design system.
- A persistent reduced-motion control, plus system preference support, coordinates CSS, Motion and Lenis.
- Reserved image dimensions, responsive WebPs, static skeleton placeholders, lazy loading and explicit image error states.
- A tested inquiry form: dates, guests, room preference and optional contact details are reviewed before email/copy handoff. The website does not send an email or confirm a booking itself.
- Real telephone, email, directions, review-source and existing booking-portal links. Room story names describe the photographs; they do not assert bookable inventory categories.

## Implementation

- `DESIGN.md`: exact supplied design document. `AGENTS.md` makes it the visual authority for future changes.
- `src/main.tsx`: active entry point and local Lexend imports.
- `src/bend/BendApp.tsx`, `styles.css`: current single-page composition, navigation, gallery context, responsive design and contact flow. `LegacyPages.tsx` preserves the supporting routes.
- `src/tidescape/Pages.tsx`, `primitives.tsx`, `styles.css`: retained supporting content and controls, restyled by the latest light tokens. `TideApp.tsx` is the preceding route shell and is no longer the entry.
- `src/design.ts`: shared JavaScript timing and easing values.
- `src/BookingInquiry.tsx`, `src/booking.mjs`: inquiry UI and tested date/guest formatting and validation.
- `src/ui.tsx`: image placeholders, brand mark and native dialogs.
- `src/data.ts`: verified property identity, contact links, photography, room stories and FAQs.
- `src/experience.ts`, `src/motion.tsx`, `src/carousel.ts`: Lenis, Motion and Embla integration.
- `photos/`: 53 untouched originals. `public/images/`: optimized derivatives.
- `docs/archive/tidescape-source/` and `docs/archive/cinematic-source/`: preceding designs retained for reference. Earlier application source and generated Blender assets are preserved but not loaded by this version.

## Verification and provenance

See [Bend reference delivery](docs/BEND-DELIVERY.md), [component decisions](docs/react-bits-component-map.md), [original inventory](docs/asset-inventory.json) and [source/output mapping](docs/asset-map.json). Prior delivery reports describe historical revisions. Lexend's OFL is distributed at `public/licenses/lexend.txt`.

The current canonical/OG origin is the existing property domain. Set the final origin in `index.html`, `public/robots.txt` and `public/sitemap.xml` before hosting elsewhere. If replacing the original booking domain itself, retain the booking engine on a verified separate URL and update `hotel.booking` so it continues to reach the engine. No hosting or DNS changes were made in this revision.

## Reactive interaction update

The shared controls now include keyboard/hover/press feedback, current-route indicators, pointer-responsive linked photos, scroll-linked depth on the large photographs, photo-story copy transitions, gallery selection buttons and directional photo feedback. The welcome photograph expands into the native lightbox. FAQ disclosures retain native details/summary semantics with interruptible measured 150ms open/close animation. Form focus and validation/copy feedback use the same neutral tokens.

No new dependency was installed. Motion, Lenis, Embla and the browser animation API are reused; pointer movement caches photo bounds and writes CSS variables without React state updates. Native image dragging is disabled so it cannot fight gallery gestures. Reduced motion disables parallax and pointer image displacement as well as timed effects.

The [reactive component verification](docs/CAPSULES-INTERACTIONS.md) records that revision's interaction changes and browser checks.

## Glass cards and geographic map

The latest revision adds textured neutral glass cards with alternating up/down entrances, a pointer sheen and restrained hover lift. Home and contact now include a lazy-loaded MapLibre terrain map: the hotel stays prominently highlighted, nearby places reveal information on hover/focus/click, and explicit selection moves the camera. A place list and the original directions link remain usable if the map cannot load.

Free Skiper UI CssLink and MIT Vengeance UI GlassDock/HoverCard source are adapted to the existing design and animation runtime. Their notices are in `public/licenses/`; the footer supplies the required Skiper attribution. Added dependencies are MapLibre GL and Radix Hover Card. The user's later material instructions are recorded in [DESIGN-EXTENSIONS.md](DESIGN-EXTENSIONS.md).

See [glass/map delivery and source decisions](docs/GLASS-AND-MAP.md) for verification, coordinate sources, provider attribution and the installed `$premium-motion-ui` Codex skill.

The map's default landscape is textured with a locally prepared **6 November 2026 Sentinel-2** true-colour crop over real elevation at 1× vertical scale. The satellite button switches to the illustrated colour map. Only visible texture tiles load; the full local pyramid is 4.8MB. Data provenance, 10m resolution and the reproducible preparation script are documented in the delivery notes. Copernicus attribution stays visible.

The 3D detail layer adds **2,190 geographic building footprints**, shaded walls/roof caps and mixed pine/broadleaf tree geometry. Choose **Explore 3D detail** in the map dock for a closer view; the tree button hides or shows the geometry. Vegetation is GPU-instanced with at most 6,000 visible trees on desktop and 1,800 on phones, and no idle animation loop. The dataset contains no measured building heights, so heights and individual tree positions are clearly labelled illustrative. Overture/OSM attribution and downloadable ODbL geographic data accompany the layer.

## React Bits for this and future projects

React Bits is connected through its official registry and the user-local shadcn CLI/MCP toolchain. Use `$react-bits` in Codex, or run `react-bits search "text"`, `react-bits inspect BlurText-TS-CSS --save` and `react-bits add BlurText-TS-CSS --cwd <project>` in a terminal. The global discovery workspace is independent of this hotel project. [Setup and verification](docs/REACT-BITS-SETUP.md) includes the installed paths, future-project setup and restart note.

The active site now uses adapted **Target Cursor, Blur Text, Magnet, Glare Hover and Scroll Velocity** components for its desktop cursor, headings, action icons, glass cards and scroll-linked editorial line. Lenis and Embla are retained. Touch, typing, map interaction, native dialogs and reduced motion have dedicated behavior. [Motion delivery and verification](docs/REACT-BITS-MOTION.md) records the actual integrations and source provenance.
