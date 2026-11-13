import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  DoorOpen,
  Mountain,
  Maximize2,
  Sun,
} from "lucide-react";
import { hotel, rooms } from "../data";
import { GlassCard } from "../components/GlassCard";
import BlurText from "../components/react-bits/BlurText";
import { MountainMark } from "../ui";
import { useSiteMotion } from "../motion";
import { usePremiumCarousel } from "../carousel";
import { activities, comforts, photoStories } from "./data";
import {
  ArrowLink,
  DepthPhoto,
  ease,
  Reveal,
  TideLink,
  TidePhoto,
  TideTitle,
  useTideGallery,
} from "./primitives";

export function CollageHero() {
  return (
    <section
      className="ts-banner"
      id="home"
      aria-label="Welcome to Mystic Mountain"
    >
      <DepthPhoto id="balcony" hero />
      <div className="ts-banner-inner">
        <h1 className="ts-wordmark" data-page-title tabIndex={-1}>
          <BlurText text="Mystic" />
          <BlurText text="Mountain" />
        </h1>
        <div className="ts-hero-bottom">
          <p className="ts-hero-tagline">
            Closer to the hills.
            <br />
            Closer to yourself.
          </p>
          <TideLink to="#about" className="ts-explore-pill">
            Explore{" "}
            <span>
              <ArrowDown size={18} />
            </span>
          </TideLink>
          <p className="ts-hero-location">
            A slower kind of stay in Kausani.
            <br />
            Uttarakhand, India.
          </p>
        </div>
      </div>
    </section>
  );
}
export function Welcome() {
  const openPhoto = useTideGallery();
  return (
    <section className="ts-welcome ts-section" id="about">
      <div className="ts-welcome-copy">
        <Reveal>
          <p className="ts-kicker">
            <MountainMark /> Welcome to the mountains
          </p>
          <TideTitle>
            A little more nature.
            <br />A little more you.
          </TideTitle>
          <p>
            Find warm timber interiors, green horizons, and a quieter pace in
            the Kumaon hills. On Baijnath Road, opposite the Tea Factory, Mystic
            Mountain is a place to return to after a day of discovery.
          </p>
          <ArrowLink to="/about">Our story</ArrowLink>
        </Reveal>
      </div>
      <Reveal className="ts-welcome-photo">
        <button
          className="ts-welcome-photo-button"
          aria-label="Expand welcome photograph"
          onClick={() => openPhoto(["doorway", "balcony", "timber-room"], 0)}
        >
          <TidePhoto id="doorway" sizes="(max-width:767px) 100vw, 50vw" />
          <span className="ts-photo-label">
            Your own corner of Kausani{" "}
            <Maximize2 size={15} aria-hidden="true" />
          </span>
        </button>
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
            <Icon size={18} strokeWidth={1.25} aria-hidden="true" />
            {feature}
          </li>
        );
      })}
    </ul>
  );
}
export function PinnedRooms() {
  return (
    <section className="ts-room-section ts-section" id="stays">
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">01 / Stay a little</p>
          <TideTitle>Room to slow down.</TideTitle>
        </div>
        <ArrowLink to="/suites">Explore our rooms</ArrowLink>
      </div>
      <div className="ts-room-static">
        {rooms.map((room, index) => (
          <GlassCard
            className="ts-room-card"
            key={room.id}
            direction={index % 2 ? "down" : "up"}
          >
            <TideLink to={`/suites/${room.id}`} className="ts-room-large">
              <TidePhoto id={room.images[0]} />
              <span className="ts-card-index">0{index + 1}</span>
              <span className="ts-card-open" aria-hidden="true">
                ↗
              </span>
            </TideLink>
            <div className="ts-room-description">
              <h3>{room.title}</h3>
              <p>{room.description}</p>
            </div>
            <RoomFeatures index={index} />
            <ArrowLink to={`/suites/${room.id}`}>Take a closer look</ArrowLink>
          </GlassCard>
        ))}
      </div>
      <p className="ts-room-note">
        A photographic introduction. Room categories, views and availability are
        confirmed on inquiry.
      </p>
    </section>
  );
}
export function Activities({ page = false }: { page?: boolean }) {
  return (
    <section
      className={`ts-activities ts-section ${page ? "ts-activities-page" : ""}`}
      id="activities"
    >
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">02 / Outside, at your pace</p>
          <TideTitle>Let the hills lead.</TideTitle>
        </div>
        <ArrowLink to="/activities">Explore Kausani</ArrowLink>
      </div>
      <div className="ts-activity-grid">
        {activities.map((item, i) => (
          <GlassCard
            key={item.title}
            className="ts-activity"
            direction={i % 2 ? "down" : "up"}
          >
            <TideLink to={item.href}>
              <div className="ts-activity-photo">
                <TidePhoto id={item.image} />
                <span className="ts-card-index">0{i + 1}</span>
              </div>
              <h3>
                {item.title}
                <span aria-hidden="true">↗</span>
              </h3>
            </TideLink>
            <p>{item.copy}</p>
          </GlassCard>
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
  return (
    <section className="ts-film ts-section" aria-label="The Kumaon landscape">
      <div className="ts-film-sticky">
        <DepthPhoto id="valley-balcony" />
        <div className="ts-film-title">
          <p className="ts-kicker">A different outlook</p>
          <h2>
            Less hurry.
            <br />
            More horizon.
          </h2>
          <p>Make a little room for the mountains.</p>
        </div>
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
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">03 / Make yourself at home</p>
          <TideTitle>The spaces in between.</TideTitle>
        </div>
        <ArrowLink to="/services">Hotel spaces</ArrowLink>
      </div>
      <div>
        {comforts.map((item, index) => (
          <Reveal className="ts-comfort-row" key={item.title}>
            <h3>
              <span className="ts-caption">0{index + 1}</span>
              {item.title}
            </h3>
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
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">04 / A little closer</p>
          <TideTitle>Life at Mystic Mountain.</TideTitle>
        </div>
      </div>
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
              transition={{ duration: reduced ? 0 : 0.15, ease }}
            >
              <TidePhoto id={story.image} />
            </m.div>
          </AnimatePresence>
        </button>
        <div className="ts-story-right">
          <m.div
            key={index}
            aria-live="polite"
            initial={reduced ? false : { opacity: 0.65, y: 7.5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.15, ease }}
          >
            <h3>{story.copy}</h3>
            <h4>{story.title}</h4>
            <p>{story.label}</p>
            <ArrowLink to={hotel.reviews}>Read guest stories</ArrowLink>
          </m.div>
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
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">05 / Through our lens</p>
          <TideTitle>Picture yourself here.</TideTitle>
        </div>
        <ArrowLink to="/gallery">All photographs</ArrowLink>
      </div>
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
        <span aria-live="polite">
          {String(c.state.index + 1).padStart(2, "0")}{" "}
          <span className="ts-caption">/ 05</span>
        </span>
        <button
          onClick={c.next}
          className="ts-circle-button"
          aria-label="Next photograph"
        >
          <ArrowRight />
        </button>
      </div>
      <div className="ts-gallery-dots" aria-label="Choose a gallery photograph">
        {galleryIds.map((id, index) => (
          <button
            key={id}
            aria-label={`Go to photograph ${index + 1}`}
            aria-pressed={index === c.state.index}
            onClick={() => c.to(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}
export function Closing() {
  return (
    <section className="ts-closing ts-section">
      <div className="ts-closing-sticky">
        <DepthPhoto id="terrace" />
        <div className="ts-closing-copy">
          <p className="ts-kicker">Your next chapter</p>
          <TideTitle>The hills are calling.</TideTitle>
          <div>
            <p>
              Tell us when you would like to come. Find your own little corner
              of Kausani, and a little more time for yourself.
            </p>
            <ArrowLink to="/contact#plan">Plan your stay</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
