# Bend reference redesign

Active route: `/`. Source: `src/bend/BendApp.tsx`, `src/bend/styles.css`; stack React19 + Vite + TypeScript + plain CSS. Run `npm run dev -- --port 5174`; production preview `npm run build` followed by `npm run preview -- --port 4174`.

The live https://www.thebendclub.com/ was inspected for the full-screen hero, header, introduction, sticky split photo story, staggered three-column property cards, visible answer rows and landscape-backed glass contact panel. Exact user-supplied palette, desktop type sizes,12px radii, spacing and glass shadow are recorded in root DESIGN.md. The previous design files are archived under docs/bend-reference/. All visible brand data and photographs are Mystic Mountain's own; reference property claims and Oregon imagery are not used.

## Font limitation

The reference's writer alias resolves to commercial PP Writer (https://pangrampangram.com/products/writer). No licensed client webfont is present. CSS declares local PP Writer and uses Georgia/Times fallback. This is the material visual difference from an exact font match. Add the client's licensed webfont to the existing @font-face rule to replace it. Lexend400/500 is bundled locally with its OFL notice.

## Functional behavior

- Embla Fade hero supports previous/next, horizontal dragging and arrow keys, with selected photograph index. No automatic slideshow or motion-heavy loader delays access.
- Lenis supports section links, browser history, native touch scrolling and850ms wheel/anchor easing; reduced motion disables it.
- The statement inks in with scroll progress. Sticky morning/afternoon/evening images use clipped transitions and matching text. Reduced motion presents all three stories as static accessible content.
- React Bits BlurText, TargetCursor, Magnet and GlareHover adaptations are active. Cursor returns to native for form fields, maps, dialogs and keyboard use. Upstream MIT + Commons Clause notice is retained.
- Property images open the existing keyboard-accessible native lightbox.
- Inquiry validates required fields and whitespace, opens a review dialog, then offers an encoded mailto draft or copy. No message is sent automatically, no booking is claimed confirmed.
- The existing date/guest planner and external booking portal are retained. Thirteen supporting routes and404 remain available in the light palette.
- Place's expandable3D map retains real satellite/elevation data, nearby pins, Overture building footprints, illustrative-height buildings and tree instances, native controls and source attribution. Its large renderer loads only on demand. Free Skiper link attribution is visible beside the map and on supporting-page footers.

## Asset and skill decisions

Use supplied photography instead of fabricating hotel rooms/views. Blender or Photoshop generation would not improve fidelity to this photography-led reference and was unnecessary. No image/model generation, paid credits or commercial component source were used. Applied React Bits and premium-motion-ui workflows; React best practices checklist covers semantics, cleanup, lazy loading, reduced motion and input interaction.

## Verification

Browser evidence and the responsive audit are in docs/bend-reference/. Production build and the existing8inquiry/date tests pass; production dependency audit reports0vulnerabilities. Phone, tablet and desktop overflow, navigation, gallery, inquiry review/copy, nested date planner, terrain/map controls, keyboard and reduced-motion behavior are checked in the actual browser. No external inquiry was sent. The optional map renderer remains a large lazy chunk (about318.5kB gzip); it is not part of the initial route payload. Main JS is about149.8kB gzip. Hosting publication is outside this local revision.

Browser audit: home at320/390/768/1024/1440px;28fully-loaded supporting/404 route checks at320and1440px,0overflow or oversized heading words. No browser warnings/errors observed. Reduced-motion audit:0custom cursors, no Lenis class,3accessible static stories, no text blur. Evidence: home-desktop.jpg and home-phone.jpg under docs/bend-reference.
