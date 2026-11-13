import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useInView } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { PhotoImage } from "../ui";
import { photos } from "../data";
import { useSiteMotion } from "../motion";
import { useTideGallery } from "../tidescape/primitives";
import { TiltedPreview } from "../components/react-bits/TiltedPreview";
import { Magnet } from "../components/react-bits/Magnet";
import { gsap } from "./animation";
import "./premium-hero.css";

const perspectives = [
  {
    id: "valley-balcony",
    label: "The hills",
    caption: "A little room for the view.",
  },
  {
    id: "timber-room",
    label: "The rooms",
    caption: "A warmer kind of welcome.",
  },
  {
    id: "dining-window",
    label: "The table",
    caption: "Pull up a chair. Stay a while.",
  },
  { id: "room-view", label: "The light", caption: "Let the outside in." },
];
const ids = perspectives.map((photo) => photo.id);
const alt = (id: string) =>
  photos.find((photo) => photo.id === id)?.alt ||
  "Hotel Mystic Mountain Kausani";

export function PremiumHero({ header }: { header: ReactNode }) {
  const root = useRef<HTMLElement>(null),
    camera = useRef<HTMLDivElement>(null);
  const entry = useRef<gsap.core.Timeline | null>(null),
    progress = useRef<(HTMLSpanElement | null)[]>([]);
  const finishEntry = useRef<() => void>(() => {});
  const reduced = useSiteMotion();
  const [ready, setReady] = useState(reduced || !!location.hash);
  const entered = useRef(ready);
  const [paused, setPaused] = useState(false),
    [visible, setVisible] = useState(!document.hidden);
  const inView = useInView(root, { amount: 0.1 });
  const [viewport, api] = useEmblaCarousel({
    loop: true,
    duration: 0,
    watchFocus: false,
  });
  const [index, setIndex] = useState(0);
  const gallery = useTideGallery();
  const next = (index + 1) % perspectives.length;
  const lastPhoto = useRef(-1);

  // One finite entrance; text remains available to assistive technology throughout.
  useLayoutEffect(() => {
    const node = root.current!;
    let disposed = false;
    const finish = () => {
      gsap.set(
        node.querySelectorAll(
          ".premium-line,[data-premium-enter],.bend-header,.premium-peek-entry",
        ),
        { clearProps: "transform,opacity" },
      );
      gsap.set(node.querySelector(".premium-media-frame"), {
        clearProps: "clipPath",
      });
      entered.current = true;
      setReady(true);
      node.dataset.heroReady = "true";
    };
    finishEntry.current = finish;
    const context = gsap.context(() => {
      if (reduced || entered.current) {
        finish();
        return;
      }
      gsap.set(".premium-line", { yPercent: 110, rotation: 2 });
      gsap.set("[data-premium-enter],.bend-header", { opacity: 0, y: 20 });
      gsap.set(".premium-peek-entry", { opacity: 0, y: 60, rotation: 7 });
    }, node);
    if (!reduced && !entered.current)
      void document.fonts.ready.then(() => {
        if (disposed || entered.current) return;
        context.add(() => {
          const tl = gsap.timeline({ onComplete: finish });
          entry.current = tl;
          tl.fromTo(
            ".premium-media-frame",
            { clipPath: "inset(5% 3% round 12px)" },
            {
              clipPath: "inset(0% 0% round 0px)",
              duration: 1.65,
              ease: "expo.inOut",
            },
            0,
          )
            .to(
              ".bend-header",
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              0.15,
            )
            .to(
              ".premium-location",
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
              0.3,
            )
            .to(
              ".premium-line",
              {
                yPercent: 0,
                rotation: 0,
                duration: 1.25,
                stagger: 0.12,
                ease: "expo.out",
              },
              0.45,
            )
            .to(
              ".premium-description,.premium-actions",
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: "power3.out",
              },
              0.95,
            )
            .to(
              ".premium-peek-entry",
              {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 1.35,
                ease: "expo.out",
              },
              0.85,
            )
            .to(
              ".premium-hero-footer",
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
              1.25,
            );
          node.dataset.heroDuration = tl.duration().toFixed(2);
          const frame = new URLSearchParams(location.search).get("hero-frame");
          if (frame !== null && Number.isFinite(Number(frame))) {
            tl.pause().seek(
              Math.max(0, Math.min(Number(frame), tl.duration())),
              false,
            );
            node.dataset.heroFrame = frame;
          }
        });
      });
    return () => {
      disposed = true;
      entry.current = null;
      context.revert();
    };
  }, [reduced]);
  useEffect(() => {
    if (!api) return;
    const select = () => setIndex(api.selectedScrollSnap());
    select();
    api.on("select", select).on("reInit", select);
    return () => {
      api.off("select", select).off("reInit", select);
    };
  }, [api]);
  useEffect(() => {
    const change = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);

  // A legible six-second progress rail also owns autoplay: no competing timer.
  useEffect(() => {
    const bars = progress.current.filter(
      (bar): bar is HTMLSpanElement => !!bar,
    );
    gsap.set(bars, { scaleX: 0 });
    const active = progress.current[index];
    if (!api || !active) return;
    if (reduced || paused) {
      gsap.set(active, { scaleX: 1 });
      return;
    }
    if (!ready || !visible || !inView) return;
    const tween = gsap.to(active, {
      scaleX: 1,
      duration: 6,
      ease: "none",
      onComplete: () => api.scrollNext(true),
    });
    return () => {
      tween.kill();
    };
  }, [api, index, reduced, paused, ready, visible, inView]);

  // Camera, photo zoom and scroll depth own different nested elements.
  useLayoutEffect(() => {
    const node = root.current!;
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.to(".premium-scenery", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, node);
    return () => context.revert();
  }, [reduced]);
  useEffect(() => {
    const photo = root.current?.querySelector<HTMLElement>(
      `[data-perspective="${index}"] .premium-photo-image`,
    );
    if (!photo) return;
    if (reduced || paused) {
      gsap.set(photo, { scale: 1.035 });
      lastPhoto.current = index;
      return;
    }
    if (!visible || !inView) return;
    if (lastPhoto.current !== index) {
      gsap.set(photo, { scale: 1.11 });
      lastPhoto.current = index;
    }
    const pan = gsap.to(photo, {
      scale: 1.035,
      duration: 6.5,
      ease: "power1.out",
    });
    return () => {
      pan.kill();
    };
  }, [index, reduced, paused, visible, inView]);
  useEffect(() => {
    const node = root.current,
      layer = camera.current;
    if (!node || !layer || reduced || !inView || !visible) return;
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const x = gsap.quickTo(layer, "x", { duration: 1, ease: "power3.out" });
    const y = gsap.quickTo(layer, "y", { duration: 1, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      x((event.clientX / innerWidth - 0.5) * -16);
      y((event.clientY / innerHeight - 0.5) * -12);
    };
    const reset = () => {
      x(0);
      y(0);
    };
    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      x.tween.kill();
      y.tween.kill();
      gsap.set(layer, { clearProps: "transform" });
    };
  }, [reduced, inView, visible]);
  const skip = () => {
    entry.current?.progress(1);
    finishEntry.current();
  };
  return (
    <section
      className="bend-hero premium-hero"
      id="home"
      ref={root}
      aria-label="Mystic Mountain introduction"
      data-hero-ready={ready}
      data-slide={index}
    >
      <div className="premium-scenery">
        <div className="premium-media-frame">
          <div className="premium-camera" ref={camera}>
            {perspectives.map((photo, i) => (
              <div
                className={`premium-hero-photo ${index === i ? "is-active" : ""}`}
                key={photo.id}
                data-perspective={i}
                aria-hidden={index !== i}
              >
                <div className="premium-photo-image">
                  {i === 0 ? (
                    <img
                      src="/images/hero.webp"
                      alt={alt(photo.id)}
                      width={1920}
                      height={1100}
                      fetchPriority="high"
                    />
                  ) : (
                    <PhotoImage
                      id={photo.id}
                      alt={alt(photo.id)}
                      eager
                      sizes="100vw"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="premium-hero-scrim" aria-hidden="true" />
      <div className="premium-grain" aria-hidden="true" />
      <div
        className="premium-drag-surface"
        ref={viewport}
        role="group"
        aria-roledescription="carousel"
        aria-label="Hotel perspectives"
        tabIndex={0}
        data-cursor="drag"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            api?.scrollNext(true);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            api?.scrollPrev(true);
          }
        }}
      >
        <div className="bend-hero-track">
          {perspectives.map((photo) => (
            <div className="bend-hero-slide" key={photo.id} />
          ))}
        </div>
      </div>
      {header}
      {!ready && (
        <button className="premium-skip" onClick={skip}>
          Skip entrance <ArrowUpRight size={14} />
        </button>
      )}
      <div className="premium-hero-content">
        <div className="premium-hero-main">
          <div className="premium-hero-editorial">
            <p className="premium-location" data-premium-enter>
              <span />
              Kausani, Uttarakhand{" "}
              <span className="premium-location-divider">/</span> A Kumaon
              escape
            </p>
            <h1 data-page-title tabIndex={-1}>
              <span className="sr-only">Life, a little slower up here.</span>
              <span aria-hidden="true">
                <span className="premium-line-mask">
                  <span className="premium-line">Life, a little</span>
                </span>
                <span className="premium-line-mask">
                  <span className="premium-line">
                    <em>slower</em> up here.
                  </span>
                </span>
              </span>
            </h1>
            <p className="premium-description" data-premium-enter>
              Timber-warm interiors, open balconies,
              <br className="premium-desktop-break" /> and the green hills of
              Kausani.
            </p>
            <div className="premium-actions" data-premium-enter>
              <a href="#contact" className="premium-stay-link">
                Find your mountain stay{" "}
                <Magnet>
                  <ArrowUpRight size={21} />
                </Magnet>
              </a>
              <button
                className="premium-gallery-link"
                onClick={() => gallery(ids, index)}
              >
                A look around <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="premium-peek-entry">
            <TiltedPreview
              onClick={() => api?.scrollNext(true)}
              label={`Next perspective: ${perspectives[next].label}`}
            >
              <span className="premium-peek-image">
                {perspectives.map((photo, i) => (
                  <span
                    key={photo.id}
                    className={next === i ? "is-active" : ""}
                    aria-hidden={next !== i}
                  >
                    <PhotoImage
                      id={photo.id}
                      alt={alt(photo.id)}
                      sizes="260px"
                    />
                  </span>
                ))}
              </span>
              <span className="premium-peek-caption">
                <span>
                  <small>A little more Mystic</small>
                  <span>{perspectives[next].caption}</span>
                </span>
                <ArrowUpRight size={22} />
              </span>
            </TiltedPreview>
            <span className="premium-peek-footnote">
              Real places. A different pace.
            </span>
          </div>
        </div>
        <div className="premium-hero-footer" data-premium-enter>
          <a className="premium-discover" href="#opportunity">
            <span className="premium-discover-icon">
              <ArrowDown size={17} />
            </span>
            <span>
              Discover our corner
              <br />
              of the mountains
            </span>
          </a>
          <div
            className="premium-perspectives"
            aria-label="Choose a hotel perspective"
          >
            {perspectives.map((photo, i) => (
              <button
                key={photo.id}
                className={index === i ? "is-active" : ""}
                aria-label={`Show ${photo.label.toLowerCase()}`}
                aria-pressed={index === i}
                onClick={() => api?.scrollTo(i, true)}
              >
                <span>{photo.label}</span>
                <span className="premium-slide-rail">
                  <span
                    ref={(element) => {
                      progress.current[i] = element;
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="premium-controls">
            <span
              className="premium-slide-number"
              aria-live={paused || reduced ? "polite" : "off"}
            >
              0{index + 1}
              <span>/ 04</span>
            </span>
            <button
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev(true)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label={
                paused || reduced
                  ? "Play photo slideshow"
                  : "Pause photo slideshow"
              }
              aria-pressed={paused || reduced}
              disabled={reduced}
              onClick={() => setPaused((value) => !value)}
            >
              {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
            </button>
            <button
              aria-label="Next slide"
              onClick={() => api?.scrollNext(true)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
