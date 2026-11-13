import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { hotel, photos } from "../data";
import type { Photo } from "../data";
import { Lightbox, Modal, MountainMark, PhotoImage } from "../ui";
import { MotionPreferenceToggle } from "../motion";
import { resetPageScroll, useSmoothExperience } from "../experience";
import {
  GalleryActions,
  TideLink,
  useTideGallery,
} from "../tidescape/primitives";
import { Magnet } from "../components/react-bits/Magnet";
import { SoftCursor } from "../components/SoftCursor";
import { PremiumHero } from "./PremiumHero";
import { GlareHover } from "../components/react-bits/GlareHover";
import { referenceMotion, ScrollTrigger } from "./animation";
import {
  ReferenceStatement as Statement,
  ReferenceStories as StickyStories,
  ReferencePillars,
  ReferenceEntrance as Entrance,
} from "./MotionScenes";

const LegacyPages = lazy(() => import("./LegacyPages"));
const BookingInquiry = lazy(() => import("../BookingInquiry"));
const LocationSection = lazy(() =>
  import("../map/LocationSection").then((module) => ({
    default: module.LocationSection,
  })),
);
const pillars = [
  {
    label: "The Rooms",
    title: "Timber, Mountain Light. A Softer Place to Land.",
    image: "timber-room",
    ids: ["timber-room", "room-view", "room-warm"],
  },
  {
    label: "The Dining Space",
    title: "Gather Around the Table. Let the Hills Set the Scene.",
    image: "dining-window",
    ids: ["dining-window", "dining", "lounge"],
  },
  {
    label: "The Setting",
    title: "Kausani at Your Door. Kumaon All Around.",
    image: "valley-portrait",
    ids: ["valley-portrait", "valley-balcony", "terrace"],
  },
];
function photoAlt(id: string) {
  return (
    photos.find((photo) => photo.id === id)?.alt ||
    "Hotel Mystic Mountain Kausani"
  );
}

