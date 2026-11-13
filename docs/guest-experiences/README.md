# Guest experiences, nearby guide and arrival — 13 November 2026

Implemented in the existing React/TypeScript/Vite stack. shadcn already resolves `@/components/ui` to `src/components/ui`; shared helpers are `src/lib/utils.ts`, Tailwind v4 is `src/tailwind.css` (prefix `tw:`, no Preflight). The supplied component uses scoped CSS to preserve the hotel's existing reset and tokens. No CLI migration is needed. Component CSS lives beside its TSX; global hospitality typography remains in `src/jagerhof/signature.css`.

## Review evidence and factual boundaries

The public [Google Travel reviews for this exact property](https://www.google.com/travel/hotels/entity/CgoIkM3b16yA7NYQEAE/reviews?hl=en) were rendered in Chrome on 13 November 2026. Hotel identity matches the supplied Baijnath Road/Tea Factory address and telephone. Each selected entry displayed **5/5** individually, including the syndicated Tripadvisor entry. The implementation contains 24 quoted words in total from that page, with four short excerpts. It does not publish an aggregate score, total review count or relative dates, which change over time.

| Reviewer as published | Source | Displayed excerpt length | Profile / original review |
| --- | --- | --- | --- |
| kalyanasis bhattacharyya | Google, 5/5 | 5 words | [Google contributor](https://www.google.com/maps/contrib/106329330454596592125?hl=en) |
| Chirantani Chakraborty | Google, 5/5 | 9 words | [Google contributor](https://www.google.com/maps/contrib/104161762750639782815?hl=en) |
| mudit srivastava | Google, 5/5 | 6 words | [Google contributor](https://www.google.com/maps/contrib/110897310011565107172?hl=en) |
| 307bobby | Tripadvisor, 5/5 as shown by Google | 4 words | [Original review](https://www.tripadvisor.com/ShowUserReviews-g1045172-d4554003-r186598597) |

Data is maintained in `src/data/guest-reviews.ts`. Every card identifies its source, states that it is an excerpt and links to the review source. Original spelling/case is retained. Initials replace unsourced portraits. “Stayed in Kausani” is the reviewed hotel location, not a guest hometown. The globe marks **only Hotel Mystic Mountain**. The demo's locations, countries, portraits, aggregate counters and SaaS reviews are excluded.

Google Maps search confirmed the exact place ID `ChIJZ932l6NPpzkRkOb2ygKwrRA` and feature `0x39a74fa397f6dd67:0x10adb002caf6e690`, distinct from the separate historical OYO listing. Read all reviews uses that exact Google Maps feature with the `!9m1!1b1` reviews flag. The automated Maps environment presents a limited view and did not expose the full review tab; the exact property identity and outgoing destination were checked, but a full logged-in Maps review interaction was not verified. The individual ratings and text were verified on the rendered Google Travel review page, retained in `google-source.png` and research notes.

MakeMyTrip's Kausani review URL failed with HTTP2 protocol errors. Search results also returned unrelated Nepal properties with similar names; none of their reviews were used. Tripadvisor's direct page could not be fetched by the web tool; its selected review's author, text, individual rating and original permalink were available in Google's rendered page. No claim is made that MakeMyTrip reviews were integrated.

## Typography research

Inspected primary live sites [Aman](https://www.aman.com/) and [Forestis](https://www.forestis.it/en) in Chrome at desktop width. Aman uses small spaced labels, Lyon serif headings and measured paragraphs; visible sampled headings were roughly31px/45px with.5px tracking and labels roughly10px/14.7px with2px tracking. Forestis uses BrandonTextLight with headings around40px/56px and body20px/32px. These observations informed hierarchy, leading and whitespace, not a copy of their licensed fonts or a claim of identical typography.

The hotel's locally bundled OFL Bodoni Moda/Manrope pairing stays consistent across hero, menu, chapters, nearby guide, review cards, enquiry and footer. Section heading tracking is relaxed from-.045em to-.028em, with responsive size/leading, larger readable paragraph measure and consistent closing-section spacing. The palette, button language and authentic photographs remain intact.

## Component provenance and runtime

The testimonial source was supplied in attachment `a58378ec-6b36-4f41-ac89-1673c838fbf7/Pasted text.txt`. The adaptation retains its COBE globe, Cartesian-to-screen projection, on-demand render loop, drag friction, quote navigation and WebGL fallback strategy. Product-specific CSS and simplified semantics replace the demo's theme/counter/pin architecture. The supplied source did not name a separate author/license; no broader third-party license is asserted for that component. COBE2.0.1 is MIT (Shu Ding); its full notice is shipped at `public/licenses/cobe.txt`.

COBE is deferred until the globe is near the viewport, draws only on input/resize/texture readiness and destroys the renderer offscreen. DPR is capped at1.5. A static SVG globe remains when WebGL fails or context is lost. The renderer chunk is12.97kB minified/5.94kB gzip. The review section uses existing Motion and Lucide; no new animation engine or backend service. A blank request state does not block the rest of the site.

Nearby Walk retains its source attribution and verified Kausani places. All site usage shows it normally, with Classic brand colours and no colour/pause controls. Ambient cloud, window and route loops are disabled; a finite entrance and pointer/selection feedback remain. Selection details fade in over220ms, with reduced-motion removal. Existing `#place` and `#location` destinations continue to work.

Arrival holds at least1.45s and reveals over2.05s, using one shared loader/hero heading. The finite mountain-line animation runs1.35s. Asset readiness has a3.6s deadline. Skip/Escape and reduced-motion bypass remain functional.

## Verification

- `npm run build`: TypeScript and production build pass. Existing main-bundle warning remains (~581kB minified); the globe is in a deferred separate chunk.
- `npm test`:8 booking/date/inquiry tests pass.
- `node scripts/closing-qa.cjs`:11 browser checks, results in `qa.json`; real WebGL rendering, hotel pin drag/recentre, offscreen destruction, fallback, manual review controls, keyboard/touch, guide interaction, bottom order, no theme/pause controls, phone/tablet/desktop overflow, longer/skip/stalled-asset/reduced-motion loader paths, no uncaught errors.
- `node scripts/enquiry-redesign-qa.cjs`: rerun existing enquiry/menu/footer regression; see `../enquiry-redesign/qa.json` for current result.
- Visual inspection:1440,768,390px, with automated overflow checks also at320 and1024px. Screenshots are in this folder; tall sections may span more than one viewport on a phone. The desktop and phone viewport shots were checked, including the loader and hero.
- Taste guidance is applied to hierarchy, real content, edges, restrained interactions and typography. User-requested globe/carousel/map composition, real contacts and existing page layout take precedence over conflicting generic Taste place-site defaults. The previous global Taste gate exhausted its three rounds with open findings (`../enquiry-redesign/taste-review.md`); this work does not claim a global Taste gate pass.

Preview: `http://localhost:4174/?view=guest-experiences#guest-experiences`. Run `npm run dev -- --port 4174` for source development, or `npm run build` then `npm run preview -- --port 4174` for the production preview. No public deployment was made.

## Latest revision — named illustrative pins and readable typography

This supersedes the earlier single-marker/Bodoni descriptions above. The display family is locally bundled **Newsreader Variable**, normal and italic at optical size16, with450 weight for major titles. **Manrope** remains body type and now carries both MYSTIC wordmarks at500–600. The replacement avoids Bodoni's delicate hairlines and preserves the cream/pine/rust design system. Three Latin font files total147.44kB, with Newsreader's OFL notice in public/licenses/newsreader.txt.

At the user's request, the globe now contains four named guest pins placed at deterministic randomised artwork coordinates. These coordinates are not stored in the review source records. The visible caption states “Guest pin positions are illustrative.” Accessible pin labels and tooltips make the same distinction; no guest hometown, country or portrait is invented. The real hotel location retains a distinct rust marker, and the persistent Mystic Mountain control returns the globe to Kausani.

Selecting a guest pin opens its existing verified review. Next/previous, dots and swiping turn toward the relevant guest pin over850ms, with a nearest-turn calculation; reduced motion settles immediately. Rear pins are hidden and leave the tab order. No idle rotation was added. Name callouts are clamped within the globe and separated from the hotel callout. Label sizes are measured together after WebGL readiness, font readiness and resize; animation frames use cached sizes. Existing offscreen destruction, visibility suspension and SVG fallback remain.

Verification for this revision: production build and the current closing/enquiry regressions, plus scripts/guest-pins-qa.cjs at320,390,768 and1440px (guest-name controls, keyboard selection, source/card continuity, illustrative disclosure, no hotel/name overlap, label bounds, recentering and font families). See guest-pins-qa.json and guest-pins-*.png. Initial QA caught a cached-label measurement made while the pins were hidden; measurement now reruns after readiness before positioning.

The adapted review section is now12.26kB minified/5.08kB gzip, CSS6.80kB/2.01kB gzip; COBE remains12.97kB/5.94kB gzip in its separate deferred chunk. Existing main bundle warning remains. Earlier screenshots show the previous typography and single-marker state; guest-pins screenshots are authoritative for this revision.
