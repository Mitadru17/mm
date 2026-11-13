# Motion and responsive refinement

Current local preview: http://localhost:4174/. Production output: `dist/`.

This revision refines the Aurelia-inspired hotel design with real drag carousels, coordinated scrolling, restrained motion and readable typography. Existing hotel photography, business information, inquiry behavior and original Blender artwork are retained.

## Implemented

- **Lenis 1.3.27:** interpolated wheel scrolling, a single same-page link handler, fixed-header offsets, mobile menu/dialog scroll locking, back/forward fragment handling and direct section links after fonts settle. Touch scrolling remains native. Reduced-motion preference disables Lenis smoothing.
- **Motion 14.12.0:** spring-driven page progress, staggered heading entrances, transform/opacity section reveals, room-information transitions, gallery crossfades, dialog entrances, press feedback and gentle mouse-only magnetic round links. Hero rotation pauses outside the viewport; user pause and reduced-motion handling remain available.
- **Embla 8.6.0:** room-photo and experience carousels with transform-based dragging, snap transitions, previous/next buttons, slide selectors, live counts, arrow keys and Home/End. Room categories reset to their first photograph. Experience controls disable at their boundaries and slide links are removed from the tab sequence when outside the carousel viewport. Counts reflect available snap positions at the current width.
- **Responsive type system:** removed 279 scattered font-size declarations from the original composition stylesheet and moved typography to `src/responsive.css`. Main body text ranges from 16–18px; secondary prose from 15–17px; standard labels from 11–13px. Form controls stay at least 16px. Heading, line-height, measure, gutter and section spacing rules adapt together.
- **Content-aware layouts:** room information and controls use grid flow, allowing larger text and wrapping without overlap. Narrow-phone guest selectors stack, and the hero title scales to 62.4px at 320px. Resizing an open mobile menu into desktop layout releases the scroll lock.
- **Interaction polish:** consistent hover, focus and press feedback across navigation, buttons, cards, gallery tiles, form fields and inquiry links. Image skeletons and image-error fallbacks remain in place.

## Verification

`npm run build` passes TypeScript and production bundling. All 8 existing date, guest and inquiry tests pass. Prettier passes for the changed components and styles. Dependency installation reported 0 vulnerabilities.

Browser viewport checks covered 320, 360, 390, 768, 1024, 1280, 1440 and 1920px widths. Document scroll width matched client width at every tested size. Text bounds outside the intentionally clipped carousel track were also checked at 320px. These are browser viewport checks, not physical-device certification.

| Viewport width | Body / main prose | Standard label | Form input |
| --- | --- | --- | --- |
| 320px | 16px | 11px | 16px |
| 390px | 16px | 11px | 16px |
| 768px | 16.59px | 11.40px | 16px |
| 1440px | 17.66px | 12.27px | 16px |
| 1920px | 18px | 12.90px | 16px |

Verified interactions include mobile menu navigation landing below the header, direct `#plan` and `#stays` links, room next/dot/End controls, room category changes, mouse dragging in both carousels, experience Home/End/arrow keys, disabled final experience control, room dialog open/close, gallery image transition and menu close on desktop resize. The final browser error log was empty. Reduced-motion branches were reviewed in code; the operating-system motion setting was not changed.

### Screenshots and measurements

- [Desktop carousel](motion-refinement/desktop-carousel.jpg)
- [Desktop hero](motion-refinement/desktop-hero.jpg)
- [390px hero](motion-refinement/mobile-390-hero.jpg)
- [320px hero](motion-refinement/mobile-320-hero.jpg)
- [320px inquiry form](motion-refinement/mobile-320-form.jpg)
- [768px room layout](motion-refinement/tablet-768-rooms.jpg)
- [1024px introductory collage](motion-refinement/tablet-1024-about.jpg)
- [Mobile gallery](motion-refinement/mobile-gallery.jpg)
- [Responsive measurements](motion-refinement/responsive-metrics.json)
- [Removed type declarations](previous-type-sizes.json)

## Open-source components and delivery limits

[Motion](https://github.com/motiondivision/motion), [Embla Carousel](https://github.com/davidjerleke/embla-carousel) and [Lenis](https://github.com/darkroomengineering/lenis) are MIT-licensed. License copies are included in `public/licenses/` and the production build.

The main JavaScript bundle is approximately 427.60kB minified / 140.86kB gzip; CSS is 68.60kB / 15.00kB gzip. The optional 3D viewer remains a separate lazy chunk of approximately 1,040.79kB / 297.47kB gzip and produces Vite's chunk-size advisory. It loads when the visitor requests the 3D view. Actual motion performance depends on the device; no fixed frame-rate claim is made.

The site is a local static build. Inquiry preparation and the existing external booking portal remain the booking paths. Public deployment and owner confirmation of hotel operational details remain as documented in the prior delivery reports.
