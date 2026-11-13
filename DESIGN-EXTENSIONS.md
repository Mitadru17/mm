# Current design extensions — Jägerhof / Mystic Mountain

## Latest override — November13 illustrated nearby guide

The user's supplied Nearby Walk component supersedes the active MapLibre terrain interface. Render the adapted SVG component at src/components/ui/nearby-walk-menu.tsx through the existing LocationSection entry on home, about and contact. Keep directions and the home disclosure transition; rename its action Explore nearby. The former renderer, models, textures and license records remain historical source and are no longer imported by the active app. No renderer, worker or terrain-provider request is needed by the new guide.

Retain the reference's staggered rising buildings, line draw, animated dotted line, route dots, landmark bounce, metric crossfade, four palettes and optional pointer light/trail. Kausani-specific schematic drawings replace Seoul landmarks and the unverified rooftop camper. Use the existing tea estate, Pant Museum and Anasakti Ashram records. Do not imply architectural accuracy or a surveyed walking route. Compute approximate great-circle distances from the sourced points; for adjacent tea/hotel pins use Close to the hotel instead of a false precise walking distance. The supplied walkMinutes prop is optional; no unverified walking time is shown.

Classic uses current cream/pine and the current Manrope/Bodoni pairing. Night, Sunset and Ink recolour the guide locally. Keep 12px scene corners, fine borders, a readable native place list and a selected-place explanation/source link. At phone width SVG labels are replaced by HTML labels and its tiny landmark controls leave the tab order. Native place/theme/pause controls are at least44px. The hotel remains the highlighted origin. Source attribution is preserved in source and public/licenses/nearby-walk.txt.

Pause settles entrance states and stops loops; offscreen/hidden scenes sleep. Respect live system/manual reduced motion. Separate stable hit areas from bouncing drawings. The pointer loop is event-driven, sleeps when settled and is absent for touch/reduced motion. No new animation engine. Tailwind4 is configured with tw: prefixed utilities and no Preflight, alongside existing CSS; the shadcn UI alias resolves to src/components/ui. See docs/nearby-walk/README.md for setup and verification.

## Latest override — November 13 footer, type and personal enquiry

Use locally bundled OFL Bodoni Moda Variable for display headings/italics and Manrope Variable for body/navigation/controls on every active route, including the menu, dialogs and map. Three Latin webfonts total about125kB; previous Cormorant/Pinyon imports are removed. Historical Ronzino/local Bon Vivant declarations are no longer the active font variables. Maintain responsive sizing, clear body copy, focus rings and system reduced motion.

Primary buttons share a 52px minimum height, 3px corners, pine fill/cream text, 13px medium Manrope and a small directional arrow separated by a hairline. Secondary outlines share the shape and height. Hover moves by2px, press scales to.985; reduced motion removes travel. Map utility controls and native menu/disclosure semantics remain distinct. No new button or animation runtime.

The closing footer uses an oversized serif invitation, authentic terrace photograph linked to the gallery, a contrasting stay-planning button, verified contact/location links and a large MYSTIC wordmark. The legal row contains only copyright and a working return-to-top action. No UI-library credits or developer controls.

The personal enquiry is a controlled four-stage adaptation of React Bits Stepper-TS-CSS: Dates, Guests, Yours, Review. Native date constraints plus existing validateStay gate progression; guest counters preserve1–12 adults and0–8 children. Existing descriptive room preferences are unchanged. Optional name/email/note persist on back/edit. Review addresses the guest by first name, summarises the stay and offers the existing encoded email draft or copy action. No automatic send, invented availability, price or booking confirmation. Preserve the external booking portal and verified phone. Desktop has a stable photo folio and independently scrollable form panel; phone uses one column and native dialog scrolling. Accessible step names/current state, inert exiting content and heading focus on step changes are mandatory. The required upstream notice remains in public/licenses/react-bits.txt; source and adaptation decisions are in docs/enquiry-redesign.

## Latest override — November 13 client polish

The native menu dialog opens as a cream sheet from the top, with a 600ms surface reveal, 350ms hamburger-to-close morph and 550ms staggered link entrances. Exit takes 440ms and finishes before internal navigation or the stay planner opens. Preserve native modality, cyclic keyboard focus, Escape dismissal, focus restoration and scroll locking. On phones the photo is omitted and the links remain comfortably sized. No continuous menu animation or new runtime dependency.

Shared information dialogs fade and rise 20px in 380ms; dismissal fades and drops 10px in 220ms. Nested review dismissal restores the planner. Main editorial headings reveal by masked lines in 850ms with 85ms stagger; supporting copy rises 24px in 850ms. Reveal once on entry. Re-split headings on width changes. Preserve punctuation and descenders. Selective italics use the existing bundled Cormorant fallback, with Ronzino body text, 1.6 body leading in editorial copy and tracked small labels.

