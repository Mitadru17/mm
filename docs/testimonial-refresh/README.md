# Supplied testimonial globe refresh

Source: user attachment185ed0fa-b4b2-4c6b-9c8b-c8744cec6777,13 November2026.
The new supplied TestimonialGlobe composition supersedes the centered heading
over the old globe/card row. The active adaptation remains in
`src/components/ui/testimonial-globe.tsx` with its scoped CSS.

It now uses the supplied left globe spanning both rows, right heading/selected
review, round portrait pins, depth-scaled faces, active rings, compact top-right
navigation, projected line and220ms overlapping card swap. Leaving cards are
inert/hidden from accessibility. Names appear for the selected/hovered/focused
pin; cached label measurements avoid the hotel label without displacing the
geographic pin. The connector uses cached layout and writes only SVG positions
during the existing on-demand globe frames. At phone widths the heading, globe
and card stack vertically; the line is omitted. Controls remain44px.

As in the supplied source, a mouse hover previews its review immediately
without rotating the globe under the pointer; a click centres it. Keyboard
focus previews/centres as needed, and Arrow/Home/End commands use the stable
review region so focus is not left on a disappearing back-side pin.

The four real5-star excerpts, author spellings and source URLs are unchanged.
The counter says **4 selected reviews**, not the hotel's total or an aggregate
score. No country totals or reviewer hometowns are invented. The rust hotel
pin uses the verified coordinates; random guest positions remain illustrative.
Read all reviews still opens the exact property's Google Maps reviews.

The owner requested random avatars. These are locally saved CC0 Notionists
illustrations by Zoish/DiceBear, not photographs or inferred guest likenesses.
The section visibly says **Avatars and guest pin positions are illustrative**,
and pin labels/tooltips identify the distinction. [Official style and source](https://www.dicebear.com/styles/notionists/),
[license inventory](https://www.dicebear.com/licenses/). Source/license notes:
`public/licenses/guest-avatars.txt`. No external avatar request runs in the site.

The explicit globe request justifies retaining deferred MIT COBE2.0.1; no new
rendering/animation dependency. Drag friction, short-way selection turns, native
touch scrolling, reduced-motion settling, context-loss/static fallback and
offscreen destruction remain. The supplied demo's fictional SaaS testimonials,
unknown guest portraits/cities, calculated aggregate and constant idle spin are
not hotel facts or necessary for this manual review experience.

See `docs/video-hero/qa.json` for current functional checks, the PNGs here for
rendered evidence, and `docs/guest-experiences` for the original review sources.
