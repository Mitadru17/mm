# Mystic Mountain — Jägerhof reference system

Latest map override, November13: the supplied Nearby Walk line-drawing component replaces the active 3D terrain map. Use the illustrated Kausani guide in src/components/ui/nearby-walk-menu.tsx through src/map/LocationSection.tsx. The existing landscape section and directions remain; the disclosure action is now Explore nearby. Preserve brand typography, four local scene palettes, hover/keyboard/touch selection, pause and reduced motion. Distances are approximate straight-line estimates from the existing sourced coordinates; walking times are not fabricated. See docs/nearby-walk/README.md.

Latest override, November 13: the client requested stronger typography, a more distinctive footer, shared premium buttons and a personalised step-by-step enquiry. Bodoni Moda Variable (normal/italic) and Manrope Variable now replace the earlier Bon Vivant/Cormorant/Ronzino pairing throughout the active application. Preserve the established cream #e9e1d6 and pine #2f4f3e; primary actions now use pine and cream, a 3px corner and a fine arrow divider, with one outline alternative. The oversized MYSTIC closing composition and React Bits enquiry folio are specified in DESIGN-EXTENSIONS.md and docs/enquiry-redesign/plan.md. The historical measured reference below remains the base for unchanged sections.

The November 13 client-polish request adds a fluid hamburger menu sheet, fade-in/out information dialogs, scroll-triggered line reveals and selective serif italics. Keep the existing local type families and cream/pine palette. The client footer contains only hotel information and useful links; motion preferences follow the device setting automatically. See DESIGN-EXTENSIONS.md and docs/client-polish/README.md.

The user's subsequent November 13 hero screenshot supersedes the earlier hero/header composition. Use the arrival hero and shared-heading loader described in DESIGN-EXTENSIONS.md. The floating booking/appearance dock is removed; booking remains available through Enquire and the existing inquiry paths. Other sections retain this system.

The user's November 12, 2026 Jägerhof brief is the current authority and supersedes Bend Club, Capsules and earlier directions. Reference: https://jagerhof.net/ . Prior documents are archived in docs/jagerhof-reference/previous-bend-DESIGN.md and previous-bend-EXTENSIONS.md.

## Exact measured tokens

Apply these to every route and dialog. Active implementation: src/jagerhof/styles.css, loaded last after the retained supporting-page styles.

```css
:root {
--_theme---background: #e9e1d6;
  --_text-style---font-family: Ronzino, Arial, sans-serif;
  --_theme---text: #3b3b3b;
  --_text-style---font-size: clamp(
    1 * 1rem,
    ((1 - ((1 - 1)/ (90 - 20) * 20)) * 1rem + ((1 - 1)/ (90 - 20)) * 100vw),
    1 * 1rem
  );
  --_text-style---line-height: 1.3;
  --_text-style---font-weight: 400;
  --_text-style---letter-spacing: 0em;
  --_gap---size: 0.625rem;
  --_column-count---value: 1;
  --_theme---background-skeleton: color-mix(
    in lab,
    currentcolor 10%,
    transparent
  );
  --border-width--main: 0.0625rem;
  --_text-style---margin-bottom: clamp(
    1.25 * 1rem,
    (
      (1.25 - ((1.608 - 1.25)/ (90 - 20) * 20)) * 1rem +
        ((1.608 - 1.25)/ (90 - 20)) * 100vw
    ),
    1.608 * 1rem
  );
  --_text-style---text-wrap: pretty;
  --_theme---heading: #2f4f3e;
  --_spacing---section-space--none: 0px;
  --max-width--main: 100%;
  --max-width--small: 50rem;
  --max-width--full: 100%;
  --_text-style---margin-top: clamp(
    1.25 * 1rem,
    (
      (1.25 - ((1.608 - 1.25)/ (90 - 20) * 20)) * 1rem +
        ((1.608 - 1.25)/ (90 - 20)) * 100vw
    ),
    1.608 * 1rem
  );
  --_text-style---trim-top: 0.38em;
  --_text-style---trim-bottom: 0.34em;
  --_typography---line-height--small: 1;
  --_typography---line-height--medium: 1.2;
  --_typography---line-height--large: 1.3;
  --_typography---line-height--huge: 1.5;
  --_typography---letter-spacing--tight: -0.03em;
  --_typography---letter-spacing--normal: 0em;
  --_typography---font--primary-family: Ronzino, Arial, sans-serif;
  --_typography---font--primary-regular: 400;
  --site--gutter: 0.625rem;
  --_theme---background-2: #faf8f4;
  --_typography---font--primary-medium: 500;
  --_typography---font--primary-bold: 700;
  --radius--small: 0.375rem;
  --radius--main: 0.625rem;
  --radius--round: 100vw;
  --_theme---border: color-mix(in srgb, #2f4f3e 20%, transparent);
  --swatch--charcoal: #3b3b3b;
  --swatch--transparent: transparent;
  --swatch--white: #faf8f4;
  --_trigger---on: 1;
  --_trigger---off: 0;
  --button-size--medium: 2.5rem;
  --_button-style---text: #faf8f4;
  --_button-style---text-hover: #e9e1d6;
  --_button-style---background: #c66a3c;
  --_button-style---background-hover: #3b3b3b;
  --_button-style---border: #c66a3c;
}
```

