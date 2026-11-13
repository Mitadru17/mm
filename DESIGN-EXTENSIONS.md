# Current design extensions — Jägerhof / Mystic Mountain

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
