/** Arc Card Carousel, adapted from the user's supplied component (13 Nov 2026).
 * Retains offsetOf/ringSize/wrapIndex and the off-left hub/rim placement model.
 * Hotel adaptation: larger photographs, click/drag/keyboard selection, shared
 * GSAP tween ownership and no looping page-scroll trap in this embedded view.
 */
"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowDown, ArrowUp, Check, MoveVertical } from "lucide-react";
import { gsap } from "@/bend/animation";
import { useSiteMotion } from "@/motion";
import GlassSurface from "@/components/GlassSurface";
import "./arc-card-carousel.css";

export type ArcCardItem = {
  src: string;
  srcSet?: string;
  alt?: string;
  title?: string;
  meta?: string;
};
export type ArcCardCarouselProps = {
  items: ArcCardItem[];
  value?: number;
  onIndexChange?: (index: number) => void;
  height?: string;
  step?: number;
  radius?: number;
  caption?: boolean;
  /** Wrap photograph selection; never loops or captures the page scroll. */
  loop?: boolean;
  ariaLabel?: string;
  className?: string;
};
export function offsetOf(i: number, pos: number, n: number) {
  if (n <= 0) return 0;
  const d = (((i - pos) % n) + n) % n;
  return d >= n / 2 ? d - n : d;
}
export function ringSize(len: number) {
  return len > 0 ? Math.ceil(10 / len) * len : 0;
}
export function wrapIndex(i: number, n: number) {
  return n > 0 ? ((Math.round(i) % n) + n) % n : 0;
}
// Source proportions adapted to keep genuine hotel images large in a half-page.
export function geometry(w: number, h: number) {
  const narrow = w < 520;
  const cardW = Math.min(w * 1.04, h * 0.9);
  const radius = Math.max(h * 0.92, w * 0.95);
  const centre = w * (narrow ? 0.43 : 0.44);
  return {
    cardW,
    cardH: cardW / 1.65,
    radius,
    hubX: centre - radius,
    hubY: h * 0.5,
  };
}
export function place(
  d: number,
  stepDeg: number,
  g: ReturnType<typeof geometry>,
) {
  const deg = -d * stepDeg,
    a = (deg * Math.PI) / 180;
  return {
    x: g.hubX + g.radius * Math.cos(a),
    y: g.hubY + g.radius * Math.sin(a),
    rot: deg,
  };
}