## Type and layout

Ronzino 400/500/700 is locally bundled from Collletttivo's official open source repository; retain public/licenses/ronzino.txt. Body 16px/20.8px. Small uppercase headings 13px/700, photographic captions 15.2px, controls 14.4px. Bon Vivant Serif is commercial and no licensed file was found in the available local font folders: use a local-font hook followed by locally bundled Cormorant Garamond 400, then Georgia. Pinyon Script, bundled under OFL, is the signature-only substitution for the reference's handwritten brand artwork. No proprietary reference font is redistributed.

Display sizing follows the supplied scale: hero approximately 201.136px at 1440px (14vw, cap216px); intro82.864px (5.755vw); chapter53.136px (3.69vw); marquee216px (15vw); hero links25.728px. Use intentional responsive overrides at991/767/359px. Body and inputs remain16px. Do not shrink an entire desktop page to fit a phone.

Reference layout: full-screen landscape hero; centered mixed sans/serif headline; signature on the left and four text links on the right; fixed top navigation and a small centered floating action dock. Green full-screen introduction with inline sans links and floating image previews. Looping centered photo rail with partial adjacent slides. Five flush alternating half-width photo collages and offset text columns. Background images4:5, centered foreground photo30% of the panel; .625rem rail gaps. Large two-row scrolling title. Guest-information area. Full-screen image growing with scroll, location controls and expandable existing3D map. Oversized contact CTA and detailed footer.

Colors cream#e9e1d6, pine#2f4f3e, white#faf8f4, charcoal#3b3b3b, moss#6c8a5e and rust#c66a3c. Primary controls13.2px corners, ordinary surfaces10px, fields6px; round only icon controls. Buttons use the exact14.4px, .144px tracking and16.8px horizontal padding, with44px effective targets. Use the supplied0 18px 60px #0000002e card shadow sparingly, and the dock's three supplied low-opacity shadows. No generic glossy card grids.

## Reference motion

Public reference modules were inspected for quantitative behavior, not copied into the runtime. Independently implemented in src/jagerhof/motion.ts and JagerhofApp.tsx:

- Hero link photographs: fade in0.8s power2-out, fade out0.4s; keyboard focus has the same preview. Actual hotel landscape replaces the reference's unrelated South Tyrol video. A gentle18s reversible camera drift on that still has an explicit pause control, visibility/offscreen suspension and reduced-motion removal.
- Introduction image: opacity and scale0.8→1 over0.6s; outgoing0.4s. All links remain functional on touch.
- Content entrances: y40→0 and opacity over1.2s power2-out at viewport80–90%. Headings: character scaleY0→1, bottom origin,0.5s power2-out,0.02s stagger. Font load precedes splitting.
- Collages: opposing scroll parallax with linear scrub. Grow image: visual0.5→1, inner1.5→1, overlay0→1 across top-bottom to top-top scroll range; content0.8→1 in the latter half. Two title rows80→-5% and-80→5%, scrub2.
- Reuse Lenis/GSAP single ticker; Embla provides inertial drag, focus handling, next/previous, keyboard arrows and explicit slide controls. Keep all listeners, observers, splits and tweens cleaned up on route/preference changes.
- Hover/state feedback150–300ms. No competing animation owners on the same transform. No new animation engine.

## Content, accessibility and behavior

Use only verified src/data.ts contacts and authentic supplied hotel photographs. Keep existing routes, planner, reviewed email inquiry, external booking link, gallery lightbox and geographic map. The reference's spa, seasonal packages, sustainability certifications, ratings and testimonials are not hotel facts. Preserve section order while adapting those topics to confirmed rooms, setting, dining-space photographs, local places, guest-information links and FAQs.

The dock switches actual website appearance between cream and forest; it does not invent winter photographs. Every modal must trap native keyboard focus, close only the intended level on Escape and restore the trigger. Minimum44px principal targets. Reduced motion disables Lenis, the custom cursor, image drift, split-text, parallax and growing imagery; all text stays visible. Preserve source attribution on map/UI components. Inspect actual desktop/phone/tablet rendering before delivery and record limits in docs/JAGERHOF-DELIVERY.md.

The user's November13 experiences-card reference replaces the previous landscape rail for that section. See DESIGN-EXTENSIONS.md: tall portrait photography, serif overlay titles, subtle perspective, six verified photographic topics, free dragging and accessible controls. The rest of this system remains authoritative.
