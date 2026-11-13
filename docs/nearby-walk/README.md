# Illustrated nearby guide

The user-supplied Nearby Walk component now replaces the active 3D terrain map. Open the homepage's **Explore nearby** action, or visit `http://localhost:4174/contact#location`. The same component is used on home, about and contact. Directions and booking paths are preserved.

The supplied line-drawing composition is adapted to Kausani: hotel origin, tea estate, Sumitranandan Pant Museum and Anasakti Ashram. These are schematic drawings, not architectural models. Seoul landmarks, placeholder hotel text and the unverified rooftop camper are not shown. Existing sourced coordinates remain in `src/map/places.ts`; approximate great-circle distances are computed in `src/map/nearby-data.ts`. The adjacent tea/hotel points use “Close to the hotel”; other distances are rounded. The scene is explicitly not to scale and not a walking route. No walking times, opening hours or amenities are invented.

## Component and style paths

- `src/components/ui/nearby-walk-menu.tsx`: exported NearbyWalk and prop types, four themes, selection and lifecycle handling.
- `src/components/ui/nearby-walk-drawings.tsx`: Kausani-specific SVG line drawings.
- `src/components/ui/nearby-walk-menu.css`: scoped illustration, controls, responsive styles and CSS keyframes.
- `src/components/ui/nearby-walk-demo.tsx`: example using the project's sourced data.
- `src/map/LocationSection.tsx`: the real site integration and selected-place details.
- `src/lib/utils.ts`: cn using clsx and tailwind-merge configured for the tw prefix.
- `src/tailwind.css`: Tailwind4 entry, theme/utilities imports, tw prefix, no Preflight.

In this Vite project `@` resolves to `src`. Therefore the requested `/components/ui` import path is **`src/components/ui`**, imported as `@/components/ui/nearby-walk-menu`. The folder is now present and the existing `components.json` UI alias points there. This keeps copied components, cn imports and future shadcn CLI additions in the same location; an additional top-level `components` folder would create a competing import root.

## Stack setup, already completed

TypeScript, Vite and `components.json` were already present. Added `tailwindcss`, `@tailwindcss/vite`, `clsx` and `tailwind-merge`; registered Tailwind's Vite plugin and imported `src/tailwind.css` in main.tsx. Utilities use **tw:**, for example `tw:flex`. Preflight is omitted so existing hotel typography, forms, buttons and page resets are retained. Existing ordinary CSS remains authoritative. shadcn CLI info confirms Vite, TypeScript, Tailwind v4, the @ alias and resolved UI/utils/CSS paths.

For this checkout, `npm install` restores all dependencies; no new shadcn init is needed. Restart Vite after plugin/configuration changes. For a new Vite React TypeScript project, initialise shadcn with `npx shadcn@latest init`, configure its aliases, then install Tailwind using the [official Vite setup](https://tailwindcss.com/docs/installation/using-vite). This project's selective imports follow [Tailwind's no-Preflight and prefix guidance](https://tailwindcss.com/docs/preflight); aliases follow [shadcn components.json](https://ui.shadcn.com/docs/components-json).

## Interaction and motion

Buildings rise sequentially; the ground draws and decorative dots travel along the illustrated line. Stable transparent hit areas prevent hover bounce from retriggering itself. Hover/focus/tap swaps the metric and updates place information; native HTML buttons provide a readable keyboard/touch alternative. On phones SVG labels are hidden and small SVG controls leave the tab order. All native place/theme/pause targets are at least44px tall.

Classic, Night, Sunset and Ink recolour the guide locally and preserve the surrounding hotel design. The optional cursor light/trail runs only for fine pointers with motion allowed. It sleeps when settled and cleans up listeners/frames. Pause settles entrances and stops movement. Offscreen/hidden scenes pause; live reduced-motion changes produce complete static artwork and retain functional controls.

Author attribution from the supplied component is retained in source and `public/licenses/nearby-walk.txt`. This is an adaptation, not a claim that the original Seoul demo is installed unchanged. Existing SVG/motion guidance was used; no additional animation engine or generated imagery was needed. The original geographic renderer and its source/license assets remain archived in the project, without active imports or network use.

## Verification

- `npm run build`: TypeScript and production build passed. Nearby guide JS about15.7kB gzip plus2.7kB CSS; the former terrain renderer and MapLibre worker are absent from emitted assets. The main bundle remains about201kB gzip and still triggers Vite's existing500kB notice.
- `npm test`: eight booking/date tests passed.
- `scripts/nearby-walk-qa.cjs`: eleven browser checks passed. Covers real data/no placeholders, entrance and hover, SVG/native keyboard controls, four local themes, pause/offscreen sleeping, live reduced motion,320/390/768/1440px overflow and target sizes, closing animation, enquiry regression, contact-route reuse, zero terrain-provider requests, emulated touch and no uncaught browser errors. Exact results: qa.json.
- Actual desktop/Night and phone screenshots in this directory were inspected. The phone viewport screenshot is the reliable normal-screen view; tall element screenshots can capture the fixed header outside its usual viewport position. `scripts/nearby-walk-visual.cjs` and `nearby-walk-inspect.cjs` reproduce the views.
- Local Chrome and emulated touch were used. Physical iOS/Safari and actual walking routes/times were not certified. Historical Taste and previous terrain tests describe earlier compositions and are not a passing grade for this revision.

Run source editing with `npm run dev -- --port 5173`. Production preview: `npm run build`, then `npm run preview -- --port 4174`.
