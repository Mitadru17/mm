import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { PhotoImage } from "../ui";
import { photos } from "../data";
import { useSiteMotion } from "../motion";
import BlurText from "../components/react-bits/BlurText";
import { Magnet } from "../components/react-bits/Magnet";

export { capsuleEase as ease } from "../design";
export const GalleryActions = createContext<
  (ids: string[], index: number) => void
>(() => {});
export const useTideGallery = () => useContext(GalleryActions);
export function useCompact(maxWidth = 1023) {
  const [compact, setCompact] = useState(
    () => window.matchMedia(`(max-width: ${maxWidth}px)`).matches,
  );
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const change = () => setCompact(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, [maxWidth]);
  return compact;
}
export function useFrame() {
  const [frame, setFrame] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const resize = () =>
      setFrame({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);
  return frame;
}
export function TideLink({
  to,
  children,
  className = "",
  onClick,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (
    to.startsWith("https:") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:") ||
    to.startsWith("#")
  )
    return (
      <a
        {...props}
        href={to}
        className={className}
        onClick={onClick}
        {...(to.startsWith("https:")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  if (to.includes("#"))
    return (
      <Link {...props} to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <NavLink
      {...props}
      to={to}
      end={to === "/"}
      className={className}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <TideLink to={to} className={`ts-arrow-link ${className}`}>
      <span>{children}</span>
      <Magnet className="ts-arrow-disc">
        <ArrowUpRight size={21} aria-hidden="true" />
      </Magnet>
    </TideLink>
  );
}
export function TidePhoto({
  id,
  alt,
  className = "",
  eager = false,
  sizes,
}: {
  id: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const reduced = useSiteMotion();
  const bounds = useRef<DOMRect | null>(null);
  return (
    <div
      className={`ts-photo ${className}`}
      onPointerEnter={(event) => {
        if (
          reduced ||
          event.pointerType !== "mouse" ||
          !event.currentTarget.closest("a,button")
        )
          return;
        bounds.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        const box = bounds.current;
        if (reduced || event.pointerType !== "mouse" || !box) return;
        // Cache geometry on entry: pointer movement only writes two CSS values.
        event.currentTarget.style.setProperty(
          "--photo-x",
          `${Math.max(-0.5, Math.min(0.5, (event.clientX - box.left - box.width / 2) / box.width)) * -15}px`,
        );
        event.currentTarget.style.setProperty(
          "--photo-y",
          `${Math.max(-0.5, Math.min(0.5, (event.clientY - box.top - box.height / 2) / box.height)) * -15}px`,
        );
      }}
      onPointerLeave={(event) => {
        bounds.current = null;
        event.currentTarget.style.removeProperty("--photo-x");
        event.currentTarget.style.removeProperty("--photo-y");
      }}
    >
      <PhotoImage
        id={id}
        alt={
          alt ||
          photos.find((photo) => photo.id === id)?.alt ||
          "A real photograph at Hotel Mystic Mountain Kausani"
        }
        eager={eager}
        sizes={sizes}
      />
    </div>
  );
}
export function DepthPhoto({
  id,
  hero = false,
  eager = false,
}: {
  id: string;
  hero?: boolean;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);
  return (
    <div ref={ref} className="ts-depth-photo">
      <m.div style={reduced ? undefined : { y, scale: 1.055 }}>
        {hero ? (
          <img
            className="ts-hero-image"
            draggable={false}
            src="/images/hero.webp"
            alt="The real balcony at Hotel Mystic Mountain overlooking Kausani’s green hills"
            width="1920"
            height="1100"
            fetchPriority="high"
          />
        ) : (
          <TidePhoto id={id} eager={eager} sizes="100vw" />
        )}
      </m.div>
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useSiteMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0.15 : 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
}
export function TideTitle({
  children,
  className = "",
  as = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const content = (
    <BlurText duration={0.65} stagger={0.04} maxDelay={0.28}>
      {children}
    </BlurText>
  );
  return as === "h1" ? (
    <h1 className={`ts-title ${className}`} tabIndex={-1} data-page-title>
      {content}
    </h1>
  ) : (
    <h2 className={`ts-title ${className}`}>{content}</h2>
  );
}
