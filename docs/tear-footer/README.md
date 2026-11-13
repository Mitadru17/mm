# Supplied Pushpin Tear Footer — 13 November 2026

The new footer replaces the previous photographic SignatureFooter. It uses the supplied component's actual seeded ridge/flap geometry, SVG paper and fibre rim, glossy pin artwork, staggered entry, pointer response and click-to-retear choreography. The existing `SignatureFooter` wrapper supplies the hotel's real data and opens the unchanged enquiry flow.

## Integration and style

- Component: `src/components/ui/pushpin-tear-footer.tsx`; scoped stylesheet beside it. The existing TypeScript/shadcn setup maps `@/components/ui` to this folder. Tailwind v4 remains available with the `tw:` prefix and no Preflight; the supplied footer itself uses scoped CSS, so no new setup is needed.
- Pine sheet `#2f4f3e`, cream paper `#e9e1d6`, cream sheet text `#faf8f4`, solid pine paper text and rust pin `#c66a3c`. Current Newsreader/Manrope are reused. The clear MYSTIC wordmark, two columns, top controls, local clock, torn silhouette and bottom side links follow the supplied composition.
- The central newsletter field is replaced with the existing “Plan your mountain stay” enquiry button. The client has no newsletter integration; no fake signup, availability, privacy-policy or certification links are displayed. Existing phone/email/directions, local routes and external booking portal remain functional.
- All six column links remain visible on phones; important targets are at least44px. The footer is `clamp(940px,100svh,1120px)` tall to preserve readable typography and the tear's safe space. It may span more than one phone viewport.

## Motion and behavior

The intro assembles the chrome, drops the pin and draws the tear (about2.7s total). Clicking or keyboard-activating the pin lifts it, morphs to the next deterministic tear, stabs and settles (about1.72s). Pointer movement lifts nearby flaps and tilts the pin; touch keeps normal scrolling and a direct re-pin action. The finite SVG geometry animation is bounded to84 ridge points and6 flaps; no new animation engine or WebGL context is introduced.

SVG frames stop outside the viewport and when the document is hidden. The Kausani clock uses `Asia/Kolkata` and updates every30s only while visible. Indefinite decorative clock/status/chat animations are removed. Live system/site reduced motion immediately settles the tear and all content; the pin still changes the edge without travel.

Copy-email reports a successful clipboard write, or displays the actual email if clipboard access fails. The central action opens the existing native modal and restores focus to its button when closed. Internal footer links use React Router. Return-to-top reuses the existing Lenis/GSAP scroll runtime and focuses the header navigation trigger.

## Provenance and cost

Source supplied by the project owner in attachment `153cc1a0-4cb7-4896-9da6-ad5efd64fdb4/Pasted text.txt`. Original defaults identify `kedhareswer` / `21st.dev`; that provenance is retained in the source header and `public/licenses/pushpin-tear-footer.txt`. The supplied code did not include an independent license declaration; no broader upstream license is asserted. No unrelated demo branding, links or newsletter copy is rendered.

The procedural component adds no dependencies. Compared with the preceding build, the main JS rises by about23.1kB minified/8.8kB gzip, and CSS by about18.2kB/3.8kB gzip. Existing main bundle warning remains (~604kB minified). The source's bounded SVG drawing is required by the explicitly requested effect; it does not run continuously while idle/offscreen. No Blender/bitmap-generation step is needed for its SVG pin.

## Verification

- `npm run build`: TypeScript and production compilation pass.
- `node scripts/tear-footer-qa.cjs`:11 browser checks, results in `qa.json`: actual tear changes, keyboard re-pin, copy-email/clipboard feedback, real links/content, high-contrast paper links, enquiry/focus restoration, Lenis back-to-top, offscreen SVG sleeping,320/390/768/1024/1440px reflow/targets, reduced motion and phone touch, no uncaught browser errors.
- `node scripts/enquiry-redesign-qa.cjs`: full existing enquiry/menu/footer regression; current results in `../enquiry-redesign/qa.json`.
- `node scripts/tear-footer-visual.cjs`: actual Chrome screenshots at1440,768,390 and320px. Reviewed desktop and phone; final links are solid pine on cream, and the more subtle paper grain follows the brand.
- Earlier `signature-footer` screenshots/documentation describe the previous footer. Latest authority is this component plus the newest DESIGN.md override. Taste's generic footer/place defaults are superseded by the explicit supplied composition; no global Taste gate pass is claimed.

Preview: `http://localhost:4174/?view=tear-footer#contact`. Development: `npm run dev -- --port 4174`; production preview: `npm run build` then `npm run preview -- --port 4174`. No public deployment or external messages were sent.

Phone refinement: the original ridge crossed the larger navigation CTAs on narrow screens. Below620px, the drawn ridge uses a display-only0.23 +0.77y remap and shorter flaps, while the canonical tear coordinates remain unchanged for smooth morphing. Columns begin at31% rather than34%. This preserves the supplied desktop silhouette and keeps all phone links on the pine sheet across seeds. Final phone component captures use a390/320×844 viewport; the fixed header is hidden temporarily during isolated footer capture only, with no shipped layout change. The pin's keyboard ring is pine against the cream paper.
