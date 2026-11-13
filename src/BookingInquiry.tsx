import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Minus,
  Plus,
} from "lucide-react";
import Stepper, { Step } from "./components/Stepper";
import { hotel, photos } from "./data";
import { MountainMark, PhotoImage } from "./ui";
import { localDate, nextDate, validateStay, inquiryText } from "./booking.mjs";

const preferences = [
  "Please suggest an available room",
  "A timber room",
  "A room with a mountain outlook",
  "A room for a family or group",
];
const formatDate = (value: string) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Choose your dates";

function GuestCounter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="enquiry-counter">
      <div>
        <span id={id}>{label}</span>
        <small>{label === "Adults" ? "1 to 12 guests" : "0 to 8 guests"}</small>
      </div>
      <div>
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={16} />
        </button>
        <output aria-labelledby={id} aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function BookingInquiry({
  initialRoom = preferences[0],
}: {
  initialRoom?: string;
}) {
  const uid = useId(),
    form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1),
    [reached, setReached] = useState(1);
  const [checkIn, setCheckIn] = useState(""),
    [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2),
    [children, setChildren] = useState(0),
    [room, setRoom] = useState(initialRoom);
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [requests, setRequests] = useState("");
  const [error, setError] = useState(""),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState("");
  const stay = {
    checkIn,
    checkOut,
    adults: String(adults),
    children: String(children),
    room,
    name: name.trim(),
    email: email.trim(),
    requests: requests.trim(),
  };
  const firstName = name.trim().split(/\s+/)[0];
  const nights =
    checkIn && checkOut
      ? Math.round(
          (+new Date(`${checkOut}T12:00:00`) -
            +new Date(`${checkIn}T12:00:00`)) /
            86400000,
        )
      : 0;
  const changeStep = (next: number) => {
    if (next > step && (step === 1 || next === 4)) {
      const message = validateStay(stay);
      if (message) {
        setError(message);
        return;
      }
    }
    if (next === 4 && email) {
      const field = document.createElement("input");
      field.type = "email";
      field.value = email;
      if (!field.checkValidity()) {
        setError("Please check your email address before reviewing.");
        setStep(3);
        return;
      }
    }
    if (next > step && !form.current?.reportValidity()) return;
    setError("");
    setStep(next);
    setReached((previous) => Math.max(previous, next));
    setCopied(false);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < 4) changeStep(step + 1);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inquiryText(stay));
      setCopied(true);
      setCopyError("");
    } catch {
      setCopyError(
        "Copy the details below, or call the hotel to plan your stay.",
      );
    }
  };
  const draftHref = `mailto:${hotel.email}?subject=${encodeURIComponent(`Stay inquiry · ${checkIn} to ${checkOut}`)}&body=${encodeURIComponent(inquiryText(stay))}`;
  const photo = photos.find((entry) => entry.id === "valley-balcony")!;
  return (
    <section className="enquiry-shell" id="plan" aria-label="Plan your stay">
      <aside className="enquiry-story">
        <PhotoImage
          id={photo.id}
          alt={photo.alt}
          eager
          sizes="(max-width: 767px) 100vw, 38vw"
        />
        <div className="enquiry-story-top">
          <MountainMark />
          <span>
            MYSTIC MOUNTAIN<small>KAUSANI · UTTARAKHAND</small>
          </span>
        </div>
        <div className="enquiry-story-copy">
          <p>Your time in the hills</p>
          <h2>
            A stay,
            <br />
            <em>your way.</em>
          </h2>
        </div>
        <div className="enquiry-stay-note" aria-live="polite">
          <span>
            {nights > 0
              ? `${nights} ${nights === 1 ? "night" : "nights"} in Kausani`
              : "Let’s begin with your dates."}
          </span>
          {nights > 0 && (
            <small>
              {formatDate(checkIn)} — {formatDate(checkOut)}
              <br />
              {adults} {adults === 1 ? "adult" : "adults"}
              {children > 0
                ? ` · ${children} ${children === 1 ? "child" : "children"}`
                : ""}
            </small>
          )}
        </div>
      </aside>
      <div className="enquiry-main">
        <p className="enquiry-eyebrow">A personal enquiry</p>
        <form ref={form} className="enquiry-form" onSubmit={submit}>
          <Stepper step={step} reached={reached} onStepChange={changeStep}>
            <Step title="Dates">
              <div className="enquiry-step-heading">
                <h2 data-step-title tabIndex={-1}>
                  When do the
                  <br />
                  <em>mountains call?</em>
                </h2>
                <p>
                  Choose your arrival and departure. We’ll take it from there.
                </p>
              </div>
              <div className="enquiry-fields enquiry-date-fields">
                <label htmlFor={`${uid}-arrival`}>
                  Arrival
                  <input
                    id={`${uid}-arrival`}
                    name="checkIn"
                    aria-label="Check-in date"
                    type="date"
                    min={localDate()}
                    required
                    value={checkIn}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${uid}-error` : undefined}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCheckIn(value);
                      if (checkOut && checkOut <= value)
                        setCheckOut(nextDate(value));
                      setError("");
                    }}
                  />
                </label>
                <label htmlFor={`${uid}-departure`}>
                  Departure
                  <input
                    id={`${uid}-departure`}
                    name="checkOut"
                    aria-label="Check-out date"
                    type="date"
                    min={checkIn ? nextDate(checkIn) : nextDate(localDate())}
                    required
                    value={checkOut}
                    onChange={(event) => {
                      setCheckOut(event.target.value);
                      setError("");
                    }}
                  />
                </label>
              </div>
              <p className="enquiry-help">
                Your dates help us check the right options for you.
              </p>
            </Step>
            <Step title="Guests">
              <div className="enquiry-step-heading">
                <h2 data-step-title tabIndex={-1}>
                  Who’s coming
                  <br />
                  <em>along?</em>
                </h2>
                <p>Tell us a little about your travelling company.</p>
              </div>
              <GuestCounter
                label="Adults"
                value={adults}
                min={1}
                max={12}
                onChange={setAdults}
              />
              <GuestCounter
                label="Children"
                value={children}
                min={0}
                max={8}
                onChange={setChildren}
              />
              <label className="enquiry-preference" htmlFor={`${uid}-room`}>
                A room you have in mind
                <select
                  id={`${uid}-room`}
                  aria-label="Preferred room"
                  value={room}
                  onChange={(event) => setRoom(event.target.value)}
                >
                  {preferences.map((preference) => (
                    <option key={preference}>{preference}</option>
                  ))}
                </select>
              </label>
              <p className="enquiry-help">
                A preference helps us guide you; rooms are subject to
                availability.
              </p>
            </Step>
            <Step title="Yours">
              <div className="enquiry-step-heading">
                <h2 data-step-title tabIndex={-1}>
                  Make it
                  <br />
                  <em>your own.</em>
                </h2>
                <p>A name, a note, or something you’d like us to know.</p>
              </div>
              <div className="enquiry-fields">
                <label htmlFor={`${uid}-name`}>
                  What should we call you? <small>Optional</small>
                  <input
                    id={`${uid}-name`}
                    name="name"
                    aria-label="Your name"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={120}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                <label htmlFor={`${uid}-email`}>
                  Your email <small>Optional</small>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    aria-label="Your email address"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    maxLength={200}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
                <label className="enquiry-note-field" htmlFor={`${uid}-note`}>
                  A little note <small>Optional</small>
                  <textarea
                    id={`${uid}-note`}
                    name="requests"
                    aria-label="Special requests"
                    rows={3}
                    maxLength={1500}
                    placeholder="An occasion, a room preference, or a question for us…"
                    value={requests}
                    onChange={(event) => setRequests(event.target.value)}
                  />
                </label>
              </div>
            </Step>
            <Step title="Review">
              <div className="enquiry-step-heading">
                <h2 data-step-title tabIndex={-1}>
                  {firstName ? (
                    <>
                      Your stay,
                      <br />
                      <em>{firstName}.</em>
                    </>
                  ) : (
                    <>
                      Your mountain
                      <br />
                      <em>stay begins here.</em>
                    </>
                  )}
                </h2>
                <p>Everything in one place, ready to share with the hotel.</p>
              </div>
              <dl className="enquiry-review">
                <div>
                  <dt>
                    Your dates{" "}
                    <button
                      type="button"
                      onClick={() => changeStep(1)}
                      aria-label="Edit dates"
                    >
                      Edit
                    </button>
                  </dt>
                  <dd>
                    {formatDate(checkIn)} — {formatDate(checkOut)}
                    <small>
                      {nights} {nights === 1 ? "night" : "nights"}
                    </small>
                  </dd>
                </div>
                <div>
                  <dt>
                    Your company{" "}
                    <button
                      type="button"
                      onClick={() => changeStep(2)}
                      aria-label="Edit guests"
                    >
                      Edit
                    </button>
                  </dt>
                  <dd>
                    {adults} {adults === 1 ? "adult" : "adults"} · {children}{" "}
                    {children === 1 ? "child" : "children"}
                    <small>{room}</small>
                  </dd>
                </div>
                {(name || email || requests) && (
                  <div>
                    <dt>
                      Your details{" "}
                      <button
                        type="button"
                        onClick={() => changeStep(3)}
                        aria-label="Edit personal details"
                      >
                        Edit
                      </button>
                    </dt>
                    <dd>
                      {name}
                      {email && <small>{email}</small>}
                      {requests && <p>{requests}</p>}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="enquiry-send-actions">
                <a className="signature-button" href={draftHref}>
                  <span>Open email enquiry</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className="enquiry-copy"
                  aria-label={copied ? "Details copied" : "Copy details"}
                  onClick={copy}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span role="status">
                    {copied ? "Details copied" : "Copy details"}
                  </span>
                </button>
              </div>
              <p className="enquiry-help">
                Your email app opens with these details. Nothing is sent
                automatically. The hotel will confirm availability, pricing and
                arrangements.
              </p>
              {copyError && (
                <>
                  <p className="form-error" role="alert">
                    {copyError}
                  </p>
                  <pre className="enquiry-copy-fallback">
                    {inquiryText(stay)}
                  </pre>
                </>
              )}
            </Step>
          </Stepper>
          {error && (
            <p id={`${uid}-error`} className="enquiry-error" role="alert">
              {error}
            </p>
          )}
          <div className="enquiry-navigation">
            {step > 1 ? (
              <button
                type="button"
                className="enquiry-back"
                onClick={() => changeStep(step - 1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span className="enquiry-step-count">01 / 04</span>
            )}
            {step < 4 && (
              <button type="submit" className="signature-button">
                <span>
                  {step === 1
                    ? "Choose your company"
                    : step === 2
                      ? "Add a personal touch"
                      : "Review your enquiry"}
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </form>
        <div className="enquiry-direct">
          <span>Prefer a conversation?</span>
          <a href={hotel.phoneHref}>{hotel.phone}</a>
          <a href={hotel.booking} target="_blank" rel="noreferrer">
            Booking portal <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
