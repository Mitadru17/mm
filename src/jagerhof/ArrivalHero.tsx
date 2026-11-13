import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "../bend/animation";
import { useSiteMotion } from "../motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";

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
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [wantsPlay, setWantsPlay] = useState(
    () =>
      !reduced &&
      !(navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
  );
  const [mediaSource, setMediaSource] = useState<string>();
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const firstRect = useRef<DOMRect | null>(null);
  const busy = phase !== "ready";
  useEffect(() => {
    if (reduced) setWantsPlay(false);
  }, [reduced]);
  useEffect(() => {
    if (wantsPlay && !mediaSource)
      setMediaSource(
        matchMedia("(max-width: 767px)").matches
          ? "/videos/mystic-hero-mobile.mp4"
          : "/videos/mystic-hero-desktop.mp4",
      );
  }, [wantsPlay, mediaSource]);
  useEffect(() => {
    const film = video.current,
      el = root.current;
    if (!film || !el || !mediaSource || videoFailed) return;
    let visible = false,
      disposed = false;
    const sync = () => {
      if (disposed) return;
      if (!visible || document.hidden || !wantsPlay) {
        film.pause();
        return;
      }
      void film.play().catch((error: unknown) => {
        // Scrolling away can cancel a pending play promise. That is temporary,
        // whereas an autoplay policy refusal needs an explicit play action.
        if (
          !disposed &&
          error instanceof DOMException &&
          error.name === "NotAllowedError"
        )
          setWantsPlay(false);
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    film.addEventListener("canplay", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      film.pause();
      film.removeEventListener("canplay", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [wantsPlay, mediaSource, videoFailed]);
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
    const film = video.current;
    let clearFilm = () => {};
    const firstFrame =
      !mediaSource || !film || film.readyState >= 2
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            const done = () => resolve();
            film.addEventListener("loadeddata", done, { once: true });
            film.addEventListener("error", done, { once: true });
            clearFilm = () => {
              film.removeEventListener("loadeddata", done);
              film.removeEventListener("error", done);
            };
          });
    const assets = Promise.all([
      document.fonts.ready,
      image.current!.decode().catch(() => {}),
      firstFrame,
      new Promise((resolve) => {
        minimum = setTimeout(resolve, 1450);
      }),
    ]);
    // A failed/slow image must never hold the site behind the loader.
    const limit = new Promise((resolve) => {
      deadline = setTimeout(resolve, 3600);
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
      clearFilm();
    };
  }, [phase, reduced, mediaSource]);

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
            color: "#2f4f3e",
          },
          {
            x: 0,
            y: 0,
            color: "#faf8f4",
            duration: 1.65,
            ease: "power3.inOut",
          },
          0,
        )
        .fromTo(
          ".arrival-veil",
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
          },
          0,
        )
        .fromTo(
          ".arrival-visual",
          { scale: 1.035 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
          0,
        )
        .to(".arrival-loading-meta", { autoAlpha: 0, duration: 0.3 }, 0)
        .fromTo(
          ".arrival-kicker, .arrival-tail, .arrival-film-control",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          1.1,
        )
        .to(".arrival-skip", { autoAlpha: 0, duration: 0.18 }, 1.5);
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
      data-enter=""
      data-video-ready={videoReady || undefined}
      data-cursor-native={busy ? "" : undefined}
      aria-labelledby="arrival-title"
      aria-busy={busy}
    >
      <div className="arrival-visual" aria-hidden="true">
        <img
          ref={image}
          src="/images/hero-video-poster.webp"
          width="1600"
          height="900"
          alt=""
          fetchPriority="high"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
        <video
          ref={video}
          src={mediaSource}
          muted
          loop
          playsInline
          preload={mediaSource ? "auto" : "none"}
          poster="/images/hero-video-poster.webp"
          onLoadedData={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setWantsPlay(false);
          }}
          className={videoReady && !videoFailed ? "is-ready" : ""}
        />
        <div className="arrival-shade" />
      </div>
      {busy && <div className="arrival-veil" aria-hidden="true" />}
      <div className="arrival-copy">
        <h1 ref={title} id="arrival-title" tabIndex={-1} data-page-title>
          <span>Wake up</span>
          <span>
            in <em>Kausani.</em>
          </span>
        </h1>
        <p className="arrival-kicker">A HOTEL IN THE KUMAON HIMALAYAS</p>
      </div>
      <div className="arrival-tail" inert={busy}>
        <a className="arrival-room-link" href="#stay">
          Explore our rooms{" "}
          <span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </a>
        <p>
          Hotel Mystic Mountain
          <br />
          <span>Baijnath Road, Kausani · Uttarakhand</span>
        </p>
      </div>
      {!videoFailed && (
        <button
          type="button"
          className="arrival-film-control"
          inert={busy}
          aria-label={
            wantsPlay ? "Pause background film" : "Play background film"
          }
          onClick={() => setWantsPlay((value) => !value)}
        >
          {wantsPlay ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
          <span>{wantsPlay ? "Pause film" : "Play film"}</span>
        </button>
      )}
      {busy && (
        <>
          <div className="arrival-loading-meta">
            <svg
              className="arrival-mountain-line"
              viewBox="0 0 160 50"
              fill="none"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M2 44H28L58 6L86 44H108L131 16L158 44M45 23L58 27L67 20M118 32L131 35L139 27M76 44L96 17L117 44"
              />
            </svg>
            <span className="arrival-loading-rule" aria-hidden="true" />
            <p role="status">Your time in the hills begins here.</p>
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
