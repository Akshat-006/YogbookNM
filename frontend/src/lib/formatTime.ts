/**
 * Centralized time formatting utilities.
 * All functions use 12-hour AM/PM format for consistency across the app.
 */

const LOCALE = "en-IN";

/**
 * Formats a date/string to a full readable date+time string.
 * e.g. "Mon, 12 Jan 2026, 2:30 PM"
 */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Formats a date/string to date only.
 * e.g. "12 Jan 2026"
 */
export function formatDateOnly(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Formats a date/string to time only (12-hour).
 * e.g. "2:30 PM"
 */
export function formatTimeOnly(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
