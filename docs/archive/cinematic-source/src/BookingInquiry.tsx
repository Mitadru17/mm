import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Users,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { hotel } from "./data";
import { Modal } from "./ui";
import { localDate, nextDate, validateStay, inquiryText } from "./booking.mjs";
export default function BookingInquiry() {
  const today = localDate();
  const [contact, setContact] = useState({ name: "", email: "", requests: "" });
  const [checkIn, setCheckIn] = useState(""),
    [checkOut, setCheckOut] = useState(""),
    [adults, setAdults] = useState("2"),
    [children, setChildren] = useState("0"),
    [room, setRoom] = useState("Please suggest an available room");
  const [error, setError] = useState(""),
    [preview, setPreview] = useState(false),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState("");
  const stay = { checkIn, checkOut, adults, children, room, ...contact };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const arrival = String(form.get("checkIn") || "");
    const departure = String(form.get("checkOut") || "");
    const profile = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      requests: String(form.get("requests") || "").trim(),
    };
    const submitted = {
      ...stay,
      checkIn: arrival,
      checkOut: departure,
      ...profile,
    };
    const message = validateStay(submitted);
    setError(message);
    if (!message) {
      setCheckIn(arrival);
      setCheckOut(departure);
      setContact(profile);
      setCopied(false);
      setCopyError("");
      setPreview(true);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inquiryText(stay));
      setCopied(true);
    } catch {
      setCopyError("Please select and copy the inquiry text above.");
    }
  };
  return (
    <section
      className="booking-wrap"
      id="plan"
      aria-labelledby="booking-heading"
    >
      <div className="booking-intro">
        <span className="eyebrow" id="booking-heading">
          MAKE ROOM FOR THE MOUNTAINS
        </span>
        <span>Good days begin with a little escape.</span>
      </div>
      <form className="booking-form" onSubmit={submit}>
        <label className="date-field">
          <span>
            <CalendarDays size={15} /> CHECK IN
          </span>
          <input
            aria-label="Check-in date"
            name="checkIn"
            type="date"
            required
            min={today}
            value={checkIn}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setCheckIn(value);
              if (checkOut && checkOut <= value) setCheckOut(nextDate(value));
            }}
          />
        </label>
        <label className="date-field">
          <span>
            <CalendarDays size={15} /> CHECK OUT
          </span>
          <input
            aria-label="Check-out date"
            name="checkOut"
            type="date"
            required
            min={checkIn ? nextDate(checkIn) : nextDate(today)}
            value={checkOut}
            onInput={(e) => setCheckOut(e.currentTarget.value)}
          />
        </label>
        <div className="guest-fields">
          <label>
            <span>
              <Users size={15} /> ADULTS
            </span>
            <select
              aria-label="Adults"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "adult" : "adults"}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>CHILDREN</span>
            <select
              aria-label="Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "child" : "children"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          <span>ROOM PREFERENCE</span>
          <select
            aria-label="Preferred room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option>Please suggest an available room</option>
            <option>A timber room</option>
            <option>A room with a mountain outlook</option>
            <option>A room for a family or group</option>
          </select>
        </label>
        <div className="contact-fields">
          <label>
            <span>
              YOUR NAME <small>OPTIONAL</small>
            </span>
            <input
              name="name"
              aria-label="Your name"
              autoComplete="name"
              placeholder="How shall we call you?"
              maxLength={120}
            />
          </label>
          <label>
            <span>
              EMAIL ADDRESS <small>OPTIONAL</small>
            </span>
            <input
              name="email"
              aria-label="Your email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              maxLength={200}
            />
          </label>
          <label className="special-requests">
            <span>
              A LITTLE NOTE <small>OPTIONAL</small>
            </span>
            <textarea
              name="requests"
              aria-label="Special requests"
              rows={3}
              maxLength={1500}
              placeholder="A special occasion, a room preference, or anything you’d like us to know…"
            />
          </label>
        </div>
        <button className="button button-dark" type="submit">
          Prepare stay inquiry <ArrowUpRight size={18} />
        </button>
      </form>
      <div className="booking-note">
        <span>A personal inquiry. A thoughtfully planned stay.</span>
        <a href={hotel.booking} target="_blank" rel="noreferrer">
          Prefer our booking portal? <ArrowUpRight size={12} />
        </a>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {preview && (
        <Modal
          title="Your stay inquiry"
          onClose={() => setPreview(false)}
          className="inquiry-modal"
        >
          <p className="eyebrow">LET’S MAKE IT A MOUNTAIN MORNING</p>
          <h2>
            Your stay starts
            <br />
            with a conversation.
          </h2>
          <p>
            Review your details, then open your email app to send them directly
            to the hotel.
          </p>
          <label className="preference-label">
            Room preference
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option>Please suggest an available room</option>
              <option>A timber room</option>
              <option>A room with a mountain outlook</option>
              <option>A room for a family or group</option>
            </select>
          </label>
          <pre className="inquiry-preview">{inquiryText(stay)}</pre>
          <div className="inquiry-actions">
            <a
              className="button button-dark"
              href={`mailto:${hotel.email}?subject=${encodeURIComponent(`Stay inquiry · ${checkIn} to ${checkOut}`)}&body=${encodeURIComponent(inquiryText(stay))}`}
            >
              <Mail size={17} /> Open email inquiry
            </a>
            <button className="button button-outline" onClick={copy}>
              {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
              {copied ? "Copied" : "Copy details"}
            </button>
          </div>
          {copyError && (
            <p className="form-error" role="alert">
              {copyError}
            </p>
          )}
          <p className="fine-print">
            Send to {hotel.email}. Opening your email app does not send a
            message or confirm a reservation. No email app? Copy these details
            into your preferred email service, or{" "}
            <a href={hotel.phoneHref}>call the hotel</a>.
          </p>
        </Modal>
      )}
    </section>
  );
}
