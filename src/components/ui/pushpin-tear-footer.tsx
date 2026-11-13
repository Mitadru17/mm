/** User-supplied Pushpin Tear Footer, adapted for Hotel Mystic Mountain.
 * Original defaults identify kedhareswer / 21st.dev; no independent license
 * was supplied. Original procedural SVG tear and pin geometry retained. */
"use client";

import * as React from "react";
import { Link } from "react-router";
import { useSiteMotion } from "@/motion";
import "./pushpin-tear-footer.css";

/**
 * Pushpin Tear Footer — a site footer made as a torn poster. An electric-blue
 * sheet carries the footer's chrome: back to top, socials, the KS monogram,
 * copy-email, a newsletter field, an availability line, a live local clock
 * and two link columns. Its bottom has been ripped away from a glossy
 * pushpin, and the brand is printed on the paper underneath with legal links,
 * the copyright and the handle.
 *
 * When it scrolls in, the chrome assembles, the pin drops and stabs, and the
 * sheet rips from the pin outwards: a jagged ridge with a white fibre rim and
 * curled flaps that cast shadows. Click the pin and it re-rips a new edge.
 *
 * No dependencies and nothing fetched: the tear, flaps, grain, pin and icons
 * are SVG and canvas built from numbers.
 */

// #region tear
export type Flap = {
  at: number;
  span: number;
  len: number;
  skew: number;
  dir: number;
  jag: number[];
};
export type Tear = {
  ys: number[];
  rim: number[];
  lag: number[];
  flaps: Flap[];
};

export const RIDGE_N = 84;
/** Off-screen start: the ridge begins below the bottom edge, so the sheet is whole. */
export const START = 1.06;
export const FLAPS = 6;

const clamp01 = (v: number) =>
  Number.isFinite(v) ? (v < 0 ? 0 : v > 1 ? 1 : v) : 0;

