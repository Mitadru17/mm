// Adapted from React Bits Magnet-TS-CSS: reach/pull math and bounded translation.
// Springs replaced by the project's 150ms easing. MIT + Commons Clause.
import { useRef } from "react";
import type { ReactNode } from "react";
import { useSiteMotion } from "../../motion";

export function Magnet({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useSiteMotion();
  const box = useRef<DOMRect | null>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const reset = () => {
    box.current = null;
    inner.current?.style.removeProperty("transform");
  };
  return (
    <span
      className={`rb-magnet ${className}`}
      data-react-bits="magnet"
      onPointerEnter={(e) => {
        if (!reduced && e.pointerType === "mouse")
          box.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        const b = box.current;
        if (!b || reduced || e.pointerType !== "mouse" || !inner.current)
          return;
        const dx = (e.clientX - b.left - b.width / 2) / 3,
          dy = (e.clientY - b.top - b.height / 2) / 3;
        const length = Math.hypot(dx, dy),
          limit = Math.min(1, 7.5 / (length || 1));
        inner.current.style.transform = `translate3d(${dx * limit}px, ${dy * limit}px, 0)`;
      }}
      onPointerLeave={reset}
    >
      <span className="rb-magnet-inner" ref={inner}>
        {children}
      </span>
    </span>
  );
}
