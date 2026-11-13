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

## Latest override — November 13 guest voices and continuous closing sequence

The homepage closes with practical FAQs, the supplied TestimonialGlobe adaptation, the always-visible Nearby Walk, then SignatureFooter. Remove the “All roads lead to a slower day” photo chapter and the nearby disclosure button. Retain both #place and #location navigation anchors. The guide uses only the brand's Classic palette, with no theme or pause controls; its entrance is finite and ambient cloud/window/route loops are disabled. Hover, keyboard and touch selection remain.

TestimonialGlobe belongs in src/components/ui. Use real, source-attributed five-star excerpts from src/data/guest-reviews.ts. The displayed selection is not the hotel's aggregate rating. The globe has one verified hotel marker; “Stayed in Kausani” describes the stay, never a claimed guest hometown. Do not assign invented hometowns, portraits, countries or global guest statistics. Read all reviews links to the exact Google Maps property with its reviews flag. WebGL loads near the viewport, is destroyed offscreen and has a static illustration fallback. Review changes are manual, with buttons, arrows and touch swipes; no autoplay controls.

Retain locally bundled Bodoni Moda/Manrope and the established cream/pine/rust palette. The refined section-heading scale is clamp(40px,4.2vw,64px), 400 weight, 1.14 leading and -.028em tracking; phone sections use clamp(36px,7vw,48px). Introductory body copy uses clamp(15px,.3vw + 13px,17px) and 1.8 leading with a maximum 48ch measure. Small editorial labels use 11px/1.5 Manrope 600, .15em tracking. Use a consistent section rhythm clamp(64px,7.5vw,112px), deliberate serif italics and hairline boundaries. Research: Aman for quiet labels/serif hierarchy, Forestis for generous leading and readable paragraph measure; no proprietary fonts were copied.

Arrival holds at least 1450ms while fonts/hero prepare (3600ms maximum asset wait), then reveals over 2050ms. A finite 1350ms mountain-line drawing precedes the shared hero-title movement. Skip/Escape and reduced-motion bypass remain; failed or stalled assets cannot block entry. No fake progress percentage. See docs/guest-experiences for sources, verification and limits.

## Latest override — readable type and illustrative guest pins, November 13

The user's readability correction replaces Bodoni Moda with locally bundled OFL Newsreader Variable (normal and italic, weight200–800, optical size16) for all display titles. Headings use450 where available; body remains Manrope, with450 introductory copy and600 brand/navigation labels. MYSTIC in the header and footer is now Manrope500–600 for clear strokes, with tighter responsive branding spacing. Newsreader's bundled OFL notice is public/licenses/newsreader.txt; the three active Latin webfonts total147.44kB. Historical Bodoni declarations are no longer active.

The user explicitly requests randomly distributed guest-name locations on the globe. These are illustrative artwork placements, generated deterministically from review IDs and kept separate from review facts. The visible caption says “Guest pin positions are illustrative.” Each pin's accessible name/title also identifies the illustrative placement. No city, country or hometown is attributed to a reviewer. Actual review texts, author spellings, source links and five-star ratings remain unchanged. A distinct rust hotel marker and persistent Mystic Mountain recenter control identify the verified property location.

Guest pins select their associated review. Manual review navigation turns to the selected pin over850ms, removed for reduced motion. No idle rotation, fake guest-origin statistics or new runtime. Pin labels stay inside the scene and avoid the hotel label; hidden rear-side pins leave the tab order. WebGL destruction/fallback and on-demand frames remain. See docs/guest-experiences/guest-pins-qa.json and updated screenshots.

## Latest footer override — supplied Pushpin Tear Footer, November 13

The user explicitly replaces the earlier photographic SignatureFooter with the supplied Pushpin Tear Footer composition. src/jagerhof/SignatureFooter.tsx configures src/components/ui/pushpin-tear-footer.tsx. Keep the exact procedural torn-poster ridge, white fibre rim, curled flaps, glossy pin, staggered chrome/wordmark entrances and interactive re-tearing behavior. Adapt the paper/sheet to cream#e9e1d6 and pine#2f4f3e, with rust#c66a3c for the pin and solid pine text on paper. Current Newsreader/Manrope typography remains authoritative. MYSTIC is a clear Manrope wordmark.

The top centre holds “See you in the hills.” and the existing stay-enquiry button in the reference's rounded control position. The newsletter demo is not exposed; no mailing-list or availability claims. Use verified hotel phone/email/directions, existing local routes, external booking portal and Kausani local clock. Copy-email must report successful clipboard writes honestly and show the real email if unavailable. Keep all six column links on phones, minimum44px interactive targets, high contrast, keyboard/touch re-pin, Lenis-aware back-to-top and restored enquiry focus.

The tear/pin intro is finite (~2.7s); re-pin finishes around1.72s. The SVG renderer and clock sleep offscreen/when the page is hidden, pointer lifting is mouse/pen only, no indefinite clock/live/chat loops. Live reduced motion settles the entire composition, including the torn ridge, immediately. No new dependency or animation engine. Source attribution is retained in public/licenses/pushpin-tear-footer.txt; see docs/tear-footer for verification and provenance. The closing order remains guest reviews, nearby guide, torn-paper footer.

