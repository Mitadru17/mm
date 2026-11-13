import PushpinTearFooter from "@/components/ui/pushpin-tear-footer";
import { hotel } from "../data";
import { MountainMark } from "../ui";
import { goTo } from "../experience";

export function SignatureFooter({
  onBook,
  entering,
}: {
  onBook: () => void;
  entering: boolean;
}) {
  return (
    <PushpinTearFooter
      id="contact"
      className="mystic-tear-footer"
      inert={entering}
      brand="MYSTIC"
      name="Mystic Mountain · Kausani"
      logo={<MountainMark />}
      logoHref="/"
      socials={[{ icon: "globe", label: "Hotel directions", href: hotel.maps }]}
      email={hotel.email}
      newsletter={null}
      onBook={onBook}
      onBackToTop={() => goTo("root", ".jh-header .arrival-menu-trigger")}
      status={{ label: "Baijnath Road · Kausani", href: hotel.maps }}
      mark="A LITTLE CLOSER TO NATURE"
      timeZone="Asia/Kolkata"
      timeLabel="KAUSANI"
      columns={[
        {
          title: "Explore",
          links: [
            { label: "Our story", href: "/about" },
            { label: "The rooms", href: "/suites" },
            { label: "Photo journal", href: "/gallery" },
          ],
          cta: { label: "discover.", href: "/activities" },
        },
        {
          title: "Get in touch",
          links: [
            { label: hotel.phone, href: hotel.phoneHref },
            { label: "Email the hotel", href: `mailto:${hotel.email}` },
            { label: "Find your way", href: hotel.maps },
          ],
          cta: { label: "let’s talk.", href: `mailto:${hotel.email}` },
        },
      ]}
      chat={{ label: "Email us", href: `mailto:${hotel.email}` }}
      sideLinks={[
        { icon: "globe", label: "Location", href: hotel.maps },
        { icon: "link", label: "Book direct", href: hotel.booking },
      ]}
      copyright={`© ${new Date().getFullYear()} Hotel Mystic Mountain Kausani`}
      credit=""
      handle={{ label: "Uttarakhand, India", href: hotel.maps }}
      sheet="#2f4f3e"
      paper="#e9e1d6"
      sheetInk="#faf8f4"
      paperInk="#2f4f3e"
      pinColor="#c66a3c"
      fontSans="var(--font-body)"
      height="clamp(940px, 100svh, 1120px)"
    />
  );
}
