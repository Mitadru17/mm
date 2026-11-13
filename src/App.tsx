import { lazy, Suspense, useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  X,
  Menu,
  Sun,
  Plus,
  MapPin,
  MoveUpRight,
  Phone,
} from "lucide-react";
import { hotel, photos, faqs, navigation as nav } from "./data";
import type { Room } from "./data";
import { PhotoImage, Lightbox, RoomDetail, Modal, GalleryTile } from "./ui";
import BookingInquiry from "./BookingInquiry";
import Brand from "./Brand";
import { goTo, useSmoothExperience } from "./experience";
import { Stays, Experiences } from "./Carousels";
import {
  CinematicHero as Hero,
  Arrival as About,
  DestinationChapter,
} from "./Cinematic";
import {
  EditorialHeading as Heading,
  ScrollProgress,
  MagneticLink,
  MotionPreferenceToggle,
} from "./motion";
const ModelCanvas = lazy(() => import("./ModelCanvas"));
function Star() {
  return (
    <span className="star" aria-hidden="true">
      ✦
    </span>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 60);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const content = [...document.querySelectorAll<HTMLElement>("main,footer")];
    content.forEach((e) => (e.inert = true));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keys = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const controls = [
          ...ref.current!.querySelectorAll<HTMLElement>("a,button"),
        ].filter((e) => e.getClientRects().length);
        const first = controls[0],
          last = controls.at(-1)!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keys);
    return () => {
      content.forEach((e) => (e.inert = false));
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keys);
      ref.current?.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
    };
  }, [open]);
  const link = ([label, id]: string[]) => (
    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
      {label}
    </a>
  );
  return (
    <header
      ref={ref}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <ScrollProgress />
      <nav className="header-left" aria-label="Main navigation">
        {nav.slice(0, 4).map(link)}
      </nav>
      <a className="brand" href="#home" aria-label="Mystic Mountain home">
        <Brand />
      </a>
      <nav className="header-right" aria-label="Plan your visit">
        {nav.slice(4).map(link)}
        <a className="header-book" href="#plan">
          Plan your stay <ArrowUpRight size={13} />
        </a>
        <span className="header-place">
          <Sun size={13} /> KAUSANI
        </span>
      </nav>
      <a className="mobile-book" href="#plan">
        BOOK A STAY <ArrowUpRight size={12} />
      </a>
      <button
        className="menu-toggle icon-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <m.nav
        className="mobile-nav"
        id="mobile-nav"
        hidden={!open}
        aria-label="Mobile navigation"
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8 }}
        transition={{ duration: 0.3 }}
      >
        {nav.map(link)}
        <a href="#plan" onClick={() => setOpen(false)}>
          Plan your stay <ArrowUpRight />
        </a>
        <span>YOUR OWN LITTLE WORLD · KAUSANI</span>
      </m.nav>
    </header>
  );
}
const stories = [
  {
    image: "valley-balcony",
    title: "Mountain mornings",
    copy: "Start with the clouds, a green horizon, and the luxury of a little more time.",
    label: "AT THE PROPERTY",
    href: "#gallery",
  },
  {
    image: "surroundings",
    title: "Tea country wanderings",
    copy: "Explore Kausani’s tea-estate surroundings and the little discoveries along the road.",
    label: "INDEPENDENT EXPLORATION",
    href: "https://uttarakhandtourism.gov.in/destination/kausani",
  },
  {
    image: "dining",
    title: "Together at the table",
    copy: "A window-side seat and an unhurried conversation in the hotel’s dining space.",
    label: "AT THE PROPERTY",
    href: "#dine",
  },
  {
    image: "doorway",
    title: "The art of doing less",
    copy: "An open door, a comfortable corner, and nowhere else you need to be.",
    label: "AT THE PROPERTY",
    href: "#stays",
  },
  {
    image: "terrace",
    title: "Out in the open",
    copy: "Take a little time outdoors, with the green hills unfolding beyond the terrace.",
    label: "AT THE PROPERTY",
    href: "#gallery",
  },
  {
    image: "arrival",
    title: "A little further afield",
    copy: "Follow the road to the historic temples of Baijnath and discover your own Kumaon.",
    label: "INDEPENDENT EXPLORATION",
    href: "https://uttarakhandtourism.gov.in/destination/baijnath",
  },
];

