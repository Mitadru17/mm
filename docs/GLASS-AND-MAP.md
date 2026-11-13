# Glass cards and Kausani terrain map

Implemented and verified 11 November 2026. `DESIGN.md` remains the token authority; `DESIGN-EXTENSIONS.md` records the user's later request for glass surfaces and a geographic map.

Colour update, 12 November 2026: the geographic canvas now uses natural green landcover, blue water/streams, warm roads/buildings and softer sunlit hill relief, as explicitly requested. The surrounding controls and place cards retain Capsules neutrals. TypeScript/production build passed; the rendered terrain and place-card interaction were checked in the refreshed preview. Screenshot: `capsules-redesign/terrain-map-colour.jpg`.

## Real landscape texture — latest revision, 12 November 2026

The default view now drapes genuine true-colour satellite imagery over the elevation mesh at **1× vertical scale**. Forest patterns, fields and settlement colours come from the area itself. Road overlays are faint and synthetic building/water fills are hidden in satellite mode. A labelled satellite control switches to the earlier illustrated view; existing place cards, directions, zoom and flat/3D controls remain available. The camera is bounded to the local landscape, with zoom limited to avoid excessive texture enlargement.

The final source is **Sentinel-2 scene S2C_44RLU_20261106_0_L2A**, acquired **6 November 2026**, supplied through Element 84 Earth Search / AWS Open Data. Its true-colour bands have **10m ground resolution**. Original metadata is retained in `docs/ui-libraries/kausani-sentinel-scene.json`; exact bounds, provenance and processing are recorded in `kausani-texture-build.json`. [Copernicus permits reproduction, adaptation and distribution of Sentinel data](https://cds.climate.copernicus.eu/licences/ec-sentinel). The required modified-data acknowledgement is visible in the map and distributed in `public/licenses/copernicus-imagery.txt`.

`scripts/prepare-terrain-texture.py` reads a cropped Cloud-Optimized GeoTIFF window and produces a local Web Mercator XYZ pyramid. It uses cubic reprojection and WebP compression, with transparent no-data at outer scene edges. There are **340 tiles / 4,803,390 bytes** across zooms 11–14; browsers fetch only the visible tiles. No artificial scenery is baked into this texture, and no paid imagery account or API key is involved. The separate 3D geometry added later is described below; it does not claim surveyed heights or individual tree positions.

An EOxCloudless 2016 layer was initially evaluated and rendered. It was replaced before delivery by the clearer recent local Sentinel crop; the app makes no EOX tile requests and uses no commercial EOX mosaic. The native imagery date label and map caption now identify 2026 imagery.

Verification: TypeScript/production build passed; all 340 output WebPs were checked for dimensions and decoding. Real textured terrain and four markers rendered without browser warnings/errors. Satellite/illustrated switching, pin Enter activation and card dismissal were exercised. At 320px there is no horizontal overflow, the location tag clears the camera controls, and the dock clears the longer attribution. Reduced motion still flattens the camera and supports keyboard layer switching. Screenshots: `capsules-redesign/satellite-terrain-desktop.jpg` and `satellite-terrain-phone.jpg`.

## Delivered behavior

### Buildings and vegetation — latest revision, 12 November 2026

- Added **2,190 building footprints** from the Overture Maps **2026-10-21.0** release within 79.588,29.835 to 79.62,29.87. The earlier basemap supplied only a few local footprints. Original polygon geometry is retained, with native terrain-following shaded wall extrusions and warm/slate roof caps.
- None of these source records has measured heights or floor counts. The 6.4m walls, 0.7m roof cap and colours are illustrative. The map caption makes this clear; the model does not claim a surveyed reconstruction of the hotel or surrounding properties.
- Prepared **9,000 illustrative tree positions** within mapped woodland and green pixels in the local Sentinel texture. Sampling excludes building footprints and a 12m perimeter buffer, plus 9m around mapped road lines. Two original geometry prototypes provide layered pine boughs and irregular broadleaf crowns, bark and directional light.
- `TerrainTrees.ts` uses WebGL2 instanced draws in the existing MapLibre canvas. Tree roots use the actual rendered terrain elevation; geometry is skipped until that elevation is available. Local coordinates are translated before Float32 conversion to reduce close-view jitter. There is no additional animation engine, three.js payload or perpetual animation loop.
- Visible tree instances are bounded to **6,000 desktop / 1,800 phone**, selected near the camera. Instances refresh after camera/terrain updates; map/layer cleanup disposes buffers, VAOs, shader program, event handlers and fetches. The existing lazy map boundary remains.
- **Explore 3D detail** moves to a closer 62° view with zoom 16.2; zoom is capped at 16.7. A labelled **Hide/Show buildings and trees** control toggles both layers. Satellite/illustrated views, overview reset, pin cards and reduced-motion camera behavior remain available.
- Building data uses **ODbL 1.0**, with Overture Maps / OSM credit visible and upstream Microsoft/Google credit in the linked source notice. The derived geographic datasets are available at `/terrain/detail/buildings.geojson` and `/terrain/detail/trees.json`. The separate hotel content, photos and application code retain their own terms. Sources: [Overture buildings guide](https://docs.overturemaps.org/guides/buildings/), [official attribution](https://docs.overturemaps.org/attribution/), `public/licenses/overture-buildings.txt`.
- Preparation: `scripts/prepare-map-detail.mjs`; source download and release state in `docs/ui-libraries/kausani-overture-buildings.geojson` and its `.state`; compact provenance in `kausani-detail-build.json`. Served data totals 722,275 bytes of building GeoJSON plus 397,211 bytes of tree positions, loaded only with the map.
- Validation: production TypeScript/build and all 8 existing tests passed. All 2,190 polygons and 9,000 unique finite tree positions passed data checks. The actual detailed map rendered buildings and tree meshes without browser errors/warnings. Detail visibility, close camera, satellite switch and pin cards were exercised. Phone view uses the 1,800-instance cap; narrow layout, credit and control clearance are checked in the saved audit.
- Screenshots: `capsules-redesign/terrain-buildings-desktop.jpg`, `terrain-buildings-phone.jpg`. Browser evidence: `terrain-detail-audit.json`.

- Shared original `GlassCard` wraps room, activity, story, journal and map-place cards. Alternating 30px entrances settle at a stable reading position; pointer hover lifts 7.5px and moves a subtle sheen. Neutral translucency, fine grain, backdrop blur and inset hairlines provide texture without cast shadows.
- All timed interface effects retain the supplied 150ms limit and easing. Lenis, Motion and Embla remain the shared interaction engines. System/manual reduced motion removes card movement and flattens the map camera.
- Home and contact include a true geographic WebGL map with real elevation, road geometry, four place markers, hotel reset, overview, zoom and flat/3D controls. Only the hotel receives the primary filled marker treatment. Nearby markers are quiet numbered controls.
- Hover and focus reveal place cards without camera movement. Click/Enter selects a place, opens its card and recenters; Escape dismisses. A persistent semantic place list supplies the touch/keyboard alternative. Source/directions links remain native anchors.
- Tea estate and hotel coordinates are adjacent. The tea label uses a short visual offset and a leader back to its real coordinate to prevent marker collision.
- The heavy renderer loads only as the section approaches the viewport. A static loading treatment reserves space. A failed renderer shows useful directions; the place list remains available. Map gestures cooperate with page scrolling.

## Component source and licensing

- [Vengeance UI official repository](https://github.com/Ashutoshx7/VengeanceUI): MIT. GlassDock and HoverCard source were reviewed through the official registry and adapted. Notices: `public/licenses/vengeance-ui.txt`, `radix-hover-card.txt`. Reviewed source: `docs/ui-libraries/vengeance-glass.txt` and `vengeance-hover.txt`.
- [Skiper40 CssLink](https://skiper-ui.com/v1/skiper40): historical free-source review. The adaptation in `src/components/SkiperLink.tsx` is no longer used by the active app as of November 13. Original `EditorialLink` now serves all active contact/map links so the client footer has no UI-library promotion. Archived usage/provenance remain in `public/licenses/skiper-ui.txt`; reviewed source: `docs/ui-libraries/skiper40-free.json`. Skiper1 and Skiper104 were Pro/Login Required and were not copied.
- [Animmaster terms](https://animmasterlib.dev/terms): no free licensed implementation was identified. Public demos informed custom effects; paid source is absent. This follows the user's approved free-components/custom-effects choice.
- [MapLibre GL](https://maplibre.org/maplibre-gl-js/docs/), BSD-3-Clause: `public/licenses/maplibre-gl.txt`. [OpenFreeMap](https://openfreemap.org/) supplies geography; [Mapterhorn](https://mapterhorn.com/) supplies elevation. Visible provider and underlying map attribution is retained. No API key or billing account is required by this implementation; remote tiles still require network access and provider availability.

The adapted source uses project CSS and native navigation rather than importing the original demo frameworks. No second animation engine was installed. `components.json` includes the verified registry URLs for future discovery.

## Geographic evidence

Coordinates are longitude/latitude in source. No travel times, opening hours, ratings or invented attraction photos are presented.

| Place | Coordinate | Evidence |
| --- | --- | --- |
| Hotel Mystic Mountain | 79.604065, 29.856438 | Existing [MakeMyTrip property listing](https://www.makemytrip.com/hotels/hotel_mystic_mountain_kausani-details-kausani.html), named property coordinates in public SSR state; extraction retained in `docs/ui-libraries/hotel-geolocation-source.json`. Original hotel directions URL preserved. |
| Kausani Tea Estate | 79.603828125, 29.8564875 | Center of listed Google Plus Code VJ43+HGW, recovered near Kausani as 7JXXVJ43+HGW; a location cell center, not a surveyed entrance. [Place search](https://www.google.com/maps/search/Visit+Kausani+Tea+Estate,+Kausani,+India). |
| Anasakti Ashram | 79.6013043, 29.8441997 | [Geographic listing](https://sunrise.maplogs.com/anashakti_ashram_kausani_uttarakhand_india.281907.html), corroborated by geotagged Wikimedia photography; historical description supported by [Incredible India](https://www.incredibleindia.gov.in/en/uttarakhand/kausani/anasakti-ashram). |
| Pant Museum | 79.60406, 29.8435 | Nearby-place coordinates in the existing MakeMyTrip listing; extraction in `docs/ui-libraries/verified-map-locations.json`. |

## Verification

- `npm run build`: TypeScript and production build passed.
- `npm test`: all 8 existing date/guest/inquiry tests passed.
- Production dependency audit reported zero vulnerabilities after dependency installation.
- All 14 routes checked at 390px and 1440px: no horizontal overflow. Home room cards additionally checked at 320, 768 and 1024px; primary actions remain 48px high. Header links fit at 1024px.
- Real terrain and all four markers rendered successfully. Pin click/Enter opens the corresponding information; Escape closes it. A pure pointer hover opened the card with identical marker bounds before/after, confirming no hover camera movement. Phone card fits 320px width.
- 2D/3D controls and explicit selection verified. Manual reduced motion stops Lenis, removes glass-card transforms and makes the map camera flat; native map overlay transition becomes 0s. Normal native overlay transitions are capped at 150ms.
- React review covered stable component definitions, lazy renderer loading, no React state updates on pointer movement, source-guarded hover clearing, ResizeObserver/map/marker/timeout cleanup, semantic controls, keyboard alternatives and native links.
- Main application JS: 156.64kB gzip. Lazy terrain JS: 314.32kB gzip, plus a 520.11kB raw worker and renderer CSS. Vite reports a large-chunk warning for the renderer; it is separated from initial application loading. The map requires WebGL and remote tiles; fallback directions cover failure.
- Evidence: `capsules-redesign/glass-map-audit.json`, `glass-cards-desktop.jpg`, `terrain-map-desktop.jpg`, `location-card-phone.jpg`. User original photography was not modified.

## Reusable skill and optional media

Installed and validated `C:/Users/loser/.codex/skills/premium-motion-ui/SKILL.md`. Use `$premium-motion-ui` in future projects; it records design discipline, component licensing, motion/accessibility checks and map implementation lessons. It preserves each future project's own design system.

A standalone `/anatomy` SKILL.md could not be located in the installed skill directories, plugin cache or accessible history. Blender character-anatomy references are present, but they are not the requested skill; no claim is made that `/anatomy` was applied.

The connected Higgsfield account reported zero credits and no available free generations. No trial, paid generation or billing change was made. A rigged generated model is unnecessary for the delivered real terrain map; the implementation uses genuine hotel photos and geographic elevation.
