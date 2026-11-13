import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { gsap } from "../bend/animation";
import { useSiteMotion } from "../motion";
import "./soft-cursor.css";

/** An original, quiet pointer: a precise dot and a softly following circle. */
export function SoftCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { pathname } = useLocation();
  const reduced = useSiteMotion();
  useEffect(() => {
    if (reduced || !ref.current || !ring.current || !dot.current) return;
    const root = ref.current,
      circle = ring.current,
      point = dot.current;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let shown = false,
      x = 0,
      y = 0,
      mode = "rest";
    root.dataset.mode = "rest";
    const followX = gsap.quickTo(circle, "x", {
      duration: 0.36,
      ease: "power3.out",
    });
    const followY = gsap.quickTo(circle, "y", {
      duration: 0.36,
      ease: "power3.out",
    });
    const hide = () => {
      root.style.opacity = "0";
      document.documentElement.removeAttribute("data-soft-cursor-active");
      delete root.dataset.pressed;
      followX.tween.pause();
      followY.tween.pause();
      shown = false;
    };
    const identify = (target: Element | null) => {
      if (
        !fine.matches ||
        !target ||
        document.querySelector("dialog[open]") ||
        target.closest(
          "input,textarea,select,[contenteditable=true],dialog,.terrain-scene,[data-cursor-native]",
        )
      ) {
        hide();
        return false;
      }
      const action = target.closest<HTMLElement>(
        "a,button,summary,[data-cursor]",
      );
      const next =
        action?.dataset.cursor ||
        (action ? (action.querySelector("img") ? "view" : "link") : "rest");
      if (next !== mode) {
        mode = next;
        root.dataset.mode = next;
        if (label.current)
          label.current.textContent =
            next === "drag" ? "Drag" : next === "view" ? "View" : "";
      }
      return true;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (!identify(event.target as Element)) return;
      point.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (!shown) {
        gsap.set(circle, { x, y });
        shown = true;
      }
      followX(x);
      followY(y);
      root.style.opacity = "1";
      document.documentElement.dataset.softCursorActive = "true";
    };
    const down = () => {
      root.dataset.pressed = "true";
    };
    const up = () => {
      delete root.dataset.pressed;
    };
    const scroll = () => {
      if (shown) identify(document.elementFromPoint(x, y));
    };
    const key = (event: KeyboardEvent) => {
      if (
        [
          "Tab",
          "Escape",
          "ArrowDown",
          "ArrowUp",
          "ArrowLeft",
          "ArrowRight",
        ].includes(event.key)
      )
        hide();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };
    const dialogs = new MutationObserver(() => {
      if (document.querySelector("dialog[open]")) hide();
    });
    dialogs.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    window.addEventListener("keydown", key);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("dragstart", hide);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", hide);
    return () => {
      hide();
      followX.tween.kill();
      followY.tween.kill();
      dialogs.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("scroll", scroll, { capture: true });
      window.removeEventListener("keydown", key);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("dragstart", hide);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", hide);
    };
  }, [pathname, reduced]);
  if (reduced) return null;
  return createPortal(
    <div
      ref={ref}
      className="soft-cursor"
      aria-hidden="true"
      data-mode="rest"
      style={{ opacity: 0 }}
    >
      <span ref={dot} className="soft-cursor-dot" />
      <span ref={ring} className="soft-cursor-follow">
        <span className="soft-cursor-circle">
          <span ref={label} />
        </span>
      </span>
    </div>,
    document.body,
  );
}
