/**
 * Nearby Walk. Original design and component by Aakash Mehra, supplied by user.
 * Adapted for Mystic Mountain: original Kausani drawings, optional verified walk
 * times, responsive HTML controls, pausing, and live reduced-motion support.
 * This schematic scene is not a geographic walking route or architectural model.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteMotion } from "@/motion";
import {
  DRAWINGS,
  DRAWING_LAYOUT,
  HotelDrawing,
  Pine,
} from "./nearby-walk-drawings";
import "./nearby-walk-menu.css";

export type NearbyPlace = {
  id: string;
  name: string;
  km: number;
  walkMinutes?: number;
  description?: string;
  href?: string;
};
export type NearbyWalkTheme = "classic" | "night" | "sunset" | "ink";
export type NearbyWalkProps = {
  places?: NearbyPlace[];
  origin?: string;
  formatDistance?: (km: number) => string;
  formatWalk?: (minutes: number) => string;
  ariaLabel?: string;
  hint?: string | null;
  theme?: NearbyWalkTheme;
  defaultTheme?: NearbyWalkTheme;
  onThemeChange?: (theme: NearbyWalkTheme) => void;
  showThemes?: boolean;
  /** Finite entrance only, with no ambient loops or motion control. */
  ambientMotion?: boolean;
  cursorEffect?: boolean;
  onSelect?: (id: string) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const THEMES = {
  classic: {
    label: "Classic",
    dot: "#d9c59a",
    vars: {
      page: "#e9e1d6",
      bg: "#f6f2ea",
      bg2: "#f6f2ea",
      ink: "#2f4f3e",
      wall: "#f6f2ea",
      roof: "#55725c",
      stone: "#d9d7c9",
      hill: "#dce0d1",
      win: "#dce0d1",
      sun: "#d9c59a",
      cloud: "#eeede4",
      muted: "#586354",
      pin: "#2f4f3e",
      pinText: "#faf8f4",
      fg: "#2f4f3e",
      trail: "#2f4f3e60",
      lamp: "#d9c59a48",
    },
  },
  night: {
    label: "Night",
    dot: "#20382e",
    vars: {
      page: "#20382e",
      bg: "#1c3028",
      bg2: "#284638",
      ink: "#dce5d9",
      wall: "#2b4435",
      roof: "#819780",
      stone: "#3f5644",
      hill: "#304e3b",
      win: "#415a46",
      sun: "#edcc83",
      cloud: "#385341",
      muted: "#bcc9b7",
      pin: "#edcc83",
      pinText: "#20382e",
      fg: "#f4efe7",
      trail: "#edcc8380",
      lamp: "#edcc8330",
    },
  },
  sunset: {
    label: "Sunset",
    dot: "linear-gradient(#c99578,#ebc9a4)",
    vars: {
      page: "#e9d0b9",
      bg: "#efcfaa",
      bg2: "#d8ae94",
      ink: "#594333",
      wall: "#f8eddd",
      roof: "#896045",
      stone: "#dfbea0",
      hill: "#cdb498",
      win: "#e6d8bd",
      sun: "#edbc6a",
      cloud: "#f2dcc2",
      muted: "#765741",
      pin: "#6a4732",
      pinText: "#f8eddd",
      fg: "#594333",
      trail: "#a8654380",
      lamp: "#efc07670",
    },
  },
  ink: {
    label: "Ink",
    dot: "radial-gradient(circle,#aa5e3e 0 24%,#353a30 28%)",
    vars: {
      page: "#eee9dd",
      bg: "#f7f3e9",
      bg2: "#f7f3e9",
      ink: "#353a30",
      wall: "#f7f3e9",
      roof: "#747569",
      stone: "#e0ddcf",
      hill: "#d5d5c5",
      win: "#e5e1d5",
      sun: "#cfbd94",
      cloud: "#e9e6da",
      muted: "#696b5d",
      pin: "#a65f42",
      pinText: "#faf8f4",
      fg: "#353a30",
      trail: "#a65f4260",
      lamp: "#ffffff70",
    },
  },
};
const ids = Object.keys(THEMES) as NearbyWalkTheme[];
const themeVars = (theme: NearbyWalkTheme) =>
  Object.fromEntries(
    Object.entries(THEMES[theme].vars).map(([key, value]) => [
      `--nw-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
  ) as CSSProperties;
const ROUTE =
  "M100 262C100 274 112 279 130 279L820 279C904 279 929 222 975 207C1011 196 1045 199 1076 197";

export function NearbyWalk({
  places = [],
  origin = "Your starting point",
  formatDistance = (km) => `${km.toFixed(1)} km`,
  formatWalk = (minutes) => `${minutes} min walk`,
  ariaLabel,
  hint = "Hover a place, or choose one below",
  theme,
  defaultTheme = "classic",
  onThemeChange,
  showThemes = true,
  ambientMotion = true,
  cursorEffect = true,
  onSelect,
  children,
  className,
  style,
}: NearbyWalkProps) {
  const reduced = useSiteMotion();
  const [ownTheme, setOwnTheme] = useState(defaultTheme),
    [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false),
    [armed, setArmed] = useState(false),
    [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(
      () => typeof document === "undefined" || !document.hidden,
    ),
    [compact, setCompact] = useState(
      () =>
        typeof matchMedia !== "undefined" &&
        matchMedia("(max-width:639px)").matches,
    );
  const ref = useRef<HTMLDivElement>(null),
    pinText = useRef<SVGTextElement>(null),
    touch = useRef(false);
  const [pinWidth, setPinWidth] = useState(160);
  const current = theme ?? ownTheme,
    running = shown && visible && !paused && !reduced;
  const list = places.filter((place) => Object.hasOwn(DRAWINGS, place.id));
  const pick = (next: NearbyWalkTheme) => {
    if (theme === undefined) setOwnTheme(next);
    onThemeChange?.(next);
  };
  const activate = (id: string) => {
    setActive(id);
    onSelect?.(id);
  };
  const toggle = (id: string) => {
    if (active === id) setActive(null);
    else activate(id);
  };
  const off = (id: string) =>
    setActive((value) => (value === id ? null : value));
  useEffect(() => {
    const media = matchMedia("(max-width:639px)");
    const resize = () => setCompact(media.matches);
    const visibility = () => setVisible(!document.hidden);
    media.addEventListener("change", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced || !window.IntersectionObserver) {
      setArmed(false);
      setShown(true);
      return;
    }
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);
  useEffect(() => {
    let disposed = false;
    const fit = () => {
      if (!disposed && pinText.current)
        setPinWidth(
          Math.max(
            160,
            Math.ceil(pinText.current.getComputedTextLength()) + 30,
          ),
        );
    };
    fit();
    void document.fonts.ready.then(fit);
    return () => {
      disposed = true;
    };
  }, [origin]);
  useEffect(() => {
    const card = ref.current;
    if (
      !card ||
      !cursorEffect ||
      !running ||
      !matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)")
        .matches
    )
      return;
    const dots = Array.from(card.querySelectorAll<HTMLElement>(".nw-dot"));
    let bounds: DOMRect | null = null,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      raf = 0,
      inside = false;
    const history: number[][] = [];
    const tick = () => {
      const dx = tx - x,
        dy = ty - y;
      x += dx * 0.2;
      y += dy * 0.2;
      history.unshift([x, y]);
      history.length = Math.min(history.length, dots.length * 2);
      const last = history[history.length - 1],
        spread = Math.hypot(x - last[0], y - last[1]);
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.setProperty("--nw-trail-o", String(Math.min(1, spread / 50)));
      dots.forEach((dot, k) => {
        const point = history[Math.min(k * 2, history.length - 1)];
        dot.style.transform = `translate3d(${point[0]}px,${point[1]}px,0) scale(${1 - (k / dots.length) * 0.6})`;
      });
      raf =
        Math.abs(dx) + Math.abs(dy) < 0.3 && spread < 0.5
          ? 0
          : requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      bounds ??= card.getBoundingClientRect();
      tx = event.clientX - bounds.left;
      ty = event.clientY - bounds.top;
      if (!inside) {
        inside = true;
        x = tx;
        y = ty;
        history.length = 0;
        card.dataset.lamp = "";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      inside = false;
      delete card.dataset.lamp;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const invalidate = () => {
      bounds = null;
    };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      leave();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, [cursorEffect, running]);
  return (
    <section
      data-nearby-walk=""
      data-armed={armed || undefined}
      data-shown={shown || undefined}
      data-running={running || undefined}
      data-ambient={ambientMotion || undefined}
      data-paused={paused || undefined}
      data-reduced={reduced || undefined}
      data-theme={current}
      className={cn(
        "nearby-walk tw:flex tw:w-full tw:flex-col tw:items-center",
        className,
      )}
      style={{ ...themeVars(current), ...style }}
    >
      {hint && <p className="nw-hint">{hint}</p>}
      <div
        ref={ref}
        className="nw-card tw:relative tw:isolate tw:w-full tw:overflow-hidden"
      >
        {cursorEffect && <div className="nw-fx nw-lamp" aria-hidden="true" />}
        <svg
          className="nw-scene"
          viewBox="0 0 1200 315"
          role={compact ? "img" : "group"}
          aria-label={
            ariaLabel ??
            `${origin} and nearby: ${list.map((p) => p.name).join(", ")}`
          }
        >
          <g aria-hidden="true">
            <path
              className="nw-backdrop"
              d="M455 262 564 168 594 197 680 122 719 168 775 111 855 190 915 162 1010 262Z"
            />
            <path
              className="nw-thin nw-snow"
              d="m637 167 43-45 39 46-26-12-15 7-13-13-13 20M746 146l29-35 36 45-28-11-12 8-12-8"
            />
            <path
              className="nw-cloud nw-cloud-a"
              d="M220 50a16 16 0 0 1 29-7a13 13 0 0 1 23 9h-52z"
            />
            <path
              className="nw-cloud nw-cloud-b"
              d="M794 40a14 14 0 0 1 26-6a11 11 0 0 1 19 8h-45z"
            />
            <Pine x={215} y={262} size={0.72} />
            <Pine x={500} y={262} size={0.9} />
            <Pine x={811} y={262} size={1.15} />
          </g>
          {list.map((place) => {
            const { i, hit, label } = DRAWING_LAYOUT[place.id],
              Draw = DRAWINGS[place.id as keyof typeof DRAWINGS];
            const on = active === place.id;
            const walk =
                place.walkMinutes === undefined
                  ? "Select to explore"
                  : formatWalk(place.walkMinutes),
              distance = formatDistance(place.km);
            return (
              <g
                key={place.id}
                className="nw-spot"
                tabIndex={compact ? -1 : 0}
                role={compact ? undefined : "button"}
                aria-label={`${place.name}, ${distance}`}
                aria-pressed={compact ? undefined : on}
                data-active={on || undefined}
                onPointerDown={(event) => {
                  touch.current = event.pointerType !== "mouse";
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") activate(place.id);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") off(place.id);
                }}
                onClick={() => {
                  if (touch.current) toggle(place.id);
                }}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible"))
                    activate(place.id);
                }}
                onBlur={() => off(place.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle(place.id);
                  }
                }}
              >
                <rect
                  className="nw-hit"
                  x={hit[0]}
                  y={hit[1]}
                  width={hit[2]}
                  height={hit[3]}
                />
                <g className="nw-bob" aria-hidden="true">
                  <g
                    className="nw-rise"
                    style={{ "--d": `${i * 140}ms` } as CSSProperties}
                  >
                    <Draw />
                  </g>
                </g>
                <g
                  className="nw-lbl"
                  aria-hidden="true"
                  style={{ "--d": `${i * 140}ms` } as CSSProperties}
                >
                  <text
                    x={label[0]}
                    y={label[1]}
                    textAnchor="middle"
                    className="nw-name"
                  >
                    {place.id === "museum" ? "Pant Museum" : place.name}
                  </text>
                  <text
                    x={label[0]}
                    y={label[1] + 20}
                    textAnchor="middle"
                    className="nw-dist nw-km"
                  >
                    {distance}
                  </text>
                  <text
                    x={label[0]}
                    y={label[1] + 20}
                    textAnchor="middle"
                    className="nw-dist nw-walk"
                  >
                    {walk}
                  </text>
                </g>
              </g>
            );
          })}
          <g
            className="nw-rise"
            style={{ "--d": "0ms" } as CSSProperties}
            aria-hidden="true"
          >
            <HotelDrawing />
            <g className="nw-pin">
              <rect
                x={100 - pinWidth / 2}
                y="63"
                width={pinWidth}
                height="29"
                rx="14.5"
              />
              <path d="m94 92 6 8 6-8Z" />
              <text ref={pinText} x="100" y="82" textAnchor="middle">
                {origin}
              </text>
            </g>
          </g>
          <path
            className="nw-ground"
            pathLength="1"
            d="M0 262H1200"
            aria-hidden="true"
          />
          <path className="nw-route" d={ROUTE} aria-hidden="true" />
          <circle
            className="nw-walker"
            r="4"
            style={{ offsetPath: `path("${ROUTE}")` }}
            aria-hidden="true"
          />
          <circle
            className="nw-walker nw-walker-two"
            r="4"
            style={{ offsetPath: `path("${ROUTE}")` }}
            aria-hidden="true"
          />
        </svg>
        {cursorEffect && (
          <div className="nw-fx nw-trail" aria-hidden="true">
            {Array.from({ length: 10 }, (_, k) => (
              <span
                key={k}
                className="nw-dot"
                style={{ opacity: `calc(var(--nw-trail-o,0) * ${1 - k / 10})` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="nw-place-list" aria-label="Nearby places">
        {list.map((place, index) => (
          <button
            key={place.id}
            type="button"
            aria-pressed={active === place.id}
            onClick={() => activate(place.id)}
            onFocus={() => activate(place.id)}
          >
            <span className="nw-place-index">0{index + 1}</span>
            <span>
              {place.name}
              <small>{formatDistance(place.km)}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {(showThemes || (ambientMotion && !reduced)) && (
        <div className="nw-controls">
          {showThemes && (
            <div
              className="nw-themes tw:flex tw:justify-center"
              role="group"
              aria-label="Illustration colour theme"
            >
              {ids.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-label={`Theme: ${THEMES[id].label}`}
                  aria-pressed={current === id}
                  title={THEMES[id].label}
                  onClick={() => pick(id)}
                >
                  <span style={{ background: THEMES[id].dot }} />
                </button>
              ))}
              <span className="nw-theme-name" aria-hidden="true">
                {THEMES[current].label}
              </span>
            </div>
          )}
          {ambientMotion && !reduced && (
            <button
              type="button"
              className="nw-motion-toggle"
              aria-label={paused ? "Play illustration" : "Pause illustration"}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
              <span>{paused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
export default NearbyWalk;
