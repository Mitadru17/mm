# Hero film, type and loader

The latest user request replaces the still hero with `videos/hero.MOV` and asks
for the taste skill, stronger typography, smooth looping and a new loader.
Active code: `src/jagerhof/ArrivalHero.tsx`, `cinematic-hero.css` (imported after
the shared typography). The single hero h1 is now **Wake up / in Kausani.**
Local Newsreader450/italic display and Manrope labels retain the hotel system.
The room anchor, verified hotel/location and header enquiry remain functional.

## Media

The supplied41.17MB MOV is1920×1080, ~60fps, HEVC10-bit/Dolby Vision compatible
HLG with audio. It remains untouched outside `public`. A scenic10.8s opening
is slowed to120%, tone-mapped to SDR BT.709 and made cyclic by a1.2s tail/head
crossfade. This is the owner's supplied mountain footage; it is not asserted
to show the hotel or its room view.

| Served asset | Format | Bytes |
| --- | --- | ---: |
| `public/videos/mystic-hero-desktop.mp4` | H.264,1600×900,30fps,11.77s | 3,647,721 |
| `public/videos/mystic-hero-mobile.mp4` | H.264,608×1080 portrait,30fps | 1,332,714 |
| `public/images/hero-video-poster.webp` | Matching first frame,1600×900 | 89,022 |

MP4 files have `faststart`, no audio/data tracks, removed capture metadata and
two-second keyframe intervals. The source60fps material supports the slower
30fps delivery. `scripts/prepare-hero-video.cjs` reproduces the assets with a
full FFmpeg build (`MYSTIC_FFMPEG`, or the isolated `.codex/media-tools` cache).
CapCut's bundled FFmpeg was inspected first; it lacks the software HDR pipeline
and libx264 needed here. FFmpeg is a development tool, not a website dependency
or distributed executable. No runtime image/video service is used.

## Playback and entry

Muted inline native looping starts when the hero is visible; it pauses offscreen
and when the document hides. A small named film control offers pause/play.
Autoplay refusals retain an explicit play action; temporary play cancellations
from scrolling do not disable future playback. The responsive source is chosen
once per mount, preventing downloads during viewport-resize tests. Reduced
motion/save-data start with the real poster and no film request; a deliberate
Play action can request it. Media failure leaves the poster and content usable.

Loader and hero share one h1. On cream, a finite pine mountain line and progress
rule accompany the title, then a GSAP curtain/position/colour transition carries
it onto the film. Minimum hold1450ms; readiness waits for fonts, poster and first
video frame with a3600ms deadline. Reveal settles in~1.8s. No fake percentage or
indefinite wait. Skip/Escape immediately restore scroll/access and title focus;
direct section links/reduced motion bypass entry. Mid-reveal resizing settles
to responsive CSS. GSAP exclusively owns this entrance, with cleanup.

## Verification

`npm run build`, `scripts/video-reviews-qa.cjs` and actual Chrome screenshots
cover video advancement, pause/resume, native loop wrapping, loader/Skip/Escape,
phone source selection and touch, responsive text, reduced motion, video failure,
room/enquiry actions, testimonial selection, projected line, globe interactions,
offscreen work and source links. The final `qa.json` is authoritative.
`scripts/video-reviews-visual.cjs` records desktop/tablet/phone renders.

The taste skill is armed for this local site. Its gate/performance outputs and
any unresolved findings are recorded separately; no overall taste PASS is
claimed without the actual result. The existing large main-chunk warning remains.
Final result: **GATE: OPEN90**, after the prescribed three rounds; all accepted
waivers and every open finding/warning are listed in [REVIEW.md](REVIEW.md).
The standalone skill layout script errored internally. Its performance report
retains8 FAIL/7 WARN rows across the site; the16 feature checks and8 existing
unit checks pass. No overall performance or taste PASS is claimed.
Headless Chrome is not a physical iOS, Safari, battery-saver or field-network
performance test; those devices can require the visible Play action.