## Latest stay-section override — supplied Arc Card Carousel and React Bits glass, November 13

RoomListings under src/jagerhof now uses the latest supplied Arc Card Carousel under src/components/ui; it supersedes the earlier Works Wheel. Reuse the same browser on /suites; preserve existing /suites/:id photo-story routes and room-specific enquiry preferences. Three cover cards represent the three existing photographic room stories; their nine photographs are available through the details panel and gallery. Repeated physical arc slots are not extra room listings. Keep the user-accepted “Rate on request” and enquiry/external booking paths until verified prices are provided. Never invent nightly rates, occupancy, amenities or availability.

Use genuine optimized room photographs, cream/pine tokens, Newsreader450 headings and Manrope body/controls. The user's latest seamless-layout correction removes the inset section composition and boxed information panel. The left arc meets the viewport edge; its selected photo bleeds beyond the left edge, with unframed tangent previews and a static transparent top/bottom mask blending into the cream page. Heading, compact numbered selector and all room details share the open right column from768px upward, including the user's929px viewport. Under768px put the heading first, then the full-width arc and room information. Keep readable gutters for phone text. Clicking a card updates description/features/thumbnails with a320ms fade and12px rise; the separate photo action opens the gallery. A finite850ms entrance owns the outer visual wrapper only. The shared GSAP850ms position tween exclusively owns card transforms, completing offscreen/hidden and using cached geometry. Arrow buttons, Home/End, arrow keys, vertical mouse drag and horizontal touch drag remain. Keep native page scroll, direct reduced-motion settling, implicit pointer-capture guards and no infinite page-scroll loop or extra ticker.

React Bits GlassSurface-TS-CSS remains on the selected photograph caption only. The later request to remove the box supersedes the earlier glass details card: room information is plain pine text on the page with no card background, border, inset padding, blur or shadow. Use the caption's frosted renderer with refraction=false, namespaced rb-glass-surface classes, disabled displacement work and solid reduced-transparency fallback. No WebGL context is added. Preserve public/licenses/react-bits.txt and public/licenses/arc-card-carousel.txt; older source notices remain historical.

Homepage order: hero, introduction, room browser, nature, dining, experience carousel, exploring, unwinding, marquee, FAQs, reviews, nearby, footer. Separate the two photo browsers with quiet editorial chapters. Shared section rhythm is clamp(76px,7vw,112px), chapter margins clamp(34px,4vw,64px), and paragraph/heading left edges are aligned. Use the existing gentle GSAP/Motion entrances; no added scroll traps, global pinning or new animation engine. See docs/room-arc for current setup, sources and verification; docs/room-wheel is historical.

## Latest hero override — supplied hero.MOV and taste refinement, November13

Use the owner's videos/hero.MOV through locally prepared responsive H.264 assets. The scenic opening is HDR-to-SDR BT.709 converted, slowed gently and crossfaded into a native11.77s loop; desktop1600×900, phone608×1080, with a matching89kB WebP poster. Do not publish the original41MB MOV or imply it was filmed at the hotel. Preserve cream/pine/rust, local Newsreader and Manrope. The single h1 is now “Wake up / in Kausani.” with an italic second line, large fluid display type, quiet hotel/category/location labels, room anchor and a small film control. No new effect, animation or video-service dependency.

Loader and hero still share that single heading. On cream, a pine mountain-line drawing and finite rule precede the shared GSAP title/colour and upward-curtain reveal. Minimum1450ms readiness hold,3600ms deadline,~1.8s reveal. Wait for local fonts, matching poster and the first video frame. Skip/Escape, direct-section bypass, focus/scroll restoration and resize settling remain. Native muted inline playback pauses offscreen/hidden. A real pause/play action is required; transient play cancellations must not disable future playback. Reduced motion/save-data initially use the poster without downloading the film, with explicit play available. A failed/blocked film cannot gate access. This supersedes the still-only Welcome home hero. See docs/video-hero.

## Latest testimonial override — supplied portrait-pin composition, November13

Follow attachment185ed0fa's globe-left/two-row composition: heading and selected review on the right, round portrait pins with active/depth states, compact in-card navigation, a projected leader and220ms overlapping card swap. Keep departing cards inert. The four reviewed five-star excerpts/author spellings and Google Maps review link are unchanged; “4 selected reviews” is the selection count, never an aggregate. The rust hotel marker remains geographic fact; randomised guest pins remain illustrative.

The user's random-avatar request is met with locally saved CC0 Notionists illustrations (Zoish/DiceBear), explicitly disclosed as illustrative avatars and positions. Do not pass random photographs off as actual named guests. Pin names must not cover the hotel callout; move label offsets rather than geographic points. Retain the existing deferred/on-demand COBE renderer, cached geometry, offscreen/context-loss fallback, native touch scrolling and direct reduced-motion settling. The phone layout stacks heading/globe/card and omits the leader. No idle auto-spin, fictitious country counters or invented testimonials. See docs/testimonial-refresh and public/licenses/guest-avatars.txt.
