import { Link } from "react-router";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { hotel, photos } from "../data";
import { MountainMark, PhotoImage } from "../ui";
import { goTo } from "../experience";

export function SignatureFooter({
  onBook,
  entering,
}: {
  onBook: () => void;
  entering: boolean;
}) {
  const photo = photos.find((entry) => entry.id === "terrace")!;
  return (
    <footer id="contact" className="signature-footer" inert={entering}>
      <div className="signature-footer-top">
        <div className="signature-footer-invitation">
          <p className="signature-kicker" data-jh-reveal>
            HOTEL MYSTIC MOUNTAIN · KAUSANI
          </p>
          <h2 data-jh-heading>
            See you
            <br />
            <em>in the hills.</em>
          </h2>
          <div className="signature-footer-action" data-jh-reveal>
            <p>
              Bring your people. Find your own pace.
              <br />
              We’ll help you plan the stay.
            </p>
            <button
              className="signature-button signature-button-light"
              onClick={onBook}
            >
              <span>Plan your mountain stay</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <Link
          className="signature-footer-photo"
          to="/gallery"
          aria-label="See the photographs of Mystic Mountain"
          data-jh-reveal
        >
          <PhotoImage
            id={photo.id}
            alt={photo.alt}
            sizes="(max-width: 639px) 85vw, 25vw"
          />
          <span>
            <span>A glimpse of Mystic</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </Link>
      </div>
      <div className="signature-footer-details" data-jh-reveal>
        <div className="signature-footer-place">
          <MountainMark />
          <address>
            {hotel.address}
            <a href={hotel.maps} target="_blank" rel="noreferrer">
              Find your way <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </address>
        </div>
        <div>
          <h3>Let’s talk</h3>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
          <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
        </div>
        <nav aria-label="Explore Mystic Mountain">
          <h3>A little more</h3>
          <Link to="/about">Our story</Link>
          <Link to="/gallery">The photo journal</Link>
          <a href={hotel.booking} target="_blank" rel="noreferrer">
            Booking portal <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </nav>
      </div>
      <div className="signature-footer-wordmark" aria-hidden="true">
        MYSTIC<span>MOUNTAIN · KAUSANI</span>
      </div>
      <div className="signature-footer-colophon">
        <span>© {new Date().getFullYear()} Hotel Mystic Mountain Kausani</span>
        <button
          onClick={() => goTo("root", ".jh-header .arrival-menu-trigger")}
          aria-label="Back to top"
        >
          Back to the hills <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
