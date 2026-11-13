/**
 * Adapted from the TestimonialGlobe component supplied by the user (13 Nov 2026).
 * Retains its COBE renderer, Cartesian HTML-pin projection, on-demand render
 * loop, drag friction, quote navigation and WebGL fallback pattern.
 * Adaptation: verified HOTEL pin plus explicitly illustrative guest-name pins;
 * CC0 illustrated avatars with an explicit disclosure; no claimed guest
 * hometowns/portraits, invented country counters or autoplay.
 * COBE © Shu Ding, MIT; notice retained in node_modules/cobe/LICENSE.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, Quote } from "lucide-react";
import { AnimatePresence, useIsPresent } from "motion/react";
import * as m from "motion/react-m";
import { useSiteMotion } from "@/motion";
import "./testimonial-globe.css";

export interface GlobeTestimonial {
  id: string;
  quote: string;
  name: string;
  rating: 5;
  source: "Google" | "Tripadvisor";
  href: string;
  /** Decorative illustration only; never represented as a verified guest photo. */
  avatar?: string;
}
export interface TestimonialGlobeProps {
  items: GlobeTestimonial[];
  heading?: ReactNode;
  action?: ReactNode;
}
type Vec3 = [number, number, number];
const HOTEL: [number, number] = [29.8564845, 79.6040235];
const THETA = 0.3;
const HOME_PHI = (3 * Math.PI) / 2 - (HOTEL[1] * Math.PI) / 180;
// Original supplied projection, matching COBE's GPU rotation.
function toCartesian(lat: number, lng: number): Vec3 {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180 - Math.PI;
  return [
    -Math.cos(la) * Math.cos(lo),
    Math.sin(la),
    Math.cos(la) * Math.sin(lo),
  ];
}
function project([x, y, z]: Vec3, phi: number) {
  const cp = Math.cos(phi),
    sp = Math.sin(phi);
  const ct = Math.cos(THETA),
    st = Math.sin(THETA);
  return {
    x: ((cp * x + sp * z) * 0.84 + 1) / 2,
    y: (1 - (sp * st * x + ct * y - cp * st * z) * 0.84) / 2,
    depth: -sp * ct * x + st * y + cp * ct * z,
  };
}
const hotelPoint = toCartesian(...HOTEL);

/** Stable randomised artwork positions. These are not reviewer location data. */
function illustratedPlacements(items: GlobeTestimonial[]) {
  const regions = [
    [48, 4],
    [-8, 133],
    [-28, 16],
    [34, -100],
  ];
  return items.map((item, index) => {
    let seed = 2166136261;
    for (const char of item.id)
      seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
    const [lat, lng] = regions[index % regions.length];
    const location: [number, number] = [
      lat + ((seed >>> 8) % 900) / 100 - 4.5,
      lng + ((seed >>> 0) % 1200) / 100 - 6,
    ];
    return { location, point: toCartesian(...location) };
  });
}

function ReviewCard({
  item,
  reduced,
}: {
  item: GlobeTestimonial;
  reduced: boolean;
}) {
  const present = useIsPresent();
  return (
    <m.figure
      aria-hidden={!present || undefined}
      inert={!present}
      className="tg-quote"
      key={item.id}
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: reduced ? 0 : 12,
        scale: reduced ? 1 : 0.98,
      }}
      transition={{
        duration: reduced ? 0 : 0.22,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <div className="tg-quote-top">
        <Quote size={24} className="tg-quote-mark" aria-hidden="true" />
        <span className="tg-stars" role="img" aria-label="Rated 5 out of 5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
          ))}
        </span>
      </div>
      <blockquote>
        <p>“{item.quote}”</p>
      </blockquote>
      <figcaption>
        <span
          className="tg-review-avatar"
          title="Illustrated avatar, not the reviewer’s photograph"
          aria-hidden="true"
        >
          <img src={item.avatar} alt="" width={44} height={44} loading="lazy" />
        </span>
        <span>
          <strong>{item.name}</strong>
          <small>{item.source} · review excerpt</small>
        </span>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Read ${item.name}'s review on ${item.source}`}
        >
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </figcaption>
    </m.figure>
  );
}

