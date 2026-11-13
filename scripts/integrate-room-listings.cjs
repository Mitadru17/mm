const fs=require('fs');let p='src/jagerhof/JagerhofApp.tsx',s=fs.readFileSync(p,'utf8');s=s.replace('hotel, photos, faqs','hotel, photos, faqs, roomEnquiryPreferences');s=s.replace('const GuestExperiences = lazy','const RoomListings = lazy(() => import("./RoomListings"));\nconst GuestExperiences = lazy');s=s.replace('const [booking, setBooking] = useState(false);','const [booking, setBooking] = useState(false);\n  const [bookingRoom, setBookingRoom] = useState<string | undefined>();\n  const openBooking = useCallback((roomId?: string) => {\n    setBookingRoom(roomId ? roomEnquiryPreferences[roomId] : undefined);\n    setBooking(true);\n  }, []);');s=s.replaceAll('onBook={() => setBooking(true)}','onBook={() => openBooking()}');const a=s.indexOf('              <ExperiencesCarousel />'),z=s.indexOf('              <Marquee />',a);s=s.slice(0,a)+`              <Suspense fallback={<div id="stay" className="rooms-loading" aria-label="Opening the room collection" />}>
                <RoomListings onEnquire={openBooking} />
              </Suspense>
              {chapters.filter(chapter => ["nature", "dine"].includes(chapter.id)).map(chapter => <PhotoChapter key={chapter.id} chapter={chapter} onBook={() => openBooking()} />)}
              <ExperiencesCarousel />
              {chapters.filter(chapter => ["explore", "unwind"].includes(chapter.id)).map(chapter => <PhotoChapter key={chapter.id} chapter={chapter} onBook={() => openBooking()} />)}
`+s.slice(z);s=s.replace('<BookingInquiry />','<BookingInquiry initialRoom={bookingRoom} />');fs.writeFileSync(p,s);
p='src/data.ts';s=fs.readFileSync(p,'utf8');s+='\n/** Existing inquiry preferences, not guaranteed inventory categories. */\nexport const roomEnquiryPreferences: Record<string, string> = {\n  timber: "A timber room",\n  outlook: "A room with a mountain outlook",\n  unwind: "A room for a family or group",\n};\n';fs.writeFileSync(p,s);
p='src/tidescape/Pages.tsx';s=fs.readFileSync(p,'utf8');s=s.replace('faqs, hotel, rooms','faqs, hotel, rooms, roomEnquiryPreferences');s='import RoomListings from "../jagerhof/RoomListings";\n'+s;const b=s.indexOf('export function SuitesPage() {'),e=s.indexOf('export function SuitePage()',b);s=s.slice(0,b)+`export function SuitesPage() {
  return <>
    <section className="room-collection-page-heading">
      <p className="jh-eyebrow">MYSTIC MOUNTAIN / THE ROOMS</p>
      <h1>Find your place<br/><em>in the hills.</em></h1>
      <p>Explore our room photographs, then ask the hotel about room options and prices for your dates.</p>
    </section>
    <RoomListings standalone />
  </>;
}
`+s.slice(e);s=s.replace('  const preferences: Record<string, string> = {\r\n    timber: "A timber room",\r\n    outlook: "A room with a mountain outlook",\r\n    unwind: "A room for a family or group",\r\n  };','  const preferences = roomEnquiryPreferences;').replace('  const preferences: Record<string, string> = {\n    timber: "A timber room",\n    outlook: "A room with a mountain outlook",\n    unwind: "A room for a family or group",\n  };','  const preferences = roomEnquiryPreferences;');fs.writeFileSync(p,s);
p='src/jagerhof/RoomListings.tsx';s=fs.readFileSync(p,'utf8');s=s.replace('<m.header className="rooms-heading"','{!standalone && <m.header className="rooms-heading"').replace('</m.header>','</m.header>}');fs.writeFileSync(p,s);
