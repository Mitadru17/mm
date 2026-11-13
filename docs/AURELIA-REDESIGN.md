# Aurelia-inspired redesign

This report supersedes the first implementation's typography and layout details in `DELIVERY.md`.

## Reference and final design

The reference [Hotel Aurelia](https://hotelaurelia.online/) was inspected in a real browser, including its English content, hero, room presentation, editorial imagery, experience cards and navigation. Its principal design cues were a centered heraldic identity, calligraphic full-screen hero, bronze bird ornament, warm ivory surfaces, restrained serif typography, pill-shaped selectors, large room imagery with a translucent information panel, tilted experience photographs, layered dining images, airy reservation form and oversized footer wordmark.

Mystic now follows that visual structure closely with its own original crest, wording, genuine hotel photographs and original Blender artwork. No Aurelia photography, video, proprietary font file, source implementation, property descriptions, wedding services, pool/spa claims, awards or social accounts were transplanted. The hotel remains Mystic Mountain in Kausani.

Typography is now **Pinyon Script** for the hero/closing, **Cormorant Garamond** for editorial headings and **DM Sans** for interface/body copy. Fonts are self-hosted and their license files are included under `public/licenses/`. The palette is warm ivory, parchment, muted bronze and charcoal olive. The original hotel photos and their provenance remain in `docs/asset-inventory.json` and `docs/asset-map.json`.

## Motion, controls and loading

- Real **Lenis 1.3.27** integration, with a managed animation frame loop and smooth anchor navigation. Native touch scrolling remains available. Reduced-motion preference disables Lenis and decorative animation.
- Correct CSS scroll padding is shared with Lenis, avoiding doubled navigation offsets. Menus/dialogs stop the page's Lenis instance and restore it on close. Dialogs and horizontal carousels are excluded from wheel smoothing.
- Hero photograph crossfades, slow image scale, floating bronze birds, view selectors and an explicit pause/play control.
- Full-screen room presentation with category tabs, arrow-key tab navigation, previous/next photographs, indicators and detail/inquiry controls. Photographs remain mounted for crossfades.
- Tilted horizontal experience cards, native touch scrolling/snap and previous/next controls.
- Layered, controllable dining photographs, image hover depth, intersection reveals, floating terrain artwork, animated footer marquee and a real Kausani clock.
- **Actual image-loading skeletons**, removed on image load/cache completion. Failed photos have an accessible fallback. Loading is not artificially delayed. The 3D module has a real Suspense loading skeleton.
- Existing gallery filtering, lightbox arrows/Escape/swipe handling, focus restoration and direct contact remain.

## Original Blender work

The installed `D:/bd/blender.exe` was run in a separate background process using factory-startup and `bpy`. No Blender MCP was exposed. The unrelated open unsaved project was not opened, reset, edited or overwritten.

| Asset | Source | Geometry audit | Web display |
| --- | --- | ---: | --- |
| Bronze swallow flock | `blender/bronze-swallows.blend` | 27,624 mesh triangles, one material | 31,542-byte transparent WebP; CSS motion in hero |
| Abstract mountain relief | `blender/mountain-relief.blend` | 28,220 base mesh triangles; **81,212 exported triangles** including raised contours, two materials | 80,052-byte transparent WebP; optional orbitable GLB |

Production plan: `blender/PRODUCTION-BRIEF.md`. Reproducible creation script: `blender/create_art.py`. Individual validation JSONs, preview PNGs and final renders are retained. `docs/art-manifest.json` maps source, render, optimized display asset and model. `scripts/prepare-art.mjs` creates the optimized WebPs.

The relief is an explicitly identified artistic illustration, not a geographic map or a photograph of the hotel. Clicking **Explore in 3D** loads a real local GLB with camera controls and rotation. The renderer is dynamically imported only for that interaction. Its model-viewer/Three.js code is not in the initial page bundle. No 3D video is claimed; the delivered feature is original 3D artwork and a real interactive viewer.

Higgsfield was checked again: free plan, **zero credits**, **no free-generation counters**, and no active unlimited trial. No generation, purchase, trial activation or charge was made.

## Reservation behavior

The redesigned form keeps tested date and guest validation and adds room preference plus optional name, email and special requests. These details remain in the page until the guest opens/sends their reviewed email. There is no automatic email submission, payment collection, fake availability check or reservation confirmation. The existing external booking portal remains linked.

Exact room category/photo mapping, inventory, amenities, policies, rates, phone-number discrepancy and postal code remain owner-confirmation items described in `AUDIT.md` and `DELIVERY.md`. The reference's unrelated hotel services were not adopted.

## Build and delivery

The application remains a local React/TypeScript/Vite static site. New meaningful dependencies: Lenis, the three local font packages, Google model-viewer and its required Three.js peer. The previous font packages were removed.

Initial JavaScript is approximately **292 kB / 91.4 kB gzip**; CSS approximately **52 kB / 11.7 kB gzip**. The **3D module is a separate approximately 1.04 MB / 297 kB gzip chunk** and the terrain model is 1.56 MB, loaded only after the visitor asks to explore it. Vite reports its expected large-chunk advisory for that optional renderer. Main-page use requires no WebGL, model download, cloud credentials or paid integration.

Production preview remains **http://localhost:4174/**. Public deployment has not been performed. If the final origin differs from the current hotel domain, update canonical/OG/sitemap/robots origins; preserve a separate real booking engine URL if replacing the old portal itself.

QA screenshots and browser results for this revision are in `docs/aurelia-redesign/`. Local timing is not a cold mobile-network benchmark. Chromium testing cannot substitute for physical-device/Safari/Firefox validation. The original first-version screenshots remain in `docs/screenshots/` for comparison.

## Final QA

- **Production build passes** (TypeScript and Vite). The only build advisory concerns the separate optional 3D chunk described above.
- **Eight booking tests pass**, including valid/invalid dates, guest limits, leap-year boundaries, inquiry content and optional guest details.
- Verified in the production browser: hero view switching and pause, room images/tabs/detail view, room-to-form navigation, experience controls, dining selection, gallery filter and keyboard lightbox navigation, stay inquiry preview, encoded email URL, clipboard confirmation, mobile navigation and the interactive 3D model. The model was dragged successfully in the mobile viewport.
- Native dialog focus and Escape controls work; the page's Lenis instance is stopped while a dialog or mobile menu is open. System reduced-motion is supported in source/CSS; changing the OS setting was not part of this test.
- Refinement corrected a doubled anchor offset, decorative terrain-orbit overflow, room image crossfade behavior and initial 3D framing. The hero typeface is now preloaded and its entrance shortened. Original photo pixels were preserved.
- Final responsive measurements and console observations are recorded in `docs/aurelia-redesign/browser-qa.json`. No screenshot-only mockup was substituted for the running application.
- Four model-viewer `rAF timed out in updateSource` warnings were captured across background initialization attempts. The model subsequently rendered and responded to controls each time; no console errors or corresponding page failure were observed. These warnings are retained in the raw report.

Final viewport results, after the refinement pass:

| Width | Horizontal overflow | Local observed LCP | Unexpected layout-shift sum |
| --- | --- | ---: | ---: |
| 360 px | None | 2,000 ms | 0.000211 |
| 390 px | None | 1,204 ms | 0.000266 |
| 768 px | None | 1,980 ms | 0.000205 |
| 1280 px | None | 1,752 ms | 0.000703 |
| 1440 px | None | 2,004 ms | 0.000443 |
| 1920 px | None | 1,984 ms | 0.000230 |

The final DOM checks found no missing internal anchor targets, broken loaded images, missing alt attributes or skeletons stuck over loaded images. The room-detail inquiry action transferred keyboard focus to the check-in input. The final site was left open at its root URL in the user's browser.

Performance data uses local production preview, a reused Chromium session, caching allowed and no network/CPU throttling. The small local observer measures LCP and sums unexpected layout shifts, rather than implementing full session-window CLS or a field INP percentile. A deployed cold-network benchmark and real-device testing remain required before making production Core Web Vitals claims.
