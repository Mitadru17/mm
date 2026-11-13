import { hotelPlace, places } from "./places";
import type { NearbyPlace } from "@/components/ui/nearby-walk-menu";

// Great-circle distance from the existing, sourced coordinates. This is not
// a pedestrian route, walking estimate, property survey or access guarantee.
function distanceKm(a: [number, number], b: [number, number]) {
  const rad = (n: number) => (n * Math.PI) / 180;
  const latitude = rad(b[1] - a[1]),
    longitude = rad(b[0] - a[0]);
  const h =
    Math.sin(latitude / 2) ** 2 +
    Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(longitude / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export const nearbyPlaces: NearbyPlace[] = ["tea", "museum", "ashram"].map(
  (id) => {
    const place = places.find((entry) => entry.id === id)!;
    return {
      id: place.id,
      name: place.title,
      km: distanceKm(hotelPlace.coordinates, place.coordinates),
      description: place.description,
      href: place.href,
    };
  },
);

export function nearbyDistance(km: number) {
  // Avoid presenting adjacent approximate map pins as a measured 24m walk.
  return km < 0.1 ? "Close to the hotel" : `About ${km.toFixed(1)} km away`;
}
