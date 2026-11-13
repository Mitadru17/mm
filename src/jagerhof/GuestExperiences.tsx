import { TestimonialGlobe } from "@/components/ui/testimonial-globe";
import { guestReviews, GOOGLE_REVIEWS_URL } from "@/data/guest-reviews";
import { EditorialLink } from "@/components/EditorialLink";

export default function GuestExperiences() {
  return (
    <TestimonialGlobe
      items={guestReviews}
      action={
        <EditorialLink
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
        >
          Read all reviews
        </EditorialLink>
      }
    />
  );
}
