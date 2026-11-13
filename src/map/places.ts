export type PlaceId = "hotel" | "tea" | "ashram" | "museum";
export type MapPlace = {
  id: PlaceId;
  title: string;
  short: string;
  category: string;
  coordinates: [number, number];
  description: string;
  href: string;
  source: string;
};

export const places: MapPlace[] = [
  {
    id: "hotel",
    title: "Hotel Mystic Mountain",
    short: "Mystic Mountain",
    category: "Your mountain address",
    coordinates: [79.604065, 29.856438],
    description:
      "Baijnath Road, opposite the Tea Factory. Your starting point for a slower stay in Kausani.",
    href: "https://maps.app.goo.gl/YBLcZAejib3xQyRBA",
    source:
      "https://www.makemytrip.com/hotels/hotel_mystic_mountain_kausani-details-kausani.html",
  },
  {
    id: "tea",
    title: "Kausani Tea Estate",
    short: "Tea Estate",
    category: "Tea country",
    coordinates: [79.603828125, 29.8564875],
    description:
      "Discover Kausani’s tea-estate surroundings. Check local access before setting out.",
    href: "https://uttarakhandtourism.gov.in/destination/kausani",
    source:
      "https://www.google.com/maps/search/Visit+Kausani+Tea+Estate,+Kausani,+India",
  },
  {
    id: "ashram",
    title: "Anasakti Ashram",
    short: "Anasakti Ashram",
    category: "A quieter discovery",
    coordinates: [79.6013043, 29.8441997],
    description:
      "A quiet chapter in Kausani’s history, associated with Mahatma Gandhi’s stay in the hills.",
    href: "https://www.incredibleindia.gov.in/en/uttarakhand/kausani/anasakti-ashram",
    source:
      "https://sunrise.maplogs.com/anashakti_ashram_kausani_uttarakhand_india.281907.html",
  },
  {
    id: "museum",
    title: "Sumitranandan Pant Museum",
    short: "Pant Museum",
    category: "Culture & poetry",
    coordinates: [79.60406, 29.8435],
    description:
      "A cultural stop in Kausani. Ask locally about current opening hours and access.",
    href: "https://uttarakhandtourism.gov.in/destination/kausani",
    source:
      "https://www.makemytrip.com/hotels/hotel_mystic_mountain_kausani-details-kausani.html",
  },
];
export const hotelPlace = places[0];