Use small press responses, directional link arrows, image-only hover zoom and native FAQ expansion. The map wrapper fades on expansion/dismissal. Every transform has one owner. System reduced motion bypasses large movement and keeps brief fades, readable content and functional controls. There is no client-facing motion preference switch, developer credit or UI-library promotion in the footer. The original EditorialLink replaces SkiperLink in every active route and map. Keep the archived source notice and geographic attribution.

## Latest override — November 13 arrival hero

Use the supplied screenshot's composition: full-screen genuine hotel landscape, left-aligned two-line welcome around vertical center, top-left Menu, centered MYSTIC / MOUNTAIN · KAUSANI wordmark, top-right Enquire, bottom-center scroll cue. The previous hero hover links, handwritten signature and continuous camera drift are superseded. The floating booking/appearance dock is removed on every route. Enquire opens the existing planner.

Loader and hero share exactly one h1: “Welcome home / to the mountains.” It starts centered on pine #2f4f3e with warm-white text, then moves to its final position while the actual photograph appears. Measure its two positions once and animate transforms/opacity through the installed GSAP runtime; do not duplicate the text or animate its font size per frame. Wait for image decoding and local fonts with a 650ms minimum hold and 3200ms readiness deadline; the reveal lasts 1850ms. No fabricated progress percentages.

Skip or Escape settles immediately, restores scrolling and focuses the heading. Header/main/footer are inert only during entry. Reduced motion and direct section links bypass the loader. Repeat SPA visits do not replay it; a fresh homepage load can. A mid-transition viewport resize settles into the responsive CSS state. ArrivalHero exclusively owns these transforms; the older title entrance in useJagerhofMotion is removed. Implementation and evidence are recorded in docs/arrival-hero.

DESIGN.md supersedes all earlier extensions. The earlier Bend/Capsules document is archived in docs/jagerhof-reference/previous-bend-EXTENSIONS.md.

- Custom CSS/GSAP implements the measured Jägerhof composition; no bulk component imports. Existing React Bits BlurText and Magnet support retained routes where suitable. SoftCursor is the original circular implementation, themed with Ronzino. TiltedPreview, TargetCursor and prior hero compositions remain historical source, not active homepage components.
- Reuse Embla, Lenis, Motion and GSAP with exclusive node ownership. All auto motion has a pause control and suspends offscreen/hidden; reduced motion presents static readable content. Ordinary UI feedback150–300ms.
- Glass is reserved for the existing terrain controls; use cream/pine surfaces, fine borders and the measured13.2px/10px radii. The floating booking/appearance dock remains removed. Preserve reduced-transparency fallbacks. Do not turn the editorial page into glass boxes.
- The colorful satellite terrain, buildings, trees and hover cards remain lazy, expanded from the location section. Preserve geographic source notices and explain illustrative tree positions/building heights in existing map documentation.
- Keep free-source provenance: public/licenses/react-bits.txt (MIT+Commons Clause) and Vengeance MIT notices. The active site replaces the formerly attributed Skiper link with the original EditorialLink; archived Skiper source and its notice remain historical. Preserve required geographic map attribution. No paid component source or unrelated reference photography is used by the active site.
- Root fonts and dialogs use the Jägerhof system. Bon Vivant requires a licensed webfont before exact type matching can be claimed; Cormorant is the bundled fallback. Pinyon Script is used only for the original hotel signature.

## November 13 — experiences carousel

The user's supplied image supersedes the previous landscape photo rail for this section only. Keep the current cream/pine palette and local typefaces. Use a centered eyebrow, large two-line serif heading with an italic second line, short centered introduction, six authentic hotel portrait photographs, small top-left numbering and white titles over a bottom gradient. Show three cards on desktop, partial neighboring cards on tablet/phone. Photograph corners are square here to match the supplied reference.

Active component: src/jagerhof/ExperiencesCarousel.tsx; dedicated CSS is imported after the main design stylesheet. Embla translates the track; inner surfaces receive restrained perspective/vertical offset from scroll progress, with no per-frame layout reads. Free drag, low4px click threshold, inertia, continuous looping and a visible drag cue; retain arrow buttons, keyboard navigation, real link destinations and ordinary vertical touch scrolling. Suppress link navigation following horizontal dragging, while preserving keyboard/assistive activation after dragging. Prefetch the six optimized photos only as the section approaches the viewport. No autoplay or idle animation loop. Reduced motion removes perspective/hover zoom and uses direct controlled navigation.

