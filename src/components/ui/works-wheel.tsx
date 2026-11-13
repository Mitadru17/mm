/** Works Wheel, adapted from the complete component supplied by the user.
 * Original ring/drum/bow geometry retained. Adaptations: hotel photographs,
 * controlled selection, on-demand frames, native page scrolling, touch/keyboard
 * navigation, glass caption and a flat compact/reduced-motion presentation.
 * No separate author or license was named in the supplied component.
 */
"use client";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowLeft, ArrowRight, Expand, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteMotion } from "@/motion";
import GlassSurface from "@/components/GlassSurface";
import "./works-wheel.css";

export interface WorksWheelItem {
  title: string;
  image: string;
  srcSet?: string;
  alt?: string;
  href?: string;
}
export interface WorksWheelProps extends Omit<
  ComponentPropsWithoutRef<"section">,
  "children" | "onChange"
> {
  items: WorksWheelItem[];
  label?: string;
  activeIndex: number;
  onActiveChange: (index: number) => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onOpenPhoto?: (index: number) => void;
}
const STEP = 40,
  DRUM = 2.22,
  LENS = 2.7,
  BOW = 1.82,
  CULL = 1.6;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;
const bowAt = (deg: number, bow: number) => -bow * (1 - Math.cos(rad(deg)));
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return `translateX(${m * bowAt(drumDeg, bow)}px) rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px) rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`;
}

