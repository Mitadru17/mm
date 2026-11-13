import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { photos } from "../data";
import { PhotoImage } from "../ui";
import { useSiteMotion } from "../motion";
import { useTideGallery } from "../tidescape/primitives";
import { gsap, referenceMotion, ScrollTrigger } from "./animation";

const stories = [
  {
    label: "Mornings",
    title: "Wake to the Hills. Take Your Time.",
    image: "valley-portrait",
  },
  {
    label: "Afternoons",
    title: "A Table by the Window.",
    image: "dining-window",
  },
  {
    label: "Evenings",
    title: "Come Back to Somewhere Warm.",
    image: "timber-room",
  },
];
const alt = (id: string) =>
  photos.find((photo) => photo.id === id)?.alt ||
  "Hotel Mystic Mountain Kausani";

export function ReferenceEntrance({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, {
    once: true,
    amount: 0.16,
    margin: "0px 0px -8% 0px",
  });
  const reduced = useSiteMotion();
  return (
    <div
      ref={ref}
      className={`bend-entrance ${seen || reduced ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: reduced ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ReferenceStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSiteMotion();
  const [paused, setPaused] = useState(false);
  const visible = useInView(ref);
  const text =
    "Tucked into the green hills of Kausani, opposite the Tea Factory on Baijnath Road, Mystic Mountain brings together timber-warm rooms, open balconies and a little more time for the view.";
  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".bend-statement-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: { each: 0.05, from: "start" },
          scrollTrigger: {
            id: "mystic-statement",
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: referenceMotion.scrub,
          },
        },
      );
      gsap.fromTo(
        ".bend-statement-star",
        { opacity: 0, scale: 0.4, rotation: -120 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);
    return () => context.revert();
  }, [reduced]);
  return (
    <section
      className="bend-statement bend-section"
      id="opportunity"
      ref={ref}
      aria-label="The Mystic Mountain story"
    >
      <div className="bend-statement-inner">
        <button
          className="bend-statement-star"
          aria-label={
            paused ? "Play decorative motion" : "Pause decorative motion"
          }
          aria-pressed={paused}
          disabled={reduced}
          onClick={() => setPaused((value) => !value)}
        >
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
            style={{
              animationPlayState:
                visible && !paused && !reduced ? "running" : "paused",
            }}
          >
            <path d="M16 0C17 11 21 15 32 16C21 17 17 21 16 32C15 21 11 17 0 16C11 15 15 11 16 0Z" />
          </svg>
        </button>
        <p>
          <span className="sr-only">{text}</span>
          {text.split(" ").map((word, index) => (
            <span
              className="bend-statement-word"
              key={index}
              aria-hidden="true"
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export function ReferenceStories() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSiteMotion();
  const [active, setActive] = useState(0);
  const gallery = useTideGallery();
  useLayoutEffect(() => {
    const root = ref.current!;
    if (reduced) {
      root.dataset.stage = "static";
      return;
    }
    const images = [...root.querySelectorAll<HTMLElement>(".bend-story-photo")];
    const copies = [...root.querySelectorAll<HTMLElement>(".bend-story-copy")];
    const progress = root.querySelector<HTMLElement>(
      ".bend-story-progress span",
    )!;
    const progressWrap = progress.parentElement!;
    const placeProgress = () => {
      const box = images[0].getBoundingClientRect();
      const inner = root
        .querySelector(".bend-stories-inner")!
        .getBoundingClientRect();
      progressWrap.style.top = `${box.bottom - inner.top - 4}px`;
      progressWrap.style.width = `${box.width}px`;
    };
    const tint = document.querySelector<HTMLElement>(".bend-scene-tint");
    let stage = 0;
    let change: gsap.core.Timeline | undefined;
    root.dataset.stage = "0";
    const context = gsap.context(() => {
      gsap.set(images, { clipPath: "inset(50% round 12px)" });
      gsap.set(images[0], { clipPath: "inset(0% round 12px)" });
      gsap.set(copies, { autoAlpha: 0 });
      gsap.set(copies[0], { autoAlpha: 1 });
      gsap.set(progress, { scaleX: 0 });
    }, root);
    const pin = ScrollTrigger.create({
      id: "mystic-stories",
      trigger: root,
      start: "center center",
      end: () => `+=${innerHeight * 2}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: placeProgress,
      onUpdate: (self) => {
        progress.style.transform = `scaleX(${self.progress})`;
        const next = Math.min(
          2,
          Math.floor((Math.min(self.progress, 0.7) / 0.7) * 2 + 0.000001),
        );
        if (next === stage) return;
        const previous = stage;
        stage = next;
        root.dataset.stage = String(next);
        setActive(next);
        context.add(() => {
          change?.kill();
          const oldText = [...copies[previous].children];
          const newText = [...copies[next].children];
          gsap.killTweensOf([...oldText, ...newText, ...images]);
          copies.forEach((copy, index) => {
            if (index !== previous && index !== next)
              gsap.set(copy, { autoAlpha: 0 });
          });
          // Keep earlier images below the incoming layer, including fast reverse scrolls.
          images.forEach((image, index) => {
            if (index < Math.min(previous, next))
              gsap.set(image, { clipPath: "inset(0% round 12px)" });
            if (index > Math.max(previous, next))
              gsap.set(image, { clipPath: "inset(50% round 12px)" });
          });
          change = gsap.timeline({ defaults: { overwrite: "auto" } });
          change.to(
            next > previous ? images[next] : images[previous],
            {
              clipPath:
                next > previous
                  ? "inset(0% round 12px)"
                  : "inset(50% round 12px)",
              duration: referenceMotion.storyWipe,
              ease: "power4.inOut",
            },
            0,
          );
          if (next < previous)
            gsap.set(images[next], { clipPath: "inset(0% round 12px)" });
          gsap.set(copies[next], { autoAlpha: 1 });
          change
            .to(
              oldText,
              {
                autoAlpha: 0,
                y: -30,
                duration: referenceMotion.storyExit,
                ease: "power4.out",
                onComplete: () => {
                  if (stage !== previous)
                    gsap.set(copies[previous], { autoAlpha: 0 });
                },
              },
              0,
            )
            .fromTo(
              newText,
              { autoAlpha: 0, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                duration: referenceMotion.storyWipe,
                stagger: referenceMotion.storyStagger,
                ease: "power4.out",
              },
              0,
            );
        });
      },
    });
    const color = (opacity: number) => {
      if (tint)
        context.add(() => {
          gsap.to(tint, {
            opacity,
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
    };
    const background = ScrollTrigger.create({
      id: "mystic-story-background",
      start: () => pin.start - 220,
      end: () => pin.end + 220,
      invalidateOnRefresh: true,
      onEnter: () => color(1),
      onLeave: () => color(0),
      onEnterBack: () => color(1),
      onLeaveBack: () => color(0),
    });
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    return () => {
      change?.kill();
      background.kill();
      pin.kill();
      context.revert();
      if (tint) gsap.set(tint, { opacity: 0 });
    };
  }, [reduced]);
  return (
    <section
      className={`bend-stories ${reduced ? "is-reduced" : ""}`}
      id="stay"
      ref={ref}
      aria-label="A day at Mystic Mountain"
    >
      <div className="bend-stories-sticky">
        <div className="bend-stories-inner">
          {stories.map((story, index) => (
            <article
              className={`bend-story ${index === active ? "is-active" : ""}`}
              key={story.label}
              aria-hidden={!reduced && index !== active}
            >
              <button
                className="bend-story-photo"
                tabIndex={reduced || index === active ? 0 : -1}
                onClick={() =>
                  gallery(
                    stories.map((s) => s.image),
                    index,
                  )
                }
                aria-label={`View photograph: ${story.title}`}
              >
                <PhotoImage
                  id={story.image}
                  alt={alt(story.image)}
                  sizes="(max-width:767px) 100vw,50vw"
                />
                <span className="bend-photo-view">
                  A closer look <ArrowUpRight size={18} />
                </span>
              </button>
              <div className="bend-story-copy">
                <p className="bend-eyebrow">{story.label}</p>
                <h3>{story.title}</h3>
              </div>
            </article>
          ))}
          <div className="bend-story-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferencePillars({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSiteMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".bend-pillar",
        { y: (index) => referenceMotion.pillarOffsets[index] || 0 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            id: "mystic-pillars",
            trigger: ref.current,
            start: "top 95%",
            end: "center 60%",
            scrub: referenceMotion.scrub,
            invalidateOnRefresh: true,
          },
        },
      );
    }, ref);
    return () => context.revert();
  }, [reduced]);
  return (
    <div className="bend-pillars" ref={ref}>
      {children}
    </div>
  );
}
