"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

export function ContactSection() {
  const { data } = useCMSContentByKey("contact");

  const title = data?.title ?? "Get in Touch";
  const subtitle = data?.subtitle ?? "We’re here to support your practice.";
  const description =
    data?.description ??
    "Have a question about classes, appointments, or wellness plans? Reach out and our team will get back to you quickly.";
  const buttonText = data?.button_text ?? "Book a Consultation";
  const buttonLink = data?.button_link ?? "/appointments";

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Contact Us
            </span>

            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {title}
            </h2>

            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>

            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {buttonText}
            </Link>
          </div>

          <div className="grid gap-4 rounded-[32px] border border-border bg-background p-8 shadow-sm">
            <div className="flex items-start gap-4 rounded-3xl border bg-primary/5 p-6">
              <MapPin className="size-6 text-primary" />
              <div>
                <p className="text-sm font-semibold">Visit Us</p>
                <p className="text-sm text-muted-foreground">123 Yogbook Lane, Wellness City</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border bg-primary/5 p-6">
              <Phone className="size-6 text-primary" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border bg-primary/5 p-6">
              <Mail className="size-6 text-primary" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-sm text-muted-foreground">support@yogbook.com</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
