import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import * as m from "motion/react-m";
import { CornerDownRight } from "lucide-react";
import { PhotoImage } from "../ui";
import { photos } from "../data";
import { useSiteMotion } from "../motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const GalleryActions = createContext<
  (ids: string[], index: number) => void
>(() => {});
export const useTideGallery = () => useContext(GalleryActions);
export function useCompact(maxWidth = 900) {
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
}: {
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
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
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
      <CornerDownRight size={18} aria-hidden="true" />
      <span className="ts-link-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
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
  return (
    <div className={`ts-photo ${className}`}>
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
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useSiteMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0.7, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : delay,
        ease,
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
  const reduced = useSiteMotion();
  const content = (
    <m.span
      initial={reduced ? false : { y: 35, opacity: 0.75 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 1, ease }}
    >
      {children}
    </m.span>
  );
  return as === "h1" ? (
    <h1 className={`ts-title ${className}`} tabIndex={-1} data-page-title>
      {content}
    </h1>
  ) : (
    <h2 className={`ts-title ${className}`}>{content}</h2>
  );
}
