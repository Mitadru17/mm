import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "../bend/animation";
import { useSiteMotion } from "../motion";

let entered = false;
export function shouldShowArrival() {
  if (
    entered ||
    location.hash ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return false;
  try {
    return localStorage.getItem("mystic-reduce-motion") !== "true";
  } catch {
    return true;
  }
}

type Phase = "loading" | "revealing" | "ready";
/** The loader and hero share this single heading; only its transform changes. */
export function ArrivalHero({
  initialEntry,
  onReady,
}: {
  initialEntry: boolean;
  onReady: () => void;
}) {
  const reduced = useSiteMotion();
  const [phase, setPhase] = useState<Phase>(() =>
    initialEntry ? "loading" : "ready",
  );
  const [imageFailed, setImageFailed] = useState(false);
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const firstRect = useRef<DOMRect | null>(null);
  const busy = phase !== "ready";
  const finish = useCallback(() => {
    entered = true;
    setPhase("ready");
    onReady();
    title.current?.focus({ preventScroll: true });
  }, [onReady]);

  useEffect(() => {
    if (!busy) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", escape);
    };
  }, [busy, finish]);

  useEffect(() => {
    if (reduced && busy) finish();
  }, [reduced, busy, finish]);

  useEffect(() => {
    if (phase !== "loading" || reduced) return;
    let disposed = false;
    let minimum: ReturnType<typeof setTimeout>;
    let deadline: ReturnType<typeof setTimeout>;
    const assets = Promise.all([
      document.fonts.ready,
      image.current!.decode().catch(() => {}),
      new Promise((resolve) => {
        minimum = setTimeout(resolve, 650);
      }),
    ]);
    // A failed/slow image must never hold the site behind the loader.
    const limit = new Promise((resolve) => {
      deadline = setTimeout(resolve, 3200);
    });
    void Promise.race([assets, limit]).then(() => {
      if (disposed) return;
      firstRect.current = title.current!.getBoundingClientRect();
      setPhase("revealing");
    });
    return () => {
      disposed = true;
      clearTimeout(minimum);
      clearTimeout(deadline);
    };
  }, [phase, reduced]);

  useLayoutEffect(() => {
    if (phase !== "revealing" || !firstRect.current || reduced) return;
    const first = firstRect.current;
    const last = title.current!.getBoundingClientRect();
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo(
          title.current,
          {
            x: first.left - last.left,
            y: first.top - last.top,
          },
          {
            x: 0,
            y: 0,
            duration: 1.65,
            ease: "power3.inOut",
          },
          0,
        )
        .fromTo(
          ".arrival-veil",
          { opacity: 1 },
          { opacity: 0, duration: 1.45, ease: "power2.inOut" },
          0.12,
        )
        .fromTo(
          image.current,
          { scale: 1.055 },
          { scale: 1, duration: 1.85, ease: "power2.out" },
          0,
        )
        .to(".arrival-loading-meta", { autoAlpha: 0, duration: 0.3 }, 0)
        .to(".arrival-skip", { autoAlpha: 0, duration: 0.18 }, 1.65);
      const frame = new URLSearchParams(location.search).get("entry-frame");
      if (frame !== null && Number.isFinite(Number(frame)))
        timeline.pause(Math.max(0, Number(frame)));
    }, root);
    // If the viewport changes mid-flight, settle immediately into the CSS layout.
    window.addEventListener("resize", finish, { once: true });
    return () => {
      ctx.revert();
      window.removeEventListener("resize", finish);
    };
  }, [phase, reduced, finish]);

  return (
    <section
      ref={root}
      className={`arrival-hero ${imageFailed ? "has-image-error" : ""}`}
      data-phase={phase}
      data-cursor-native={busy ? "" : undefined}
      aria-labelledby="arrival-title"
      aria-busy={busy}
    >
      <div className="arrival-visual" aria-hidden="true">
        <img
          ref={image}
          src="/images/hero.webp"
          width="1920"
          height="1100"
          alt=""
          fetchPriority="high"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
        <div className="arrival-shade" />
      </div>
      {busy && <div className="arrival-veil" aria-hidden="true" />}
      <div className="arrival-copy">
        <h1 ref={title} id="arrival-title" tabIndex={-1} data-page-title>
          <span>Welcome home</span>
          <span>to the mountains.</span>
        </h1>
      </div>
      {busy && (
        <>
          <div className="arrival-loading-meta">
            <span className="arrival-loading-rule" aria-hidden="true" />
            <p role="status">Preparing your mountain view</p>
            <span>Kausani, Uttarakhand</span>
          </div>
          <button className="arrival-skip" onClick={finish}>
            Skip introduction <span aria-hidden="true">↗</span>
          </button>
        </>
      )}
      <a
        className="arrival-scroll"
        href="#main"
        inert={busy}
        aria-label="Scroll to discover Mystic Mountain"
      >
        <span>SCROLL FOR MORE</span>
        <i aria-hidden="true" />
      </a>
      {imageFailed && (
        <span className="sr-only">
          Hotel landscape photograph is unavailable. You can continue exploring
          the site.
        </span>
      )}
    </section>
  );
}
