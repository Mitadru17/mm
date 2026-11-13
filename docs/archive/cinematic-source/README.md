# Hotel Mystic Mountain Kausani

**Current revision:** A cinematic mountain journal with an editorial photographic hero, a selected React Bits text reveal, asymmetric arrival layout, destination storytelling, natural-ratio gallery, Lenis scrolling and Embla carousels. See [the current delivery report](docs/CINEMATIC-DELIVERY.md), [component decisions](docs/react-bits-component-map.md) and [integration status](docs/INTEGRATION-STATUS.md). Earlier reports document preceding revisions.

A complete local React + TypeScript + Vite website built around the 53 original hotel photographs in `photos/`.

## Run

```powershell
npm install
npm run dev -- --port 5174
```

```powershell
npm run test
npm run build
npm run preview -- --port 4174
```

The build outputs a deployable static site in `dist/`. No environment variables or account credentials are needed. The default dev port is 5173; use the override above when that port is occupied.

## What works

- Responsive desktop/mobile navigation, compact sticky header, coordinated Lenis anchor navigation and reduced-motion handling.
- Drag-enabled room and experience carousels with Embla, keyboard controls, live counters and responsive reinitialization.
- Fluid typography, content-aware room panels, spring-driven progress, staggered heading entrances and hover/press feedback.
- A persistent on-page reduced-motion control, alongside system preference support, coordinates CSS, Motion, Lenis, hero rotation and the optional 3D viewer.
- Date and guest validation, reviewed inquiry with room preference, properly encoded email draft and copy-to-clipboard fallback.
- External link to the actual existing booking portal. No booking API, invented availability, prices, payment collection or confirmation screen.
- Three photographic room stories with detail dialogs and image controls. Descriptive editorial names are not asserted inventory categories.
- Filterable gallery, expand-all control, native lightbox, arrow keys, Escape, touch swipe logic and focus restoration.
- Source links for guest reviews, directions, telephone/email, official destination information, and native FAQ accordions.
- Local fonts, responsive WebP images, semantic content, metadata, Hotel JSON-LD, sitemap and robots file.

## Structure

- `src/App.tsx`: page sections and navigation.
- `src/Cinematic.tsx`, `src/cinematic.css`: photographic hero, arrival and destination chapters, and the photo journal treatment.
- `src/components/react-bits/BlurText.tsx`: attributed, narrowly adapted TypeScript/CSS text reveal using the existing Motion runtime.
- `src/BookingInquiry.tsx`: stay form, inquiry preview and email/copy handoff.
- `src/booking.mjs`: shared, tested date/guest validation and inquiry formatting.
- `src/ui.tsx`: image component, branding, dialogs and room/gallery detail views.
- `src/data.ts`: centralized property identity, contacts, photos, room stories and FAQ.
- `src/tokens.css`, `src/styles.css`, `src/responsive.css`: palette, composition and a centralized responsive type scale.
- `src/motion.tsx`, `src/experience.ts`: motion primitives, reveal effects and coordinated smooth scrolling.
- `src/carousel.ts`, `src/Carousels.tsx`: shared Embla behavior and the room/experience carousels.
- `components.json`, `scripts/react-bits-discover.mjs`: optional free React Bits registry access and source inspection; no Tailwind dependency is needed.
- `scripts/prepare-assets.mjs`: original-file inventory and contact sheet.
- `scripts/optimize-images.mjs`: selected WebP derivatives and source/output map.
- `src/metrics.ts`: optional **local-only** performance instrumentation, enabled with `?measure`. No tracking endpoint, cookies or external analytics.

## Documentation

- [Repository, photography, sources and content audit](docs/AUDIT.md)
- [Original photograph contact sheet](docs/asset-contact-sheet.jpg)
- [All-original inventory](docs/asset-inventory.json)
- [Selected images and derivatives](docs/asset-map.json)
- [Delivery and verification report](docs/DELIVERY.md)

## Before public deployment

Ask the owner to confirm the exact room inventory/photo mapping, occupancy, size, current amenities, dining arrangements, arrival/departure times, postal code, phone-number discrepancy, inbox, rates and all booking/cancellation/payment terms. Confirm approved brand mark and photography rights.

Set the final canonical origin in `index.html`, `public/robots.txt` and `public/sitemap.xml` if hosting somewhere other than the current property domain. The OG image requires the final origin to serve `/images/hero.webp`. If replacing the original ProExsus domain itself, retain the actual engine on a separate verified URL and update `hotel.booking` before release; otherwise that external portal link would point back to this homepage. No deployment or DNS changes have been performed.

The site can be hosted by any static host. It makes no outbound reservation submission: a guest must send the reviewed email using their own mail service. Sending and hotel receipt require a working email account and owner-managed inbox.
