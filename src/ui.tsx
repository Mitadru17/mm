import { useSiteMotion } from "./motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import type { Photo, Room } from "./data";
import { photos } from "./data";
import imageDimensions from "./image-dimensions.json";
import { animate } from "motion/mini";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { capsuleDuration, capsuleEase } from "./design";

export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 70 43"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 37 22 6l14 22L46 12l22 25M11 37 28 13M40 37l12-18M2 42h66"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="m17 14 5 6 5-7m15 5 5 6 4-5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="52" cy="6" r="3.5" stroke="currentColor" />
    </svg>
  );
}
export function ArrowLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      className={`text-link ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function PhotoImage({
  id,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 650px) 100vw, (max-width: 1000px) 60vw, 50vw",
}: {
  id: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const dimensions = (
    imageDimensions as Record<string, { width: number; height: number }>
  )[id] || { width: 960, height: 1280 };
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setLoaded(!!ref.current?.complete && !!ref.current?.naturalWidth);
    setFailed(false);
  }, [id]);
  return (
    <span
      className={`image-shell ${loaded ? "is-loaded" : ""} ${failed ? "has-error" : ""}`}
    >
      {!loaded && !failed && (
        <span className="image-skeleton skeleton" aria-hidden="true" />
      )}
      {failed && (
        <span className="image-error" role="img" aria-label={alt}>
          Photograph unavailable
        </span>
      )}
      <img
        ref={ref}
        draggable={false}
        className={className}
        src={`/images/${id}-960.webp`}
        srcSet={`/images/${id}-480.webp 480w, /images/${id}-960.webp 960w, /images/${id}-1600.webp 1600w`}
        sizes={sizes}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
export function Modal({
  children,
  title,
  onClose,
  className = "",
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useSiteMotion();
  const latestClose = useRef(onClose);
  latestClose.current = onClose;
  const closing = useRef(false);
  const exit = useRef<ReturnType<typeof animate> | null>(null);
  const requestClose = () => {
    if (closing.current || !ref.current) return;
    closing.current = true;
    ref.current.dataset.closing = "true";
    exit.current = animate(
      ref.current,
      {
        opacity: 0,
        transform: reduced ? "none" : "translateY(10px) scale(.99)",
      },
      { duration: reduced ? 0.12 : 0.22, ease: [0.4, 0, 1, 1] },
    );
    void exit.current.then(() => latestClose.current());
  };
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const entrance = animate(
      dialog,
      {
        opacity: [0, 1],
        transform: [
          reduced ? "none" : "translateY(20px) scale(.985)",
          "translateY(0) scale(1)",
        ],
      },
      { duration: reduced ? 0.15 : 0.38, ease: [0.16, 1, 0.3, 1] },
    );
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      entrance?.stop();
      exit.current?.stop();
      dialog.close();
      document.body.style.overflow = scroll;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={(event) => {
        // A nested inquiry dialog must not also dismiss its stay planner.
        event.preventDefault();
        event.stopPropagation();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) requestClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="close-button icon-button"
          onClick={requestClose}
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
export function Lightbox({
  items,
  initial,
  onClose,
}: {
  items: Photo[];
  initial: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initial);
  const reduced = useSiteMotion();
  const touch = useRef<number | null>(null);
  const change = (direction: number) =>
    setIndex((i) => (i + direction + items.length) % items.length);
  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setIndex(
          (i) =>
            (i + (event.key === "ArrowRight" ? 1 : -1) + items.length) %
            items.length,
        );
      }
    };
    document.addEventListener("keydown", navigate);
    return () => document.removeEventListener("keydown", navigate);
  }, [items.length]);
  const photo = items[index];
  return (
    <Modal title="Photo gallery" onClose={onClose} className="lightbox">
      <div
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const delta = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(delta) > 45) change(delta > 0 ? -1 : 1);
          touch.current = null;
        }}
      >
        <div className="lightbox-top">
          <MountainMark />
          <span>THE MYSTIC JOURNAL</span>
        </div>
        <div className="lightbox-stage">
          <AnimatePresence initial={false}>
            <m.div
              className="lightbox-image"
              key={photo.id}
              initial={{ opacity: 0, scale: reduced ? 1 : 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduced ? 0 : capsuleDuration,
                ease: capsuleEase,
              }}
            >
              <PhotoImage id={photo.id} alt={photo.alt} eager />
            </m.div>
          </AnimatePresence>
          <button
            className="lightbox-prev icon-button"
            aria-label="Previous photograph"
            onClick={() => change(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="lightbox-next icon-button"
            aria-label="Next photograph"
            onClick={() => change(1)}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="lightbox-caption" aria-live="polite">
          <span>{photo.caption}</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {items.length}
          </span>
        </div>
      </div>
    </Modal>
  );
}
export function RoomDetail({
  room,
  onClose,
  onInquire,
}: {
  room: Room;
  onClose: () => void;
  onInquire: () => void;
}) {
  const [index, setIndex] = useState(0);
  return (
    <Modal title={room.title} onClose={onClose} className="room-modal">
      <div className="room-modal-photo">
        <PhotoImage
          id={room.images[index]}
          alt={
            photos.find((photo) => photo.id === room.images[index])?.alt ||
            `Interior detail of ${room.title.toLowerCase()} at Hotel Mystic Mountain Kausani, photograph ${index + 1}`
          }
          eager
        />
        <div className="room-photo-controls">
          <button
            className="icon-button"
            aria-label="Previous room photograph"
            onClick={() =>
              setIndex((i) => (i + room.images.length - 1) % room.images.length)
            }
          >
            <ChevronLeft />
          </button>
          <span aria-live="polite">
            {index + 1} / {room.images.length}
          </span>
          <button
            className="icon-button"
            aria-label="Next room photograph"
            onClick={() => setIndex((i) => (i + 1) % room.images.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="room-modal-copy">
        <p className="eyebrow">A CLOSER LOOK</p>
        <h2>{room.title}</h2>
        <p>{room.description}</p>
        <ul>
          {room.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="fine-print">
          A photographic introduction to our rooms. Room categories, occupancy,
          dimensions, views and amenities will be confirmed by the hotel for
          your dates.
        </p>
        <button className="button button-dark" onClick={onInquire}>
          Inquire about a stay <ArrowUpRight size={18} />
        </button>
      </div>
    </Modal>
  );
}
export function GalleryTile({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  const size = (
    imageDimensions as Record<string, { width: number; height: number }>
  )[photo.id];
  return (
    <button
      className="gallery-tile"
      onClick={onClick}
      aria-label={`View photograph: ${photo.caption}`}
    >
      <span
        className="journal-photo"
        style={
          size ? { aspectRatio: `${size.width} / ${size.height}` } : undefined
        }
      >
        <PhotoImage id={photo.id} alt={photo.alt} />
        <span className="journal-photo-open">
          <Maximize2 size={18} />
        </span>
      </span>
      <span className="journal-caption">
        <span>{photo.category}</span>
        <strong>{photo.caption}</strong>
      </span>
    </button>
  );
}
