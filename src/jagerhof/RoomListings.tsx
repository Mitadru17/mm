import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowUpRight, Check, Expand } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import ArcCardCarousel from "@/components/ui/arc-card-carousel";
import { rooms, hotel, photos } from "@/data";
import { useSiteMotion } from "@/motion";
import { useTideGallery } from "@/tidescape/primitives";
import "./room-listings.css";

const shortNames = ["Timber & light", "An open outlook", "Warm interiors"];
/** Photographic room stories, not an invented inventory or availability feed. */
export default function RoomListings({
  onEnquire,
  standalone = false,
}: {
  onEnquire?: (roomId: string) => void;
  standalone?: boolean;
}) {
  const reduced = useSiteMotion(),
    navigate = useNavigate(),
    openGallery = useTideGallery();
  const [active, setActive] = useState(0);
  const items = useMemo(
    () =>
      rooms.map((room, roomIndex) => ({
        title: shortNames[roomIndex],
        src: "/images/" + room.image + "-960.webp",
        srcSet:
          "/images/" +
          room.image +
          "-480.webp 480w, /images/" +
          room.image +
          "-960.webp 960w, /images/" +
          room.image +
          "-1600.webp 1600w",
        alt: photos.find((photo) => photo.id === room.image)?.alt ?? room.title,
        roomIndex,
      })),
    [],
  );
  const selected = items[active],
    room = rooms[selected.roomIndex];
  const enquire = () =>
    onEnquire ? onEnquire(room.id) : navigate(`/contact?room=${room.id}#plan`);
  return (
    <section
      id={standalone ? "room-collection" : "stay"}
      className={`room-listings ${standalone ? "is-standalone" : ""}`}
      aria-labelledby={standalone ? "room-page-title" : "stay-title"}
    >
      <div className="rooms-layout">
        <m.div
          className="rooms-visual"
          initial={reduced ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: reduced ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ArcCardCarousel
            items={items}
            value={active}
            onIndexChange={setActive}
            step={18}
            radius={6}
            loop
            ariaLabel="Choose a room from the curved photo carousel"
          />
        </m.div>
        <div className="rooms-story">
          {!standalone && (
            <m.header
              className="rooms-heading"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduced ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <p className="jh-eyebrow">YOUR STAY, A LITTLE CLOSER</p>
                <h2 id="stay-title">
                  A room to return to.
                  <br />
                  <em>A view to remember.</em>
                </h2>
              </div>
            </m.header>
          )}
          <div
            className="rooms-collection-nav"
            role="group"
            aria-label="Choose a room story"
          >
            {rooms.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={i === selected.roomIndex}
                aria-label={`Explore ${shortNames[i]}`}
                onClick={() => {
                  setActive(items.findIndex((photo) => photo.roomIndex === i));
                }}
              >
                <span>0{i + 1}</span>
                <span className="room-tab-name">{shortNames[i]}</span>
              </button>
            ))}
          </div>
          <m.div
            className="room-detail-scene"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduced ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <article
              className="room-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={room.id}
                  className="room-detail-copy"
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{
                    duration: reduced ? 0 : 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="room-story-label">
                    ROOM PHOTOGRAPHS / 0{selected.roomIndex + 1}
                  </p>
                  <h3>{room.title}</h3>
                  <p className="room-description">{room.description}</p>
                  <ul aria-label="In the photographs">
                    {room.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="room-photo-thumbnails"
                    role="group"
                    aria-label="Room photographs"
                  >
                    {room.images.map((id, photoIndex) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openGallery(room.images, photoIndex)}
                        aria-label={`Open ${room.title} photograph ${photoIndex + 1}`}
                      >
                        <img
                          src={`/images/${id}-480.webp`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
              <button
                type="button"
                className="room-photos-action"
                onClick={() => openGallery(room.images, 0)}
              >
                View room photographs <Expand size={14} aria-hidden="true" />
              </button>
              <div className="room-rate">
                <span>YOUR DATES. YOUR STAY.</span>
                <strong>Rate on request</strong>
                <p>
                  Ask the hotel for the room options and total price for your
                  dates.
                </p>
              </div>
              <button
                type="button"
                className="jh-button room-enquire"
                onClick={enquire}
              >
                <span>Enquire about this stay</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <div className="room-secondary">
                <Link className="editorial-link" to={`/suites/${room.id}`}>
                  <span>View the room story</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a href={hotel.booking} target="_blank" rel="noreferrer">
                  Booking portal <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          </m.div>
          <div className="rooms-footnote">
            <p>
              Your exact room, view and current amenities are confirmed with the
              hotel when you enquire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
