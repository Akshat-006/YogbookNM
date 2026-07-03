import {
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Users,
  Clock3,
  Sparkles,
} from "lucide-react";

export const FEATURES = [
  {
    title: "Easy Class Booking",
    description:
      "Book yoga classes in just a few clicks with real-time availability.",
    icon: CalendarDays,
  },
  {
    title: "Secure Payments",
    description:
      "Fast and secure online payments powered by Razorpay integration.",
    icon: CreditCard,
  },
  {
    title: "Verified Instructors",
    description:
      "Practice with experienced and certified yoga professionals.",
    icon: Users,
  },
  {
    title: "Google Calendar Sync",
    description:
      "Automatically add your booked sessions to your calendar.",
    icon: Clock3,
  },
  {
    title: "Safe & Reliable",
    description:
      "Authentication, protected bookings and secure user experience.",
    icon: ShieldCheck,
  },
  {
    title: "Modern Experience",
    description:
      "Beautiful interface with smooth interactions across all devices.",
    icon: Sparkles,
  },
] as const;