# Client motion and typography polish — 13 November 2026

The active JagerhofApp now uses an original native SiteMenu dialog with a top-origin cream sheet, staggered editorial links and hamburger-to-close animation. Closing completes before navigation or Enquire opens the stay planner. The menu can be interrupted, supports touch and cycles keyboard focus. Native Escape, scroll locking and focus restoration are preserved.

Shared Modal now animates entry and dismissal for the planner, nested inquiry review and gallery lightbox. Main headings reveal by masked lines on entry; supporting copy uses a restrained fade and rise. Resizing re-splits lines. Explicit phrase markup prevents orphan punctuation; extra mask clearance preserves serif descenders. Native FAQ disclosure, map expansion and small press/hover responses complete the interaction changes.

Typography retains the local Ronzino and licensed Bon Vivant hook with bundled Cormorant normal/italic fallback. Selective italics, tighter display tracking, tracked small labels and comfortable body leading refine hierarchy without adding font files. No proprietary font binary was added.

The active footer has no motion toggle or UI-library credit. System reduced motion remains automatic, including live preference changes. Original EditorialLink replaces every active SkiperLink import in supporting routes and the map. The archived adaptation and license notice remain; required geographic map attribution is retained.

## Verification

- `npm run build`: TypeScript and production Vite build passed. Existing large-chunk notice remains: main JavaScript about 200.74kB gzip; lazy terrain about 318.56kB gzip. No animation runtime or dependency was added.
- `npm test`: all eight existing booking/date tests passed.
- `scripts/client-polish-qa.cjs`: eleven browser checks passed, including interrupted menu entrance, focus cycling/restoration, deferred cross-route section navigation, menu-to-planner, nested inquiry review, FAQ keyboard operation, gallery arrows/dismissal, clean footer and live reduced-motion changes. No uncaught browser errors. See `qa.json`.
- Responsive rendered checks at 320, 390, 768 and 1440px: readable revealed text, reflow and no horizontal overflow. Actual screenshots in this directory show the desktop/phone menu, editorial layout, clean footer and planner.
- `scripts/client-polish-visual.cjs` generates visual evidence. `scripts/client-polish-touch-map.cjs` covers touch and the map wrapper; results are in `touch-map-qa.json`.

Browser verification uses local Chrome through the isolated Playwright installation in `.codex/qa`; it does not send an inquiry or contact the hotel. Touch is emulated. No physical iOS/Safari device or frame-rate certification was available. The map retains its existing geographic providers and illustrative detail caveats.

## Preview

Active route: `http://localhost:4174/` (production preview). Restart with `npm run build` then `npm run preview -- --port 4174`. For source editing, run `npm run dev -- --port 5173` and use `http://localhost:5173/`.

Design authority: root `DESIGN.md` and `DESIGN-EXTENSIONS.md`. Source: `src/jagerhof/SiteMenu.tsx`, `src/jagerhof/polish.css`, `src/jagerhof/motion.ts`, shared `src/ui.tsx`, and `src/components/EditorialLink.tsx`.
