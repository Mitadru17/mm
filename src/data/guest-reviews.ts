/** Public review excerpts checked against the property's Google Travel review
 * page on 13 November 2026. Individual ratings were visible as 5/5.
 * These are selected excerpts, not an aggregate rating or a live review feed.
 * Avatars are decorative CC0 illustrations, not the reviewers' photographs.
 * No reviewer hometowns have been inferred.
 */
import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Hotel+Mystic+Mountain+Kausani/data=!4m7!3m6!1s0x39a74fa397f6dd67:0x10adb002caf6e690!8m2!3d29.8564845!4d79.6040235!9m1!1b1?hl=en";
const googleSource =
  "https://www.google.com/travel/hotels/entity/CgoIkM3b16yA7NYQEAE/reviews?hl=en";

export const guestReviews: GlobeTestimonial[] = [
  {
    id: "kalyanasis-bhattacharyya",
    name: "kalyanasis bhattacharyya",
    avatar: "/images/avatars/guest-1.svg",
    quote: "Amazing view of the Himalayas.",
    rating: 5,
    source: "Google",
    href: googleSource,
  },
  {
    id: "chirantani-chakraborty",
    name: "Chirantani Chakraborty",
    avatar: "/images/avatars/guest-2.svg",
    quote: "Food quality and location is also top notch.",
    rating: 5,
    source: "Google",
    href: googleSource,
  },
  {
    id: "mudit-srivastava",
    name: "mudit srivastava",
    avatar: "/images/avatars/guest-3.svg",
    quote: "I felt here like a home.",
    rating: 5,
    source: "Google",
    href: googleSource,
  },
  {
    id: "307bobby",
    name: "307bobby",
    avatar: "/images/avatars/guest-4.svg",
    quote: "great hospitality and food.",
    rating: 5,
    source: "Tripadvisor",
    href: "https://www.tripadvisor.com/ShowUserReviews-g1045172-d4554003-r186598597",
  },
];
