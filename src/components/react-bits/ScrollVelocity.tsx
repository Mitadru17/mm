// React Bits ScrollVelocity-TS-CSS adaptation: measured repeat width, wrap and velocity skew.
// Scroll-driven only, with no idle marquee/animation loop. MIT + Commons Clause.
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useVelocity } from "motion/react";
import * as m from "motion/react-m";
import { useSiteMotion } from "../../motion";
import { MountainMark } from "../../ui";

export function ScrollVelocity() {
  const copy = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  const reduced = useSiteMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const x = useTransform(scrollY, (v) => (width ? -((v * 0.12) % width) : 0));
  const skewX = useTransform(velocity, (v) => Math.tanh(v / 1800) * -2);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.target.getBoundingClientRect().width),
    );
    if (copy.current) observer.observe(copy.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="rb-velocity"
      data-react-bits="scroll-velocity"
      data-reduced={reduced}
    >
      <p className="sr-only">Kausani. A little closer to Kumaon.</p>
      <m.div
        className="rb-velocity-track"
        aria-hidden="true"
        style={reduced ? undefined : { x, skewX }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={i === 0 ? copy : undefined}
            className={i % 2 ? "is-outline" : ""}
          >
            A little closer to Kumaon.
            <span className="rb-velocity-star">
              <MountainMark />
            </span>
          </span>
        ))}
      </m.div>
      <span className="rb-velocity-caption">
        Kausani · Uttarakhand · At your own pace
      </span>
    </div>
  );
}
