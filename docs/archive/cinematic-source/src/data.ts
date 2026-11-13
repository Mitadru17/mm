export const hotel = {
  name: "Hotel Mystic Mountain Kausani",
  phone: "+91 89418 76542",
  phoneHref: "tel:+918941876542",
  email: "hotelmysticmount@gmail.com",
  address: "Baijnath Road, opposite Tea Factory, Kausani, Uttarakhand, India",
  maps: "https://maps.app.goo.gl/YBLcZAejib3xQyRBA",
  booking: "https://hotelmysticmountainkausani.proexsus.com/",
  reviews:
    "https://www.makemytrip.com/hotels/hotel_mystic_mountain_kausani-details-kausani.html",
};
export const navigation = [
  ["Stay", "stays"],
  ["Dine", "dine"],
  ["Experiences", "experience"],
  ["Our story", "about"],
  ["Gallery", "gallery"],
  ["Location", "location"],
];
export type Photo = {
  id: string;
  caption: string;
  category: string;
  alt: string;
};
export const photos: Photo[] = [
  {
    id: "timber-room",
    caption: "Timber, texture & a little mountain light",
    category: "Rooms",
    alt: "Wood-panelled bedroom with a double bed and an open doorway to the balcony",
  },
  {
    id: "valley-balcony",
    caption: "A balcony made for taking your time",
    category: "Views",
    alt: "Green balcony overlooking the wooded hills and blue sky of Kausani",
  },
  {
    id: "dining",
    caption: "Gather around the table",
    category: "Dining",
    alt: "Long dining room with timber tables and windows along the hillside",
  },
  {
    id: "terrace",
    caption: "Out in the open",
    category: "Property",
    alt: "Outdoor terrace with seating and green hills beyond",
  },
  {
    id: "room-view",
    caption: "Let the outside in",
    category: "Rooms",
    alt: "Bedroom with seating by a large window opening onto the valley",
  },
  {
    id: "dining-window",
    caption: "Lunch with a different outlook",
    category: "Dining",
    alt: "Tables beside the dining room windows looking toward the green hills",
  },
  {
    id: "surroundings",
    caption: "Green in every direction",
    category: "Surroundings",
    alt: "Trees and hillside buildings beside the hotel on Baijnath Road",
  },
  {
    id: "room-warm",
    caption: "A softer place to land",
    category: "Rooms",
    alt: "Warm-coloured room with double bed, timber ceiling and window seating",
  },
  {
    id: "doorway",
    caption: "The mountains are just outside",
    category: "Property",
    alt: "Open timber doorway framing the hotel balcony and distant green hills",
  },
  {
    id: "arrival",
    caption: "The road that brings you here",
    category: "Property",
    alt: "Curving Baijnath Road and roadside greenery at the hotel entrance",
  },
  {
    id: "valley-portrait",
    caption: "A slower kind of afternoon",
    category: "Views",
    alt: "Terrace swing and layered green hills under a blue Kausani sky",
  },
  {
    id: "lounge",
    caption: "A quiet corner between adventures",
    category: "Dining",
    alt: "Window-lined lounge with dark sofas and a timber ceiling",
  },
];
export const rooms = [
  {
    id: "timber",
    title: "Timber & mountain light",
    label: "THE TIMBER ROOMS",
    image: "timber-room",
    images: ["timber-room", "timber-detail", "timber-window"],
    description:
      "Warm wood, thoughtful corners, and the landscape just beyond the glass. A little invitation to put your bags down and stay a while.",
    features: [
      "Timber interiors",
      "Window-side light",
      "Warm, natural textures",
    ],
  },
  {
    id: "outlook",
    title: "Let the outside in",
    label: "ROOMS WITH AN OUTLOOK",
    image: "room-view",
    images: ["room-view", "room-blue", "balcony"],
    description:
      "The hills set the pace here. Explore our room photography, from bright windows and cosy seating to the green scenery outside.",
    features: ["Window-side seating", "Natural light", "Mountain setting"],
  },
  {
    id: "unwind",
    title: "A softer place to land",
    label: "A DIFFERENT PERSPECTIVE",
    image: "room-warm",
    images: ["room-warm", "room-wide", "doorway"],
    description:
      "After a day in the hills, return to familiar comforts and a quieter evening. Discover the colours and details of our accommodation.",
    features: [
      "Characterful interiors",
      "Space to slow down",
      "Comfortable surroundings",
    ],
  },
];
export type Room = (typeof rooms)[number];
export const faqs = [
  [
    "How do I plan a stay?",
    "Choose your preferred dates and guests, then prepare an email inquiry. Your email app will open with the details ready to send to the hotel. The team will confirm the available room options, rate and booking terms. You can also use our existing booking portal.",
  ],
  [
    "What are the check-in and check-out times?",
    "Please confirm your arrival and departure times directly with the hotel before travelling. For early arrivals or late departures, include your request in your stay inquiry.",
  ],
  [
    "Can I choose a specific room or view?",
    "Tell the hotel what matters to you when you inquire. Our photographs show a selection of rooms and shared spaces; a particular room, balcony or view is subject to confirmation by the hotel.",
  ],
  [
    "What about meals, parking and Wi-Fi?",
    "The property has a dining space, shown in our gallery. Please ask the hotel to confirm current meal options, parking arrangements, Wi-Fi availability and any accessibility needs for your dates.",
  ],
  [
    "What are the cancellation and extra-guest policies?",
    "Ask for the cancellation, payment, child and extra-guest terms that apply to your selected room and rate before confirming. Terms on external booking platforms may differ.",
  ],
];
