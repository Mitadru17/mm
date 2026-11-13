export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function nextDate(value) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return localDate(date);
}
export function validateStay(stay, today = localDate()) {
  const validDate = (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    localDate(new Date(`${value}T12:00:00`)) === value;
  if (!validDate(stay.checkIn) || !validDate(stay.checkOut))
    return "Please choose your arrival and departure dates.";
  if (stay.checkIn < today) return "Your arrival date must be today or later.";
  if (stay.checkOut <= stay.checkIn)
    return "Please choose a departure date after your arrival.";
  if (
    !Number.isInteger(Number(stay.adults)) ||
    Number(stay.adults) < 1 ||
    Number(stay.adults) > 12
  )
    return "Please choose between 1 and 12 adults.";
  if (
    !Number.isInteger(Number(stay.children)) ||
    Number(stay.children) < 0 ||
    Number(stay.children) > 8
  )
    return "Please choose between 0 and 8 children.";
  return "";
}
export function inquiryText(stay) {
  const details = [
    stay.name && `Guest name: ${stay.name}`,
    stay.email && `Reply email: ${stay.email}`,
    stay.requests && `Special requests: ${stay.requests}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `Hello Hotel Mystic Mountain Kausani,\n\nI would like to inquire about a stay.\n\nCheck-in: ${stay.checkIn}\nCheck-out: ${stay.checkOut}\nAdults: ${stay.adults}\nChildren: ${stay.children}\nRoom preference: ${stay.room || "Please suggest an available room"}${details ? `\n\n${details}` : ""}\n\nPlease share availability, room options, total price, meal options, check-in times, and payment and cancellation terms.\n\nThank you.`;
}
