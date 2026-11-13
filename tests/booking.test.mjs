import test from "node:test";
import assert from "node:assert/strict";
import { validateStay, nextDate, inquiryText } from "../src/booking.mjs";
const stay = {
  checkIn: "2026-12-10",
  checkOut: "2026-12-13",
  adults: "2",
  children: "0",
  room: "",
};
test("accepts valid stay and arrival today", () => {
  assert.equal(validateStay(stay, "2026-12-10"), "");
});
test("rejects same-day and reversed departure", () => {
  for (const checkOut of ["2026-12-10", "2026-12-09"])
    assert.match(
      validateStay({ ...stay, checkOut }, "2026-11-11"),
      /departure date after/,
    );
});
test("rejects past arrivals", () => {
  assert.match(validateStay(stay, "2026-12-11"), /today or later/);
});
test("rejects missing and impossible calendar dates", () => {
  for (const checkIn of ["", "2026-02-30", "2026-13-01", "not-a-date"])
    assert.match(
      validateStay({ ...stay, checkIn }, "2026-01-01"),
      /choose your arrival/,
    );
});
test("enforces guest limits and whole numbers", () => {
  for (const adults of ["0", "13", "1.5", "NaN"])
    assert.match(validateStay({ ...stay, adults }, "2026-11-11"), /adults/);
  for (const children of ["-1", "9", "1.5"])
    assert.match(validateStay({ ...stay, children }, "2026-11-11"), /children/);
});
test("handles month, leap-year and year boundaries", () => {
  assert.equal(nextDate("2026-12-31"), "2027-01-01");
  assert.equal(nextDate("2028-02-28"), "2028-02-29");
  assert.equal(nextDate("2026-02-28"), "2026-03-01");
});
test("inquiry contains all stay details and asks for confirmation", () => {
  const text = inquiryText({ ...stay, children: "2", room: "Timber room" });
  for (const detail of [
    "2026-12-10",
    "2026-12-13",
    "Adults: 2",
    "Children: 2",
    "Timber room",
    "availability",
    "cancellation",
  ])
    assert.ok(text.includes(detail));
  assert.ok(!text.includes("confirmed reservation"));
});
test("optional guest details remain intact in the reviewed inquiry", () => {
  const text = inquiryText({
    ...stay,
    name: "Test Guest",
    email: "guest@example.com",
    requests: "A quiet room & arrival after lunch.",
  });
  for (const detail of [
    "Guest name: Test Guest",
    "Reply email: guest@example.com",
    "A quiet room & arrival after lunch.",
  ])
    assert.ok(text.includes(detail));
  assert.ok(!inquiryText(stay).includes("undefined"));
});
