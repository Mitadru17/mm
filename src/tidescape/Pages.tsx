import RoomListings from "../jagerhof/RoomListings";
import { useParams, useSearchParams } from "react-router";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { ReactiveDetails } from "./ReactiveDetails";
import { GlassCard } from "../components/GlassCard";
import { EditorialLink } from "../components/EditorialLink";
import { ScrollVelocity } from "../components/react-bits/ScrollVelocity";
import { LocationSection } from "../map/LocationSection";
import BookingInquiry from "../BookingInquiry";
import { faqs, hotel, rooms, roomEnquiryPreferences } from "../data";
import { activities, journal } from "./data";
import {
  Activities,
  Closing,
  CollageHero,
  Comforts,
  GalleryRail,
  ImmersiveChapter,
  PhotoStories,
  PinnedRooms,
  RoomFeatures,
  Welcome,
} from "./Sections";
import {
  ArrowLink,
  DepthPhoto,
  Reveal,
  TideLink,
  TidePhoto,
  TideTitle,
  useTideGallery,
} from "./primitives";

export function HomePage() {
  return (
    <>
      <CollageHero />
      <div className="ts-home-chapters">
        <Welcome />
        <PinnedRooms />
        <Activities />
        <ImmersiveChapter />
        <ScrollVelocity />
        <Comforts />
        <PhotoStories />
        <GalleryRail />
        <LocationSection />
        <Closing />
      </div>
    </>
  );
}
function PageHero({
  title,
  copy,
  image,
  center = false,
}: {
  title: string;
  copy?: string;
  image?: string;
  center?: boolean;
}) {
  return (
    <section className={`ts-page-hero ${center ? "is-centered" : ""}`}>
      <TideTitle as="h1">{title}</TideTitle>
      {copy && <p>{copy}</p>}
      {image && (
        <Reveal className="ts-page-hero-photo">
          <DepthPhoto id={image} eager />
        </Reveal>
      )}
    </section>
  );
}
export function AboutPage() {
  const values = [
    {
      title: "A different outlook",
      image: "valley-balcony",
      copy: "Green hills, open balconies, and room to take a little more time.",
    },
    {
      title: "Warm surroundings",
      image: "timber-room",
      copy: "Timber interiors and bright corners in the genuine hotel photographs.",
    },
    {
      title: "A personal conversation",
      image: "dining-window",
      copy: "Plan directly with the hotel and confirm the details that matter to you.",
    },
    {
      title: "A place to discover",
      image: "arrival",
      copy: "Baijnath Road, opposite the Tea Factory, in Kausani’s Kumaon setting.",
    },
  ];
  return (
    <>
      <PageHero
        title="Discover the Mystic Mountain story"
        copy="A warm place to return to, in a landscape that makes a little more room for you. Welcome to Kausani, Uttarakhand."
        image="valley-portrait"
      />
      <section className="ts-section ts-about-story">
        <TideTitle className="ts-center-title">
          A mountain setting. A slower kind of everyday.
        </TideTitle>
        <div className="ts-about-triptych">
          {values.slice(0, 3).map((item, i) => (
            <GlassCard
              key={item.title}
              className={`ts-about-story-card story-${i}`}
            >
              <TidePhoto id={item.image} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </GlassCard>
          ))}
        </div>
      </section>
      <section className="ts-section ts-values">
        <TideTitle className="ts-center-title">
          The little things that make a mountain escape
        </TideTitle>
        <div>
          {values.map((item) => (
            <Reveal key={item.title} className="ts-value">
              <TidePhoto id={item.image} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
export function SuitesPage() {
  return (
    <>
      <section className="room-collection-page-heading">
        <p className="jh-eyebrow">MYSTIC MOUNTAIN / THE ROOMS</p>
        <h1 id="room-page-title">
          Find your place
          <br />
          <em>in the hills.</em>
        </h1>
        <p>
          Explore our room photographs, then ask the hotel about room options
          and prices for your dates.
        </p>
      </section>
      <RoomListings standalone />
    </>
  );
}
export function SuitePage() {
  const { slug } = useParams();
  const index = rooms.findIndex((room) => room.id === slug);
  const openPhoto = useTideGallery();
  if (index < 0) return <NotFoundPage />;
  const room = rooms[index];
  return (
    <>
      <section className="ts-page-hero ts-suite-hero">
        <TideTitle as="h1">
          0{index + 1}. {room.title}
        </TideTitle>
        <RoomFeatures index={index} />
        <button
          className="ts-image-button ts-suite-hero-photo"
          onClick={() => openPhoto(room.images, 0)}
          aria-label={`View ${room.title} photographs`}
        >
          <TidePhoto id={room.images[0]} eager sizes="100vw" />
        </button>
      </section>
      <section className="ts-suite-detail ts-section">
        <div>
          <h2>About the room story</h2>
          <p>{room.description}</p>
          <p>
            A photographic introduction to our accommodation. Please confirm the
            exact room, bed arrangement, occupancy, view and current amenities
            directly with the hotel.
          </p>
          <h2>In the photographs</h2>
          <RoomFeatures index={index} />
        </div>
        <aside>
          <h2>
            Let’s plan
            <br />
            your stay.
          </h2>
          <p>
            Share your dates and preferences. The hotel can confirm room
            options, the total price, meals and booking terms.
          </p>
          <ArrowLink to={`/contact?room=${room.id}#plan`}>
            Plan this stay
          </ArrowLink>
          <TideLink to={hotel.booking}>
            Prefer the existing booking portal?
          </TideLink>
        </aside>
      </section>
      <section className="ts-suite-photo-grid ts-section">
        {room.images.map((id, i) => (
          <button
            className="ts-image-button"
            key={id}
            onClick={() => openPhoto(room.images, i)}
            aria-label={`Open room photograph ${i + 1}`}
          >
            <TidePhoto id={id} />
          </button>
        ))}
      </section>
      <section className="ts-section">
        <TideTitle className="ts-center-title">
          A different perspective
        </TideTitle>
        <div className="ts-more-rooms">
          {rooms
            .filter((item) => item.id !== room.id)
            .map((item) => (
              <TideLink key={item.id} to={`/suites/${item.id}`}>
                <TidePhoto id={item.images[0]} />
                <h3>{item.title}</h3>
              </TideLink>
            ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
export function ServicesPage() {
  return (
    <>
      <PageHero
        title="A little comfort, a different outlook"
        copy="Explore the hotel’s real dining, sitting and outdoor spaces. Ask the hotel about the arrangements and amenities available during your stay."
        image="dining"
      />
      <Comforts full />
      <FAQ />
      <Closing />
    </>
  );
}
export function ActivitiesPage() {
  return (
    <>
      <PageHero
        title="A little closer to Kumaon"
        copy="Balcony mornings, time on the terrace, and independent discoveries along the road. Let the landscape shape your own kind of day."
        image="terrace"
      />
      <section className="ts-section ts-activity-long">
        <TideTitle className="ts-center-title">
          Your own way to explore
        </TideTitle>
        {activities.map((item, i) => (
          <Reveal key={item.title} className={`ts-activity-long-row row-${i}`}>
            <TidePhoto id={item.image} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ArrowLink to={item.href}>Discover more</ArrowLink>
            </div>
          </Reveal>
        ))}
      </section>
      <Closing />
    </>
  );
}
export function GalleryPage() {
  const openPhoto = useTideGallery();
  const extras = [
    ["valley-balcony", "dining", "doorway", "terrace"],
    ["room-view", "balcony", "lounge", "surroundings"],
    ["room-warm", "dining-window", "arrival", "valley-portrait"],
  ];
  return (
    <>
      <div className="ts-gallery-page">
        <h1 className="sr-only" tabIndex={-1} data-page-title>
          Photographs of Hotel Mystic Mountain Kausani
        </h1>
        {rooms.map((room, index) => {
          const ids = [...room.images, ...extras[index]];
          return (
            <section
              className="ts-photo-group"
              key={room.id}
              id={index === 0 ? "rooms" : index === 1 ? "views" : "unwind"}
            >
              <div className="ts-photo-group-top">
                <button
                  className="ts-image-button"
                  onClick={() => openPhoto(ids, 0)}
                  aria-label={`View ${room.title}`}
                >
                  <TidePhoto id={ids[0]} />
                </button>
                <div>
                  <button
                    className="ts-image-button"
                    onClick={() => openPhoto(ids, 1)}
                    aria-label="View room detail"
                  >
                    <TidePhoto id={ids[1]} />
                  </button>
                  <TideTitle>{room.title}</TideTitle>
                </div>
                <button
                  className="ts-image-button"
                  onClick={() => openPhoto(ids, 2)}
                  aria-label="View another room photograph"
                >
                  <TidePhoto id={ids[2]} />
                </button>
              </div>
              <div className="ts-photo-group-bottom">
                {ids.slice(3).map((id, i) => (
                  <button
                    className="ts-image-button"
                    key={`${id}-${i}`}
                    id={id === "dining" ? "dining" : undefined}
                    onClick={() => openPhoto(ids, i + 3)}
                    aria-label={`View hotel photograph ${i + 4}`}
                  >
                    <TidePhoto id={id} />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <Closing />
    </>
  );
}
export function NewsPage() {
  return (
    <>
      <PageHero
        title="Stories & mountain notes"
        copy="A little travel inspiration, a look inside the photographs, and useful notes for planning your own Kumaon escape."
        center
      />
      <section className="ts-journal-grid ts-section">
        {journal.map((article) => (
          <GlassCard key={article.slug}>
            <TideLink to={`/news/${article.slug}`}>
              <TidePhoto id={article.image} />
              <p className="ts-journal-category">
                <CalendarDays size={20} />
                {article.category}
              </p>
              <h2>{article.title}</h2>
            </TideLink>
            <p>{article.intro}</p>
            <ArrowLink to={`/news/${article.slug}`}>Read the story</ArrowLink>
          </GlassCard>
        ))}
      </section>
      <Closing />
    </>
  );
}
export function ArticlePage() {
  const { slug } = useParams();
  const article = journal.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;
  return (
    <>
      <PageHero
        title={article.title}
        copy={article.intro}
        image={article.image}
        center
      />
      <article className="ts-article-body">
        <p className="ts-caption">{article.category}</p>
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArrowLink to={article.source}>
          {article.source.startsWith("https")
            ? "Destination guide"
            : "Discover more"}
        </ArrowLink>
        <TideLink to="/news" className="ts-back-link">
          Back to the journal
        </TideLink>
      </article>
      <Closing />
    </>
  );
}
export function FAQ() {
  return (
    <section className="ts-faq ts-section">
      <TideTitle className="ts-center-title">
        Before you make your mountain escape
      </TideTitle>
      <div>
        {faqs.map(([question, answer], index) => (
          <ReactiveDetails
            key={question}
            question={question}
            answer={answer}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
export function ContactPage() {
  const [params] = useSearchParams();
  const requested = params.get("room");
  const preferences = roomEnquiryPreferences;
  return (
    <>
      <section className="ts-contact-page">
        <div className="ts-contact-copy">
          <TideTitle as="h1">
            Plan a stay
            <br />
            with us
          </TideTitle>
          <p>A personal inquiry. A thoughtfully planned stay.</p>
          <EditorialLink href={hotel.phoneHref}>
            <Phone size={21} />
            {hotel.phone}
          </EditorialLink>
          <EditorialLink href={`mailto:${hotel.email}`}>
            <Mail size={21} />
            {hotel.email}
          </EditorialLink>
          <EditorialLink href={hotel.maps} target="_blank" rel="noreferrer">
            <MapPin size={21} />
            {hotel.address}
          </EditorialLink>
          <ArrowLink to={hotel.booking}>Booking portal</ArrowLink>
        </div>
        <div className="ts-contact-form">
          <BookingInquiry
            key={requested}
            initialRoom={requested ? preferences[requested] : undefined}
          />
        </div>
      </section>
      <FAQ />
      <LocationSection />
      <Closing />
    </>
  );
}
export function NotFoundPage() {
  return (
    <section className="ts-not-found">
      <h1 data-page-title tabIndex={-1}>
        404
      </h1>
      <p>
        This little path doesn’t lead anywhere. Let’s find your way back to the
        mountains.
      </p>
      <ArrowLink to="/">Back to home</ArrowLink>
    </section>
  );
}
