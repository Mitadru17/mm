# Current extensions

The November 12 Bend Club redesign is defined in DESIGN.md. Earlier glass/map and React Bits requirements continue where compatible with that light reference: true hotel photography, subtle React Bits cursor/text/magnetic/glare adaptations, Lenis scrolling, and the colorful geographic map behind Place's explicit map control. Historical rules are archived in docs/bend-reference/previous-DESIGN-EXTENSIONS.md. Never restore the previous charcoal palette or pill corners over the newer user-supplied tokens.

## Hero and cursor refinement

The user's later request replaces the literal reference hero with a more expressive hotel-led composition. `src/bend/PremiumHero.tsx` now governs the home hero: full-bleed genuine photography, a short2.2-second masked/line entrance, italic editorial emphasis, a stay CTA, subtle camera depth, six-second photo progress and a real-photo preview card. The surrounding page retains the Bend Club section system. Scale the title36–126px and keep readable body copy16px desktop/14px phone. Hide the preview card below900px to protect mobile reading and booking controls. Use existing neutral tokens and12px outer corners.

The global cursor is now the original `SoftCursor`: a precise5px dot and32px softly following ring, gentle circular hover states, optional View/Drag labels, no corner brackets, bounding-box snapping, coordinates or trails. Its finite GSAP follow tweens stop at rest; restore the native pointer for keyboard use, fields, dialogs, maps, coarse pointers and reduced motion. The preceding TargetCursor source remains available but is not mounted by the active application.

Hero animation ownership remains GSAP. The adapted React Bits TiltedCard pointer normalization is confined to the preview's inner surface; it does not compete with the entrance wrapper, camera, scroll depth or photo zoom layers. All automatic motion respects pause, document visibility, offscreen state and reduced motion. No new dependencies or generated hotel imagery were added.
