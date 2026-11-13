import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Hotel, Landmark, Leaf, Mountain } from "lucide-react";
import { EditorialLink } from "../components/EditorialLink";
import { GlassCard } from "../components/GlassCard";
import { ArrowLink, Reveal, TideTitle } from "../tidescape/primitives";
import { hotelPlace, places } from "./places";
import type { PlaceId } from "./places";

const TerrainMap = lazy(() => import("./TerrainMap"));
const icons = { hotel: Hotel, tea: Leaf, ashram: Mountain, museum: Landmark };
export function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { once: true, margin: "200px 0px" });
  const [selection, setSelection] = useState<{ id: PlaceId; serial: number }>({
    id: "hotel",
    serial: 0,
  });
  const [preview, setPreview] = useState<PlaceId | null>(null);
  const peek = useCallback((id: PlaceId | null, source?: PlaceId) => {
    setPreview((current) =>
      id !== null ? id : source && current !== source ? current : null,
    );
  }, []);
  const select = (id: PlaceId) =>
    setSelection((value) => ({ id, serial: value.serial + 1 }));
  const active = places.find(
    (place) => place.id === (preview || selection.id),
  )!;
  return (
    <section
      ref={ref}
      className="location-section ts-section"
      id="location"
      aria-labelledby="location-heading"
    >
      <div className="ts-section-heading">
        <div>
          <p className="ts-kicker">06 / A little perspective</p>
          <div id="location-heading">
            <TideTitle>Find your bearings.</TideTitle>
          </div>
        </div>
        <ArrowLink to={hotelPlace.href}>Hotel directions</ArrowLink>
      </div>
      <p className="location-intro">
        Our little corner of Kumaon. Hover a pin, or choose a place to look
        around.
      </p>
      <div className="location-grid">
        <Reveal className="location-map-shell glass-surface">
          {near ? (
            <Suspense
              fallback={
                <div className="terrain-loading">
                  <Mountain size={42} />
                  <span>Finding our corner of the hills…</span>
                </div>
              }
            >
              <TerrainMap
                selection={selection}
                preview={preview}
                onSelect={select}
                onPreview={peek}
              />
            </Suspense>
          ) : (
            <div className="terrain-loading">
              <Mountain size={42} />
            </div>
          )}
        </Reveal>
        <div
          className="location-places"
          aria-label="Places around Mystic Mountain"
        >
          {places.map((place, index) => {
            const Icon = icons[place.id];
            return (
              <GlassCard
                key={place.id}
                className={`location-place-card ${place.id === "hotel" ? "is-hotel" : ""}`}
                direction={index % 2 ? "down" : "up"}
              >
                <button
                  className="location-place-button"
                  aria-pressed={selection.id === place.id}
                  onClick={() => select(place.id)}
                  onMouseEnter={() => peek(place.id)}
                  onMouseLeave={() => peek(null, place.id)}
                  onFocus={() => peek(place.id)}
                  onBlur={() => peek(null, place.id)}
                >
                  <span className="location-place-icon">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="location-place-category">
                      {place.category}
                    </span>
                    <strong>{place.short}</strong>
                  </span>
                  <span className="location-place-number">
                    {index === 0 ? "↗" : String(index).padStart(2, "0")}
                  </span>
                </button>
              </GlassCard>
            );
          })}
          <div className="location-detail" aria-live="polite">
            <p>{active.description}</p>
            <EditorialLink href={active.href} target="_blank" rel="noreferrer">
              {active.id === "hotel"
                ? "Open directions"
                : "Plan a little discovery"}
            </EditorialLink>
          </div>
        </div>
      </div>
      <p className="map-caption">
        Drag to explore the hills. Use the controls to zoom or switch views.
        Landscape imagery captured 6 November 2026. Plan independent visits with
        local advice. Building heights and individual tree positions are
        illustrative.
      </p>
    </section>
  );
}
