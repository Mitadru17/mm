import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { hotel, photos, faqs } from "../data";
import type { Photo } from "../data";
import { Lightbox, Modal, PhotoImage } from "../ui";
import { useSiteMotion } from "../motion";
import { goTo, resetPageScroll, useSmoothExperience } from "../experience";
import { GalleryActions, TideLink } from "../tidescape/primitives";
import { SoftCursor } from "../components/SoftCursor";
import { ScrollTrigger } from "../bend/animation";
import { useJagerhofMotion } from "./motion";
import { ExperiencesCarousel } from "./ExperiencesCarousel";
import { ArrivalHero, shouldShowArrival } from "./ArrivalHero";
import { SiteMenu } from "./SiteMenu";
import { SignatureFooter } from "./SignatureFooter";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

const LegacyPages = lazy(() => import("../bend/LegacyPages"));
const BookingInquiry = lazy(() => import("../BookingInquiry"));
const LocationSection = lazy(() =>
  import("../map/LocationSection").then((m) => ({
    default: m.LocationSection,
  })),
);
const alt = (id: string) =>
  photos.find((photo) => photo.id === id)?.alt || hotel.name;
function Image({
  id,
  eager = false,
  sizes,
}: {
  id: string;
  eager?: boolean;
  sizes?: string;
}) {
  return <PhotoImage id={id} alt={alt(id)} eager={eager} sizes={sizes} />;
}
function Action({
  to,
  children,
  onClick,
  className = "",
}: {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </>
  );
  return to ? (
    <TideLink className={`jh-button ${className}`} to={to}>
      {inner}
    </TideLink>
  ) : (
    <button className={`jh-button ${className}`} onClick={onClick}>
      {inner}
    </button>
  );
}
function Header({
  onBook,
  entering,
}: {
  onBook: () => void;
  entering: boolean;
}) {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setSolid(window.scrollY > 60);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <>
      <header
        inert={entering}
        className={`jh-header ${solid || pathname !== "/" ? "is-solid" : ""}`}
      >
        <button
          ref={trigger}
          className="arrival-menu-trigger"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="arrival-menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>MENU</span>
        </button>
        <Link
          to="/"
          className="arrival-wordmark"
          aria-label="Hotel Mystic Mountain Kausani home"
        >
          <span>MYSTIC</span>
          <small>MOUNTAIN · KAUSANI</small>
        </Link>
        <button
          className="arrival-enquire"
          aria-label="Enquire about your stay"
          onClick={onBook}
        >
          ENQUIRE
        </button>
      </header>
      <SiteMenu
        open={open}
        compact={solid || pathname !== "/"}
        trigger={trigger}
        onClosed={() => setOpen(false)}
        onBook={onBook}
      />
    </>
  );
}
function Intro() {
  const [active, setActive] = useState(-1);
  const reduced = useSiteMotion();
  const root = useRef<HTMLElement>(null);
  const link = (text: string, to: string, index: number) => (
    <TideLink
      to={to}
      onFocus={() => setActive(index)}
      onBlur={() => setActive(-1)}
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(-1)}
    >
      {text}
    </TideLink>
  );
  return (
    <section id="main" ref={root} className="jh-intro">
      <div data-jh-reveal>
        <h2 className="jh-eyebrow">EXPERIENCE LIFE AT MYSTIC MOUNTAIN</h2>
        <div className={`jh-intro-stage ${active >= 0 ? "has-preview" : ""}`}>
          <p className="jh-intro-text">
            Find {link("your room", "/suites", 0)} in{" "}
            {link("the mountains,", "#nature", 1)} linger{" "}
            {link("around the table,", "#dine", 2)} and let{" "}
            {link("our little corner of Kausani", "/about", 3)} become part of
            your story.
          </p>
          {["timber-room", "valley-portrait", "dining", "terrace"].map(
            (id, i) => (
              <div
                key={id}
                className={`jh-intro-photo is-${i} ${active === i ? "is-visible" : ""}`}
                aria-hidden="true"
                style={reduced ? { transitionDuration: "0.15s" } : undefined}
              >
                <Image id={id} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
type Chapter = {
  id: string;
  label: string;
  title: string;
  copy: string;
  image: string;
  inset: string;
  button: string;
  to?: string;
  reverse?: boolean;
};
const chapters: Chapter[] = [
  {
    id: "stay",
    label: "A STAY THAT FEELS LIKE YOU",
    title: "A little space. A different pace.",
    copy: "Timber-lined rooms, bright windows and corners to settle into. Explore our actual room photographs, then speak to the hotel about the right stay for your dates.",
    image: "timber-room",
    inset: "timber-detail",
    button: "Find your mountain stay",
    reverse: true,
  },
  {
    id: "nature",
    label: "NATURE",
    title: "Where the hills feel like home.",
    copy: "The wooded slopes and open skies of Kausani are part of the everyday view here. Take a little time to look out, wander nearby and find your own way into Kumaon.",
    image: "valley-portrait",
    inset: "valley-balcony",
    button: "Discover the setting",
    to: "/activities",
  },
  {
    id: "dine",
    label: "AROUND THE TABLE",
    title: "Good company. An open outlook.",
    copy: "Gather in the hotel's dining space, where timber tables meet hillside windows. Browse the photographs and ask the team about the meals available during your stay.",
    image: "dining",
    inset: "dining-window",
    button: "Explore the dining space",
    to: "/gallery#dining",
    reverse: true,
  },
  {
    id: "explore",
    label: "A LITTLE CURIOSITY GOES A LONG WAY",
    title: "Days out. Stories to bring home.",
    copy: "The Tea Factory is opposite the hotel, while Anasakti Ashram and the Sumitranandan Pant Museum are places to discover around Kausani. Find your bearings with our illustrated nearby guide.",
    image: "surroundings",
    inset: "arrival",
    button: "Discover Kausani",
    to: "#place",
  },
  {
    id: "unwind",
    label: "SLOW DOWN",
    title: "Settle in. Switch off. Stay awhile.",
    copy: "A quiet corner by the window. A view from the balcony. An evening without a full itinerary. Take a closer look at the places to pause inside and around Mystic Mountain.",
    image: "room-view",
    inset: "doorway",
    button: "Find your quiet corner",
    to: "/gallery",
    reverse: true,
  },
];
function PhotoChapter({
  chapter,
  onBook,
}: {
  chapter: Chapter;
  onBook: () => void;
}) {
  return (
    <section
      id={chapter.id}
      className={`jh-chapter ${chapter.reverse ? "is-reversed" : ""}`}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="jh-chapter-copy">
        <h2 className="jh-eyebrow" data-jh-reveal>
          {chapter.label}
        </h2>
        <h3 className="jh-display" id={`${chapter.id}-title`} data-jh-heading>
          {chapter.title.includes(". ") ? (
            <>
              <span>{chapter.title.split(". ")[0]}.</span>
              <br />
              <em>{chapter.title.split(". ").slice(1).join(". ")}</em>
            </>
          ) : (
            chapter.title
          )}
        </h3>
        <div className="jh-chapter-description" data-jh-reveal>
          <p>{chapter.copy}</p>
          <Action to={chapter.to} onClick={onBook}>
            {chapter.button}
          </Action>
        </div>
      </div>
      <Link
        className="jh-collage"
        to={chapter.to || "/suites"}
        aria-label={`See more: ${chapter.title}`}
      >
        <div className="jh-collage-back">
          <Image id={chapter.image} sizes="(max-width: 767px) 100vw, 51vw" />
        </div>
        <div className="jh-collage-front">
          <Image id={chapter.inset} sizes="(max-width: 767px) 36vw, 16vw" />
        </div>
      </Link>
    </section>
  );
}
function Marquee() {
  return (
    <section className="jh-marquee" aria-label="Mountain air, slower days">
      <div className="jh-marquee-top" aria-hidden="true">
        <span>mountain air</span>
        <div>
          <Image id="valley-balcony" />
        </div>
      </div>
      <div className="jh-marquee-bottom" aria-hidden="true">
        <div>
          <Image id="room-warm" />
        </div>
        <span>slower days</span>
      </div>
    </section>
  );
}
function GuestSection() {
  return (
    <section id="faq" className="jh-guests">
      <div className="jh-guest-copy" data-jh-reveal>
        <h2 className="jh-eyebrow">REAL STAYS. REAL PERSPECTIVES.</h2>
        <h3 className="jh-display" data-jh-heading>
          Before you make
          <br />
          yourself at home.
        </h3>
        <p>
          Read guest experiences on MakeMyTrip, or find a few useful answers
          before you plan your own stay.
        </p>
        <Action to={hotel.reviews}>Read guest experiences</Action>
      </div>
      <div className="jh-faq" data-jh-reveal>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus className="jh-faq-plus" size={17} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Location() {
  const [map, setMap] = useState(false);
  const reduced = useSiteMotion();
  useEffect(() => {
    if (!map) return;
    const frame = requestAnimationFrame(() => goTo("jh-map"));
    return () => cancelAnimationFrame(frame);
  }, [map]);
  return (
    <>
      <section id="place" className="jh-grow">
        <div className="jh-grow-visual">
          <div className="jh-grow-photo">
            <Image id="valley-portrait" sizes="100vw" />
          </div>
          <div className="jh-grow-shade" />
          <div className="jh-grow-copy">
            <h2 className="jh-eyebrow">OUR LITTLE CORNER OF KUMAON</h2>
            <h3 className="jh-display">
              All roads lead
              <br />
              to a slower day.
            </h3>
            <p>{hotel.address}</p>
            <div>
              <Action to={hotel.maps}>Get directions</Action>
              <button
                className="jh-outline"
                aria-expanded={map}
                aria-controls="jh-map"
                onClick={() => setMap((v) => !v)}
              >
                {map ? "Close nearby guide" : "Explore nearby"}
                {map ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence initial={false}>
        {map && (
          <m.div
            key="location-map"
            id="jh-map"
            className="jh-map"
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 8 }}
            transition={{
              duration: reduced ? 0.15 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Suspense
              fallback={<p role="status">Opening the Kausani nearby guide…</p>}
            >
              <LocationSection />
            </Suspense>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default function JagerhofApp() {
  useSmoothExperience(1.15);
  const { pathname } = useLocation();
  const root = useJagerhofMotion(pathname);
  const [entering, setEntering] = useState(
    () => pathname === "/" && shouldShowArrival(),
  );
  const finishArrival = useCallback(() => setEntering(false), []);
  const [booking, setBooking] = useState(false);
  const [lightbox, setLightbox] = useState<{
    items: Photo[];
    index: number;
  } | null>(null);
  const openPhoto = useCallback(
    (ids: string[], index: number) =>
      setLightbox({
        items: ids.map(
          (id) =>
            photos.find((p) => p.id === id) || {
              id,
              alt: alt(id),
              caption: "Mystic Mountain",
              category: "Hotel photography",
            },
        ),
        index,
      }),
    [],
  );
  useEffect(() => {
    setLightbox(null);
    if (pathname !== "/") setEntering(false);
    document.title = `${pathname === "/" ? "Welcome Home to the Mountains" : "Discover Your Stay"} — ${hotel.name}`;
    let disposed = false;
    let observer: MutationObserver | undefined;
    const finish = () => {
      const title = root.current?.querySelector<HTMLElement>("h1");
      if (!title) return false;
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
      ScrollTrigger.refresh();
      resetPageScroll(location.hash);
      return true;
    };
    void document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        if (disposed) return;
        if (!finish()) {
          observer = new MutationObserver(() => {
            if (finish()) observer?.disconnect();
          });
          observer.observe(root.current!, { childList: true, subtree: true });
        }
      }),
    );
    return () => {
      disposed = true;
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <GalleryActions.Provider value={openPhoto}>
      <div ref={root} className="jh-site">
        <a
          href={pathname === "/" ? "#main" : "#page-content"}
          className="ts-skip-link"
          inert={entering}
        >
          Skip to content
        </a>
        <SoftCursor />
        <Header onBook={() => setBooking(true)} entering={entering} />
        {pathname === "/" ? (
          <>
            <ArrivalHero initialEntry={entering} onReady={finishArrival} />
            <main inert={entering}>
              <Intro />
              <ExperiencesCarousel />
              {chapters.map((chapter) => (
                <PhotoChapter
                  key={chapter.id}
                  chapter={chapter}
                  onBook={() => setBooking(true)}
                />
              ))}
              <Marquee />
              <GuestSection />
              <Location />
            </main>
          </>
        ) : (
          <main id="page-content" className="jh-supporting bend-legacy">
            <Suspense
              fallback={
                <p className="jh-loading" role="status">
                  Opening your mountain chapter…
                </p>
              }
            >
              <LegacyPages />
            </Suspense>
          </main>
        )}
        <SignatureFooter onBook={() => setBooking(true)} entering={entering} />
        {booking && (
          <Modal
            title="Plan your stay"
            className="jh-booking-modal"
            onClose={() => setBooking(false)}
          >
            <Suspense
              fallback={<p role="status">Opening your stay planner…</p>}
            >
              <BookingInquiry />
            </Suspense>
          </Modal>
        )}
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            initial={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </div>
    </GalleryActions.Provider>
  );
}
