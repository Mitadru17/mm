import { useRef } from "react";
import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { useSiteMotion } from "../motion";
import { capsuleDuration, capsuleEase } from "../design";
import { GlareHover } from "./react-bits/GlareHover";

/** Original card, informed by the reviewed glass/scroll demos; no paid source. */
export function GlassCard({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down";
}) {
  const reduced = useSiteMotion();
  const bounds = useRef<DOMRect | null>(null);
  return (
    <m.article
      className={`glass-card glass-surface ${className}`}
      initial={
        reduced
          ? false
          : { opacity: 0.6, y: direction === "up" ? 30 : -30, scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={reduced ? undefined : { y: -7.5 }}
      transition={{
        duration: reduced ? 0 : capsuleDuration,
        ease: capsuleEase,
      }}
      onPointerEnter={(event) => {
        if (!reduced && event.pointerType === "mouse")
          bounds.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        const b = bounds.current;
        if (!b || reduced) return;
        event.currentTarget.style.setProperty(
          "--glass-x",
          `${Math.max(0, Math.min(100, ((event.clientX - b.left) / b.width) * 100))}%`,
        );
        event.currentTarget.style.setProperty(
          "--glass-y",
          `${Math.max(0, Math.min(100, ((event.clientY - b.top) / b.height) * 100))}%`,
        );
      }}
      onPointerLeave={(event) => {
        bounds.current = null;
        event.currentTarget.style.removeProperty("--glass-x");
        event.currentTarget.style.removeProperty("--glass-y");
      }}
    >
      <div className="glass-card-content">{children}</div>
      <GlareHover />
    </m.article>
  );
}
