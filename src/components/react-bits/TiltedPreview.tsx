// Focused adaptation of React Bits TiltedCard's normalized pointer/tilt mapping.
// MIT + Commons Clause; upstream notice: /licenses/react-bits.txt.
// Uses the existing GSAP runtime, a stable native button, no sensors or idle loop.
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "../../bend/animation";
import { useSiteMotion } from "../../motion";

export function TiltedPreview({
  children,
  onClick,
  label,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  const button = useRef<HTMLButtonElement>(null),
    surface = useRef<HTMLSpanElement>(null);
  const reduced = useSiteMotion();
  useEffect(() => {
    const root = button.current,
      body = surface.current;
    if (!root || !body || reduced) return;
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    let rect: DOMRect | null = null;
    const rx = gsap.quickTo(body, "rotationX", {
      duration: 0.65,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(body, "rotationY", {
      duration: 0.65,
      ease: "power3.out",
    });
    const enter = () => {
      if (fine.matches) rect = root.getBoundingClientRect();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches || !rect) return;
      const nx = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        ),
      );
      const ny = Math.max(
        -1,
        Math.min(
          1,
          (event.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        ),
      );
      rx(-ny * 4);
      ry(nx * 4);
    };
    const reset = () => {
      rect = null;
      rx(0);
      ry(0);
    };
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", reset);
    window.addEventListener("resize", reset);
    window.addEventListener("blur", reset);
    return () => {
      rx.tween.kill();
      ry.tween.kill();
      gsap.set(body, { clearProps: "transform" });
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", reset);
      window.removeEventListener("blur", reset);
    };
  }, [reduced]);
  return (
    <button
      ref={button}
      className={`premium-peek ${className}`}
      onClick={onClick}
      aria-label={label}
      data-cursor="view"
      data-react-bits="tilted-card"
    >
      <span className="premium-peek-surface" ref={surface}>
        {children}
      </span>
    </button>
  );
}
