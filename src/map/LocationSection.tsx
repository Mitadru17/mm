import { useState } from "react";
import * as m from "motion/react-m";
import { useSiteMotion } from "../motion";
import { NearbyWalk } from "@/components/ui/nearby-walk-menu";
import { EditorialLink } from "../components/EditorialLink";
import { ArrowLink, TideTitle } from "../tidescape/primitives";
import { hotelPlace, places } from "./places";
import { nearbyDistance, nearbyPlaces } from "./nearby-data";

/** The supplied line-drawing guide replaces the former WebGL terrain renderer. */
export function LocationSection() {
  const reduced = useSiteMotion();
  const [selected, setSelected] = useState("tea");
  const active = places.find((place) => place.id === selected) ?? places[1];
  return (
    <section
      className="nearby-location"
      id="location"
      aria-labelledby="location-heading"
    >
      <div className="nearby-location-header">
        <div>
          <div id="location-heading">
            <TideTitle as="h2">
              Around
              <br />
              <em>Mystic Mountain.</em>
            </TideTitle>
          </div>
          <p className="nearby-location-intro">
            Tea country, local history and a little time to explore. Start with
            these places around Kausani.
          </p>
        </div>
        <ArrowLink to={hotelPlace.href}>Hotel directions</ArrowLink>
      </div>
      <NearbyWalk
        origin="Mystic Mountain"
        places={nearbyPlaces}
        formatDistance={nearbyDistance}
        onSelect={setSelected}
        ariaLabel="An illustrated guide from Hotel Mystic Mountain to Kausani Tea Estate, Sumitranandan Pant Museum and Anasakti Ashram. Not to scale."
        hint="Hover a landmark, or choose a place below"
        defaultTheme="classic"
        showThemes={false}
        ambientMotion={false}
      >
        <div className="nearby-location-detail">
          <m.div
            key={active.id}
            aria-live="polite"
            aria-atomic="true"
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.22 }}
          >
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <EditorialLink href={active.href} target="_blank" rel="noreferrer">
              Explore this place
            </EditorialLink>
          </m.div>
          <p className="nearby-location-note">
            An illustrated guide, not a walking route. Distances are approximate
            and measured in a straight line. Ask locally about paths, access and
            walking times.
          </p>
        </div>
      </NearbyWalk>
    </section>
  );
}
