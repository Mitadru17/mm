// Adapted from React Bits TargetCursor-TS-CSS (David Haz).
// Retains its portal, corner geometry, target delegation and radius matching.
// Finite 150ms easing replaces rotating springs. MIT + Commons Clause; /licenses/react-bits.txt.
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { cubicBezier } from "motion";
import { useSiteMotion } from "../../motion";
import { capsuleEase } from "../../design";

const ease = cubicBezier(...capsuleEase);
type Box = { x: number; y: number; w: number; h: number; r: number };
const angles = [0, 90, 180, 270];
export function TargetCursor() {
  const reduced = useSiteMotion();
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const corners = useRef<(HTMLSpanElement | null)[]>([]);
  const dot = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || reduced) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let raf = 0,
      started = 0,
      seen = false,
      inside = false,
      pressed = false;
    let px = 0,
      py = 0;
    let current: Box = { x: 0, y: 0, w: 26, h: 26, r: 3 };
    let from = { ...current },
      goal = { ...current };
    const hide = () => {
      inside = false;
      seen = false;
      element.style.opacity = "0";
      document.documentElement.removeAttribute("data-rb-cursor-active");
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const draw = () => {
      const positions = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      corners.current.forEach((corner, i) => {
        if (!corner) return;
        const [sx, sy] = positions[i];
        corner.style.transform = `translate3d(${current.x + (sx * current.w) / 2}px,${current.y + (sy * current.h) / 2}px,0) rotate(${angles[i]}deg)`;
        corner.style.borderTopLeftRadius = `${Math.min(10, current.r)}px`;
      });
      if (dot.current)
        dot.current.style.transform = `translate3d(${px}px,${py}px,0) translate(-50%,-50%) scale(${pressed ? 0.65 : 1})`;
    };
    const frame = (now: number) => {
      raf = 0;
      if (!inside) return;
      const progress = Math.min(1, (now - started) / 150),
        t = ease(progress);
      for (const k of ["x", "y", "w", "h", "r"] as const)
        current[k] = from[k] + (goal[k] - from[k]) * t;
      draw();
      if (progress < 1) raf = requestAnimationFrame(frame);
    };
    const update = (target?: Element | null) => {
      const node = target || document.elementFromPoint(px, py);
      if (
        !fine.matches ||
        !node ||
        node.closest(
          "input,textarea,select,[contenteditable=true],.terrain-scene,dialog,[data-cursor-native]",
        )
      ) {
        hide();
        return;
      }
      inside = true;
      const hit = node.closest<HTMLElement>(
        "a,button,summary,[data-cursor-target]",
      );
      const b = hit?.getBoundingClientRect();
      const squeeze = pressed ? 0.96 : 1;
      goal =
        b && b.width < 900 && b.height < 650
          ? {
              x: b.left + b.width / 2,
              y: b.top + b.height / 2,
              w: (b.width + 7.5) * squeeze,
              h: (b.height + 7.5) * squeeze,
              r: parseFloat(getComputedStyle(hit!).borderTopLeftRadius) || 3,
            }
          : { x: px, y: py, w: 26 * squeeze, h: 26 * squeeze, r: 3 };
      if (!seen) {
        current = { ...goal };
        seen = true;
      }
      from = { ...current };
      started = performance.now();
      element.style.opacity = "1";
      element.dataset.target = hit ? "true" : "false";
      document.documentElement.dataset.rbCursorActive = "true";
      if (label.current) {
        const text =
          hit?.getAttribute("data-cursor-label") ||
          (hit?.querySelector("img") ? "View" : "");
        label.current.textContent = text;
        label.current.style.opacity = text ? "1" : "0";
        label.current.style.transform = `translate3d(${Math.max(8, Math.min(innerWidth - 130, goal.x - goal.w / 2))}px,${Math.max(18, goal.y - goal.h / 2 - 12)}px,0) translateY(-100%)`;
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      update(e.target as Element);
    };
    const down = () => {
      pressed = true;
      if (inside) update();
    };
    const up = () => {
      pressed = false;
      if (inside) update();
    };
    const scroll = () => {
      if (inside) update();
    };
    const keyboard = (e: KeyboardEvent) => {
      if (["Tab", "Escape", "ArrowDown", "ArrowUp"].includes(e.key)) hide();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };
    const dialog = new MutationObserver(() => {
      if (document.querySelector("dialog[open]")) hide();
    });
    dialog.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    window.addEventListener("keydown", keyboard);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", hide);
    document.addEventListener("dragstart", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", scroll, { capture: true });
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", hide);
      document.removeEventListener("dragstart", hide);
      dialog.disconnect();
    };
  }, [pathname, reduced]);
  if (reduced) return null;
  return createPortal(
    <div
      ref={root}
      className="rb-target-cursor"
      aria-hidden="true"
      data-react-bits="target-cursor"
      style={{ opacity: 0 }}
    >
      {angles.map((a, i) => (
        <span
          className="rb-target-corner"
          key={a}
          ref={(el) => {
            corners.current[i] = el;
          }}
        />
      ))}
      <span className="rb-target-dot" ref={dot} />
      <span className="rb-target-label" ref={label} />
    </div>,
    document.body,
  );
}
