import { NearbyWalk } from "./nearby-walk-menu";
import { nearbyDistance, nearbyPlaces } from "@/map/nearby-data";

/** Example using the project's verified data instead of the supplied Seoul demo. */
export default function NearbyWalkDemo() {
  return (
    <NearbyWalk
      origin="Mystic Mountain"
      places={nearbyPlaces}
      formatDistance={nearbyDistance}
      defaultTheme="classic"
      hint="Hover a landmark, or choose a place below"
    />
  );
}
