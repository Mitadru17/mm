# Experiences carousel — November 13, 2026

Preview: http://localhost:4174/#experiences . Run from D:/code/MYSTIC: npm run build, then npm run preview -- --port 4174.

Replaces the previous landscape rail with the user's supplied portrait-card composition: generous centered introduction, italic serif second line, six genuine hotel photographs, overlaid titles/numbering, slight dimensional edges, and free dragging with momentum. Desktop shows three cards; narrow layouts show the current card and neighboring edges. Links lead to existing room/gallery/section destinations; no reference pool, beach or golf amenities were imported.

Implementation: src/jagerhof/ExperiencesCarousel.tsx and experiences-carousel.css, mounted in JagerhofApp.tsx. Uses existing Embla8.6, Motion useInView and the current local font system. An OFL Cormorant italic face was added for the heading. No new runtime dependency. Photos begin loading as the section approaches; responsive WebP sources and existing skeleton/error handling remain.

Embla owns track translation, loop offsets and inertia. Inner surfaces alone receive perspective and vertical-offset transforms computed from normalized progress, with no geometry reads in the scroll callback. There is no independent animation loop or autoplay. Temporary will-change ends when movement settles.4px drag threshold plus explicit horizontal click suppression prevents accidental navigation. Keyboard/assistive click activation bypasses Embla's post-drag native click suppression. Native vertical scrolling remains available on touch. Reduced motion removes perspective and hover zoom and disables free-glide navigation.

Production build passed. Targeted Chrome checks in qa.json passed: short mouse drag, long drag, loop traversal, next/previous and arrow-key controls, keyboard link activation after dragging, emulated touch swipe, native vertical touch scrolling and reduced motion. Five widths320/390/768/1024/1636 have no document overflow and all six cards; no page errors. Dragging releases over links without navigation. Existing date/inquiry tests were not rerun because their code was unchanged.

Actual rendered screenshots reviewed: desktop-final.jpg (1636px wide, full section cropped from a taller viewport), phone-final.jpg (390px), tablet.jpg (768px). Earlier debug screenshots are intermediate work. qa.json is the interaction record. performance.json records a headless drag/momentum trace:5 Layout and81 Paint events across about2.5seconds, rather than per-frame geometry measurement in the carousel callback. The full page still includes the custom blended cursor and fixed glass dock; this trace is not a60fps/compositor-only certification. No physical-device universal performance claim is made.

DESIGN-EXTENSIONS.md records this section-specific override; the rest of DESIGN.md continues to apply. Existing UI/geographic source licenses and attribution remain intact.
