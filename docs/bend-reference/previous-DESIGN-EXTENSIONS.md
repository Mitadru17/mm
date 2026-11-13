# Glass and geographic interaction extension

The user requested glass-textured cards, sliding entrances and a 3D location map after supplying `DESIGN.md`. This adds translucent neutral surfaces, backdrop blur, fine grain and inset highlights to that system. It supersedes the earlier flat-only surface treatment for cards and map controls.

Retain the original color roles, Host Grotesk, pill controls, 37.5px outer corners, measured spacing and 150ms timed interface limit. Do not add saturated UI colors or cast shadows. Entrance directions may alternate up/down; hover movement stays small. Reduced motion shows stable cards and a flat map camera.

Only the hotel's map marker receives the primary filled treatment. Nearby places use quiet numbered markers. Hover/focus reveals a card; selection and the place list provide a touch and keyboard alternative. Camera movement happens on explicit selection, not hover. Keep map/provider attribution visible and preserve the original directions link.

## Colourful terrain — 12 November 2026

The user's later request makes the geographic canvas an exception to the monochrome palette. Use natural greens for hills and vegetation, blue waterways, warm sand-coloured roads and buildings, with soft sunlit relief. Map controls, markers, information cards and the surrounding website retain the original neutral tokens. Geographic coordinates, terrain elevation and all interactions remain intact.

The subsequent realism request replaces the default illustrated surface with genuine satellite texture draped over real elevation at 1× vertical scale. Keep roads subtle so actual vegetation, fields and slopes dominate. The illustrated view remains available through a labelled layer control. Identify the imagery vintage and retain visible source attribution; do not imply a surveyed 3D reconstruction of individual buildings.

The later 3D-detail request adds buildings from open geographic footprints and procedural vegetation constrained to woodland. Use restrained natural wall/roof colours and mixed tree silhouettes, terrain-following placement, bounded visible counts and no idle animation loop. Include a closer detail view and a visibility control. State that unrecorded building heights and individual tree positions are illustrative; preserve the hotel's prominent marker and original directions.

## React Bits motion — 12 November 2026

The user requested a living site and custom cursor using React Bits. Shared headings may resolve from a restrained word blur, action icons may respond magnetically, and glass cards may catch a quick light sweep. A repeating editorial line follows scroll progress, using the hotel mark and neutral typography. Timed feedback still settles within 150ms; the text band follows scroll rather than playing automatically.

The desktop cursor uses subtle neutral corner brackets and a precise dot. It frames interactive controls and images, preserves their native hit areas, and has no spinning or trailing particle field. Restore the native cursor over inputs, maps and dialogs, on keyboard navigation, with reduced motion and on coarse pointers. Reduced motion presents all headings clearly and the editorial line as a readable static phrase.