function HotelGlobe({
  items,
  active,
  onSelect,
  leader,
  quoteAnchor,
}: {
  items: GlobeTestimonial[];
  active: number;
  onSelect: (index: number) => void;
  leader: RefObject<SVGSVGElement | null>;
  quoteAnchor: RefObject<HTMLDivElement | null>;
}) {
  const reduced = useSiteMotion();
  const placements = useMemo(() => illustratedPlacements(items), [items]);
  const guestPins = useRef<(HTMLButtonElement | null)[]>([]);
  const host = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLSpanElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [glState, setGlState] = useState("pending");
  const [dragging, setDragging] = useState(false);
  const [version, setVersion] = useState(0);
  const live = useRef({
    phi: HOME_PHI,
    velocity: 0,
    dragging: false,
    pointer: -1,
    x: 0,
    movedAt: 0,
    turn: null as { from: number; to: number; start: number | null } | null,
  });
  const kick = useRef(() => {});
  const measureLabels = useRef(() => {});
  useEffect(() => {
    measureLabels.current();
  }, [glState]);
  useEffect(() => {
    void document.fonts.ready.then(() => measureLabels.current());
  }, []);
  const previousActive = useRef(active);
  const activeIndex = useRef(active);
  activeIndex.current = active;
  const turnTo = useCallback(
    (longitude: number) => {
      const state = live.current;
      const angle = (3 * Math.PI) / 2 - (longitude * Math.PI) / 180;
      const target =
        angle + Math.PI * 2 * Math.round((state.phi - angle) / (Math.PI * 2));
      state.velocity = 0;
      if (reduced) {
        state.phi = target;
        state.turn = null;
      } else state.turn = { from: state.phi, to: target, start: null };
      kick.current();
    },
    [reduced],
  );
  useEffect(() => {
    if (previousActive.current !== active && placements[active])
      turnTo(placements[active].location[1]);
    previousActive.current = active;
    kick.current();
  }, [active, placements, turnTo]);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!visible || !el) return;
    let disposed = false;
    let destroy = () => {};
    // Import and create WebGL only near the section. Static SVG remains available.
    void import("cobe")
      .then(({ default: createGlobe }) => {
        if (disposed) return;
        const canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        canvas.style.cssText = "width:100%;height:100%;display:block";
        el.appendChild(canvas);
        const state = live.current;
        let globe: ReturnType<typeof createGlobe> | undefined;
        let frameId = 0;
        let last = 0;
        let width = el.clientWidth;
        let connector = { x: 0, y: 0, endX: 0, endY: 0, enabled: false };
        let hotelHalfWidth = (pin.current?.offsetWidth ?? 150) / 2;
        let labelHalves = guestPins.current.map(
          (node) =>
            ((node?.querySelector(".tg-pin-name") as HTMLElement | null)
              ?.offsetWidth ?? 140) / 2,
        );
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        try {
          globe = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width,
            height: width,
            phi: state.phi,
            theta: THETA,
            dark: 0,
            diffuse: 1.25,
            mapSamples: 14000,
            mapBrightness: 2.8,
            baseColor: [0.75, 0.79, 0.69],
            markerColor: [0.78, 0.42, 0.24],
            glowColor: [0.91, 0.88, 0.84],
            markers: [
              { location: HOTEL, size: 0.065, color: [0.78, 0.42, 0.24] },
              ...placements.map(({ location }) => ({
                location,
                size: 0.035,
                color: [0.18, 0.31, 0.24] as Vec3,
              })),
            ],
          });
          const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
          setGlState(gl ? "ready" : "unavailable");
        } catch {
          setGlState("unavailable");
        }

        function frame(now: number) {
          frameId = 0;
          if (disposed || document.hidden) return;
          const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
          last = now;
          if (state.turn) {
            state.turn.start ??= now;
            const t = reduced ? 1 : Math.min(1, (now - state.turn.start) / 850);
            state.phi =
              state.turn.from +
              (state.turn.to - state.turn.from) * (1 - Math.pow(1 - t, 3));
            if (t === 1) state.turn = null;
          } else if (!state.dragging && !reduced) {
            state.phi += state.velocity * dt;
            state.velocity *= Math.pow(0.92, dt);
          }
          if (Math.abs(state.velocity) < 0.0001 || reduced) state.velocity = 0;
          globe?.update({ phi: state.phi, width, height: width });
          const point = project(hotelPoint, state.phi);
          const hotelHalf = hotelHalfWidth;
          const hotelX = Math.max(
            hotelHalf + 4,
            Math.min(width - hotelHalf - 4, point.x * width),
          );
          const hotelY = point.y * width;
          const hotelFront = point.depth > 0.08;
          if (pin.current) {
            pin.current.style.transform = `translate(${hotelX}px,${hotelY}px) translate(-50%,-50%)`;
            pin.current.style.opacity = point.depth > 0.08 ? "1" : "0";
          }
          placements.forEach(({ point }, index) => {
            const el = guestPins.current[index];
            if (!el) return;
            const projected = project(point, state.phi);
            const front = projected.depth > 0.12;
            const half = 24;
            const nameHalf = labelHalves[index] ?? 70;
            const x = Math.max(
              half + 4,
              Math.min(width - half - 4, projected.x * width),
            );
            const y = projected.y * width;
            const nameX = Math.max(
              nameHalf + 4,
              Math.min(width - nameHalf - 4, x),
            );
            const collides =
              hotelFront &&
              Math.abs(nameX - hotelX) < nameHalf + hotelHalf + 10 &&
              Math.abs(y + 48 - hotelY) < 50;
            el.style.setProperty(
              "--pin-label-top",
              collides ? (y < hotelY ? "-46px" : "76px") : "58px",
            );
            el.style.setProperty("--pin-label-x", `${nameX - x}px`);
            el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
            el.style.opacity = front ? "1" : "0";
            el.style.setProperty(
              "--pin-scale",
              String(
                0.72 + 0.28 * Math.min(1, Math.max(0, projected.depth) / 0.65),
              ),
            );
            el.style.visibility = front ? "visible" : "hidden";
            el.tabIndex = front ? 0 : -1;
          });
          const selected = placements[activeIndex.current];
          const svg = leader.current;
          if (svg && selected) {
            const p = project(selected.point, state.phi);
            svg.style.opacity = connector.enabled && p.depth > 0.12 ? "1" : "0";
            const x = connector.x + p.x * width + 24,
              y = connector.y + p.y * width;
            svg.querySelector("line")?.setAttribute("x1", String(x));
            svg.querySelector("line")?.setAttribute("y1", String(y));
            svg
              .querySelector("line")
              ?.setAttribute("x2", String(connector.endX));
            svg
              .querySelector("line")
              ?.setAttribute("y2", String(connector.endY));
            const circles = svg.querySelectorAll("circle");
            circles[0]?.setAttribute("cx", String(x));
            circles[0]?.setAttribute("cy", String(y));
            circles[1]?.setAttribute("cx", String(connector.endX));
            circles[1]?.setAttribute("cy", String(connector.endY));
          }
          if (state.turn || (!state.dragging && state.velocity))
            frameId = requestAnimationFrame(frame);
          else last = 0;
        }
        kick.current = () => {
          if (!frameId && !disposed && !document.hidden)
            frameId = requestAnimationFrame(frame);
        };
        const measure = () => {
          width = el.clientWidth;
          hotelHalfWidth = (pin.current?.offsetWidth ?? 150) / 2;
          labelHalves = guestPins.current.map(
            (node) =>
              ((node?.querySelector(".tg-pin-name") as HTMLElement | null)
                ?.offsetWidth ?? 140) / 2,
          );
          const svg = leader.current,
            target = quoteAnchor.current;
          if (svg?.parentElement && target && scene.current) {
            const outer = svg.parentElement.getBoundingClientRect(),
              globeBox = scene.current.getBoundingClientRect(),
              card = target.getBoundingClientRect();
            svg.setAttribute("viewBox", `0 0 ${outer.width} ${outer.height}`);
            connector = {
              x: globeBox.left - outer.left,
              y: globeBox.top - outer.top,
              endX: card.left - outer.left + 1,
              endY: card.top - outer.top + 45,
              enabled: outer.width >= 700,
            };
          }
          kick.current();
        };
        measureLabels.current = measure;
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        if (quoteAnchor.current) observer.observe(quoteAnchor.current);
        const visibility = () => {
          if (document.hidden) {
            cancelAnimationFrame(frameId);
            frameId = 0;
            state.velocity = 0;
          } else kick.current();
        };
        const lost = (e: Event) => {
          e.preventDefault();
          setGlState("unavailable");
        };
        const restored = () => setVersion((value) => value + 1);
        canvas.addEventListener("webglcontextlost", lost);
        canvas.addEventListener("webglcontextrestored", restored);
        document.addEventListener("visibilitychange", visibility);
        // COBE's land texture arrives asynchronously; a static globe needs redraws.
        const retries = [150, 600, 1500].map((ms) =>
          window.setTimeout(() => kick.current(), ms),
        );
        kick.current();
        destroy = () => {
          cancelAnimationFrame(frameId);
          retries.forEach(clearTimeout);
          observer.disconnect();
          document.removeEventListener("visibilitychange", visibility);
          canvas.removeEventListener("webglcontextlost", lost);
          canvas.removeEventListener("webglcontextrestored", restored);
          kick.current = () => {};
          measureLabels.current = () => {};
          state.velocity = 0;
          state.dragging = false;
          if (leader.current) leader.current.style.opacity = "0";
          globe?.destroy();
          el.replaceChildren();
        };
      })
      .catch(() => {
        if (!disposed) setGlState("unavailable");
      });
    return () => {
      disposed = true;
      destroy();
    };
  }, [visible, reduced, version, placements, leader, quoteAnchor]);

  const home = () => {
    turnTo(HOTEL[1]);
  };
  return (
    <div className="tg-geography">
      <div
        ref={scene}
        className="tg-globe"
        data-gl={glState}
        data-dragging={dragging || undefined}
        onPointerDown={(e) => {
          if (
            glState !== "ready" ||
            !e.isPrimary ||
            (e.pointerType === "mouse" && e.button !== 0)
          )
            return;
          live.current.dragging = true;
          live.current.pointer = e.pointerId;
          live.current.x = e.clientX;
          live.current.velocity = 0;
          live.current.turn = null;
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const s = live.current;
          if (!s.dragging || s.pointer !== e.pointerId) return;
          const delta =
            ((e.clientX - s.x) / Math.max(e.currentTarget.clientWidth, 1)) *
            Math.PI;
          s.x = e.clientX;
          s.phi += delta;
          s.movedAt = e.timeStamp;
          s.velocity = Math.max(-0.04, Math.min(0.04, delta * 0.35));
          kick.current();
        }}
        onPointerUp={(e) => {
          if (live.current.pointer !== e.pointerId) return;
          if (e.timeStamp - live.current.movedAt > 100)
            live.current.velocity = 0;
          live.current.dragging = false;
          setDragging(false);
          kick.current();
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          live.current.dragging = false;
          live.current.velocity = 0;
          setDragging(false);
        }}
        onLostPointerCapture={() => {
          live.current.dragging = false;
          setDragging(false);
        }}
      >
        <svg
          className="tg-globe-fallback"
          viewBox="0 0 440 440"
          aria-hidden="true"
        >
          <circle cx="220" cy="220" r="175" fill="#dadccd" stroke="#84937c" />
          <g fill="none" stroke="#9ba58e" strokeWidth="1">
            <ellipse cx="220" cy="220" rx="80" ry="175" />
            <ellipse cx="220" cy="220" rx="140" ry="175" />
            <ellipse cx="220" cy="220" rx="175" ry="70" />
            <ellipse cx="220" cy="220" rx="175" ry="130" />
            <path d="M45 220H395M220 45V395" />
          </g>
          <circle cx="235" cy="156" r="5" fill="#c66a3c" />
          <text x="250" y="153" fill="#2f4f3e" fontSize="14">
            Kausani
          </text>
        </svg>
        <div className="tg-canvas" ref={host} aria-hidden="true" />
        <span className="tg-hotel-pin" ref={pin} aria-hidden="true">
          <i />
          Mystic Mountain<small>Kausani, India</small>
        </span>
        {items.map((guest, index) => (
          <button
            key={guest.id}
            ref={(el) => {
              guestPins.current[index] = el;
            }}
            className="tg-guest-pin"
            type="button"
            data-active={index === active || undefined}
            aria-label={`Read review by ${guest.name}; illustrative avatar and globe position`}
            aria-pressed={index === active}
            title={`${guest.name} — illustrated avatar and position, not a verified portrait or hometown`}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerEnter={(e) => {
              if (e.pointerType === "touch" || live.current.dragging) return;
              // Preview the source component's hovered review without moving
              // the sphere underneath the pointer. A click still centres it.
              previousActive.current = index;
              activeIndex.current = index;
              flushSync(() => onSelect(index));
              kick.current();
            }}
            onFocus={(e) => {
              if (!e.currentTarget.matches(":focus-visible")) return;
              if (
                project(placements[index].point, live.current.phi).depth >= 0.55
              )
                previousActive.current = index;
              onSelect(index);
            }}
            onKeyDown={(e) => {
              if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
                return;
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? items.length - 1
                    : (index +
                        (e.key === "ArrowRight" ? 1 : -1) +
                        items.length) %
                      items.length;
              quoteAnchor.current?.parentElement?.focus({
                preventScroll: true,
              });
              onSelect(next);
            }}
            onClick={() => {
              turnTo(placements[index].location[1]);
              onSelect(index);
            }}
          >
            <span className="tg-pin-face" aria-hidden="true">
              <img
                src={guest.avatar}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                draggable={false}
              />
            </span>
            <span className="tg-pin-name">{guest.name}</span>
          </button>
        ))}
      </div>
      <div className="tg-place-caption">
        <span>Avatars and guest pin positions are illustrative.</span>
        <button
          type="button"
          onClick={home}
          aria-label="Centre the globe on Kausani"
        >
          <i className="tg-hotel-key" aria-hidden="true" /> Mystic Mountain{" "}
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function TestimonialGlobe({
  items,
  heading = (
    <>
      In our guests’
      <br />
      <em>own words.</em>
    </>
  ),
  action,
}: TestimonialGlobeProps) {
  const reduced = useSiteMotion();
  const [index, setIndex] = useState(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const leader = useRef<SVGSVGElement>(null);
  const quoteAnchor = useRef<HTMLDivElement>(null);
  const item = items[index % items.length];
  if (!item) return null;
  const select = (next: number) =>
    setIndex((next + items.length) % items.length);
  return (
    <section
      className="testimonial-globe"
      id="guest-experiences"
      aria-labelledby="guest-experiences-heading"
    >
      <div className="tg-stage">
        <header className="tg-introduction">
          <p className="jh-eyebrow">GUEST EXPERIENCES</p>
          <h2 id="guest-experiences-heading">{heading}</h2>
          <p>A few words from guests who have stayed with us.</p>
          <div className="tg-review-summary">
            <span>{items.length} selected reviews</span>
            {action}
          </div>
        </header>
        <HotelGlobe
          items={items}
          active={index}
          onSelect={select}
          leader={leader}
          quoteAnchor={quoteAnchor}
        />
        <div
          className="tg-review-region"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected five-star guest review excerpts"
          onKeyDown={(e) => {
            if (
              ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key) &&
              e.target === e.currentTarget
            ) {
              e.preventDefault();
              select(
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? items.length - 1
                    : index + (e.key === "ArrowRight" ? 1 : -1),
              );
            }
          }}
          tabIndex={0}
          onTouchStart={(e) => {
            swipe.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            const start = swipe.current;
            swipe.current = null;
            if (!start) return;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
              select(index + (dx < 0 ? 1 : -1));
          }}
        >
          <div
            ref={quoteAnchor}
            className="tg-card-stack"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence initial={false}>
              <ReviewCard key={item.id} item={item} reduced={reduced} />
            </AnimatePresence>
          </div>
          <div className="tg-navigation">
            <span
              className="tg-counter"
              aria-label={`Review ${index + 1} of ${items.length}`}
            >
              {String(index + 1).padStart(2, "0")}
              <i />
              {String(items.length).padStart(2, "0")}
            </span>
            <div className="tg-arrows">
              <button
                type="button"
                onClick={() => select(index - 1)}
                aria-label="Previous review"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => select(index + 1)}
                aria-label="Next review"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <p className="tg-review-note">
            Selected five-star excerpts. Read the full reviews for each guest’s
            complete experience.
          </p>
        </div>
        <svg ref={leader} className="tg-leader" aria-hidden="true">
          <line />
          <circle r="2.5" />
          <circle r="3" />
        </svg>
      </div>
    </section>
  );
}
export default TestimonialGlobe;