const dining = [
  {
    id: "dining",
    title: "The dining room",
    copy: "A place to gather, linger, and let the conversation run a little longer. Explore our dining space, and ask the hotel about the meals and timings available during your stay.",
  },
  {
    id: "lounge",
    title: "A quiet corner",
    copy: "Between a morning wander and an afternoon in the hills, find a comfortable corner to simply sit for a while.",
  },
  {
    id: "dining-window",
    title: "By the window",
    copy: "Pull up a seat by the glass and take in the green surroundings. Some of the best moments happen around a table.",
  },
];
function Dining() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="dining" id="dine">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">GOOD COMPANY. A DIFFERENT OUTLOOK.</p>
        <h2 className="editorial-heading dining-title" key={selected}>
          {dining[selected].title}
        </h2>
      </div>
      <div className="dining-collage" data-reveal>
        <button
          className="dining-side left"
          onClick={() => setSelected((selected + 2) % 3)}
          aria-label="Previous dining photograph"
        >
          <PhotoImage
            id={dining[(selected + 2) % 3].id}
            alt="Another corner of the hotel's dining and sitting spaces"
          />
          <span>
            <ArrowLeft size={20} />
          </span>
        </button>
        <figure className="dining-main" key={selected}>
          <PhotoImage
            id={dining[selected].id}
            alt={
              photos.find((p) => p.id === dining[selected].id)?.alt ||
              dining[selected].title
            }
          />
          <figcaption>
            {String(selected + 1).padStart(2, "0")} / 03{" "}
            <span>TIME, WELL SPENT.</span>
          </figcaption>
        </figure>
        <button
          className="dining-side right"
          onClick={() => setSelected((selected + 1) % 3)}
          aria-label="Next dining photograph"
        >
          <PhotoImage
            id={dining[(selected + 1) % 3].id}
            alt="Another view of the hotel's dining and sitting spaces"
          />
          <span>
            <ArrowRight size={20} />
          </span>
        </button>
      </div>
      <div className="dining-copy">
        <p>{dining[selected].copy}</p>
        <div className="venue-dots">
          {dining.map((item, i) => (
            <button
              key={item.id}
              className={selected === i ? "active" : ""}
              aria-label={`Dining photograph ${i + 1}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <a className="underline-link" href="#plan">
          MAKE YOURSELF AT HOME <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
function MountainArt() {
  const [show, setShow] = useState(false);
  return (
    <>
      <DestinationChapter onArt={() => setShow(true)} />
      {show && (
        <Modal
          title="Explore the mountain sculpture in 3D"
          onClose={() => setShow(false)}
          className="art-modal"
        >
          <p className="eyebrow">THE MYSTIC COLLECTION · ORIGINAL 3D STUDY</p>
          <h2>A little world of hills.</h2>
          <Suspense
            fallback={
              <div
                className="model-skeleton skeleton"
                aria-label="Loading the 3D sculpture"
              />
            }
          >
            <ModelCanvas />
          </Suspense>
          <p>
            Drag to rotate. Scroll or pinch to explore. An artistic sculpture,
            rather than a geographical map.
          </p>
        </Modal>
      )}
    </>
  );
}
function Gallery({
  onPhoto,
}: {
  onPhoto: (items: typeof photos, index: number) => void;
}) {
  const [category, setCategory] = useState("All"),
    [expanded, setExpanded] = useState(false);
  const filtered =
    category === "All" ? photos : photos.filter((p) => p.category === category);
  const visible = expanded ? filtered : filtered.slice(0, 6);
  return (
    <section className="gallery" id="gallery">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">POSTCARDS FROM MYSTIC MOUNTAIN</p>
        <Heading first="A little look" second="into our world." />
      </div>
      <div className="gallery-filters" aria-label="Filter photographs">
        {["All", "Rooms", "Views", "Dining", "Property", "Surroundings"].map(
          (c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setExpanded(false);
              }}
            >
              {c}
            </button>
          ),
        )}
      </div>
      <div className="gallery-grid journal-grid" key={category}>
        {visible.map((p, i) => (
          <GalleryTile
            key={p.id}
            photo={p}
            onClick={() => onPhoto(filtered, i)}
          />
        ))}
      </div>
      <div className="gallery-bottom">
        <span>REAL PLACES. LITTLE MOMENTS. ALL RIGHT HERE.</span>
        {filtered.length > 6 && (
          <button
            className="underline-link"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "A SMALLER COLLECTION" : "THE FULL COLLECTION"}{" "}
            <Plus size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
function Location() {
  return (
    <section className="location" id="location">
      <figure className="location-image" data-reveal>
        <PhotoImage
          id="arrival"
          alt="The road and entrance to Hotel Mystic Mountain Kausani"
        />
        <a
          className="location-pin"
          href={hotel.maps}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={18} />
          <span>
            MYSTIC MOUNTAIN<small>BAIJNATH ROAD · KAUSANI</small>
          </span>
          <ArrowUpRight size={19} />
        </a>
      </figure>
      <div className="location-copy" data-reveal>
        <p className="eyebrow">THE ROAD TO A SLOWER DAY</p>
        <Heading first="A journey" second="worth taking." />
        <p>
          Follow the road into Kumaon’s green hills. You’ll find us opposite the
          Tea Factory on Baijnath Road, with Kausani’s tea country waiting
          outside.
        </p>
        <address>{hotel.address}</address>
        <a
          className="underline-link"
          href={hotel.maps}
          target="_blank"
          rel="noreferrer"
        >
          FIND YOUR WAY HERE <ArrowUpRight size={14} />
        </a>
        <a className="location-phone" href={hotel.phoneHref}>
          <Phone size={14} />
          {hotel.phone}
        </a>
      </div>
    </section>
  );
}
function Practical() {
  return (
    <section className="practical">
      <div>
        <p className="eyebrow">THE LITTLE THINGS</p>
        <Heading first="Before you" second="make your escape." />
        <p>
          Read the stories of people who have stayed with us, and find a little
          help planning your own.
        </p>
        <a
          className="underline-link"
          href={hotel.reviews}
          target="_blank"
          rel="noreferrer"
        >
          GUEST STORIES ON MAKEMYTRIP <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={17} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Reservation() {
  return (
    <section className="reservations">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">YOUR MOUNTAIN CHAPTER</p>
        <Heading first="Reserve a little time" second="for yourself." />
        <p>
          Tell us when you’d like to come. We’ll help you find your place in the
          hills.
        </p>
      </div>
      <BookingInquiry />
    </section>
  );
}
function Closing() {
  return (
    <section className="closing">
      <div className="closing-picture one">
        <PhotoImage
          id="valley-portrait"
          alt="The hotel terrace swing facing the green hills"
        />
      </div>
      <div className="closing-picture two">
        <PhotoImage
          id="timber-window"
          alt="Light through the balcony windows of a timber room"
        />
      </div>
      <div className="closing-picture three">
        <PhotoImage id="dining-window" alt="A window-side table at the hotel" />
      </div>
      <div className="closing-picture four">
        <PhotoImage id="terrace-sign" alt="Kausani sign at the hotel terrace" />
      </div>
      <div className="closing-copy" data-reveal>
        <p className="eyebrow">UNTIL WE MEET IN THE MOUNTAINS</p>
        <h2>See you in the hills.</h2>
        <p>Come for the view. Stay for the feeling.</p>
        <MagneticLink className="round-cta" href="#plan">
          <MoveUpRight size={25} />
          <span>
            BEGIN YOUR
            <br />
            LITTLE ESCAPE
          </span>
        </MagneticLink>
      </div>
    </section>
  );
}
function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer>
      <div className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              THE ART OF SLOWING DOWN <Star /> KAUSANI · UTTARAKHAND <Star /> A
              LITTLE CLOSER TO THE CLOUDS <Star />
            </span>
          ))}
        </div>
      </div>
      <div className="footer-content">
        <div className="footer-contact">
          <p className="eyebrow">LET’S MAKE A LITTLE ESCAPE HAPPEN.</p>
          <h3>
            A note from you.
            <br />
            <em>A mountain morning to come.</em>
          </h3>
          <a className="footer-email" href={`mailto:${hotel.email}`}>
            {hotel.email}
            <ArrowUpRight size={18} />
          </a>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
        </div>
        <div className="footer-clock">
          <p className="eyebrow">KAUSANI LOCAL TIME</p>
          <span>{time || "—"}</span>
          <p>
            In the Kumaon hills.
            <br />A little further from the everyday.
          </p>
          <a href={hotel.maps} target="_blank" rel="noreferrer">
            FIND US <ArrowUpRight size={13} />
          </a>
        </div>
        <nav aria-label="Footer navigation">
          <p className="eyebrow">DISCOVER</p>
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-plan">
          <p className="eyebrow">PLAN YOUR VISIT</p>
          <a href="#plan">Stay inquiries</a>
          <a href={hotel.booking} target="_blank" rel="noreferrer">
            Booking portal <ArrowUpRight size={12} />
          </a>
          <address>{hotel.address}</address>
        </div>
      </div>
      <a
        className="footer-wordmark"
        href="#home"
        aria-label="Mystic Mountain back to top"
      >
        Mystic Mountain
      </a>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hotel Mystic Mountain Kausani</span>
        <MotionPreferenceToggle />
        <a href="#home">
          BACK TO TOP <ArrowUpRight size={12} />
        </a>
      </div>
    </footer>
  );
}
export default function App() {
  useSmoothExperience();
  const [room, setRoom] = useState<Room | null>(null),
    [lightbox, setLightbox] = useState<{
      items: typeof photos;
      index: number;
    } | null>(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Stays onDetail={setRoom} />
        <MountainArt />
        <Experiences stories={stories} />
        <Dining />
        <Gallery onPhoto={(items, index) => setLightbox({ items, index })} />
        <Location />
        <Practical />
        <Reservation />
        <Closing />
      </main>
      <Footer />
      {room && (
        <RoomDetail
          room={room}
          onClose={() => setRoom(null)}
          onInquire={() => {
            setRoom(null);
            requestAnimationFrame(() =>
              goTo("plan", '[aria-label="Check-in date"]'),
            );
          }}
        />
      )}
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          initial={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