function Brand() {
  return (
    <Link to="/" className="bend-brand" aria-label="Hotel Mystic Mountain home">
      <MountainMark />
      <span>
        <span className="bend-brand-small">Hotel</span>
        <span>Mystic Mountain</span>
        <span className="bend-brand-place">Kausani · Kumaon</span>
      </span>
    </Link>
  );
}
function Header({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = [
      ...document.querySelectorAll<HTMLElement>(
        "main,footer,.bend-hero-copy,.bend-hero-viewport,.premium-hero-content,.premium-drag-surface",
      ),
    ];
    content.forEach((element) => (element.inert = true));
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const elements = [
        ...header.current!.querySelectorAll<HTMLElement>("a,button"),
      ].filter((element) => element.getClientRects().length);
      const first = elements[0],
        last = elements.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keys);
    const query = matchMedia("(min-width: 768px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      content.forEach((element) => (element.inert = false));
      document.removeEventListener("keydown", keys);
      query.removeEventListener("change", resize);
    };
  }, [open]);
  const close = () => setOpen(false);
  const prefix = location.pathname === "/" ? "" : "/";
  return (
    <header
      ref={header}
      className={`bend-header ${standalone ? "is-standalone" : ""} ${open ? "is-open" : ""}`}
    >
      <Brand />
      <nav aria-label="Main navigation" className="bend-nav">
        {[
          ["Concept", "opportunity"],
          ["Stay", "stay"],
          ["Place", "place"],
        ].map(([label, id], i) => (
          <span key={id}>
            {i > 0 && (
              <span className="bend-nav-star" aria-hidden="true">
                ✦
              </span>
            )}
            <TideLink className="bend-link" to={`${prefix}#${id}`}>
              {label}
            </TideLink>
          </span>
        ))}
      </nav>
      <TideLink
        className="bend-contact-link bend-link"
        to={`${prefix}#contact`}
      >
        Contact
      </TideLink>
      <button
        className="bend-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="bend-mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
      {open && (
        <nav
          id="bend-mobile-nav"
          aria-label="Mobile navigation"
          className="bend-mobile-nav"
        >
          {[
            ["Concept", "opportunity"],
            ["Stay", "stay"],
            ["Place", "place"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <TideLink key={id} to={`${prefix}#${id}`} onClick={close}>
              {label}
              <ArrowUpRight size={25} />
            </TideLink>
          ))}
          <Link to="/gallery" onClick={close}>
            Photo gallery
            <ArrowUpRight size={25} />
          </Link>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
        </nav>
      )}
    </header>
  );
}
function Hero() {
  return <PremiumHero header={<Header />} />;
}
function Place() {
  const gallery = useTideGallery();
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <section className="bend-place bend-section" id="place">
      <div className="bend-container">
        <Entrance>
          <h2>Mystic Mountain.</h2>
        </Entrance>
        <ReferencePillars>
          {pillars.map((pillar, index) => (
            <article
              key={pillar.image}
              className={`bend-pillar bend-pillar-${index}`}
            >
              <button
                className="bend-pillar-photo"
                onClick={() => gallery(pillar.ids, 0)}
                aria-label={`View ${pillar.label.toLowerCase()} photographs`}
              >
                <PhotoImage
                  id={pillar.image}
                  alt={photoAlt(pillar.image)}
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
                <span className="bend-photo-view">
                  Explore <ArrowUpRight size={18} />
                </span>
              </button>
              <p className="bend-eyebrow">{pillar.label}</p>
              <h3>{pillar.title}</h3>
            </article>
          ))}
        </ReferencePillars>
        <div className="bend-place-actions">
          <Link className="bend-text-action" to="/gallery">
            All hotel photographs <ArrowUpRight size={18} />
          </Link>
          <button
            className="bend-text-action"
            aria-expanded={mapOpen}
            aria-controls="bend-location"
            onClick={() => setMapOpen((value) => !value)}
          >
            {mapOpen ? "Close the map" : "Explore Kausani in 3D"}
            {mapOpen ? <X size={18} /> : <ArrowUpRight size={18} />}
          </button>
        </div>
        {mapOpen && (
          <div id="bend-location" className="bend-map">
            <Suspense
              fallback={
                <p className="bend-loading" role="status">
                  Finding our corner of Kumaon…
                </p>
              }
            >
              <LocationSection />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}
function Answers() {
  return (
    <section
      className="bend-answers bend-section"
      id="answers"
      aria-labelledby="bend-answers-heading"
    >
      <div className="bend-container">
        <Entrance>
          <p className="bend-parenthesis">(a little clarity)</p>
        </Entrance>
        <Entrance delay={120}>
          <h2 id="bend-answers-heading">
            A few things before
            <br />
            you head for the hills.
          </h2>
        </Entrance>
        <div className="bend-faqs">
          {[
            [
              "Where will you find us?",
              "Hotel Mystic Mountain is on Baijnath Road, opposite the Tea Factory, in Kausani, Uttarakhand. Use our hotel directions to plan your arrival.",
            ],
            [
              "What does a stay look like?",
              "Explore the real hotel photographs: timber interiors, rooms with window-side seating, open balconies and a dining space overlooking the hills. A particular room or view is subject to confirmation.",
            ],
            [
              "How do I plan my visit?",
              "Share your preferred dates and guests with the hotel. The team will confirm room options, rates, meal arrangements and booking terms. You can also book through the existing hotel portal.",
            ],
          ].map(([question, answer]) => (
            <Entrance key={question}>
              <article>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [draft, setDraft] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const [booking, setBooking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [formError, setFormError] = useState("");
  const body = draft
    ? `Hello Hotel Mystic Mountain,\n\n${draft.message}\n\nName: ${draft.name}\nEmail: ${draft.email}`
    : "";
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      !String(data.get("firstName") || "").trim() ||
      !String(data.get("message") || "").trim()
    ) {
      setFormError("Please add your first name and a short message.");
      return;
    }
    setFormError("");
    setCopied(false);
    setCopyError(false);
    setDraft({
      name: `${data.get("firstName")} ${data.get("lastName")}`.trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    });
  };
  return (
    <section
      className="bend-contact bend-section"
      id="contact"
      aria-labelledby="bend-contact-heading"
    >
      <div className="bend-contact-landscape" aria-hidden="true" />
      <div className="bend-container">
        <div className="bend-contact-glass">
          <div className="bend-contact-grid">
            <div className="bend-contact-copy">
              <Entrance>
                <p className="bend-parenthesis">(your next chapter)</p>
              </Entrance>
              <Entrance delay={120}>
                <h2 id="bend-contact-heading">
                  A little escape.
                  <br />A longer weekend.
                </h2>
              </Entrance>
              <Entrance delay={200}>
                <p className="bend-contact-description">
                  Leave the everyday behind. Share a note, tell us what you have
                  in mind, and start a conversation with the hotel.
                </p>
              </Entrance>
              <Entrance delay={280}>
                <div className="bend-contact-details">
                  <p>
                    <span>Where</span>
                    <a href={hotel.maps} target="_blank" rel="noreferrer">
                      Baijnath Road, opposite Tea Factory
                      <br />
                      Kausani, Uttarakhand <ArrowUpRight size={14} />
                    </a>
                  </p>
                  <p>
                    <span>Call</span>
                    <a href={hotel.phoneHref}>{hotel.phone}</a>
                  </p>
                  <p>
                    <span>Email</span>
                    <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
                  </p>
                </div>
              </Entrance>
              <Entrance delay={280}>
                <div className="bend-contact-options">
                  <button
                    className="bend-text-action"
                    onClick={() => setBooking(true)}
                  >
                    Plan dates & guests <ArrowUpRight size={17} />
                  </button>
                  <a
                    className="bend-text-action"
                    href={hotel.booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hotel booking portal <ArrowUpRight size={17} />
                  </a>
                </div>
              </Entrance>
            </div>
            <Entrance delay={180}>
              <form className="bend-inquiry-form" onSubmit={submit}>
                <div className="bend-form-names">
                  <label>
                    First name
                    <input
                      name="firstName"
                      autoComplete="given-name"
                      required
                      maxLength={80}
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      name="lastName"
                      autoComplete="family-name"
                      maxLength={80}
                    />
                  </label>
                </div>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                  />
                </label>
                <label>
                  Message
                  <textarea name="message" rows={4} required maxLength={1500} />
                </label>
                <button className="bend-send" type="submit">
                  Send inquiry{" "}
                  <Magnet>
                    <ArrowRight size={24} />
                  </Magnet>
                </button>
                <p className="bend-form-note">
                  Review your note, then send it through your email app.
                </p>
                {formError && (
                  <p className="bend-form-note" role="alert">
                    {formError}
                  </p>
                )}
              </form>
            </Entrance>
          </div>
          <footer className="bend-footer">
            <span>
              © {new Date().getFullYear()} Hotel Mystic Mountain Kausani
            </span>
            <a href="#home">Back to the mountains ↑</a>
            <MotionPreferenceToggle />
          </footer>
          <GlareHover />
        </div>
      </div>
      {draft && (
        <Modal
          title="Review your inquiry"
          onClose={() => setDraft(null)}
          className="bend-draft"
        >
          <p className="bend-parenthesis">(ready when you are)</p>
          <h2>
            Your mountain chapter
            <br />
            starts here.
          </h2>
          <p>
            Review your note, then open your email app to send it to the hotel.
          </p>
          <pre>{body}</pre>
          <div className="bend-draft-actions">
            <a
              className="bend-text-action"
              href={`mailto:${hotel.email}?subject=${encodeURIComponent("Stay inquiry · Hotel Mystic Mountain")}&body=${encodeURIComponent(body)}`}
            >
              Open email <ArrowUpRight size={18} />
            </a>
            <button
              className="bend-text-action"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(body);
                  setCopied(true);
                } catch {
                  setCopyError(true);
                }
              }}
            >
              {copied ? "Copied" : "Copy inquiry"}
            </button>
          </div>
          {copyError && (
            <p role="alert">Please select and copy the note above.</p>
          )}
          <p className="fine-print">
            Opening your email app does not send a message or confirm a
            reservation. The hotel will confirm availability, rates and terms
            directly.
          </p>
        </Modal>
      )}
      {booking && (
        <Modal
          title="Plan your stay"
          onClose={() => setBooking(false)}
          className="bend-booking-modal"
        >
          <Suspense fallback={<p role="status">Opening your stay planner…</p>}>
            <BookingInquiry />
          </Suspense>
        </Modal>
      )}
    </section>
  );
}
function CompactFooter() {
  return (
    <footer className="bend-compact-footer">
      <Brand />
      <Link to="/#contact">
        Plan your stay <ArrowUpRight size={18} />
      </Link>
      <Link to="/gallery">Photo gallery</Link>
      <MotionPreferenceToggle />
      <a
        className="bend-credit"
        href="https://skiper-ui.com/"
        target="_blank"
        rel="noreferrer"
      >
        Link interactions · Skiper UI
      </a>
    </footer>
  );
}
function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    let disposed = false;
    let observer: MutationObserver | undefined;
    const focusPage = () => {
      const title = document.querySelector<HTMLElement>("[data-page-title]");
      if (!title) return false;
      ScrollTrigger.refresh();
      resetPageScroll(location.hash);
      title.focus({ preventScroll: true });
      return true;
    };
    void document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        if (disposed) return;
        if (!focusPage()) {
          observer = new MutationObserver(() => {
            if (focusPage()) observer?.disconnect();
          });
          observer.observe(document.getElementById("main")!, {
            childList: true,
            subtree: true,
          });
        }
      }),
    );
    const label =
      location.pathname === "/"
        ? "Life, a Little Slower Up Here"
        : location.pathname === "/contact"
          ? "Plan Your Stay"
          : "Discover Kausani";
    document.title = `${label} — Hotel Mystic Mountain Kausani`;
    return () => {
      disposed = true;
      observer?.disconnect();
    };
  }, [location.pathname]);
  return null;
}
export default function BendApp() {
  useSmoothExperience(referenceMotion.scroll);
  const { pathname } = useLocation();
  const [lightbox, setLightbox] = useState<{
    items: Photo[];
    index: number;
  } | null>(null);
  const openPhoto = useCallback(
    (ids: string[], index: number) =>
      setLightbox({
        items: ids.map(
          (id) =>
            photos.find((photo) => photo.id === id) || {
              id,
              caption: "A closer look at Mystic Mountain",
              category: "Hotel photography",
              alt: photoAlt(id),
            },
        ),
        index,
      }),
    [],
  );
  useEffect(() => setLightbox(null), [pathname]);
  return (
    <GalleryActions.Provider value={openPhoto}>
      <div className="bend-site">
        {pathname === "/" && (
          <div className="bend-scene-background" aria-hidden="true">
            <div className="bend-scene-tint" />
          </div>
        )}
        <RouteEffects />
        <SoftCursor />
        <a href="#main" className="ts-skip-link">
          Skip to content
        </a>
        {pathname === "/" ? (
          <>
            <Hero />
            <main id="main">
              <Statement />
              <StickyStories />
              <Place />
              <Answers />
              <Contact />
            </main>
          </>
        ) : (
          <>
            <Header standalone />
            <main id="main" className="bend-legacy">
              <Suspense
                fallback={
                  <p className="bend-loading" role="status">
                    Opening your mountain chapter…
                  </p>
                }
              >
                <LegacyPages />
              </Suspense>
            </main>
            <CompactFooter />
          </>
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
