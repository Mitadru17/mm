# Cinematic redesign delivery

Preview: http://localhost:4174/ · Deployable static output: `dist/`

## Delivered design

- Replaced the script-dominated opening with an editorial, two-line hero over genuine hotel photography. A narrowly adapted React Bits BlurText reveal uses the existing Motion runtime. The direct stay-planning action remains visible throughout the entrance.
- Rebuilt the arrival chapter with an asymmetric introduction, a large balcony image, a smaller timber-room detail and restrained handwritten annotation.
- Added a forest-green destination chapter with sticky reading on wide screens, a subtle photographic drift and a static layout on smaller screens. Its artwork link preserves the original optional bronze-relief viewer.
- Reworked the gallery into a natural-ratio photo journal: one to three columns, captions below images, category filtering and the existing keyboard/touch-capable native-dialog lightbox.
- Refined room panels and controls toward flatter, quieter surfaces. Retained the verified Embla carousels, Lenis scrolling, date/guest validation and external booking channel.
- Added a persistent on-page reduced-motion control. It coordinates CSS effects, Motion, hero rotation, Lenis, carousel snaps, dialog entrances and the optional viewer's rotation attribute. System preference remains authoritative.
- Improved new caption colors and retained readable, bounded fluid typography. Supporting muted text measures 4.82:1 and journal captions 4.93:1 against the warm paper background. This is a targeted contrast check, not a full accessibility certification.

## React Bits and persistent setup

The free registry is configured in `components.json`; TypeScript and Vite aliases support future source additions. The shadcn MCP server was added without replacing existing entries and verified with a real STDIO discovery call. The CLI is invoked through `npx`, not shipped as an application dependency. Codex must be restarted to expose the newly added server in its native tool list; the independent protocol client already verified it in this session.

Permanent rules are in `AGENTS.md`. The required [component map](react-bits-component-map.md) explains selected and rejected candidates, dependencies, mobile behavior and accessibility. [Creative direction](CINEMATIC-DIRECTION.md) and [integration status](INTEGRATION-STATUS.md) record the design and tool decisions. Upstream attribution is included in `public/licenses/react-bits.txt`.

## Verification

TypeScript and `npm run build` pass. All 8 existing date, guest and inquiry tests pass. Changed source passes Prettier checks. Full `npm audit` and production-only audit report 0 vulnerabilities.

Browser measurements covered **320, 360, 390, 768, 1024, 1280, 1440 and 1920px** widths. Scroll width matched client width at all eight sizes. The newly composed text stayed within the viewport. Main body size ranges from 16px to 18px, and form inputs remain 16px. The narrow 320px headline uses 50px type and two lines. Gallery columns change from one on narrow phones to two on tablets and three on desktop; destination copy is static below 900px.

Browser interaction checks confirmed:

- Hero stay-planning link reaches the form; mobile navigation closes and scrolls to its target.
- Valid sample dates **2026-12-22 to 2026-12-25**, 2 adults and 1 child produce the correct reviewed inquiry and encoded email link. Nothing was sent. Escape closes the dialog and restores focus to “Prepare stay inquiry”.
- The reduced-motion button sets the shared flag, disables Lenis and CSS image animation, sets transitions to zero, and survives reload. Restoring normal motion restores Lenis. The operating-system setting was not changed.
- The optional artwork dialog opens in reduced-motion mode without an `auto-rotate` attribute.
- Gallery “Views” filtering returns 2 photographs; keyboard ArrowRight advances the lightbox and Escape closes it. Expanding the full collection displays 12 selected photographs. All 12 rendered aspect ratios match their source dimensions.
- Narrow-screen room category arrow navigation and next-image control update the title and image index. The experience End key reaches 06/06 and disables Next.
- Internal fragment targets resolve, IDs are unique, and no loaded image failures were found. Final browser error logs were empty during the checked flows.

These are browser viewport and interaction checks, not physical-device or screen-reader certification. No fixed frame-rate claim is made.

## Assets, facts and performance

All **53 original photographs** retain their inventory SHA-256 hashes. No unrelated stock hotel image, fabricated interior, invented amenity, room rate, availability, testimonial or review count was introduced. The original booking site was revisited; its external booking workflow is preserved. Maps access timed out, so no new review evidence was asserted.

The main bundle is approximately **431.54kB minified / 142.38kB gzip**, about 1.52kB gzip above the preceding motion revision. CSS is **83.60kB / 17.94kB gzip**. The optional viewer is a separate lazy chunk of approximately **1,040.77kB / 297.45kB gzip**, producing Vite's existing chunk-size advisory. It is requested only when the visitor opens the artwork view.

Higgsfield reports 0 credits and no free-generation allowance. Blender was running and listening locally, but read-only bridge and MCP initialization checks timed out; a responsive Blender MCP connection is not claimed. Existing original Blender artwork is retained. Additional generative media was unnecessary for this photographic direction.

## Evidence

- [Desktop hero](cinematic-redesign/desktop-hero.jpg)
- [Desktop arrival](cinematic-redesign/desktop-arrival.jpg)
- [Desktop destination](cinematic-redesign/desktop-destination.jpg)
- [Desktop photo journal](cinematic-redesign/desktop-gallery.jpg)
- [320px hero](cinematic-redesign/mobile-320-hero.jpg)
- [390px hero](cinematic-redesign/mobile-390-hero.jpg)
- [Mobile gallery](cinematic-redesign/mobile-gallery.jpg)
- [Tablet destination](cinematic-redesign/tablet-destination.jpg)
- [Reviewed inquiry](cinematic-redesign/inquiry-review.jpg)
- [Responsive measurements](cinematic-redesign/responsive-metrics.json)

The project remains a local static implementation. Deployment, a direct booking API and owner confirmation of disputed operational information remain outside the supplied integration scope.
