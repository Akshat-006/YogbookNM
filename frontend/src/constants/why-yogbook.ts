import {
  CalendarDays,
  CreditCard,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

export const WHY_YOGBOOK = [
  {
    title: "Easy Booking",
    description: "Book yoga classes and appointments in seconds.",
    icon: CalendarDays,
  },
  {
    title: "Secure Payments",
    description: "Safe and reliable online payment experience.",
    icon: CreditCard,
  },
  {
    title: "Google Calendar Sync",
    description: "Never miss a session with automatic reminders.",
    icon: CalendarCheck,
  },
  {
    title: "Trusted Platform",
    description: "Built with secure authentication and protected APIs.",
    icon: ShieldCheck,
  },
] as const;