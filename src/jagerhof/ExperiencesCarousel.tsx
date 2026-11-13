import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useInView } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveHorizontal,
} from "lucide-react";
import { photos } from "../data";
import { PhotoImage } from "../ui";
import { useSiteMotion } from "../motion";
import { TideLink } from "../tidescape/primitives";
import { goTo } from "../experience";

const experiences = [
  {
    image: "valley-balcony",
    title: "Mountain mornings",
    to: "#nature",
    description: "Discover the hills and balcony views around the hotel.",
  },
  {
    image: "timber-room",
    title: "Timber & light",
    to: "/suites",
    description: "Explore the hotel's rooms and timber interiors.",
  },
  {
    image: "dining-window",
    title: "Around the table",
    to: "#dine",
    description: "Take a look inside our dining space.",
  },
  {
    image: "terrace",
    title: "Out in the open",
    to: "/gallery",
    description:
      "Discover the terrace and outdoor spaces in our photo gallery.",
  },
  {
    image: "lounge",
    title: "A quieter corner",
    to: "/gallery",
    description: "Look around the hotel's sitting spaces and lounge.",
  },
  {
    image: "room-view",
    title: "Let the outside in",
    to: "/suites/outlook",
    description:
      "Explore window-side seating and views in our room photographs.",
  },
];

export function ExperiencesCarousel() {
  const navigate = useNavigate();
  const reduced = useSiteMotion();
  const [viewport, api] = useEmblaCarousel({
    loop: true,
    startIndex: 1,
    align: "center",
    containScroll: false,
    dragFree: !reduced,
    skipSnaps: true,
    dragThreshold: 4,
    duration: reduced ? 0 : 35,
  });
  const root = useRef<HTMLElement>(null);
  const near = useInView(root, { once: true, margin: "600px 0px" });
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (!api) return;
    const rail = api.rootNode();
    const surfaces = api
      .slideNodes()
      .map((slide) =>
        slide.querySelector<HTMLElement>(".jh-experience-surface")!,
      );
    // Embla alone translates the track. Only these inner surfaces receive
    // perspective; scroll progress supplies all values without layout reads.
    const paint = () => {
      const progress = api.scrollProgress();
      api.scrollSnapList().forEach((snap, index) => {
        const difference = snap - progress;
        const distance = ((((difference + 0.5) % 1) + 1) % 1) - 0.5;
        surfaces[index].style.transform = reduced
          ? "none"
          : `perspective(1800px) translate3d(0,${-Math.abs(distance) * 150}px,0) rotateY(${-distance * 48}deg)`;
      });
    };
    const select = () => setSelected(api.selectedScrollSnap());
    const moving = () => rail.classList.add("is-moving");
    const down = () => {
      moving();
      rail.dataset.dragging = "true";
    };
    const up = () => {
      delete rail.dataset.dragging;
    };
    const settled = () => {
      up();
      rail.classList.remove("is-moving");
    };
    const reset = () => {
      settled();
      select();
      paint();
    };
    reset();
    api
      .on("scroll", paint)
      .on("select", select)
      .on("reInit", reset)
      .on("pointerDown", down)
      .on("pointerUp", up)
      .on("settle", settled);
    window.addEventListener("blur", settled);
    rail.addEventListener("pointercancel", settled);
    return () => {
      api
        .off("scroll", paint)
        .off("select", select)
        .off("reInit", reset)
        .off("pointerDown", down)
        .off("pointerUp", up)
        .off("settle", settled);
      window.removeEventListener("blur", settled);
      rail.removeEventListener("pointercancel", settled);
      settled();
      surfaces.forEach((surface) => surface.style.removeProperty("transform"));
    };
  }, [api, reduced]);

  const move = (direction: number) => {
    api?.rootNode().classList.add("is-moving");
    if (direction < 0) api?.scrollPrev();
    else api?.scrollNext();
  };
  const activate = (to: string) => {
    navigate(to);
    if (to.startsWith("#")) requestAnimationFrame(() => goTo(to.slice(1)));
  };

  return (
    <section
      ref={root}
      id="experiences"
      className="jh-carousel jh-experiences"
      aria-label="Explore the hotel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className="jh-experiences-heading" data-jh-reveal>
        <p className="jh-experiences-kicker">
          <span aria-hidden="true" />
          EXPERIENCES
        </p>
        <h2 data-jh-heading>
          Little rituals,
          <br />
          <em>slower days.</em>
        </h2>
        <p className="jh-experiences-intro">
          Take in the hills from the balcony, settle into a timber-lined room,
          or linger around the table. Find your own rhythm in Kausani.
        </p>
      </div>
      <div
        className="jh-experiences-viewport"
        ref={viewport}
        data-cursor="drag"
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          pointer.current = { x: event.clientX, y: event.clientY };
          dragged.current = false;
        }}
        onPointerMove={(event) => {
          if (
            pointer.current &&
            Math.abs(event.clientX - pointer.current.x) > 6
          )
            dragged.current = true;
        }}
        onPointerUp={() => {
          pointer.current = null;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onClickCapture={(event) => {
          // Embla suppresses the click following a drag. Keyboard and assistive
          // activations must still work without requiring another pointer press.
          if (event.detail === 0) {
            const link = (event.target as Element).closest<HTMLAnchorElement>(
              ".jh-experience-card",
            );
            if (link) {
              event.preventDefault();
              event.stopPropagation();
              activate(link.getAttribute("href")!);
            }
            return;
          }
          // Releasing a drag over a card should never follow its link.
          if (dragged.current && event.detail !== 0) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        <div className="jh-experiences-track">
          {experiences.map((experience, index) => (
            <article
              key={experience.image}
              className="jh-experience-slide"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${experiences.length}`}
            >
              <div className="jh-experience-surface">
                <TideLink
                  to={experience.to}
                  className="jh-experience-card"
                  draggable={false}
                  aria-label={`${experience.title}: ${experience.description}`}
                >
                  <PhotoImage
                    id={experience.image}
                    eager={near}
                    alt={
                      photos.find((photo) => photo.id === experience.image)!.alt
                    }
                    sizes="(max-width: 639px) 80vw, (max-width: 991px) 48vw, 30vw"
                  />
                  <span className="jh-experience-shade" aria-hidden="true" />
                  <span className="jh-experience-number" aria-hidden="true">
                    0{index + 1} / 0{experiences.length}
                  </span>
                  <div className="jh-experience-label">
                    <h3>{experience.title}</h3>
                    <span className="jh-experience-open" aria-hidden="true">
                      <ArrowUpRight size={20} strokeWidth={1.25} />
                    </span>
                  </div>
                </TideLink>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="jh-experiences-controls">
        <span className="jh-experiences-hint">
          <MoveHorizontal size={18} strokeWidth={1.2} aria-hidden="true" />
          Drag to discover
        </span>
        <div className="jh-experiences-pagination">
          <button
            aria-label="Previous hotel photograph"
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} strokeWidth={1.3} />
          </button>
          <span aria-live="polite" aria-atomic="true">
            0{selected + 1}
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> of </span>0{experiences.length}
          </span>
          <button aria-label="Next hotel photograph" onClick={() => move(1)}>
            <ArrowRight size={20} strokeWidth={1.3} />
          </button>
        </div>
      </div>
    </section>
  );
}
