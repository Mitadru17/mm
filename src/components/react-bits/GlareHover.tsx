// Adapted from React Bits GlareHover-TS-CSS: smooth profile gradient and diagonal sweep.
// One-shot Web Animation replaces the multi-mode demo engine. MIT + Commons Clause.
import { useEffect, useRef } from "react";
import { useSiteMotion } from "../../motion";

const stops = Array.from({ length: 17 }, (_, i) => {
  const t = i / 16,
    distance = Math.abs(t - 0.5) / 0.5;
  const v = 1 - Math.min(1, distance),
    smooth = v * v * v * (v * (v * 6 - 15) + 10);
  return `rgb(244 239 231 / ${(smooth * 0.1).toFixed(3)}) ${t * 100}%`;
}).join(",");
export function GlareHover() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useSiteMotion();
  useEffect(() => {
    const band = ref.current,
      root = band?.parentElement?.parentElement;
    if (!root || !band || reduced) return;
    let animation: Animation | undefined;
    const sweep = (event: Event) => {
      if (event instanceof PointerEvent && event.pointerType !== "mouse")
        return;
      const reach = Math.hypot(root.clientWidth, root.clientHeight);
      animation?.cancel();
      animation = band.animate(
        [
          {
            transform: `translate(-50%, -50%) rotate(-35deg) translateX(${-reach}px)`,
          },
          {
            transform: `translate(-50%, -50%) rotate(-35deg) translateX(${reach}px)`,
          },
        ],
        {
          duration: 150,
          easing: "cubic-bezier(0.4,0,0.2,1)",
          fill: "forwards",
        },
      );
    };
    root.addEventListener("pointerenter", sweep);
    root.addEventListener("focusin", sweep);
    return () => {
      animation?.cancel();
      root.removeEventListener("pointerenter", sweep);
      root.removeEventListener("focusin", sweep);
    };
  }, [reduced]);
  return (
    <span className="rb-glare" aria-hidden="true" data-react-bits="glare-hover">
      <span
        ref={ref}
        style={{ background: `linear-gradient(90deg,${stops})` }}
      />
    </span>
  );
}