export default function ArcCardCarousel({
  items,
  value,
  onIndexChange,
  height,
  step = 18,
  radius = 10,
  caption = true,
  loop = true,
  ariaLabel = "Choose a room",
  className = "",
}: ArcCardCarouselProps) {
  const reduced = useSiteMotion(),
    count = items.length,
    n = ringSize(count);
  const cards = useMemo(
    () => Array.from({ length: n }, (_, i) => items[i % count]),
    [items, n, count],
  );
  const [ownIndex, setOwnIndex] = useState(0),
    [moving, setMoving] = useState(false),
    [near, setNear] = useState(false),
    [ready, setReady] = useState(false);
  const index = value ?? ownIndex;
  const root = useRef<HTMLDivElement>(null),
    stage = useRef<HTMLDivElement>(null),
    cap = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]),
    pos = useRef({ v: index }),
    geo = useRef(geometry(1, 1));
  const tween = useRef<gsap.core.Tween | null>(null),
    inView = useRef(false),
    disposed = useRef(false);
  const previousValue = useRef(index),
    callback = useRef(onIndexChange),
    blockClick = useRef(0);
  callback.current = onIndexChange;
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    start: number;
    touch: boolean;
    moved: boolean;
  } | null>(null);

  const render = useCallback(() => {
    const g = geo.current,
      p = pos.current.v;
    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const d = offsetOf(i, p, n),
        c = place(d, step, g),
        shown = Math.abs(d) < 2.65,
        front = Math.abs(d) < 0.12;
      el.style.transform = `translate3d(${(c.x - g.cardW / 2).toFixed(2)}px,${(c.y - g.cardH / 2).toFixed(2)}px,0) rotate(${c.rot.toFixed(3)}deg)`;
      el.style.zIndex = String(Math.round(1000 - Math.abs(d) * 30));
      el.style.visibility = shown ? "visible" : "hidden";
      el.style.opacity = shown ? (front ? "1" : ".92") : "0";
      el.tabIndex = front ? 0 : -1;
      el.setAttribute("aria-hidden", front ? "false" : "true");
      el.dataset.front = front ? "true" : "false";
    }
  }, [n, step]);
  const nearest = useCallback(
    (i: number) =>
      loop
        ? i + count * Math.round((pos.current.v - i) / count)
        : Math.max(0, Math.min(count - 1, i)),
    [count, loop],
  );
  const animate = useCallback(
    (target: number) => {
      tween.current?.kill();
      if (reduced || !inView.current || document.hidden) {
        pos.current.v = target;
        render();
        setMoving(false);
        return;
      }
      if (Math.abs(pos.current.v - target) < 0.001) {
        render();
        setMoving(false);
        return;
      }
      setMoving(true);
      tween.current = gsap.to(pos.current, {
        v: target,
        duration: 0.85,
        ease: "power3.inOut",
        onUpdate: render,
        onComplete: () => {
          if (!disposed.current) setMoving(false);
        },
      });
    },
    [reduced, render],
  );
  const select = useCallback(
    (i: number, position?: number) => {
      if (!count) return;
      const next = loop
        ? wrapIndex(i, count)
        : Math.max(0, Math.min(count - 1, i));
      previousValue.current = next;
      setOwnIndex(next);
      callback.current?.(next);
      animate(position ?? nearest(next));
    },
    [count, loop, animate, nearest],
  );
  useEffect(() => {
    if (index !== previousValue.current) {
      previousValue.current = index;
      animate(nearest(index));
    }
  }, [index, animate, nearest]);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const resize = () => {
      const g = geometry(el.clientWidth, el.clientHeight);
      geo.current = g;
      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.width = `${g.cardW}px`;
          card.style.height = `${g.cardH}px`;
          card.style.borderRadius = `${radius}px`;
        }
      });
      if (cap.current) {
        const left = Math.max(20, g.hubX + g.radius - g.cardW / 2 + 14);
        const right = Math.min(
          el.clientWidth - 20,
          g.hubX + g.radius + g.cardW / 2 - 14,
        );
        cap.current.style.left = `${left}px`;
        cap.current.style.top = `${g.hubY + g.cardH / 2 - 58}px`;
        cap.current.style.width = `${right - left}px`;
      }
      render();
      setReady(true);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();
    return () => observer.disconnect();
  }, [render, radius]);
  useEffect(() => {
    disposed.current = false;
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) setNear(true);
        if (!entry.isIntersecting) {
          tween.current?.progress(1).kill();
          setMoving(false);
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const visibility = () => {
      if (document.hidden) {
        tween.current?.progress(1).kill();
        setMoving(false);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed.current = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      tween.current?.kill();
    };
  }, []);
  useEffect(() => {
    if (reduced) {
      tween.current?.progress(1).kill();
      setMoving(false);
      render();
    }
  }, [reduced, render]);

  const endDrag = () => {
    const state = drag.current;
    if (!state) return;
    if (state.moved) {
      blockClick.current = performance.now() + 250;
      select(Math.round(pos.current.v), Math.round(pos.current.v));
    }
    drag.current = null;
    stage.current?.removeAttribute("data-dragging");
  };
  const current = items[index];
  if (!current) return null;
  return (
    <div
      ref={root}
      className={`arc-card-carousel ${className}`}
      data-ready={ready || undefined}
      data-moving={moving || undefined}
      data-reduced={reduced || undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={stage}
        className="acc-stage"
        style={height ? { height } : undefined}
        tabIndex={0}
        aria-label="Room arc carousel"
        onKeyDown={(event) => {
          if (
            [
              "ArrowDown",
              "ArrowRight",
              "ArrowUp",
              "ArrowLeft",
              "Home",
              "End",
            ].includes(event.key)
          ) {
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            select(
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? count - 1
                  : index +
                    (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1),
            );
          }
        }}
        onPointerDown={(event) => {
          if (
            !event.isPrimary ||
            (event.pointerType === "mouse" && event.button !== 0)
          )
            return;
          blockClick.current = 0;
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            start: pos.current.v,
            touch: event.pointerType === "touch",
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const state = drag.current;
          if (!state || state.id !== event.pointerId) return;
          const dx = event.clientX - state.x,
            dy = event.clientY - state.y;
          if (!state.moved) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
            if (state.touch && Math.abs(dy) > Math.abs(dx)) {
              drag.current = null;
              return;
            }
            state.moved = true;
            tween.current?.kill();
            setMoving(true);
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.dataset.dragging = "true";
          }
          // Direct vertical manipulation follows the mouse; phone swipes keep
          // the familiar left-for-next mapping without consuming page scroll.
          const candidate = state.start + (state.touch ? -dx / 180 : dy / 220);
          pos.current.v = loop
            ? candidate
            : Math.max(0, Math.min(count - 1, candidate));
          render();
        }}
        onPointerUp={(event) => {
          endDrag();
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
          stage.current?.removeAttribute("data-dragging");
          animate(nearest(index));
        }}
        onLostPointerCapture={(event) => {
          if (event.target === event.currentTarget) endDrag();
        }}
      >
        {cards.map((item, i) => (
          <button
            key={i}
            ref={(node) => {
              cardRefs.current[i] = node;
            }}
            type="button"
            className="acc-card"
            tabIndex={-1}
            aria-label={`Select ${item.title ?? item.alt ?? "room"}, ${(i % count) + 1} of ${count}`}
            aria-pressed={i % count === index}
            onClick={() => {
              if (performance.now() < blockClick.current) return;
              // Keep keyboard focus on a stable target while the physical slots move.
              stage.current?.focus({ preventScroll: true });
              select(i % count, pos.current.v + offsetOf(i, pos.current.v, n));
            }}
          >
            <span className="acc-card-surface">
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(max-width:767px) 85vw, 42vw"
                alt={item.alt ?? ""}
                draggable={false}
                loading={near ? "eager" : "lazy"}
                decoding="async"
              />
            </span>
          </button>
        ))}
        {caption && (
          <div ref={cap} className="acc-front-caption" aria-hidden="true">
            <GlassSurface
              width="100%"
              height={44}
              refraction={false}
              borderRadius={7}
              backgroundOpacity={0.6}
            >
              <span>{current.title}</span>
              <Check size={15} />
            </GlassSurface>
          </div>
        )}
      </div>
      <div className="acc-controls">
        <span className="acc-count" aria-live="polite">
          {String(index + 1).padStart(2, "0")}
          <i />
          {String(count).padStart(2, "0")}
        </span>
        <span className="acc-hint">
          <MoveVertical size={15} aria-hidden="true" />
          Drag to explore
        </span>
        <div className="acc-arrows">
          <button
            type="button"
            onClick={() => select(index - 1, nearest(index) - 1)}
            disabled={!loop && index === 0}
            aria-label="Previous room"
          >
            <ArrowUp size={18} />
          </button>
          <button
            type="button"
            onClick={() => select(index + 1, nearest(index) + 1)}
            disabled={!loop && index === count - 1}
            aria-label="Next room"
          >
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