## November 13 — review globe and open nearby guide

Follow the latest closing-sequence override in DESIGN.md. Supplied TestimonialGlobe is adapted to a single hotel marker, verified five-star excerpts, source links and manual navigation. Reviewer origins and portraits are absent when not established by a source. Four excerpts are stored in src/data/guest-reviews.ts; these are a selection, not an aggregate or live feed. Current Google Maps place id: ChIJZ932l6NPpzkRkOb2ygKwrRA. See docs/guest-experiences/README.md.

The Kausani guide is always present immediately before the footer. Site usage passes showThemes=false and ambientMotion=false. Theme/pause APIs remain available for reusable demos, but no controls or perpetual ambient loops appear on the client site. The selected-place explanation enters with a short 220ms fade and 5px travel, removed for reduced motion.

COBE2.0.1 is MIT and justified by the explicitly supplied globe composition: 12.97kB minified / 5.94kB gzip in a deferred chunk. The review section adds about10kB JS /4.18kB gzip and5.08kB CSS /1.65kB gzip; it reuses Motion and Lucide. No new animation engine. Static fallback, bounded DPR, on-demand frames, offscreen destruction and context-loss handling apply.

## November13 readability and guest-pin update

The latest DESIGN.md override replaces Bodoni Moda with Newsreader Variable, and uses Manrope for both MYSTIC wordmarks. The guest globe now has four named review-selection pins with explicitly illustrative randomised placements, plus the distinct actual hotel marker. No reviewer hometowns are claimed. The location disclosure stays visible beneath the globe and in accessible pin labels. Source records are unchanged; selection-driven turns reuse the existing on-demand COBE loop with reduced-motion support.

## November13 — supplied torn-paper footer

Latest footer layout is the supplied Pushpin Tear Footer, replacing the earlier photographic invitation. It retains its seeded SVG tear, flap geometry, pin drop/stab, hover response, re-pin and printed MYSTIC wordmark. Current cream/pine/rust tokens and Newsreader/Manrope fonts apply. The demo newsletter is replaced by the existing enquiry action; no signup or availability outcome is fabricated. The original photo remains in the gallery/site content, not the new footer. Verified local routes, email, phone, directions and booking URL are preserved. Source/provenance, responsive fixes and QA are in docs/tear-footer.

## November13 — Arc Card Carousel rooms and React Bits glass

The latest supplied Arc Card Carousel supersedes Works Wheel and is reused on /suites. The later seamless-layout correction opens the composition to the page: edge-to-edge left arc with unframed photos, top/bottom fade and no enclosing panel; heading, numbered room selector and unboxed details share the right column from768px. Phones show heading, full-width arc, selector and details in that order. Click/drag/arrows/keyboard update the description, features, gallery thumbnails, Rate on request and real enquiry handoff. Information fades/rises over320ms; the outer visual entrance is850ms, independently owned from the existing shared GSAP850ms card-position tween. Reduced motion settles directly. No infinite page scroll, extra ticker or invented inventory/rate data. Nature/dining still separate the two photo browsers. Current evidence: docs/room-arc; docs/room-wheel is historical.

Official GlassSurface-TS-CSS remains installed and is rendered on the active photograph caption. The latest unboxed-layout request removes its room-information use. Keep refraction=false, no optional SVG/WebGL renderer, namespaced unprefixed classes and reduced-transparency fallback. Preserve public/licenses/react-bits.txt and public/licenses/arc-card-carousel.txt. No added runtime dependency or rendering context.

## November13 — supplied hero film and portrait-pin reviews

Latest DESIGN.md overrides the still arrival hero and older globe/card arrangement. Use the supplied MOV's locally prepared SDR desktop/portrait-phone MP4 loops and matching poster. The cream loader carries a single “Wake up / in Kausani.” h1 into the video, with bounded real readiness, Skip/Escape and shared GSAP ownership. Native film controls, offscreen/hidden pause, reduced-motion/save-data poster mode and media-error fallback apply. Preserve current local Newsreader/Manrope; no new video/animation service or decorative shader.

The supplied testimonial now places the large globe beside the heading/card, with round illustrated avatar pins, clear active states, names, projected leader and220ms overlapping review swaps. Keep four real sourced excerpts and explicitly label avatars/positions as illustrations. The hotel marker remains actual; no fake countries/aggregate/portraits. Reuse the existing deferred COBE/Motion, cached geometry, native touch/keyboard and offscreen/reduced-motion behavior. See docs/video-hero and docs/testimonial-refresh, including CC0 avatar provenance.
