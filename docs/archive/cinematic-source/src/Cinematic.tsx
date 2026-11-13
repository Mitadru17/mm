import { useSiteMotion } from "./motion";
import { useEffect, useRef, useState } from "react";
import { useInView, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import {
  ArrowDown,
  ArrowUpRight,
  Mountain,
  Pause,
  Play,
  Rotate3D,
  Sun,
} from "lucide-react";
import { PhotoImage } from "./ui";
import { EditorialHeading } from "./motion";
import BlurText from "./components/react-bits/BlurText";

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  const reduced = useSiteMotion();
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = window.setInterval(
      () => setScene((value) => (value + 1) % 2),
      12000,
    );
    return () => window.clearInterval(timer);
  }, [playing, reduced, visible]);
  return (
    <section
      ref={ref}
      className="hero hero-editorial"
      id="home"
      aria-label="Welcome to Mystic Mountain"
      data-moving={playing && visible && !reduced}
    >
      <div className="hero-scenes">
        {["/images/hero.webp", "/images/timber-room-1600.webp"].map(
          (src, index) => (
            <div
              key={src}
              className={`hero-scene ${scene === index ? "active" : ""}`}
              aria-hidden={scene !== index}
              role="tabpanel"
              id={`hero-view-${index}`}
              aria-labelledby={`hero-tab-${index}`}
            >
              <div
                className={`hero-skeleton skeleton ${loaded[index] ? "is-loaded" : ""}`}
              />
              <img
                src={src}
                alt={
                  index === 0
                    ? "The real balcony and green Kumaon hills at Mystic Mountain Kausani"
                    : "Timber-lined bedroom opening to the balcony at Mystic Mountain Kausani"
                }
                width={index === 0 ? 1920 : 1600}
                height={index === 0 ? 1100 : 2133}
                fetchPriority={index === 0 ? "high" : "low"}
                onLoad={() =>
                  setLoaded((value) => ({ ...value, [index]: true }))
                }
                className={loaded[index] ? "is-loaded" : ""}
              />
            </div>
          ),
        )}
      </div>
      <div className="hero-shade" />
      <div className="hero-editorial-copy">
        <p className="eyebrow hero-property">
          HOTEL MYSTIC MOUNTAIN <span>KAUSANI, UTTARAKHAND</span>
        </p>
        <h1>
          <BlurText text="Somewhere," />
          <em>
            <BlurText text="a little slower." delay={0.13} />
          </em>
        </h1>
        <div className="hero-invitation">
          <p>
            A warm welcome. A quieter horizon.
            <br />
            Your little corner of Kumaon.
          </p>
          <a className="hero-reserve" href="#plan">
            Plan your stay <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
      <div className="hero-editorial-bottom">
        <a href="#about" className="hero-chapter-link">
          <span className="hero-scroll-circle">
            <ArrowDown size={19} />
          </span>
          <span>
            THE MOUNTAINS ARE CALLING<small>SCROLL TO SLOW DOWN</small>
          </span>
        </a>
        <div className="hero-scene-picker">
          <span className="hero-photo-note">
            {scene === 0
              ? "01 / THE WORLD OUTSIDE"
              : "02 / YOUR PLACE IN THE HILLS"}
          </span>
          <div
            className="scene-switch"
            role="tablist"
            aria-label="Choose your view"
          >
            {[
              { title: "The mountains", Icon: Mountain },
              { title: "The stay", Icon: Sun },
            ].map(({ title, Icon }, index) => (
              <button
                key={title}
                role="tab"
                id={`hero-tab-${index}`}
                aria-controls={`hero-view-${index}`}
                tabIndex={scene === index ? 0 : -1}
                aria-selected={scene === index}
                onClick={() => {
                  setScene(index);
                  setPlaying(false);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                    return;
                  event.preventDefault();
                  const next = (index + 1) % 2;
                  setScene(next);
                  setPlaying(false);
                  document.getElementById(`hero-tab-${next}`)?.focus();
                }}
              >
                <Icon size={14} />
                <span>{title}</span>
              </button>
            ))}
          </div>
          <button
            className="motion-control icon-button"
            aria-label={playing ? "Pause image motion" : "Play image motion"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}

export function Arrival() {
  return (
    <section id="about" className="about arrival-editorial">
      <div className="arrival-introduction">
        <div className="arrival-title" data-reveal>
          <p className="chapter-label">
            <span>01</span> A PLACE TO EXHALE
          </p>
          <EditorialHeading
            first="Far from the rush."
            second="Close to what matters."
          />
        </div>
        <div className="arrival-prose" data-reveal>
          <p>
            Somewhere in the Kumaon hills, the day takes a different shape.
            Clouds wander. Tea lasts a little longer. The mountains ask nothing
            of you.
          </p>
          <p>
            On Baijnath Road, opposite the Tea Factory, Mystic Mountain is a
            warm place to return to. Timber-rich rooms, green horizons, and the
            quiet pleasure of being exactly where you are.
          </p>
          <a className="underline-link" href="#stays">
            FIND YOUR PLACE HERE <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="arrival-photo-essay">
        <figure className="arrival-landscape" data-reveal>
          <PhotoImage
            id="balcony"
            alt="The hotel's green balcony opening onto the Kausani hills"
          />
          <figcaption>
            <span>THE WORLD OUTSIDE</span>
            <span>KAUSANI · KUMAON HILLS</span>
          </figcaption>
        </figure>
        <figure className="arrival-detail" data-reveal>
          <PhotoImage
            id="timber-window"
            alt="Natural light in a timber room overlooking the balcony"
          />
          <figcaption>AND A LITTLE SPACE OF YOUR OWN.</figcaption>
        </figure>
        <span className="arrival-handwritten" aria-hidden="true">
          Make yourself at home.
        </span>
      </div>
      <div className="arrival-index">
        <span>WARM TIMBER</span>
        <i />
        <span>GREEN HORIZONS</span>
        <i />
        <span>A SLOWER PACE</span>
      </div>
    </section>
  );
}

export function DestinationChapter({ onArt }: { onArt: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  return (
    <section
      ref={ref}
      className="destination-chapter"
      id="kausani"
      aria-labelledby="destination-title"
    >
      <div className="destination-chapter-copy">
        <p className="chapter-label">
          <span>03</span> THE KUMAON STATE OF MIND
        </p>
        <h2 id="destination-title">
          Let the hills
          <br />
          <em>set the pace.</em>
        </h2>
        <p>
          There are places that stay with you long after the journey home. The
          green folds of the hills. The light changing across a valley. The
          quiet that settles in when you stop looking at the time.
        </p>
        <p>
          This is our invitation to Kausani. A landscape that makes room for
          you.
        </p>
        <a
          className="underline-link"
          href="https://uttarakhandtourism.gov.in/destination/kausani"
          target="_blank"
          rel="noreferrer"
        >
          DISCOVER KAUSANI <ArrowUpRight size={16} />
        </a>
        <button className="destination-art-link" onClick={onArt}>
          <img
            src="/art/mountain-relief.webp"
            width="1400"
            height="1000"
            loading="lazy"
            alt="Original bronze mountain-relief artwork"
          />
          <span>
            THE MYSTIC COLLECTION
            <small>
              A small study of the hills <Rotate3D size={14} />
            </small>
          </span>
        </button>
      </div>
      <div className="destination-photographs">
        <figure className="destination-main-photo">
          <div className="destination-photo-mask">
            <m.div
              className="destination-parallax"
              style={reduced ? undefined : { y }}
            >
              <PhotoImage
                id="valley-portrait"
                alt="Layered green hills and the real hotel terrace swing beneath the Kausani sky"
              />
            </m.div>
          </div>
          <figcaption>
            <span>A DIFFERENT KIND OF EVERYDAY.</span>
            <span>PHOTOGRAPHED AT MYSTIC MOUNTAIN</span>
          </figcaption>
        </figure>
        <figure className="destination-detail-photo" data-reveal>
          <PhotoImage
            id="doorway"
            alt="An open timber doorway framing the hotel's balcony and green hills"
          />
          <figcaption>NOWHERE ELSE YOU NEED TO BE.</figcaption>
        </figure>
      </div>
    </section>
  );
}
