# React Bits motion delivery — 12 November 2026

The site now uses focused React Bits adaptations across its shared components while retaining the Capsules palette, Host Grotesk, genuine photographs, booking flow, Lenis and existing Embla carousel. The current motion extension is recorded in `DESIGN-EXTENSIONS.md`.

## What changed

- **Custom desktop cursor:** a precise dot and four corner brackets frame links, buttons, summaries and photographs. Photo targets may show a View label. The frame matches control radii, responds to press and follows scroll-moving targets. It preserves actual hit areas and uses pointer-events:none.
- **Readable heading reveals:** the home wordmark and shared page/section headings resolve word by word from restrained blur and vertical travel. A single accessible copy is exposed to assistive technology; animated duplicates are aria-hidden. Word wrapping and explicit line breaks remain responsive.
- **Magnetic action icons:** shared arrow-disc icons follow the mouse within a bounded 7.5px range. The control itself stays put, retaining 48px primary action height and native navigation.
- **Glass light sweeps:** cards across room/activity/story/journal/location sections catch a neutral diagonal light sweep on entry or focus. Existing glass texture, card entrances and photo pan remain.
- **Scroll-responsive editorial line:** a repeating line and hotel mark move with scroll position, with restrained velocity skew, between the landscape chapter and hotel spaces. It stops when scrolling stops. Reduced motion shows one static wrapping phrase.
- **Page progress:** a fine fixed progress line follows actual page scroll across routes. Lenis remains the sole smooth-scroll controller; Embla retains dragging, direct selection, keyboard and photo feedback.

All timed feedback uses the design's 150ms limit. Heading words use 120ms plus at most 30ms delay. Cursor movement uses finite 150ms easing instead of perpetual rotation or spring settling. The five active source decisions are listed in `react-bits-component-map.md`.

## Accessibility and cleanup

The native cursor is restored over form fields, editable content, maps and native dialogs. Keyboard navigation, window blur, pointer leave, drag start, document visibility and route changes clear the custom cursor. Coarse-pointer media rules suppress it; actual touch events never drive it. System and manual reduced motion remove the cursor/glare, stop Lenis and show stable readable headings and editorial text.

Pointer movement writes refs/CSS transforms rather than React state. Cursor frames stop after settling; there is no idle spin. The editorial text has no autoplay frame loop. Resize observers, pointer/scroll/key listeners, dialog observer, frame requests and Web Animations are cleaned up. Existing map rendering and native dialog focus management remain separate.

## Verification

- Production TypeScript/Vite build passed. All 8 existing inquiry/date/guest tests passed.
- All 14 routes checked at 320px, 390px and 1440px with no horizontal overflow or animated words wider than the phone content area. Mobile navigation opens, makes the page inert, navigates and closes, with focus returned to the destination heading. Results are recorded in `capsules-redesign/react-bits-motion-audit.json`.
- Cursor target state and four corner nodes verified on the booking control; native form entry works with the cursor override cleared. Keyboard/reduced-motion state removes the custom cursor and Lenis and clears heading blur.
- Card sweep computed transform changes from its initial off-card position to the completed opposite edge. Scroll-band transform follows actual scroll.
- Carousel next selection advances, pointer drag changes the selected photograph without opening a dialog, and photograph activation opens the native lightbox. Dialog opening clears the custom cursor; Escape closes it.
- Map controls retain the native cursor and actual terrain/vegetation rendering. Browser warnings/errors are checked in the saved audit.
- At 320px with reduced motion, the editorial track fits the 305px layout viewport, shows one wrapping phrase, and has no heading blur or magnetic transform. The custom cursor is unmounted and Lenis is absent. Pointer/coarse-device rules were reviewed; viewport tests do not simulate physical touch hardware.
- No new runtime dependency was added or downgraded. Main application JS is approximately 159.2kB gzip (previously 156.7kB); the heavy terrain renderer remains lazy-loaded.

Screenshots: `capsules-redesign/react-bits-cursor-desktop.jpg`, `react-bits-motion-phone.jpg` and `react-bits-editorial-desktop.jpg`.

Source snapshots: `.codex/react-bits/reviews/{TargetCursor,BlurText,Magnet,GlareHover,ScrollVelocity}-TS-CSS.json`. These are narrowed derivative implementations of reviewed source, using the existing runtime and design tokens. The official [MIT + Commons Clause notice](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) is retained at `public/licenses/react-bits.txt`.
