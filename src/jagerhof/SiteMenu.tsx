import { useLayoutEffect, useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "../bend/animation";
import { hotel, photos } from "../data";
import { goTo } from "../experience";
import { useSiteMotion } from "../motion";
import { PhotoImage } from "../ui";

const items = [
  ["Hotel", "#stay"],
  ["Dine", "#dine"],
  ["Nature", "#nature"],
  ["Our story", "/about"],
  ["Unwind", "#unwind"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

/** A native modal sheet with distinct background, typography and icon motion. */
export function SiteMenu({
  open,
  compact,
  trigger,
  onClosed,
  onBook,
}: {
  open: boolean;
  compact: boolean;
  trigger: RefObject<HTMLButtonElement | null>;
  onClosed: () => void;
  onBook: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const dismiss = useRef<(after?: () => void) => void>(() => {});
  const callbacks = useRef({ onClosed, onBook });
  callbacks.current = { onClosed, onBook };
  const reduced = useSiteMotion();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const href = (to: string) =>
    to.startsWith("#") && pathname !== "/" ? `/${to}` : to;

  useLayoutEffect(() => {
    if (!open) return;
    const dialog = ref.current!;
    let closing = false;
    let exit: gsap.core.Timeline | undefined;
    const previousOverflow = document.body.style.overflow;
    const surface = dialog.querySelector(".site-menu-surface");
    const links = dialog.querySelectorAll("[data-menu-reveal]");
    const bar = dialog.querySelector(".site-menu-bar");
    const lines = dialog.querySelectorAll(".arrival-menu-lines>span");
    dialog.dataset.phase = "opening";
    dialog.showModal();
    document.body.style.overflow = "hidden";
    let entrance: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      entrance = gsap.timeline({
        onComplete: () => {
          dialog.dataset.phase = "open";
        },
      });
      entrance
        .fromTo(
          dialog,
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0.15 : 0.18 },
          0,
        )
        .fromTo(
          surface,
          { scaleY: reduced ? 1 : 0 },
          { scaleY: 1, duration: reduced ? 0.15 : 0.6, ease: "expo.out" },
          0,
        )
        .fromTo(bar, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.04)
        .fromTo(
          links,
          { opacity: 0, y: reduced ? 0 : 26 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.15 : 0.55,
            stagger: reduced ? 0 : 0.045,
            ease: "power3.out",
          },
          reduced ? 0 : 0.13,
        )
        .to(
          lines[0],
          {
            y: 2.5,
            rotation: 45,
            duration: reduced ? 0.12 : 0.35,
            ease: "power3.inOut",
          },
          0.08,
        )
        .to(
          lines[1],
          {
            y: -2.5,
            rotation: -45,
            duration: reduced ? 0.12 : 0.35,
            ease: "power3.inOut",
          },
          0.08,
        );
    }, dialog);
    dismiss.current = (after) => {
      if (closing) return;
      closing = true;
      entrance!.kill();
      dialog.dataset.phase = "closing";
      exit = gsap.timeline({
        onComplete: () => {
          dialog.close();
          document.body.style.overflow = previousOverflow;
          callbacks.current.onClosed();
          if (after) after();
          else trigger.current?.focus({ preventScroll: true });
        },
      });
      exit
        .to(
          links,
          {
            opacity: 0,
            y: reduced ? 0 : -8,
            duration: reduced ? 0.12 : 0.18,
            stagger: reduced ? 0 : 0.012,
          },
          0,
        )
        .to(
          lines,
          {
            y: 0,
            rotation: 0,
            duration: reduced ? 0.12 : 0.28,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          surface,
          {
            scaleY: reduced ? 1 : 0,
            duration: reduced ? 0.12 : 0.38,
            ease: "power3.inOut",
          },
          reduced ? 0 : 0.06,
        )
        .to(
          dialog,
          { opacity: 0, duration: reduced ? 0.12 : 0.2 },
          reduced ? 0 : 0.24,
        );
    };
    return () => {
      exit?.kill();
      ctx.revert();
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, reduced, trigger]);

  const follow = (event: MouseEvent<HTMLAnchorElement>, to: string) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    dismiss.current(() => {
      navigate(to);
      if (to.startsWith("#")) requestAnimationFrame(() => goTo(to.slice(1)));
      else if (to.startsWith("/#"))
        requestAnimationFrame(() => goTo(to.slice(2)));
    });
  };

  return (
    <dialog
      ref={ref}
      className="site-menu"
      aria-label="Explore Mystic Mountain"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const targets = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dismiss.current();
      }}
    >
      <div className="site-menu-surface" aria-hidden="true" />
      <div className={`site-menu-bar ${compact ? "is-compact" : ""}`}>
        <button
          className="arrival-menu-trigger"
          aria-label="Close navigation"
          onClick={() => dismiss.current()}
          autoFocus
        >
          <span className="arrival-menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>CLOSE</span>
        </button>
        <Link
          to="/"
          onClick={(event) => follow(event, "/")}
          className="arrival-wordmark"
          aria-label="Hotel Mystic Mountain Kausani home"
        >
          <span>MYSTIC</span>
          <small>MOUNTAIN · KAUSANI</small>
        </Link>
        <button
          className="arrival-enquire"
          onClick={() => dismiss.current(() => callbacks.current.onBook())}
        >
          ENQUIRE
        </button>
      </div>
      <div className="site-menu-body" data-lenis-prevent>
        <div className="site-menu-photo" data-menu-reveal>
          <PhotoImage
            id="valley-portrait"
            alt={photos.find((photo) => photo.id === "valley-portrait")!.alt}
            sizes="40vw"
            eager={open}
          />
          <p>A little closer to the mountains.</p>
        </div>
        <div className="site-menu-navigation">
          <nav aria-label="Site navigation">
            {items.map(([label, to], index) => (
              <Link
                key={label}
                to={href(to)}
                onClick={(event) => follow(event, href(to))}
                data-menu-reveal
              >
                <span className="site-menu-index">0{index + 1}</span>
                <span>{label}</span>
                <ArrowUpRight size={23} strokeWidth={1} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="site-menu-contact" data-menu-reveal>
            <a href={hotel.phoneHref}>{hotel.phone}</a>
            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
