# Mystic Mountain — The Bend Club reference system

The user's November 12, 2026 Bend Club brief supersedes the earlier Capsules visual direction. The previous system is archived in `docs/bend-reference/previous-capsules-DESIGN.md`. Apply these tokens to every page, dialog and responsive screen. Reference: https://www.thebendclub.com/ . Use the hotel's own identity and photography, never Oregon residence-club claims or invented hotel facts.

The subsequent hero/cursor request is specified in DESIGN-EXTENSIONS.md: use the expressive premium hero and soft circular cursor while retaining this light system throughout the remaining sections and supporting routes.

## Colors

```css
:root {
  --background: #f4f1ea;
  --foreground: #17231f;
  --ink: #101f1a;
  --pine: #1f332c;
  --river: #284653;
  --mist: #dbe3df;
  --clay: #9b4f34;
  --champagne: #d9c59a;
  --soft-ink: #52615c;
  --line: #d4d0c5;
  --muted: #52615c;
  --accent: #9b4f34;
}
```

Surfaces: #ffffff, #f4f1ea, #101f1a, #FFFFFF26, #101F1AB8. Text: #ffffff, #101f1a, #17231f, #FFFFFF8C, #52615c. Use white text on photography and dark glass. Dark text on cream. Do not apply the old charcoal background.

## Typography

Body: Lexend, 16px / 24px, weight 400. Display: writer (PP Writer), weight 500, letter spacing -0.012em. PP Writer is a commercial font: the project declares a local-font hook, with Georgia / Times New Roman as the explicit fallback. No reference-site font binaries are copied. Replace the local hook with the client's licensed webfont when supplied. Lexend is bundled locally under OFL.

Desktop at 1440px: H1 100.8px (7vw; cap104px), H2 51.84px (3.6vw; cap52px), story H3 60px (4.4vw cap60px), statement48px, pillar30.4px, answer23.2px. Labels14px and12px. Hero line height .96, H2 1.04, story1.02, pillar1.1. Scale down intentionally for mobile; body and inputs remain readable. Never force desktop dimensions into a narrow viewport.

## Layout and surfaces

Container max1280px; statement1024px; body paragraphs672px. Gutters48px desktop,32px tablet,20px mobile. Spacing steps4,8,16,20,24,36,40,48px. Reference section spacing: introduction176px desktop/128tablet/96phone; Place96/144desktop,80/112tablet,64/80phone; answers144desktop/112tablet/80phone. Preserve long editorial breathing room.

12px corner radius. Images in the three-column editorial grid use square corners as observed; story photographs and glass panels use12px. Avoid unrelated pills, oversized decorative badges and generic gradients.

Glass panel: #101F1AB8, blur40px, saturation150%. Exact shadow: #101F1A66 0 0 0 1px, #FFFFFF2E 0 1px 0 inset, #00000099 0 30px 60px -30px.

```css
.card { background: transparent; color:#FFFFFF; border-radius:12px; font-size:16px; }
.input { background:transparent; color:#FFFFFF; padding:4px 0 8px; font-size:16px; }
```

Controls: transparent background, white50% or white text, radius0, font16px or14px, padding0; maintain44px effective touch targets. Links are un-underlined except purposeful animated rules. Forms use fine bottom borders. Keep enough contrast over photographs.

## Order and motion

Transparent header; full-screen photographic hero; large scrolling introduction; sticky morning/afternoon/evening photo story; three-column property introduction; visible answers; dark glass inquiry panel over landscape.

The user's follow-up requests the reference's exact motion. Use GSAP for the opening, statement, pinned story and card choreography, with exclusive ownership of those nodes. Motion remains for existing interactive components; do not run both engines on the same properties. Lenis uses the reference's 1.15-second cubic-out easing, driven by GSAP's ticker with a single loop. Embla supplies pointer/keyboard input; hero photographs crossfade over1.4seconds and advance every6seconds, with pause and offscreen/hidden-document suspension.

Opening:1.25-second word reveal with0.12-second stagger, central photo opening at1.05seconds, photo flashes at2.25/2.8seconds,1.7-second full-frame expansion starting3.5seconds, words fade at3.85seconds, heading entrance at4.5seconds with1-second expo-out and0.06-second word stagger. Header/supporting controls follow at4.6seconds with0.95-second expo-out/0.08-second stagger. Offer Skip introduction; direct section links and reduced motion skip it.

Statement: opacity0.12to1 with0.05-second word stagger, top75%to bottom60% scroll range,0.8-second scrub. Star entrance1.4seconds expo-out;18-second turn with an explicit pause control, paused offscreen. Pinned story: center/center start,200vh travel, stages at35%and70%,0.75-second power4-in-out photo wipes,0.4-second power4-out old text exit and0.75-second incoming text with0.1-second stagger. Background blends over0.9seconds power2-out across the pin range±220px. Cards align from140/70/0px on0.8-second scroll scrub. Section entrances:28px/opacity0,1.1seconds cubic-bezier(.16,1,.3,1),16%intersection with-8%bottom margin. Button feedback remains150ms except the measured300ms hero arrow color response; underline550ms.

Reduced motion removes intro, cursor, smooth scrolling, parallax, pinning, wipes and continuous rotation; all three stories become static. Retain short150ms opacity/color feedback. Text and form access never depend on completing animation. Glass has reduced-transparency/unsupported-blur fallbacks. Clip masks reproduce the reference without animating layout dimensions; do not claim universal60fps without a measured trace.

## Content and interactions

Use verified `src/data.ts` contacts and supplied hotel photography. Inquiry prepares a reviewable email draft; never claim submission or confirmation. Preserve external hotel booking portal, original image lightbox and stay planner. The existing geographic terrain map is available via Place's expandable map; retain native attributions and keyboard/touch controls. Maintain old routes and booking links.
