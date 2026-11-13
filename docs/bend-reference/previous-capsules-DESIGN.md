---
version: alpha
name: Capsules
description: "Dark monochrome interface measured from capsules.moyra.co: Host Grotesk type, flat surfaces and pill-shaped controls."
colors:
  background: "#181717"
  surface: "#181717"
  on-surface: "#F4EFE7"
  on-background: "#F4EFE7"
  on-surface-variant: "#B1A696"
  primary: "#F4EFE7"
  on-primary: "#2A2725"
typography:
  body-md:
    fontFamily: Host Grotesk
    fontSize: 13.5px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Host Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontFamily: Host Grotesk
    fontSize: 13.5px
    fontWeight: 600
    lineHeight: 1.2
rounded:
  md: 37.5px
  full: 9999px
spacing:
  xs: 3.75px
  sm: 7.5px
  xl: 37.5px
  section: 52.5px
  container: 1440px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4.5px
    height: 48px
---

# Capsules Design System

## Overview

Capsules describes itself as: “Welcome to a world of wild California desert with Capsules®, where you willdesert with Capsules®, where you will discover exquisite nature observing itdiscover exquisite nature observing it from capsule houses, nestled i” The interface is dark, built on **Charcoal (#181717)** with **Warm Mist (#F4EFE7)** text and almost no color: actions are carried by contrast, not hue.

Type is set in **Host Grotesk**. Headlines run large; body text is 13.5px. Depth comes from hairline borders and inset highlights rather than drop shadows. Controls are pill-shaped.

Measured from [capsules.moyra.co](https://capsules.moyra.co/) on November 11, 2026 at 1440×900 and 390×844 from 233 rendered elements. Values are computed styles from the live page, not the original source files.

## Colors

The palette has 5 roles.

- **Charcoal (#181717):** Page background, seen 2 times. Token `background`.
- **Warm Mist (#F4EFE7):** Primary text and headings, seen 69 times. Token `on-surface`.
- **Orange (#B1A696):** Secondary text, seen 16 times. Token `on-surface-variant`.
- **Warm Mist (#F4EFE7):** Primary buttons and calls to action, seen 156 times. Token `primary`.
- **Graphite (#2A2725):** Text and icons on primary. Token `on-primary`.

## Typography

**Host Grotesk** carries the whole interface. Fallback stack: `Host Grotesk, sans-serif`.

- **body-md:** Host Grotesk 13.5px at weight 400, line height 1.5. Body text.
- **label-md:** Host Grotesk 16px at weight 400, line height 1.5. Buttons, navigation and labels.
- **label-sm:** Host Grotesk 13.5px at weight 600, line height 1.2. Small labels and badges.

## Layout

Spacing does not follow a strict grid: 0% of measured values are multiples of 4px, so match the measured steps rather than rounding to a grid.

- **Scale:** xs 3.75px, sm 7.5px, xl 37.5px.
- **Sections:** 52.5px vertical padding between major sections.
- **Container:** content is capped at 1440px.
- **Breakpoints:** 640px, 768px, 1023px, 1024px, 1280px, 1366px, 1536px.

## Elevation & Depth

The design avoids drop shadows. Layers are separated by tonal surface steps and hairline rings:

- `rgb(255, 255, 255) 0px 0px 0px 0px inset, rgb(177, 166, 150) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px`

## Shapes

Interactive controls are pill-shaped. Measured radii, most used first:

- **full (9999px):** 24 elements.
- **md (37.5px):** 8 elements.

## Components

Measured from the rendered page. Token values reference the tokens above.

- **button-primary (“Menu Close Menu Close”):** #F4EFE7 fill, #2A2725 text, 16px/400, 37.5px radius, padding 4.5px.

## Do's and Don'ts

- Do use #181717 for the page.
- Do keep text in 2 levels: #F4EFE7, #B1A696.
- Do let contrast carry emphasis; primary actions use #F4EFE7 on #181717.
- Do reuse the measured spacing steps (7.5px).
- Do make buttons and chips fully rounded (9999px); most other elements use 37.5px corners.
- Don't add drop shadows for depth; use hairline rings and borders and contrast.
- Don't introduce new font families beyond Host Grotesk.
- Don't add saturated accent colors; the measured palette is almost entirely neutral.
- Don't make interface transitions slower than 0.15s.

## Motion

Interface transitions are quick: 0.15s.

- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`.
