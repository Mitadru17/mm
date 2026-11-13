import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import * as m from "motion/react-m";

const MotionPreference = createContext({
  reduced: false,
  system: false,
  toggle: () => {},
});
export function useSiteMotion() {
  return useContext(MotionPreference).reduced;
}
export function MotionPreferenceToggle() {
  const { reduced, system, toggle } = useContext(MotionPreference);
  return (
    <button
      className="motion-preference"
      aria-label="Reduce motion"
      aria-pressed={reduced}
      disabled={system}
      onClick={toggle}
    >
      <span aria-hidden="true" />
      {reduced ? "Reduced motion" : "Reduce motion"}
      {system ? " · system" : ""}
    </button>
  );
}
export function MotionRoot({ children }: { children: ReactNode }) {
  const system = !!useReducedMotion();
  const [manual, setManual] = useState(() => {
    try {
      return localStorage.getItem("mystic-reduce-motion") === "true";
    } catch {
      return false;
    }
  });
  const reduced = system || manual;
  useEffect(() => {
    document.documentElement.dataset.motionReduced = String(reduced);
    document.dispatchEvent(new Event("mystic-motion-change"));
    try {
      if (manual) localStorage.setItem("mystic-reduce-motion", "true");
      else localStorage.removeItem("mystic-reduce-motion");
    } catch {
      /* Storage can be disabled without affecting the preference. */
    }
  }, [manual, reduced]);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionPreference.Provider
        value={{ reduced, system, toggle: () => setManual((value) => !value) }}
      >
        <MotionConfig
          reducedMotion={reduced ? "always" : "user"}
          transition={{
            duration: reduced ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </MotionConfig>
      </MotionPreference.Provider>
    </LazyMotion>
  );
}
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useSiteMotion();
  const spring = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.3,
  });
  return (
    <m.div
      className="page-progress"
      style={{ scaleX: reduced ? scrollYProgress : spring }}
      aria-hidden="true"
    />
  );
}
export function EditorialHeading({
  first,
  second,
}: {
  first: string;
  second: string;
}) {
  const reduced = useSiteMotion();
  return (
    <h2 className="editorial-heading">
      <span className="heading-line">
        <m.span
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.75 }}
        >
          {first}
        </m.span>
      </span>
      <span className="heading-line">
        <m.em
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reduced ? 0 : 0.75,
            delay: reduced ? 0 : 0.09,
          }}
        >
          {second}
        </m.em>
      </span>
    </h2>
  );
}
export function MagneticLink({
  children,
  href,
  className = "",
  label,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  label?: string;
}) {
  const bounds = useRef<DOMRect | null>(null);
  const reduced = useSiteMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.35 }),
    springY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.35 });
  return (
    <m.a
      href={href}
      className={`magnetic-link ${className}`}
      aria-label={label}
      style={{ x: springX, y: springY }}
      onPointerEnter={(e) => {
        bounds.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !bounds.current) return;
        const b = bounds.current;
        x.set((e.clientX - b.left - b.width / 2) * 0.09);
        y.set((e.clientY - b.top - b.height / 2) * 0.09);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
    >
      {children}
    </m.a>
  );
}
