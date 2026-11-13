# Premium hero and soft cursor

The user's latest request replaces the literal reference opening with a more expressive, hotel-led hero and a clean cursor. Active source: src/bend/PremiumHero.tsx; styling: src/bend/premium-hero.css. Cursor: src/components/SoftCursor.tsx and soft-cursor.css. `/` remains the home route.

- Real panoramic hotel photography, a masked2.2-second entrance and line-by-line title reveal: Life, a little / slower up here.
- Direct stay inquiry anchor, shared image lightbox, four labelled photo perspectives, previous/next, pause and a six-second progress rail. Embla handles keyboard/pointer selection; GSAP owns the visual layers. The rail owns autoplay, so there is no competing timer.
- Desktop photo preview adapted from the reviewed official React Bits TiltedCard pointer mapping. Rotation is limited to4degrees; a stable native button activates the next photo. The inner tilt surface and entrance wrapper are independently owned. No gyroscope, flip, shader, extra package or perpetual floating loop.
- The photo's finite slow zoom, bounded pointer camera and scroll depth affect separate nested layers. Offscreen/hidden pages suspend automatic work. Reduced motion shows the static composition with short fades.
- The original soft cursor uses a precise5px dot and a32px circle with finite360ms position easing. Hover uses circular states; no snapping to element rectangles, brackets, measurements or decorative trails. Forms, dialogs, map, keyboard, coarse pointers and reduced motion retain the native cursor.
- The hero preview hides below900px; title and spacing adapt at1199/899/639/359px and shorter desktop heights. The new main JS remains approximately198kB gzip; the map remains an independent lazy chunk.

Retained source notice: public/licenses/react-bits.txt (MIT + Commons Clause). The official TiltedCard review is saved at .codex/react-bits/reviews/TiltedCard-TS-CSS.json. TargetCursor remains as an unused prior component. Effects such as BlobCursor, Crosshair and shader trails were rejected because the user requested smooth, nontechnical, clean behavior.

Build and the existing8date/inquiry tests pass. Final visual verification status is recorded by the actual browser check; older Bend screenshots and the earlier responsive audit describe the preceding revision.
