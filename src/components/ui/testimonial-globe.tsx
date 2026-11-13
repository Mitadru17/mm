/**
 * Adapted from the TestimonialGlobe component supplied by the user (13 Nov 2026).
 * Retains its COBE renderer, Cartesian HTML-pin projection, on-demand render
 * loop, drag friction, quote navigation and WebGL fallback pattern.
 * Adaptation: verified HOTEL pin plus explicitly illustrative guest-name pins;
 * no claimed guest hometowns/portraits, country counters or autoplay.
 * COBE © Shu Ding, MIT; notice retained in node_modules/cobe/LICENSE.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { AnimatePresence } from "motion/react";
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

function HotelGlobe({
  items,
  active,
  onSelect,
}: {
  items: GlobeTestimonial[];
  active: number;
  onSelect: (index: number) => void;
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
        let hotelHalfWidth = (pin.current?.offsetWidth ?? 150) / 2;
        let labelHalves = guestPins.current.map(
          (node) => (node?.offsetWidth ?? 140) / 2,
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
            diffuse: 1.4,
            mapSamples: 14000,
            mapBrightness: 3.5,
            baseColor: [0.65, 0.69, 0.6],
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
            const half = labelHalves[index] ?? 70;
            const x = Math.max(
              half + 4,
              Math.min(width - half - 4, projected.x * width),
            );
            let y = projected.y * width;
            // Label callouts may move a little so names never cover the hotel.
            if (
              hotelFront &&
              Math.abs(x - hotelX) < half + hotelHalf + 8 &&
              Math.abs(y - hotelY) < 54
            )
              y = hotelY + (y >= hotelY ? 62 : -62);
            el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
            el.style.opacity = front ? "1" : "0";
            el.style.visibility = front ? "visible" : "hidden";
            el.tabIndex = front ? 0 : -1;
          });
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
            (node) => (node?.offsetWidth ?? 140) / 2,
          );
          kick.current();
        };
        measureLabels.current = measure;
        const observer = new ResizeObserver(measure);
        observer.observe(el);
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
  }, [visible, reduced, version, placements]);

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
            aria-label={`Read review by ${guest.name}; illustrative globe position`}
            aria-pressed={index === active}
            title={`${guest.name} — illustrative position, not a verified hometown`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              turnTo(placements[index].location[1]);
              onSelect(index);
            }}
          >
            <i aria-hidden="true" />
            <span>{guest.name}</span>
          </button>
        ))}
      </div>
      <div className="tg-place-caption">
        <span>Guest pin positions are illustrative.</span>
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
      <m.div
        className="tg-introduction"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="jh-eyebrow">GUEST EXPERIENCES</p>
        <h2 id="guest-experiences-heading">{heading}</h2>
        <p>A few words from guests who have stayed with us.</p>
        {action}
      </m.div>
      <div className="tg-stage">
        <HotelGlobe items={items} active={index} onSelect={select} />
        <div
          className="tg-review-region"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected five-star guest review excerpts"
          onKeyDown={(e) => {
            if (
              (e.key === "ArrowRight" || e.key === "ArrowLeft") &&
              e.target === e.currentTarget
            ) {
              e.preventDefault();
              select(index + (e.key === "ArrowRight" ? 1 : -1));
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
          <div className="tg-card-stack" aria-live="polite" aria-atomic="true">
            <AnimatePresence initial={false} mode="wait">
              <m.figure
                className="tg-quote"
                key={item.id}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <div className="tg-quote-top">
                  <span
                    className="tg-stars"
                    role="img"
                    aria-label="Rated 5 out of 5"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span>{item.source} · excerpt</span>
                </div>
                <blockquote>
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption>
                  <span className="tg-initials" aria-hidden="true">
                    {item.name
                      .split(/\s+/)
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>Stayed in Kausani</small>
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
            <div className="tg-dots" aria-label="Choose a review">
              {items.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show review by ${review.name}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span />
                </button>
              ))}
            </div>
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
      </div>
    </section>
  );
}
export default TestimonialGlobe;
