import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { hotel, photos, rooms } from "../data";
import type { Photo } from "../data";
import { Lightbox, MountainMark } from "../ui";
import { MotionPreferenceToggle, useSiteMotion } from "../motion";
import { resetPageScroll, useSmoothExperience } from "../experience";
import {
  AboutPage,
  ActivitiesPage,
  ArticlePage,
  ContactPage,
  GalleryPage,
  HomePage,
  NewsPage,
  NotFoundPage,
  ServicesPage,
  SuitePage,
  SuitesPage,
} from "./Pages";
import {
  ArrowLink,
  ease,
  GalleryActions,
  TideLink,
  useCompact,
} from "./primitives";

const navigation = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Activities", "/activities"],
  ["Gallery", "/gallery"],
  ["Journal", "/news"],
];
function Wordmark() {
  return (
    <Link to="/" className="ts-brand" aria-label="Mystic Mountain home">
      <MountainMark />
      <span>Mystic Mountain</span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const compact = useCompact(1100);
  const reduced = useSiteMotion();
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);
  useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);
  useEffect(() => {
    if (!open) return;
    const content = [...document.querySelectorAll<HTMLElement>("main,footer")];
    content.forEach((element) => (element.inert = true));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = [
        ...ref.current!.querySelectorAll<HTMLElement>("a,button"),
      ].filter((element) => element.getClientRects().length);
      const first = controls[0],
        last = controls.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keys);
    return () => {
      content.forEach((element) => (element.inert = false));
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keys);
      ref.current
        ?.querySelector<HTMLButtonElement>(".ts-menu-toggle")
        ?.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => {
    if (!dropdown) return;
    const close = (event: PointerEvent) => {
      if (
        !ref.current
          ?.querySelector(".ts-dropdown")
          ?.contains(event.target as Node)
      )
        setDropdown(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [dropdown]);
  return (
    <header className={`ts-header ${open ? "menu-open" : ""}`} ref={ref}>
      <Wordmark />
      <nav className="ts-desktop-nav" aria-label="Main navigation">
        <TideLink to="/about">About</TideLink>
        <div
          className="ts-dropdown"
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setDropdown(false);
              ref.current
                ?.querySelector<HTMLButtonElement>(".ts-dropdown-trigger")
                ?.focus();
            }
          }}
        >
          <button
            className="ts-dropdown-trigger"
            aria-expanded={dropdown}
            aria-controls="room-navigation"
            onClick={() => setDropdown((value) => !value)}
          >
            Rooms <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {dropdown && (
              <m.div
                id="room-navigation"
                className="ts-dropdown-list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <TideLink to="/suites" onClick={() => setDropdown(false)}>
                  All room stories
                </TideLink>
                {rooms.map((room) => (
                  <TideLink
                    to={`/suites/${room.id}`}
                    key={room.id}
                    onClick={() => setDropdown(false)}
                  >
                    {room.title}
                  </TideLink>
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
        {navigation.slice(1).map(([label, path]) => (
          <TideLink key={path} to={path}>
            {label}
          </TideLink>
        ))}
      </nav>
      <div className="ts-header-contact">
        <ArrowLink to="/contact">CONTACT</ArrowLink>
      </div>
      <button
        className="ts-menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X size={30} strokeWidth={1.3} />
        ) : (
          <Menu size={29} strokeWidth={1.3} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-navigation"
            className="ts-mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: reduced ? 0 : 0.4, ease }}
          >
            <h2>Menu</h2>
            {[
              ["Home", "/"],
              navigation[0],
              ["Rooms", "/suites"],
              ...navigation.slice(1),
              ["Contact", "/contact"],
            ].map(([label, path]) => (
              <TideLink key={path} to={path} onClick={() => setOpen(false)}>
                {label}
              </TideLink>
            ))}
            <h2>Contact</h2>
            <a href={hotel.phoneHref}>
              <Phone size={22} />
              {hotel.phone}
            </a>
            <a href={`mailto:${hotel.email}`}>
              <Mail size={22} />
              {hotel.email}
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
function Footer() {
  return (
    <footer className="ts-footer">
      <div className="ts-footer-top">
        <TideLink to="/" className="ts-footer-brand">
          MYSTIC
        </TideLink>
        <div>
          <a href={hotel.phoneHref}>
            <Phone size={22} strokeWidth={1.2} />
            {hotel.phone}
          </a>
          <a href={`mailto:${hotel.email}`}>
            <Mail size={22} strokeWidth={1.2} />
            {hotel.email}
          </a>
        </div>
      </div>
      <div className="ts-footer-grid">
        <div className="ts-footer-invitation">
          <p>
            A warm welcome, green horizons, and your own little corner of the
            Kumaon hills. Find us on Baijnath Road, opposite the Tea Factory,
            Kausani.
          </p>
          <ArrowLink to="/contact">PLAN YOUR STAY</ArrowLink>
        </div>
        <nav aria-label="Explore">
          <h2>EXPLORE</h2>
          <TideLink to="/">Home</TideLink>
          <TideLink to="/about">About</TideLink>
          <TideLink to="/news">Journal</TideLink>
          <TideLink to="/suites">Rooms</TideLink>
        </nav>
        <nav aria-label="Discover">
          <h2>DISCOVER</h2>
          <TideLink to="/services">Services</TideLink>
          <TideLink to="/activities">Activities</TideLink>
          <TideLink to="/gallery">Gallery</TideLink>
          <TideLink to="/contact">Contact</TideLink>
        </nav>
        <nav aria-label="Plan your visit">
          <h2>YOUR VISIT</h2>
          <TideLink to={hotel.booking}>Booking portal</TideLink>
          <TideLink to={hotel.maps}>Directions</TideLink>
          <TideLink to={hotel.reviews}>Guest stories</TideLink>
          <TideLink to="/contact#plan">Stay inquiry</TideLink>
        </nav>
        <div className="ts-footer-access">
          <h2>TAKE IT SLOW</h2>
          <MotionPreferenceToggle />
          <p>
            Kausani
            <br />
            Uttarakhand, India
          </p>
        </div>
      </div>
      <div className="ts-footer-bottom">
        <span>© {new Date().getFullYear()} Hotel Mystic Mountain Kausani</span>
        <MountainMark />
        <TideLink to="/#home">Back to the mountains ↑</TideLink>
      </div>
    </footer>
  );
}
function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    let disposed = false;
    void document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        if (disposed) return;
        try {
          resetPageScroll(location.hash);
        } catch {
          resetPageScroll();
        }
        document
          .querySelector<HTMLElement>("[data-page-title]")
          ?.focus({ preventScroll: true });
      }),
    );
    const labels: Record<string, string> = {
      "/": "Mountain Stays",
      "/about": "Our Story",
      "/suites": "Room Photography",
      "/services": "Spaces & Comforts",
      "/activities": "Explore Kausani",
      "/gallery": "Photo Gallery",
      "/news": "Mountain Journal",
      "/contact": "Plan Your Stay",
    };
    document.title = `${labels[location.pathname] || "Your Mountain Chapter"} — Hotel Mystic Mountain Kausani`;
    return () => {
      disposed = true;
    };
  }, [location.key, location.hash, location.pathname]);
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);
  return null;
}
export default function TideApp() {
  useSmoothExperience();
  const location = useLocation();
  const reduced = useSiteMotion();
  const [lightbox, setLightbox] = useState<{
    items: Photo[];
    index: number;
  } | null>(null);
  const openPhoto = useCallback((ids: string[], index: number) => {
    const items = ids.map(
      (id) =>
        photos.find((photo) => photo.id === id) || {
          id,
          caption: "A little look inside Mystic Mountain",
          category: "Hotel photography",
          alt: "A real hotel interior at Mystic Mountain Kausani",
        },
    );
    setLightbox({ items, index });
  }, []);
  useEffect(() => {
    setLightbox(null);
  }, [location.pathname]);
  return (
    <GalleryActions.Provider value={openPhoto}>
      <RouteEffects />
      <a className="ts-skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <m.main
        id="main"
        className="ts-main"
        key={location.pathname}
        initial={reduced ? false : { opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.45 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/suites" element={<SuitesPage />} />
          <Route path="/suites/:slug" element={<SuitePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </m.main>
      <Footer />
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          initial={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </GalleryActions.Provider>
  );
}