export function WorksWheel({
  items,
  label = "Our rooms",
  activeIndex,
  onActiveChange,
  expanded,
  onExpandedChange,
  onOpenPhoto,
  className,
  ...props
}: WorksWheelProps) {
  const uid = useId();
  const reduced = useSiteMotion();
  const stageRef = useRef<HTMLDivElement>(null),
    wheelRef = useRef<HTMLDivElement>(null),
    labelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [compact, setCompact] = useState(
    () => matchMedia("(max-width:1023px)").matches,
  );
  const [visible, setVisible] = useState(false);
  const flat = compact || reduced;
  const open = expanded || flat;
  const turn = useRef(0),
    target = useRef(0),
    kick = useRef(() => {});
  const count = items.length,
    last = Math.max(count - 1, 0);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    last: number;
    start: number;
    moved: boolean;
    touch: boolean;
  } | null>(null);
  const clickBlocked = useRef(0);
  const select = useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last) + 1;
      kick.current();
      onExpandedChange(true);
      onActiveChange(clamp(next, 0, last));
    },
    [onExpandedChange, onActiveChange, last],
  );

  useEffect(() => {
    const media = matchMedia("(max-width:1023px)");
    const resize = () => setCompact(media.matches);
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() =>
      setSize({ w: el.clientWidth, h: el.clientHeight }),
    );
    observer.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => {
      observer.disconnect();
      io.disconnect();
    };
  }, []);
  const metrics = useMemo(() => {
    const cardW = flat ? size.w : Math.min(size.h * 0.58 * 1.45, size.w * 0.84);
    const cardH = flat ? size.h : cardW / 1.45;
    const ringR = Math.min(cardH * 1.14, size.h * 0.31, size.w * 0.34);
    return {
      cardW,
      cardH,
      ringR,
      drumR: cardH * DRUM,
      bow: cardH * BOW,
      depth: cardH * LENS,
      ringScale: count
        ? clamp(
            (((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1),
            0.12,
            1,
          )
        : 1,
    };
  }, [size, flat, count]);
  useEffect(() => {
    target.current = open ? activeIndex + 1 : 0;
    kick.current();
  }, [activeIndex, open]);

  // One transform owner and no idle frame loop. Page/Lenis scrolling is untouched.
  useEffect(() => {
    if (!size.h || !visible) return;
    let raf = 0,
      lastTime = 0;
    const draw = (now: number) => {
      raf = 0;
      if (document.hidden) return;
      const gap = target.current - turn.current;
      const steps = lastTime ? Math.min((now - lastTime) / 16.667, 3) : 1;
      lastTime = now;
      if (flat || Math.abs(gap) < 0.001) turn.current = target.current;
      else turn.current += gap * (1 - Math.pow(0.88, steps));
      const t = turn.current,
        m = clamp(t, 0, 1),
        pos = Math.max(0, t - 1);
      if (wheelRef.current)
        wheelRef.current.style.transform = flat
          ? "none"
          : `translateZ(${-m * metrics.drumR}px)`;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = i - pos;
        const shown = flat
          ? i === Math.round(pos)
          : !(m > 0.5 && Math.abs(d) > CULL);
        card.style.transform = flat
          ? "none"
          : place(
              d * (360 / count),
              d * STEP,
              metrics.ringR,
              metrics.drumR,
              metrics.bow,
              m,
            );
        card.style.opacity = shown ? "1" : "0";
        card.style.visibility = shown ? "visible" : "hidden";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        const front = shown && m > 0.98 && Math.abs(d) < 0.08;
        card.tabIndex = front ? 0 : -1;
        card.setAttribute("aria-hidden", front ? "false" : "true");
        const face = card.firstElementChild as HTMLElement | null;
        if (face)
          face.style.transform = flat
            ? "none"
            : `scale(${lerp(metrics.ringScale, 1, m)})`;
      });
      if (labelRef.current) {
        labelRef.current.style.opacity = String(1 - m);
        labelRef.current.style.visibility = m > 0.95 ? "hidden" : "visible";
      }
      if (Math.abs(target.current - turn.current) > 0.001)
        raf = requestAnimationFrame(draw);
    };
    kick.current = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastTime = 0;
      } else kick.current();
    };
    document.addEventListener("visibilitychange", visibility);
    kick.current();
    return () => {
      cancelAnimationFrame(raf);
      kick.current = () => {};
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [metrics, size.h, count, flat, visible]);

  const endDrag = () => {
    const state = drag.current;
    if (!state) return;
    if (state.moved) {
      clickBlocked.current = performance.now() + 250;
      select(Math.round(Math.max(0, target.current - 1)));
    }
    drag.current = null;
    stageRef.current?.removeAttribute("data-dragging");
  };
  return (
    <section
      className={cn("works-wheel", className)}
      data-flat={flat || undefined}
      data-expanded={open || undefined}
      data-visible={visible || undefined}
      aria-label={label}
      {...props}
    >
      <div
        ref={stageRef}
        className="ww-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Room photographs"
        style={{ perspective: flat ? "none" : `${metrics.depth}px` }}
        onKeyDown={(e) => {
          const key = e.key;
          if (
            [
              "ArrowDown",
              "ArrowRight",
              "ArrowUp",
              "ArrowLeft",
              "Home",
              "End",
            ].includes(key)
          ) {
            e.preventDefault();
            e.currentTarget.focus({ preventScroll: true });
            select(
              key === "Home"
                ? 0
                : key === "End"
                  ? last
                  : activeIndex +
                    (["ArrowDown", "ArrowRight"].includes(key) ? 1 : -1),
            );
          }
        }}
        onPointerDown={(e) => {
          if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0))
            return;
          clickBlocked.current = 0;
          drag.current = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            last: e.pointerType === "touch" ? e.clientX : e.clientY,
            start: target.current,
            moved: false,
            touch: e.pointerType === "touch",
          };
        }}
        onPointerMove={(e) => {
          const state = drag.current;
          if (!state || state.id !== e.pointerId) return;
          const dx = e.clientX - state.x,
            dy = e.clientY - state.y;
          if (!state.moved) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
            if (state.touch && Math.abs(dy) > Math.abs(dx)) {
              drag.current = null;
              return;
            }
            state.moved = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.dataset.dragging = "true";
            onExpandedChange(true);
            target.current = Math.max(1, target.current);
          }
          const value = state.touch ? e.clientX : e.clientY;
          target.current = clamp(
            target.current + (state.last - value) / (state.touch ? 180 : 300),
            1,
            last + 1,
          );
          state.last = value;
          kick.current();
        }}
        onPointerUp={(e) => {
          endDrag();
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
          target.current = open ? activeIndex + 1 : 0;
          kick.current();
          stageRef.current?.removeAttribute("data-dragging");
        }}
        onLostPointerCapture={(event) => {
          // Touch starts with implicit capture on the photo. Its bubbled loss
          // during transfer to the stage must not end the horizontal gesture.
          if (event.target === event.currentTarget) endDrag();
        }}
      >
        <div ref={wheelRef} className="ww-drum">
          {items.map((item, i) => (
            <button
              type="button"
              key={`${uid}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="ww-card"
              tabIndex={-1}
              aria-label={`Open photograph: ${item.alt ?? item.title}`}
              style={{
                width: metrics.cardW,
                height: metrics.cardH,
                marginLeft: -metrics.cardW / 2,
                marginTop: -metrics.cardH / 2,
              }}
              onClick={() => {
                if (performance.now() < clickBlocked.current) {
                  clickBlocked.current = 0;
                  return;
                }
                if (!open || i !== activeIndex) select(i);
                else onOpenPhoto?.(i);
              }}
            >
              <span className="ww-face">
                <img
                  src={item.image}
                  srcSet={item.srcSet}
                  sizes="(max-width:767px) 90vw, 48vw"
                  alt={item.alt ?? item.title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onLoad={(e) => {
                    e.currentTarget.dataset.loaded = "true";
                  }}
                />
                {i === activeIndex && open && (
                  <GlassSurface
                    width="auto"
                    height={44}
                    refraction={false}
                    borderRadius={7}
                    backgroundOpacity={0.55}
                    className="ww-glass-caption"
                  >
                    <span>{item.title}</span>
                    <Expand size={15} aria-hidden="true" />
                  </GlassSurface>
                )}
              </span>
            </button>
          ))}
        </div>
        {!flat && (
          <div ref={labelRef} className="ww-ring-label">
            <span>{label}</span>
            <button type="button" onClick={() => select(activeIndex)}>
              Explore the photographs{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div className="ww-controls">
        <span className="ww-photo-count" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")}
          <i />
          {String(count).padStart(2, "0")}
        </span>
        <span className="ww-gesture">
          <MoveHorizontal size={15} aria-hidden="true" /> Drag to explore
        </span>
        <div className="ww-arrows">
          <button
            type="button"
            onClick={() => select(activeIndex - 1)}
            disabled={open && activeIndex === 0}
            aria-label="Previous room photograph"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => select(activeIndex + 1)}
            disabled={open && activeIndex === last}
            aria-label="Next room photograph"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
export default WorksWheel;
