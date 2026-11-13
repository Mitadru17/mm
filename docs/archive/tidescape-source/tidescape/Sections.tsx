import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import {
  ArrowLeft,
  ArrowRight,
  DoorOpen,
  Mountain,
  Pause,
  Play,
  Sun,
} from "lucide-react";
import { hotel, rooms } from "../data";
import { MountainMark } from "../ui";
import { useSiteMotion } from "../motion";
import { usePremiumCarousel } from "../carousel";
import { scrollPageTo } from "../experience";
import { activities, comforts, photoStories } from "./data";
import {
  ArrowLink,
  ease,
  Reveal,
  TideLink,
  TidePhoto,
  TideTitle,
  useCompact,
  useFrame,
  useTideGallery,
} from "./primitives";

const collage = [
  ["timber-room", "room-view", "doorway"],
  ["valley-balcony", "dining-window", "terrace"],
  ["arrival", "surroundings", "valley-portrait"],
  ["dining", "timber-window", "room-warm"],
];
function FloatingPhoto({
  images,
  position,
  playing,
}: {
  images: string[];
  position: number;
  playing: boolean;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useSiteMotion();
  useEffect(() => {
    if (!playing || reduced) return;
    let cycle: number | undefined;
    const start = window.setTimeout(
      () => {
        setIndex((value) => (value + 1) % images.length);
        cycle = window.setInterval(
          () => setIndex((value) => (value + 1) % images.length),
          4700,
        );
      },
      4100 + position * 650,
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(cycle);
    };
  }, [images.length, playing, position, reduced]);
  return (
    <div className={`ts-polaroid ts-polaroid-${position}`} aria-hidden="true">
      <AnimatePresence initial={false}>
        <m.div
          key={images[index]}
          className="ts-polaroid-frame"
          initial={reduced ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: reduced ? 0 : 1.2, ease }}
        >
          <TidePhoto
            id={images[index]}
            eager={position < 2}
            sizes="(max-width:600px) 100px, (max-width:1000px) 170px, 260px"
          />
        </m.div>
      </AnimatePresence>
    </div>
  );
}
export function CollageHero() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.08 });
  const [playing, setPlaying] = useState(true);
  const reduced = useSiteMotion();
  return (
    <section
      ref={ref}
      className="ts-banner"
      id="home"
      aria-label="Welcome to Mystic Mountain"
    >
      <div className="ts-banner-inner">
        <div className="ts-collage">
          {collage.map((images, index) => (
            <FloatingPhoto
              key={index}
              images={images}
              position={index}
              playing={playing && visible}
            />
          ))}
        </div>
        <m.h1
          className="ts-wordmark"
          aria-label="Hotel Mystic Mountain Kausani"
          data-page-title
          tabIndex={-1}
          initial={reduced ? false : { opacity: 0.7, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 1.1, ease }}
        >
          MYSTIC
        </m.h1>
        <div className="ts-banner-description">
          <p>
            Warm mountain rooms, green horizons, and a little more time for
            yourself in Kausani.
          </p>
          <button
            className="ts-pause"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause photo motion" : "Play photo motion"}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            <span>{playing ? "Pause motion" : "Play motion"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
export function Welcome() {
  return (
    <section className="ts-welcome ts-section" id="about">
      <div className="ts-welcome-copy">
        <Reveal>
          <MountainMark className="ts-emblem" />
          <TideTitle>
            Welcome to Mystic Mountain, a little escape in Kausani
          </TideTitle>
          <p>
            Find warm timber interiors, green horizons, and a quieter pace in
            the Kumaon hills. On Baijnath Road, opposite the Tea Factory, Mystic
            Mountain is a place to return to after a day of discovery.
          </p>
          <ArrowLink to="/about">MORE ABOUT US</ArrowLink>
        </Reveal>
      </div>
      <Reveal className="ts-welcome-photo">
        <TidePhoto id="balcony" sizes="100vw" />
      </Reveal>
    </section>
  );
}
export function RoomFeatures({ index }: { index: number }) {
  const icons = [Sun, DoorOpen, Mountain];
  return (
    <ul className="ts-room-features">
      {rooms[index].features.map((feature, i) => {
        const Icon = icons[i];
        return (
          <li key={feature}>
            <Icon size={23} strokeWidth={1.25} aria-hidden="true" />
            {feature}
          </li>
        );
      })}
    </ul>
  );
}
export function PinnedRooms() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const compact = useCompact();
  const reduced = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setIndex(Math.min(2, Math.floor(Math.max(0, value) * 3))),
  );
  const go = (next: number) => {
    if (!ref.current) return;
    const span = ref.current.offsetHeight - window.innerHeight;
    scrollPageTo(
      ref.current.getBoundingClientRect().top +
        scrollY +
        span * ((next + 0.25) / 3),
    );
  };
  const room = rooms[index];
  return (
    <section className="ts-room-section" id="stays">
      <TideTitle className="ts-center-title">
        Mountain stays made for slowing down
      </TideTitle>
      <div
        ref={ref}
        className={`ts-room-scroll ${compact || reduced ? "is-static" : ""}`}
      >
        {compact || reduced ? (
          <div className="ts-room-static">
            {rooms.map((item, i) => (
              <article className="ts-room-card" key={item.id}>
                <div className="ts-room-description">
                  <h3>
                    {String(i + 1).padStart(2, "0")}. {item.title}
                  </h3>
                  <p>{item.description}</p>
                  <ArrowLink to={`/suites/${item.id}`}>KNOW MORE</ArrowLink>
                </div>
                <TideLink to={`/suites/${item.id}`} className="ts-room-large">
                  <TidePhoto id={item.images[0]} />
                </TideLink>
                <RoomFeatures index={i} />
              </article>
            ))}
          </div>
        ) : (
          <div
            className="ts-room-sticky"
            role="region"
            aria-label="Explore room photography"
            tabIndex={0}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? Math.min(2, index + 1)
                  : event.key === "ArrowLeft"
                    ? Math.max(0, index - 1)
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : null;
              if (next !== null) {
                event.preventDefault();
                go(next);
              }
            }}
          >
            <div className="ts-room-left">
              <div className="ts-room-rule">
                <m.i style={{ scaleY: scrollYProgress }} />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  className="ts-room-left-content"
                  key={room.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="ts-room-description">
                    <h3>
                      {String(index + 1).padStart(2, "0")}. {room.title}
                    </h3>
                    <p>{room.description}</p>
                    <ArrowLink to={`/suites/${room.id}`}>KNOW MORE</ArrowLink>
                  </div>
                  <TideLink to={`/suites/${room.id}`} className="ts-room-thumb">
                    <TidePhoto id={room.images[1]} sizes="35vw" />
                  </TideLink>
                  <RoomFeatures index={index} />
                </m.div>
              </AnimatePresence>
              <div className="ts-room-steps" aria-label="Choose room story">
                {rooms.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => go(i)}
                    aria-label={`View ${item.title}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="ts-room-image-stack">
              <AnimatePresence initial={false}>
                <m.div
                  key={room.id}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.85, ease }}
                >
                  <TideLink to={`/suites/${room.id}`}>
                    <TidePhoto id={room.images[0]} eager sizes="50vw" />
                  </TideLink>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
      <p className="ts-room-note">
        A photographic introduction. Room categories, views and availability are
        confirmed on inquiry.
      </p>
    </section>
  );
}
export function Activities({ page = false }: { page?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section
      className={`ts-activities ts-section ${page ? "ts-activities-page" : ""}`}
      id="activities"
    >
      <TideTitle className="ts-center-title">
        Discover a different side of the mountains
      </TideTitle>
      <div
        className={`ts-activity-grid ${active !== null ? "has-active" : ""}`}
        onMouseLeave={() => setActive(null)}
      >
        {activities.map((item, i) => (
          <article
            key={item.title}
            className={`ts-activity ${active === i ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setActive(null);
            }}
          >
            <p className="ts-activity-description">{item.copy}</p>
            <TideLink to={item.href}>
              <TidePhoto id={item.image} />
              <h3>{item.title}</h3>
            </TideLink>
          </article>
        ))}
      </div>
      <p className="ts-caption ts-outing-note">
        Local outings are independent suggestions. Confirm access, timings and
        transport before setting out.
      </p>
    </section>
  );
}
export function ImmersiveChapter() {
  const ref = useRef<HTMLElement>(null);
  const compact = useCompact();
  const reduced = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [
      "inset(38% 35% 18% 35%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
    ],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);
  return (
    <section
      ref={ref}
      className={`ts-film ${compact || reduced ? "is-static" : ""}`}
      aria-label="The Kumaon landscape"
    >
      <div className="ts-film-sticky">
        <m.div
          className="ts-film-title"
          style={compact || reduced ? undefined : { opacity }}
        >
          <h2>Stay a little.</h2>
          <h2>Feel a little more.</h2>
        </m.div>
        <m.div
          className="ts-film-image"
          style={compact || reduced ? undefined : { clipPath }}
        >
          <m.div style={compact || reduced ? undefined : { scale }}>
            <TidePhoto id="valley-portrait" sizes="100vw" />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
export function Comforts({ full = false }: { full?: boolean }) {
  return (
    <section
      className={`ts-comforts ts-section ${full ? "ts-comforts-full" : ""}`}
      id="services"
    >
      <TideTitle className="ts-center-title">
        The little things beyond your room
      </TideTitle>
      <div>
        {comforts.map((item, index) => (
          <Reveal className="ts-comfort-row" key={item.title}>
            <h3>{item.title}</h3>
            <TideLink
              to={index === 0 ? "/gallery#dining" : "/gallery"}
              className="ts-comfort-image"
            >
              <TidePhoto id={item.image} />
            </TideLink>
            <p>{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function PhotoStories() {
  const [index, setIndex] = useState(0);
  const reduced = useSiteMotion();
  const openPhoto = useTideGallery();
  const story = photoStories[index];
  return (
    <section className="ts-photo-stories ts-section">
      <TideTitle className="ts-center-title">
        A little closer to life at Mystic Mountain
      </TideTitle>
      <div className="ts-story-grid">
        <button
          className="ts-story-large"
          onClick={() =>
            openPhoto(
              photoStories.map((item) => item.image),
              index,
            )
          }
          aria-label={`View photograph: ${story.title}`}
        >
          <AnimatePresence initial={false}>
            <m.div
              key={story.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.55 }}
            >
              <TidePhoto id={story.image} />
            </m.div>
          </AnimatePresence>
        </button>
        <div className="ts-story-right">
          <div aria-live="polite">
            <h3>{story.copy}</h3>
            <h4>{story.title}</h4>
            <p>{story.label}</p>
            <ArrowLink to={hotel.reviews}>REAL GUEST STORIES</ArrowLink>
          </div>
          <div className="ts-story-thumbs" aria-label="Choose a photo story">
            {photoStories.map((item, i) => (
              <button
                key={item.image}
                onClick={() => setIndex(i)}
                aria-label={`Show ${item.title}`}
                aria-pressed={i === index}
              >
                <TidePhoto id={item.image} sizes="150px" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const galleryIds = [
  "timber-room",
  "valley-balcony",
  "dining-window",
  "terrace",
  "doorway",
];
export function GalleryRail() {
  const c = usePremiumCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });
  const openPhoto = useTideGallery();
  return (
    <section className="ts-gallery-section ts-section" id="gallery">
      <TideTitle className="ts-center-title">
        Experience Mystic Mountain in pictures
      </TideTitle>
      <div
        className="ts-gallery-viewport"
        ref={c.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Hotel photographs"
        tabIndex={0}
        onKeyDown={c.onKeyDown}
      >
        <div className="ts-gallery-track">
          {galleryIds.map((id, i) => (
            <div
              className={`ts-gallery-slide ${i === c.state.index ? "is-selected" : ""}`}
              key={id}
              role="group"
              aria-label={`${i + 1} of ${galleryIds.length}`}
            >
              <button
                aria-label={`Open hotel photograph ${i + 1}`}
                tabIndex={c.state.visible.includes(i) ? 0 : -1}
                onClick={() => openPhoto(galleryIds, i)}
              >
                <TidePhoto id={id} sizes="70vw" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="ts-gallery-controls">
        <button
          onClick={c.prev}
          className="ts-circle-button"
          aria-label="Previous photograph"
        >
          <ArrowLeft />
        </button>
        <span className="sr-only" aria-live="polite">
          Photograph {c.state.index + 1} of {galleryIds.length}
        </span>
        <button
          onClick={c.next}
          className="ts-circle-button"
          aria-label="Next photograph"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const compact = useCompact();
  const reduced = useSiteMotion();
  const frame = useFrame();
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const width = useTransform(
    progress,
    [0.05, 0.7],
    [350, Math.max(350, frame.width - 40)],
  );
  const height = useTransform(
    progress,
    [0.05, 0.7],
    [460, Math.max(460, frame.height - 40)],
  );
  const opacity = useTransform(progress, [0.15, 0.55], [1, 0]);
  const textOpacity = useTransform(progress, [0.4, 0.7], [0, 1]);
  const scale = useTransform(progress, [0, 0.7], [1.14, 1]);
  const staticLayout = compact || reduced;
  return (
    <section
      ref={ref}
      className={`ts-closing ${staticLayout ? "is-static" : ""}`}
    >
      <div className="ts-closing-sticky">
        <m.div
          className="ts-closing-small ts-closing-small-one"
          style={staticLayout ? undefined : { opacity }}
        >
          <TidePhoto id="terrace" />
        </m.div>
        <m.div
          className="ts-closing-small ts-closing-small-two"
          style={staticLayout ? undefined : { opacity }}
        >
          <TidePhoto id="timber-window" />
        </m.div>
        <m.div
          className="ts-closing-small ts-closing-small-three"
          style={staticLayout ? undefined : { opacity }}
        >
          <TidePhoto id="dining-window" />
        </m.div>
        <div className="ts-closing-center">
          <m.div
            className="ts-closing-main"
            style={staticLayout ? undefined : { width, height }}
          >
            <m.div style={staticLayout ? undefined : { scale }}>
              <TidePhoto id="doorway" sizes="100vw" />
            </m.div>
          </m.div>
        </div>
        <m.div
          className="ts-closing-copy"
          style={staticLayout ? undefined : { opacity: textOpacity }}
        >
          <TideTitle>Ready for your mountain chapter?</TideTitle>
          <div>
            <p>
              Tell us when you would like to come. A warm room, a green horizon,
              and your own little corner of Kausani await your inquiry.
            </p>
            <ArrowLink to="/contact#plan">PLAN YOUR STAY</ArrowLink>
          </div>
        </m.div>
      </div>
    </section>
  );
}
