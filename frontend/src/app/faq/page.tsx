import type { Metadata } from "next";
import { FAQPageClient } from "./FAQPageClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Yogbook",
  description:
    "Find answers to frequently asked questions about yoga classes, bookings, consultations, payments, and other wellness programs on Yogbook.",
  keywords: ["yoga faq", "yogbook questions", "booking help", "yoga support"],
};

export default function FAQPage() {
  return <FAQPageClient />;
}
