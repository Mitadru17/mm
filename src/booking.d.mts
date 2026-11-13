export type Stay = {
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  room: string;
  name?: string;
  email?: string;
  requests?: string;
};
export function localDate(date?: Date): string;
export function nextDate(value: string): string;
export function validateStay(stay: Stay, today?: string): string;
export function inquiryText(stay: Stay): string;
