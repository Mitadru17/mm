import { useSiteMotion } from "./motion";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
} from "lucide-react";
import { photos, rooms } from "./data";
import type { Room } from "./data";
import { PhotoImage } from "./ui";
import { EditorialHeading, MagneticLink } from "./motion";
import { usePremiumCarousel } from "./carousel";

export function Stays({ onDetail }: { onDetail: (room: Room) => void }) {
  const [selected, setSelected] = useState(0);
  const room = rooms[selected];
  const carousel = usePremiumCarousel({ loop: true });
  const reduced = useSiteMotion();
  useEffect(() => {
    if (!carousel.api) return;
    carousel.api.reInit();
    carousel.api.scrollTo(0, true);
  }, [carousel.api, room.id]);
  return (
    <section id="stays" className="room-theatre" aria-label="Explore our rooms">
      <div
        className="room-photo-viewport"
        ref={carousel.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Room photographs"
        tabIndex={0}
        onKeyDown={carousel.onKeyDown}
      >
        <div className="room-photo-track">
          {room.images.map((id, i) => (
            <div
              className="room-photo-slide"
              key={id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${room.images.length}`}
              aria-hidden={carousel.state.index !== i}
            >
              <PhotoImage
                id={id}
                alt={
                  photos.find((p) => p.id === id)?.alt ||
                  `Inside ${room.title.toLowerCase()} at Mystic Mountain`
                }
                eager={carousel.state.index === i}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="room-vignette" />
      <div className="room-theatre-top">
        <p className="eyebrow">ROOMS & QUIET CORNERS</p>
        <EditorialHeading
          first="Your own little place"
          second="to relax & unwind."
        />
        <div
          className="room-tabs"
          role="tablist"
          aria-label="Explore room photography"
        >
          {rooms.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === selected}
              tabIndex={i === selected ? 0 : -1}
              aria-controls="room-panel"
              id={`room-tab-${r.id}`}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const n =
                    (selected +
                      (e.key === "ArrowRight" ? 1 : -1) +
                      rooms.length) %
                    rooms.length;
                  setSelected(n);
                  document.getElementById(`room-tab-${rooms[n].id}`)?.focus();
                }
              }}
            >
              {["Timber rooms", "The mountain outlook", "A softer landing"][i]}
              {selected === i && (
                <m.span
                  className="tab-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="theatre-arrows">
        <m.button
          aria-label="Previous room image"
          onClick={carousel.prev}
          whileTap={{ scale: 0.95 }}
        >
          <span>PREV</span>
          <ChevronLeft />
          <i />
        </m.button>
        <m.button
          aria-label="Next room image"
          onClick={carousel.next}
          whileTap={{ scale: 0.95 }}
        >
          <i />
          <ChevronRight />
          <span>NEXT</span>
        </m.button>
      </div>
      <div
        className="room-information"
        id="room-panel"
        role="tabpanel"
        aria-labelledby={`room-tab-${room.id}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={room.id}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <h3>{room.title}</h3>
            <p>{room.description}</p>
            <span className="eyebrow">IN THE PHOTOGRAPHS</span>
            <div className="feature-pills">
              {room.features.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
            <button className="underline-link" onClick={() => onDetail(room)}>
              TAKE A CLOSER LOOK <ArrowUpRight size={16} />
            </button>
          </m.div>
        </AnimatePresence>
      </div>
      <div className="room-bottom">
        <span className="room-photo-index" aria-live="polite">
          {String(carousel.state.index + 1).padStart(2, "0")}
          <i>/0{room.images.length}</i>
        </span>
        <div className="room-dots" aria-label="Choose room photograph">
          {room.images.map((id, i) => (
            <button
              key={id}
              aria-label={`Room photograph ${i + 1}`}
              aria-current={carousel.state.index === i ? "true" : undefined}
              onClick={() => carousel.to(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <span className="room-drag-hint">
          <GripHorizontal size={16} /> Drag or swipe to explore
        </span>
        <MagneticLink href="#plan" className="round-cta">
          <ArrowUpRight size={27} />
          <span>
            INQUIRE
            <br />
            ABOUT A STAY
          </span>
        </MagneticLink>
      </div>
      <p className="room-disclaimer">
        A photographic introduction. Room category, views & availability
        confirmed on inquiry.
      </p>
    </section>
  );
}
type Story = {
  image: string;
  title: string;
  copy: string;
  label: string;
  href: string;
};
export function Experiences({ stories }: { stories: Story[] }) {
  const c = usePremiumCarousel({ align: "start", loop: false });
  const reduced = useSiteMotion();
  return (
    <section id="experience" className="experiences">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">THE MYSTIC WAY OF LIFE</p>
        <EditorialHeading first="A slower kind" second="of everyday." />
        <p>
          From a morning on the balcony to a little wander in tea country — a
          collection of moments to be slowly lived and fondly remembered.
        </p>
      </div>
      <div
        className="experience-viewport"
        ref={c.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Kausani moments"
        tabIndex={0}
        onKeyDown={c.onKeyDown}
      >
        <div className="experience-track">
          {stories.map((story, i) => (
            <article
              className="experience-card"
              key={story.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${stories.length}`}
            >
              <a
                href={story.href}
                tabIndex={c.state.visible.includes(i) ? 0 : -1}
                {...(story.href.startsWith("https")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <div className="experience-photo">
                  <PhotoImage
                    id={story.image}
                    alt={
                      photos.find((p) => p.id === story.image)?.alt ||
                      story.title
                    }
                  />
                  <span className="experience-count">0{i + 1} / 06</span>
                  <span className="experience-open">
                    <ArrowUpRight size={23} />
                  </span>
                </div>
                <p className="eyebrow">{story.label}</p>
                <h3>{story.title}</h3>
                <p>{story.copy}</p>
              </a>
            </article>
          ))}
        </div>
      </div>
      <div className="rail-controls">
        <div className="rail-progress">
          <m.span
            animate={{
              scaleX: c.state.total ? (c.state.index + 1) / c.state.total : 0,
            }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 25 }
            }
          />
        </div>
        <span aria-live="polite">
          {String(c.state.index + 1).padStart(2, "0")}{" "}
          <i>/ {String(c.state.total || stories.length).padStart(2, "0")}</i>
        </span>
        <m.button
          className="icon-button"
          aria-label="Previous experience"
          onClick={c.prev}
          disabled={!c.state.prev}
          whileHover={reduced ? undefined : { scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
        >
          <ArrowLeft size={20} />
        </m.button>
        <m.button
          className="icon-button"
          aria-label="Next experience"
          onClick={c.next}
          disabled={!c.state.next}
          whileHover={reduced ? undefined : { scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
        >
          <ArrowRight size={20} />
        </m.button>
      </div>
      <p className="carousel-instruction">
        <GripHorizontal size={16} /> Drag, swipe, or use the arrow keys
      </p>
      <p className="destination-note">
        Local outings are independent suggestions. Ask about access, opening
        times and transport before setting out.
      </p>
    </section>
  );
}
