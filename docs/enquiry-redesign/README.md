# Footer, typography and personal enquiry — 13 November 2026

The active site now uses Bodoni Moda Variable display/italic and Manrope Variable body text. Three locally bundled Latin webfonts total about125kB. Their OFL notices are in public/licenses. Previous Cormorant/Pinyon imports and the unused Ronzino preload are removed. Existing brand cream/pine remains; primary actions now share pine/cream colours, 52px height, 3px corners, a fine arrow divider and subtle hover/press response. Secondary outlines share the same geometry. All active routes inherit the same type variables.

The closing footer has an oversized invitation, authentic terrace photo linked to the gallery, a stay-planning action, verified contacts, useful routes, a large MYSTIC signature and a working return-to-top action. There are no developer controls or library promotions. Photo captions remain navigation affordances; no third-party or generated hotel image is substituted.

BookingInquiry is now a four-stage controlled React Bits Stepper adaptation, used by both the shared Enquire dialog and /contact. Dates validate against the existing booking rules. Guest counters preserve the existing limits; descriptive room preferences are unchanged. Name/email/note are optional and persist when going back. Review personalises its greeting, offers edit actions and builds the same complete encoded hotel email draft. Copy uses the clipboard with a selectable-text fallback. There is no automatic message send, fake availability, price or booking confirmation. Existing verified phone and external booking portal remain available.

The desktop folio keeps a stable frame and independently scrollable form; phone uses a single column with native dialog scrolling. Each step resets the appropriate scroller and focuses its heading, including when editing earlier answers. Exiting content is inert. Reduced motion keeps brief fades and readable controls. Existing Modal focus restoration, Lenis/GSAP integration, menu choreography and drag carousel remain.

## Source decisions

Official React Bits Stepper-TS-CSS was inspected and installed using the shared helper with --cwd D:/code/MYSTIC. The original review is retained in .codex/react-bits/reviews/Stepper-TS-CSS.json. src/components/Stepper.tsx and Stepper.css are the rendered adaptation. Controlled step navigation, completed/current indicators and pane transitions remain. Demo palettes, glass chrome, completion screen, height-spring animation and Hugeicons dependencies are removed. Existing Motion and Lucide replace competing runtime/dependencies. The original MIT+Commons Clause notice remains in public/licenses/react-bits.txt.

GSAP owns existing line/scroll reveals, including the new footer; Motion owns enquiry pane transitions. Premium Motion UI informed shared controls, real imagery, stable reading positions, accessibility and source provenance. No new animation engine, generated asset or real-time3D is added.

Taste plugin installed/enabled as taste-skill@taste-skill version2.5.1. Its actual SKILL.md and relevant references were read. See plan.md for client-first decisions and the conflict between its starter conventions and this existing React project. The checker was run and genuine contrast, target-size and font-preload findings corrected. Its policy/template findings are not a blanket quality score for the client-requested reference composition; the exact final result and remaining diagnostics are recorded separately, without disguising them as a pass.

## Verification

Final Taste diagnostic: `GATE: OPEN 71 (rounds used up)`. This is not a passing Taste grade. Exact findings, client-reference conflicts and genuine limitations are documented in [taste-review.md](taste-review.md), with the original machine state retained. No checker files were edited and no waivers added.

- Production TypeScript/Vite build passed. Main JavaScript about201kB gzip; the lazy enquiry about4.5kB gzip, terrain stilllazy318.6kB gzip. Existing Vite500kB chunk warning remains. No new animation runtime; two OFL font packages added.
- All eight existing booking/date unit tests passed.
- Ten meaningful browser flow checks passed in local Chrome: footer contacts/action, date gating, guest bounds/preference, email validation and answer persistence, personalised review/accurate email/copy, reflow at320/390/768/1024/1440px, inline deep-linked preference, live reduced motion, a complete emulated-phone touch flow, and no uncaught browser errors. See qa.json and scripts/enquiry-redesign-qa.cjs. No message was sent to the hotel.
- Four final targeted checks also passed: header/footer44px targets and return-to-top, keyboard photo-card ring, location copy opacity, and clipboard-denial fallback. See final-smoke.json. The previous docs/client-polish browser script describes the earlier single-form/nested-review interface; use the current enquiry scripts for the new flow.
- Actual screenshots were generated and visually reviewed: footer, dates/guests/personal/review stages, phone enquiry, contact route, hero, menu and editorial section. scripts/enquiry-redesign-visual.cjs reproduces them.
- Checks use local Chrome with emulated touch. Physical iOS/Safari, actual email delivery and field frame-rate measurements are not certified.

Active preview: http://localhost:4174/. Restart with `npm run build` followed by `npm run preview -- --port 4174`. Source-edit preview: `npm run dev -- --port 5173`.

Primary source files: src/jagerhof/SignatureFooter.tsx, src/jagerhof/signature.css, src/BookingInquiry.tsx and src/components/Stepper.tsx. The latest extension is recorded in root DESIGN.md, DESIGN-EXTENSIONS.md and AGENTS.md.