/** mulberry32 — small, seedable, the same tear for the same seed everywhere. */
export function rng(seed: number) {
  let a = (Number.isFinite(seed) ? Math.floor(seed) : 0) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ridge x positions, shared by every seed so one tear can morph into another. */
export const XS: number[] = (() => {
  const r = rng(911);
  const out: number[] = [];
  for (let i = 0; i < RIDGE_N; i++) {
    const u = i / (RIDGE_N - 1);
    const j = i > 0 && i < RIDGE_N - 1 ? (r() - 0.5) * (0.8 / RIDGE_N) : 0;
    out.push(-0.02 + u * 1.04 + j);
  }
  return out;
})();

/** The lowest the ridge may climb at x, so it never crosses the poster's content. */
export function ridgeFloor(x: number) {
  const d = Math.abs(x - 0.5);
  if (d < 0.13) return 0.39;
  if (d < 0.25) return 0.43;
  return 0.5;
}

export function makeTear(seed: number, n = RIDGE_N): Tear {
  const r = rng(seed);
  const ph = [r() * 6.283, r() * 6.283, r() * 6.283];
  const ys: number[] = [];
  const rim: number[] = [];
  const lag: number[] = [];
  for (let i = 0; i < n; i++) {
    const x = XS[Math.min(i, XS.length - 1)];
    const d = Math.min(1, Math.abs(x - 0.5) * 2);
    // a mountain: lowest under the pin, falling away to both edges
    const base = 0.43 + 0.3 * Math.pow(d, 1.35);
    const wander =
      (0.022 * Math.sin(x * 7 + ph[0]) +
        0.016 * Math.sin(x * 13 + ph[1]) +
        0.01 * Math.sin(x * 29 + ph[2])) *
      (0.45 + 0.55 * d);
    const spike = r() < 0.16 ? 2.3 : 1;
    const jag = (r() - 0.5) * 0.022 * spike;
    ys.push(Math.min(0.8, Math.max(ridgeFloor(x), base + wander + jag)));
    rim.push(1.2 + r() * 3.6);
    // rips from the pin outwards
    lag.push(
      Math.min(
        0.48,
        d * 0.4 + 0.04 + 0.03 * Math.sin(x * 23 + ph[1]) + r() * 0.012,
      ),
    );
  }
  // Six flaps: the outer two big curls, two mid, two small ones curling back over the sheet.
  const slots = [0.05, 0.19, 0.33, 0.67, 0.81, 0.95];
  const up = r() < 0.5 ? [2, 4] : [1, 3];
  const flaps: Flap[] = slots.map((slot, k) => {
    const x = slot + (r() - 0.5) * 0.05;
    const span = 3 + Math.floor(r() * 5);
    const at = Math.max(0, Math.min(n - 1 - span, Math.round(x * (n - 1))));
    const dir = up.includes(k) ? -1 : 1;
    const outer = k === 0 || k === slots.length - 1;
    const len =
      dir < 0
        ? 0.022 + r() * 0.022
        : outer
          ? 0.085 + r() * 0.04
          : 0.045 + r() * 0.05;
    return {
      at,
      span,
      len,
      skew: (r() - 0.5) * 1.1,
      dir,
      jag: [r() - 0.5, r() - 0.5, r() - 0.5, r() - 0.5],
    };
  });
  return { ys, rim, lag, flaps };
}

/** Ease out with a small overshoot: the paper rips a hair too far and settles. */
export function easeTear(t: number) {
  const x = clamp01(t);
  if (x === 0 || x === 1) return x;
  const c1 = 0.9;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** The ridge during the opening rip, `t` in 0..1. */
export function introYs(tear: Tear, t: number) {
  return tear.ys.map(
    (y, i) => START + (y - START) * easeTear((t - tear.lag[i]) / 0.5),
  );
}

/** The ridge while one tear re-rips into the next, `t` in 0..1. */
export function morphYs(from: number[], to: Tear, t: number) {
  return to.ys.map((y, i) => {
    const a = from[i] ?? y;
    return a + (y - a) * easeInOut((t - to.lag[i] * 0.6) / 0.6);
  });
}

/** How far a flap has unfolded during the opening rip. */
export function flapOpen(tear: Tear, f: Flap, t: number) {
  return easeTear((t - tear.lag[f.at] - 0.18) / 0.32);
}

/** A flap: the ridge segment it hangs from, then two jagged free edges meeting at its tip. */
export function flapPoly(
  ys: number[],
  f: Flap,
  W: number,
  H: number,
  open: number,
) {
  const b = Math.min(ys.length - 1, f.at + f.span);
  const top: number[][] = [];
  for (let k = f.at; k <= b; k++) top.push([XS[k] * W, ys[k] * H]);
  const A = top[0];
  const B = top[top.length - 1];
  const mx = (A[0] + B[0]) / 2;
  const my = (A[1] + B[1]) / 2;
  const L = f.len * H * Math.max(0, open);
  const tip = [mx + f.skew * L, my + f.dir * L];
  const side = (P: number[], Q: number[], j0: number, j1: number) => {
    const dx = Q[0] - P[0];
    const dy = Q[1] - P[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    return [
      [P[0] + dx / 3 + nx * j0 * 0.22 * L, P[1] + dy / 3 + ny * j0 * 0.22 * L],
      [
        P[0] + (dx * 2) / 3 + nx * j1 * 0.22 * L,
        P[1] + (dy * 2) / 3 + ny * j1 * 0.22 * L,
      ],
    ];
  };
  return [
    ...top,
    ...side(B, tip, f.jag[0], f.jag[1]),
    tip,
    ...side(tip, A, f.jag[2], f.jag[3]),
  ];
}

const n1 = (v: number) => Math.round(v * 10) / 10;

export function polyD(pts: number[][]) {
  return pts.length
    ? "M" + pts.map((p) => n1(p[0]) + " " + n1(p[1])).join("L") + "Z"
    : "";
}

/** The sheet: everything above the ridge, lifted by `off` pixels per point (the fibre rim). */
export function sheetD(ys: number[], W: number, H: number, off?: number[]) {
  let d = "M-20 -20L" + (W + 20) + " -20";
  for (let i = ys.length - 1; i >= 0; i--)
    d += "L" + n1(XS[i] * W) + " " + n1(ys[i] * H - (off ? off[i] : 0));
  return d + "Z";
}

/** Mix two #rrggbb colours. */
export function mixHex(a: string, b: string, t: number) {
  const p = (h: string) => {
    const s = h.replace("#", "");
    const f =
      s.length === 3
        ? s
            .split("")
            .map((c) => c + c)
            .join("")
        : s.padEnd(6, "0").slice(0, 6);
    return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) || 0);
  };
  const x = p(a);
  const y = p(b);
  const k = clamp01(t);
  return (
    "#" +
    x
      .map((v, i) =>
        Math.round(v + (y[i] - v) * k)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

// #endregion

export type IconName =
  | "github"
  | "21st"
  | "x"
  | "ig"
  | "linkedin"
  | "dribbble"
  | "chat"
  | "globe"
  | "mail"
  | "link"
  | "shield"
  | "doc";

export type TearLink = { label: string; href?: string };
export type IconLink = { icon: IconName; label: string; href?: string };
export type FooterColumn = { title: string; links: TearLink[]; cta?: TearLink };

export type PushpinTearFooterProps = {
  /** The wordmark printed on the paper. */
  brand?: string;
  /** The full name in gradient over the wordmark. */
  name?: string;
  /** Replaces the KS monogram at the top. */
  logo?: React.ReactNode;
  logoHref?: string;
  socials?: IconLink[];
  /** Copied by the envelope button; also the default "talk." link. */
  email?: string;
  newsletter?: { label: string; placeholder?: string } | null;
  /** One line about availability, under the newsletter. */
  status?: { label: string; href?: string } | null;
  /** Small mark left of the newsletter. */
  mark?: string;
  /** IANA zone for the live clock right of the newsletter. */
  timeZone?: string;
  timeLabel?: string;
  columns?: FooterColumn[];
  chat?: TearLink | null;
  /** Two links either side of the wordmark. */
  sideLinks?: IconLink[];
  copyright?: string;
  credit?: string;
  handle?: TearLink;
  sheet?: string;
  paper?: string;
  sheetInk?: string;
  paperInk?: string;
  seed?: number;
  height?: number | string;
  fontSans?: string;
  onSubscribe?: (email: string) => void;
  onRepin?: (seed: number) => void;
  className?: string;
  id?: string;
  inert?: boolean;
  onBook?: () => void;
  onBackToTop?: () => void;
  pinColor?: string;
};

const P = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Icon({
  name,
}: {
  name: IconName | "chevL" | "copy" | "squiggle" | "arrow" | "check";
}) {
  const svg = (children: React.ReactNode, filled?: boolean) => (
    <svg
      viewBox="0 0 24 24"
      className="tpf-ico"
      aria-hidden="true"
      {...(filled ? { fill: "currentColor" } : P)}
    >
      {children}
    </svg>
  );
  switch (name) {
    case "chevL":
      return svg(<path d="M14.5 5.5 8 12l6.5 6.5" />);
    case "arrow":
      return svg(<path d="M5 12h13M13 6.5 18.5 12 13 17.5" />);
    case "check":
      return svg(<path d="m5.5 12.5 4 4 9-9.5" />);
    case "copy":
      return svg(
        <>
          <path d="M13.5 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5v-6.5" />
          <circle cx="18.5" cy="5.5" r="2.3" />
        </>,
      );
    case "squiggle":
      return svg(
        <path d="M3.5 15c1.8-3.2 3.6-3.2 5.4 0s3.6 3.2 5.4 0 3.6-3.2 5.4 0" />,
      );
    case "github":
      return svg(
        <path
          fillRule="evenodd"
          d="M12 2.8a9.3 9.3 0 0 0-2.9 18.1c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.1-.2-4.2-1-4.2-4.6 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.5 0 3.6-2.2 4.4-4.2 4.6.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A9.3 9.3 0 0 0 12 2.8z"
        />,
        true,
      );
    case "21st":
      return svg(
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <path d="M7.6 10.2a1.9 1.9 0 0 1 3.7.4c0 1.6-3.7 2.6-3.7 4.6h3.8M14.2 10.4l1.9-1.4v6.4" />
        </>,
      );
    case "linkedin":
      return svg(
        <path
          fillRule="evenodd"
          d="M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5zm.2 6.6v7h2.2v-7zm1.1-3.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm2.6 3.4v7h2.2v-3.7c0-1 .4-1.6 1.2-1.6s1.1.6 1.1 1.6v3.7h2.2v-4.3c0-2-1-2.9-2.5-2.9-.9 0-1.6.4-2 1v-.8z"
        />,
        true,
      );
    case "doc":
      return svg(
        <>
          <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z" />
          <path d="M14 3.5V8h4.5M8.8 12.5h6.4M8.8 16h4.2" />
        </>,
      );
    case "chat":
      return svg(
        <path
          fillRule="evenodd"
          d="M12 3C7 3 3.2 6.6 3.2 11.2c0 2.5 1.1 4.6 2.9 6.1v3.4l3.2-1.8c.8.2 1.8.4 2.7.4 5 0 8.8-3.6 8.8-8.1S17 3 12 3zm-4 9.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"
        />,
        true,
      );
    case "x":
      return svg(
        <path d="M5 4.5h3.6l10.4 15H15.4zM18.6 4.5 13.4 10.4M5.4 19.5l5.4-6.2" />,
      );
    case "ig":
      return svg(
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" />
        </>,
      );
    case "dribbble":
      return svg(
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M5.2 7c4.5 2 9.8 2 13 .7M3.6 13c5-1.6 10.4-.4 14 4.6M9 3.9c3 3.6 5.2 9.3 5.7 15.6" />
        </>,
      );
    case "globe":
      return svg(
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z" />
        </>,
      );
    case "mail":
      return svg(
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </>,
      );
    case "link":
      return svg(
        <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />,
      );
    case "shield":
      return svg(
        <path
          fillRule="evenodd"
          d="M6.5 2.5h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4zM12 6.2 7.6 7.8v3.6c0 2.9 1.9 5.2 4.4 6.2 2.5-1 4.4-3.3 4.4-6.2V7.8zm-2 5.8 1.4 1.4 2.8-2.9"
        />,
        true,
      );
  }
}

/** Twelve-bump verified seal with a check cut through it. */
function Seal() {
  let d = "";
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? 8.6 : 10;
    d +=
      (i ? "L" : "M") +
      (12 + Math.cos(a) * r).toFixed(2) +
      " " +
      (12 + Math.sin(a) * r).toFixed(2);
  }
  return (
    <svg viewBox="0 0 24 24" className="tpf-seal" aria-hidden="true">
      <path
        d={d + "Z"}
        fill="currentColor"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="m8.3 12.2 2.5 2.5 5-5.2"
        fill="none"
        stroke="var(--tpf-sheet)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** KS monogram: the K's upper arm ends in a pushpin head, the S is the tear. */
function KMark() {
  return (
    <svg
      viewBox="0 0 44 28"
      className="tpf-mark"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 4.5v19" />
      <path d="M5.5 15.2 15.6 6.4" />
      <path d="M10.4 11 17 23.5" />
      <path d="M37.5 6.6c-1.2-1.4-3-2.1-5-2.1-3 0-5 1.6-5 3.9 0 5.2 10.4 3.5 10.4 9.1 0 2.6-2.3 4.5-5.4 4.5-2.3 0-4.4-.9-5.7-2.5" />
      <circle
        cx="17"
        cy="5"
        r="3"
        fill="currentColor"
        stroke="none"
        className="tpf-mark-dot"
      />
    </svg>
  );
}

/** Live local time with a blinking colon; empty until mounted so SSR never mismatches. */
function Clock({
  zone,
  label,
  active,
}: {
  zone: string;
  label: string;
  active: boolean;
}) {
  const [t, setT] = React.useState(["--", "--"]);
  React.useEffect(() => {
    if (!active) return;
    let f: Intl.DateTimeFormat;
    try {
      f = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: zone,
      });
    } catch {
      f = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    }
    const tick = () => setT(f.format(new Date()).split(":"));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [zone, active]);
  return (
    <span className="tpf-clock">
      {label} {t[0]}
      <i aria-hidden="true">:</i>
      {t[1]}
    </span>
  );
}

/** The pushpin: glossy domed cap, waisted neck, flange, steel needle. Shaded from `base`. */
function Pin({ base, id }: { base: string; id: string }) {
  const hi = mixHex(base, "#ffffff", 0.62);
  const mid = base;
  const lo = mixHex(base, "#000000", 0.42);
  const deep = mixHex(base, "#000000", 0.66);
  const t = { transition: "stop-color .7s ease" };
  const side = (gid: string) => (
    <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" style={{ ...t, stopColor: lo }} />
      <stop offset=".24" style={{ ...t, stopColor: mid }} />
      <stop offset=".4" style={{ ...t, stopColor: hi }} />
      <stop offset=".58" style={{ ...t, stopColor: mid }} />
      <stop offset="1" style={{ ...t, stopColor: deep }} />
    </linearGradient>
  );
  return (
    <svg viewBox="0 0 100 200" className="tpf-pin-svg" aria-hidden="true">
      <defs>
        {side(id + "s")}
        <radialGradient id={id + "t"} cx=".38" cy=".3" r=".8">
          <stop offset="0" style={{ ...t, stopColor: hi }} />
          <stop offset=".55" style={{ ...t, stopColor: mid }} />
          <stop offset="1" style={{ ...t, stopColor: lo }} />
        </radialGradient>
        <linearGradient id={id + "n"} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5b616b" />
          <stop offset=".4" stopColor="#f4f5f7" />
          <stop offset=".7" stopColor="#a3a9b2" />
          <stop offset="1" stopColor="#4a4f57" />
        </linearGradient>
        <filter id={id + "b"} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M48.3 112h3.4l-.7 76-1 4-1-4z" fill={"url(#" + id + "n)"} />
      <ellipse
        cx="50"
        cy="191.5"
        rx="3.2"
        ry="1.1"
        fill="#0b1a33"
        opacity=".35"
      />
      <path d="M28 103v6.5a22 7 0 0 0 44 0V103z" fill={"url(#" + id + "s)"} />
      <ellipse cx="50" cy="103" rx="22" ry="7" fill={"url(#" + id + "t)"} />
      <path
        d="M41.5 38c1.6 16 4.6 26 3 36-1.8 10-13 19-14.6 29h40.2c-1.6-10-12.8-19-14.6-29-1.6-10 1.4-20 3-36z"
        fill={"url(#" + id + "s)"}
      />
      <path d="M16 22v14a34 13 0 0 0 68 0V22z" fill={"url(#" + id + "s)"} />
      <ellipse cx="50" cy="22" rx="34" ry="13" fill={"url(#" + id + "t)"} />
      <ellipse
        cx="50"
        cy="22"
        rx="33"
        ry="12.3"
        fill="none"
        stroke="#fff"
        strokeOpacity=".28"
        strokeWidth=".8"
      />
      <ellipse
        cx="37"
        cy="17.5"
        rx="12"
        ry="4"
        fill="#fff"
        opacity=".7"
        filter={"url(#" + id + "b)"}
      />
      <path
        d="M22 38c4 4.5 9.5 6.4 15 7"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter={"url(#" + id + "b)"}
      />
      <path
        d="M45 50c.8 8 1.6 14 .8 22"
        stroke="#fff"
        strokeOpacity=".45"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ME = "kedhareswer";
const HOME = "https://21st.dev/@" + ME;

const DEFAULT_SOCIALS: IconLink[] = [
  { icon: "github", label: "GitHub", href: "https://github.com/" + ME },
  { icon: "21st", label: "21st.dev", href: HOME },
];

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "index",
    links: [
      { label: "Components", href: HOME },
      { label: "Templates", href: HOME },
      { label: "Preloaders", href: HOME },
    ],
    cta: { label: "work.", href: HOME },
  },
  {
    title: "elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/" + ME },
      { label: "21st.dev", href: HOME },
      {
        label: "Source",
        href: "https://github.com/" + ME + "/21stdev-my-components",
      },
    ],
  },
];

const DEFAULT_SIDES: IconLink[] = [
  { icon: "shield", label: "privacy", href: "#" },
  { icon: "doc", label: "terms", href: "#" },
];

function A({
  href,
  className,
  label,
  children,
  style,
}: {
  href?: string;
  className?: string;
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const onClick = (e: React.MouseEvent) => {
    if (!href || href === "#") e.preventDefault();
  };
  const out = !!href && /^https?:/.test(href);
  if (href?.startsWith("/") && !href.startsWith("//"))
    return (
      <Link
        to={href}
        className={className}
        aria-label={label}
        title={label}
        style={style}
      >
        {children}
      </Link>
    );
  return (
    <a
      href={href || "#"}
      className={className}
      aria-label={label}
      title={label}
      onClick={onClick}
      style={style}
      {...(out ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function PushpinTearFooter({
  brand = "kedhar.",
  name = "kedhareswer",
  logo,
  logoHref = HOME,
  socials = DEFAULT_SOCIALS,
  email = "hello@example.com",
  newsletter = {
    label: "new components, once a month",
    placeholder: "your@email",
  },
  status = { label: "open for collaborations" },
  mark = "KS / 2026",
  timeZone = "Asia/Kolkata",
  timeLabel = "IST",
  columns = DEFAULT_COLUMNS,
  chat = { label: "say hi" },
  sideLinks = DEFAULT_SIDES,
  copyright = "© 2026 Kedhareswer",
  credit = "designed & built by hand",
  handle = { label: "@" + ME, href: HOME },
  sheet = "#1a7ff0",
  paper = "#f3f3f1",
  sheetInk = "#ffffff",
  paperInk,
  seed = 7,
  height = "100svh",
  fontSans = '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
  onSubscribe,
  onRepin,
  className = "",
  id,
  inert,
  onBook,
  onBackToTop,
  pinColor,
}: PushpinTearFooterProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const rootRef = React.useRef<HTMLElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const sheetRef = React.useRef<SVGPathElement>(null);
  const rimRef = React.useRef<SVGPathElement>(null);
  const flapRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const gradRefs = React.useRef<(SVGLinearGradientElement | null)[]>([]);
  const pinRef = React.useRef<HTMLButtonElement>(null);
  const timers = React.useRef<number[]>([]);

  const still = useSiteMotion();
  const [stage, setStage] = React.useState(still ? 3 : 0);
  const [hit, setHit] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [pageVisible, setPageVisible] = React.useState(() => !document.hidden);
  const [pin, setPin] = React.useState<"idle" | "lift" | "stab">("idle");
  const [sent, setSent] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [toast, setToast] = React.useState("");
  const [grain, setGrain] = React.useState("");

  const s = React.useRef({
    W: 0,
    H: 0,
    tear: makeTear(seed),
    prev: null as Tear | null,
    from: [] as number[],
    ys: [] as number[],
    mode: (still ? "rest" : "wait") as "wait" | "intro" | "morph" | "rest",
    t0: 0,
    dur: 1,
    raf: 0,
    px: -1e4,
    py: -1e4,
    lift: new Array(FLAPS).fill(0) as number[],
    still: false,
    busy: false,
    onScreen: false,
    hidden: typeof document !== "undefined" && document.hidden,
    seed,
  }).current;
  s.still = still;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // ---- drawing --------------------------------------------------------------
  const frame = React.useCallback(
    (now: number) => {
      s.raf = 0;
      const { W, H, tear } = s;
      if (!W || !H) return;
      if (!s.onScreen || s.hidden) return;
      let busy = false;
      let ys: number[];
      const open = new Array(FLAPS).fill(1);
      const openOld = new Array(FLAPS).fill(0);
      if (s.mode === "wait") {
        ys = tear.ys.map(() => START);
        open.fill(0);
      } else if (s.mode === "intro") {
        const p = (now - s.t0) / s.dur;
        ys = introYs(tear, Math.min(1, p));
        tear.flaps.forEach(
          (f, k) => (open[k] = flapOpen(tear, f, Math.min(1, p))),
        );
        if (p >= 1) s.mode = "rest";
        else busy = true;
      } else if (s.mode === "morph") {
        const p = (now - s.t0) / s.dur;
        ys = morphYs(s.from, tear, Math.min(1, p));
        open.fill(easeTear((p - 0.5) / 0.5));
        openOld.fill(1 - easeInOut(p / 0.35));
        if (p >= 1) s.mode = "rest";
        else busy = true;
      } else ys = tear.ys;
      s.ys = ys;
      // Preserve the poster's composition while reserving readable phone columns.
      // s.ys stays canonical, so re-pinning never compounds this display mapping.
      if (W < 620) ys = ys.map((y) => 0.23 + 0.77 * y);

      // flaps lift towards a nearby pointer
      tear.flaps.forEach((f, k) => {
        const b = Math.min(ys.length - 1, f.at + f.span);
        const mx = ((XS[f.at] + XS[b]) / 2) * W;
        const my = ((ys[f.at] + ys[b]) / 2) * H;
        const target = s.still
          ? 0
          : clamp01(
              1 - Math.hypot(s.px - mx, s.py - my) / (0.2 * Math.max(W, 520)),
            );
        s.lift[k] += (target - s.lift[k]) * 0.14;
        if (Math.abs(target - s.lift[k]) > 0.003) busy = true;
        open[k] *= 1 + 0.32 * s.lift[k];
      });

      sheetRef.current?.setAttribute("d", sheetD(ys, W, H, tear.rim));
      rimRef.current?.setAttribute("d", sheetD(ys, W, H));
      const draw = (k: number, f: Flap | undefined, o: number) => {
        const el = flapRefs.current[k];
        const g = gradRefs.current[k];
        if (!el || !g) return;
        if (!f || o < 0.01) return el.setAttribute("d", "");
        const pts = flapPoly(
          ys,
          W < 620 ? { ...f, len: f.len * 0.6 } : f,
          W,
          H,
          o,
        );
        el.setAttribute("d", polyD(pts));
        const b = Math.min(ys.length - 1, f.at + f.span);
        const tip = pts[f.span + 3];
        g.setAttribute("x1", String(((XS[f.at] + XS[b]) / 2) * W));
        g.setAttribute("y1", String(((ys[f.at] + ys[b]) / 2) * H));
        g.setAttribute("x2", String(tip[0]));
        g.setAttribute("y2", String(tip[1]));
      };
      for (let k = 0; k < FLAPS; k++) {
        draw(k, tear.flaps[k], open[k]);
        draw(FLAPS + k, s.prev?.flaps[k], openOld[k]);
      }
      if (busy) s.raf = requestAnimationFrame(frame);
    },
    [s],
  );

  const kick = React.useCallback(() => {
    if (
      !s.raf &&
      s.onScreen &&
      !s.hidden &&
      typeof requestAnimationFrame !== "undefined"
    )
      s.raf = requestAnimationFrame(frame);
  }, [s, frame]);

  React.useEffect(() => {
    const update = () => {
      s.hidden = document.hidden;
      setPageVisible(!document.hidden);
      if (s.hidden) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
      } else kick();
    };
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [s, kick]);

  React.useEffect(() => {
    if (!still) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    s.mode = "rest";
    s.busy = false;
    s.px = s.py = -1e4;
    s.lift.fill(0);
    setStage(3);
    setHit(false);
    setPin("idle");
    kick();
  }, [still, s, kick]);

  // size
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      s.W = el.clientWidth;
      s.H = el.clientHeight;
      const svg = svgRef.current;
      if (svg) {
        svg.setAttribute("width", String(s.W));
        svg.setAttribute("height", String(s.H));
        svg.setAttribute("viewBox", "0 0 " + s.W + " " + s.H);
      }
      kick();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [s, kick]);

  // visibility
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      s.onScreen = true;
      setVisible(true);
      kick();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        s.onScreen = e.isIntersecting;
        setVisible(e.isIntersecting);
        if (e.isIntersecting) kick();
        else {
          cancelAnimationFrame(s.raf);
          s.raf = 0;
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [s, kick]);

  // grain tile, once
  React.useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const g = c.getContext("2d");
    if (!g) return;
    const img = g.createImageData(160, 160);
    const r = rng(42);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = r() < 0.5 ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.floor(r() * 46);
    }
    g.putImageData(img, 0, 0);
    setGrain(c.toDataURL());
  }, []);

  // the opening: chrome, pin, rip
  React.useEffect(() => {
    if (!visible || stage > 0) return;
    if (still) {
      setStage(3);
      s.mode = "rest";
      kick();
      return;
    }
    setStage(1);
    later(() => setStage(2), 640);
    later(() => {
      setHit(true);
      setStage(3);
      s.mode = "intro";
      s.t0 = performance.now();
      s.dur = 1550;
      kick();
    }, 1140);
    later(() => setHit(false), 1480);
  }, [visible, stage, still, s, kick]);

  React.useEffect(
    () => () => {
      timers.current.forEach((id) => clearTimeout(id));
    },
    [],
  );

  // a new seed from outside re-tears in place
  React.useEffect(() => {
    if (seed === s.seed) return;
    s.seed = seed;
    s.prev = s.tear;
    s.from = s.ys.length ? s.ys : s.tear.ys;
    s.tear = makeTear(seed);
    if (s.mode !== "wait") {
      s.mode = still ? "rest" : "morph";
      s.t0 = performance.now();
      s.dur = 1100;
    }
    kick();
  }, [seed, still, s, kick]);

  // ---- actions ----------------------------------------------------------------
  const onPointerMove = (e: React.PointerEvent) => {
    const el = rootRef.current;
    if (!el || s.still || e.pointerType === "touch" || !s.onScreen) return;
    const r = el.getBoundingClientRect();
    s.px = e.clientX - r.left;
    s.py = e.clientY - r.top;
    const tilt = Math.max(-9, Math.min(9, (s.px / r.width - 0.5) * 18));
    pinRef.current?.style.setProperty("--tilt", tilt.toFixed(2) + "deg");
    kick();
  };
  const onPointerLeave = () => {
    s.px = s.py = -1e4;
    pinRef.current?.style.setProperty("--tilt", "0deg");
    kick();
  };

  const repin = () => {
    if (s.busy || stage < 3) return;
    const next = s.seed + 1;
    const swap = () => {
      s.seed = next;
      s.prev = s.tear;
      s.from = s.ys.length ? s.ys : s.tear.ys;
      s.tear = makeTear(next);
    };
    if (still) {
      swap();
      s.prev = null;
      s.mode = "rest";
      kick();
      onRepin?.(next);
      return;
    }
    s.busy = true;
    setPin("lift");
    later(() => {
      swap();
      s.mode = "morph";
      s.t0 = performance.now();
      s.dur = 1150;
      kick();
    }, 300);
    later(() => setPin("stab"), 1280);
    later(() => {
      setPin("idle");
      s.busy = false;
      onRepin?.(next);
    }, 1720);
  };

  const flash = (msg: string) => {
    setToast(msg);
    later(() => setToast(""), 1600);
  };
  const copyEmail = () => {
    if (navigator.clipboard?.writeText)
      navigator.clipboard.writeText(email).then(
        () => flash("email copied"),
        () => flash(email),
      );
    else flash(email);
  };
  const toTop = () =>
    onBackToTop
      ? onBackToTop()
      : window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = address.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return flash("check that email");
    if (!onSubscribe) return flash("Please contact the hotel by email");
    onSubscribe(v);
    setSent(true);
  };

  // ---- colours ----------------------------------------------------------------
  const pinBase =
    pinColor ??
    (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(sheet) ? sheet : "#1a7ff0");
  // flaps are the back of the sheet: paper-white
  const flapBase = mixHex(
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(paper) ? paper : "#f3f3f1",
    "#ffffff",
    0.35,
  );
  const vars = {
    height: typeof height === "number" ? height + "px" : height,
    "--tpf-sheet": sheet,
    "--tpf-paper": paper,
    "--tpf-on-sheet": sheetInk,
    "--tpf-on-paper": paperInk ?? sheet,
    "--tpf-rim": mixHex(flapBase, "#ffffff", 0.6),
    "--tpf-sans": fontSans,
  } as React.CSSProperties;

  const mailto = "mailto:" + email;
  const cols = columns.slice(0, 2);
  const H = (i: number) => ({ "--i": i }) as React.CSSProperties;

  const cls = [
    "tpf",
    stage >= 1 && "s1",
    stage >= 2 && "s2",
    stage >= 3 && "s3",
    hit && "is-hit",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer
      id={id}
      inert={inert}
      data-still={still || undefined}
      data-active={(visible && pageVisible) || undefined}
      data-stage={stage}
      aria-label="Hotel Mystic Mountain footer"
      ref={rootRef}
      className={cls}
      style={vars}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <svg ref={svgRef} className="tpf-stage" aria-hidden="true">
        <defs>
          <radialGradient id={uid + "v"} cx=".5" cy=".78" r=".75">
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#0d1c38" stopOpacity=".07" />
          </radialGradient>
          <linearGradient id={uid + "l"} x1="0" y1="0" x2=".35" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".13" />
            <stop offset=".55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#001033" stopOpacity=".12" />
          </linearGradient>
          {grain && (
            <pattern
              id={uid + "g"}
              width="160"
              height="160"
              patternUnits="userSpaceOnUse"
            >
              <image href={grain} width="160" height="160" />
            </pattern>
          )}
          <filter id={uid + "d"} x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3.5"
              floodColor="#0a1a3a"
              floodOpacity=".3"
            />
          </filter>
          <filter id={uid + "f"} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow
              dx="-2"
              dy="4"
              stdDeviation="4"
              floodColor="#0a1a3a"
              floodOpacity=".26"
            />
          </filter>
          {Array.from({ length: FLAPS * 2 }, (_, k) => (
            <linearGradient
              key={k}
              id={uid + "fg" + k}
              ref={(el) => {
                gradRefs.current[k] = el;
              }}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={mixHex(flapBase, "#1c2a44", 0.34)} />
              <stop offset=".5" stopColor={mixHex(flapBase, "#1c2a44", 0.08)} />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          ))}
          <path id={uid + "s"} ref={sheetRef} />
        </defs>
        <rect className="tpf-paper" width="100%" height="100%" />
        <rect
          width="100%"
          height="100%"
          fill={"url(#" + uid + "v)"}
          style={{ mixBlendMode: "multiply" }}
        />
        {grain && (
          <rect
            width="100%"
            height="100%"
            fill={"url(#" + uid + "g)"}
            opacity=".32"
          />
        )}
        <g className="tpf-sheet-g" filter={"url(#" + uid + "d)"}>
          <path ref={rimRef} className="tpf-rim" />
          <use href={"#" + uid + "s"} className="tpf-sheet" />
        </g>
        <use href={"#" + uid + "s"} fill={"url(#" + uid + "l)"} />
        {grain && (
          <use
            href={"#" + uid + "s"}
            fill={"url(#" + uid + "g)"}
            opacity=".5"
          />
        )}
        <g filter={"url(#" + uid + "f)"}>
          {Array.from({ length: FLAPS * 2 }, (_, k) => (
            <path
              key={k}
              ref={(el) => {
                flapRefs.current[k] = el;
              }}
              fill={"url(#" + uid + "fg" + k + ")"}
            />
          ))}
        </g>
      </svg>

      {/* ---- on the sheet ---- */}
      <div className="tpf-z tpf-top">
        <div className="tpf-row tpf-h" style={H(0)}>
          <button
            type="button"
            className="tpf-ib tpf-up"
            onClick={toTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <Icon name="chevL" />
          </button>
          <span style={{ width: ".6em" }} />
          {socials.map((l, i) => (
            <A key={i} href={l.href} className="tpf-ib" label={l.label}>
              <Icon name={l.icon} />
            </A>
          ))}
        </div>
        <A
          href={logoHref}
          className="tpf-logo tpf-h"
          label={name + ", home"}
          style={H(1)}
        >
          {logo ?? <KMark />}
        </A>
        <div className="tpf-h" style={{ ...H(2), position: "relative" }}>
          <button
            type="button"
            className="tpf-mail"
            onClick={copyEmail}
            aria-label={"Copy " + email}
            title="Copy email"
          >
            <span>{email}</span>
            <Icon name="copy" />
          </button>
          <span
            className={"tpf-toast" + (toast ? " on" : "")}
            role="status"
            aria-live="polite"
          >
            {toast}
          </span>
        </div>
      </div>

      {onBook ? (
        <div className="tpf-z tpf-news tpf-h tpf-enquiry" style={H(3)}>
          <p>See you in the hills.</p>
          <button type="button" onClick={onBook} className="tpf-enquire">
            <span>Plan your mountain stay</span>
            <span className="tpf-enquire-arrow">
              <Icon name="arrow" />
            </span>
          </button>
        </div>
      ) : (
        newsletter && (
          <form className="tpf-z tpf-news tpf-h" style={H(3)} onSubmit={submit}>
            <label htmlFor={uid + "e"}>{newsletter.label}</label>
            <div className="tpf-pill" data-sent={sent}>
              <input
                id={uid + "e"}
                type="email"
                placeholder={newsletter.placeholder ?? "your@email"}
                autoComplete="email"
                value={address}
                disabled={sent}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="tpf-sent" aria-live="polite">
                {sent ? (
                  <>
                    <Icon name="check" /> you're on the list
                  </>
                ) : null}
              </span>
              <button
                type="submit"
                className="tpf-knob"
                aria-label="Subscribe"
                disabled={sent}
              >
                <Icon name={sent ? "check" : "arrow"} />
              </button>
            </div>
          </form>
        )
      )}

      {mark && (
        <span
          className="tpf-z tpf-flank tpf-h"
          style={{ ...H(4), left: "24%" }}
        >
          {mark}
        </span>
      )}
      {timeZone && (
        <span
          className="tpf-z tpf-flank tpf-h"
          style={{ ...H(4), left: "76%" }}
          title={"Local time · " + timeZone}
        >
          <Clock
            zone={timeZone}
            label={timeLabel}
            active={visible && pageVisible}
          />
        </span>
      )}

      {status && (
        <>
          <A
            href={status.href ?? mailto}
            className="tpf-z tpf-status tpf-h"
            style={H(5)}
          >
            <i className="tpf-live" aria-hidden="true" />
            <span>{status.label}</span>
          </A>
          <span className="tpf-z tpf-badge" aria-hidden="true">
            <span
              className="tpf-h"
              style={{
                ...H(6),
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              <Seal />
            </span>
          </span>
        </>
      )}

      {cols.map((c, i) => (
        <nav
          key={i}
          className={"tpf-z tpf-col tpf-h " + (i ? "r" : "l")}
          style={H(6 + i)}
          aria-label={c.title}
        >
          <h3>
            {c.title}
            <Icon name="squiggle" />
          </h3>
          <ul>
            {c.links.map((l, j) => (
              <li key={j}>
                <A href={l.href}>{l.label}</A>
              </li>
            ))}
          </ul>
          {(() => {
            const cta = c.cta ?? (i ? { label: "talk.", href: mailto } : null);
            return cta ? (
              <A href={cta.href} className="tpf-big">
                {cta.label}
              </A>
            ) : null;
          })()}
        </nav>
      ))}

      {/* ---- the pin ---- */}
      <button
        ref={pinRef}
        type="button"
        className="tpf-pin"
        data-pin={pin}
        onClick={repin}
        aria-label="Re-pin: tear a new edge"
        title="Pull the pin"
      >
        <span className="tpf-shadow" aria-hidden="true" />
        <span className="tpf-tilt">
          <span className="tpf-drop">
            <span className="tpf-body">
              <Pin base={pinBase} id={uid + "p"} />
            </span>
          </span>
        </span>
      </button>

      {/* ---- printed on the paper ---- */}
      <div className="tpf-z tpf-brand tpf-ink">
        <div className="tpf-brand-top tpf-p" style={H(0)}>
          <span className="tpf-eye">{name}</span>
          {chat && (
            <A
              href={chat.href ?? mailto}
              className="tpf-bub"
              label={chat.label}
            >
              <span className="tpf-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <b>{chat.label}</b>
            </A>
          )}
        </div>
        <A href={logoHref} className="tpf-word" label={name}>
          <span>{brand}</span>
        </A>
      </div>

      {sideLinks.slice(0, 2).map((l, i) => (
        <A
          key={i}
          href={l.href}
          className={"tpf-z tpf-side tpf-ink tpf-p " + (i ? "r" : "l")}
          label={l.label}
          style={{ ...H(1 + i), left: i ? "71.5%" : "29.5%" }}
        >
          <span>{l.label}</span>
          <Icon name={l.icon} />
        </A>
      ))}

      <div className="tpf-z tpf-foot tpf-ink">
        <span className="tpf-p" style={H(3)}>
          {copyright}
        </span>
        {credit && (
          <span className="tpf-credit tpf-p" style={H(4)}>
            {credit}
          </span>
        )}
        <A href={handle.href} className="tpf-handle tpf-p" style={H(5)}>
          {handle.label}
        </A>
      </div>
    </footer>
  );
}
