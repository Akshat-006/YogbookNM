"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

export function ContactSection() {
  const { data } = useCMSContentByKey("contact");

  const title = data?.title ?? "Get in Touch";
  const subtitle = data?.subtitle ?? "We're here to support your practice.";
  const description =
    data?.description ??
    "Have a question about classes, appointments, or wellness plans? Reach out and our team will get back to you quickly.";
  const buttonText = data?.button_text ?? "Book a Consultation";
  const buttonLink = data?.button_link ?? "/appointments";

  const contactItems = [
    {
      icon: MapPin,
      label: "Visit Us",
      value: "Jaipur, Rajasthan",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@yogbook.com",
    },
  ];

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 section-alt" />
      <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center xl:gap-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-7"
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary">
              Contact Us
            </span>

            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-[52px]">
              {title}
            </h2>

            <p className="max-w-lg text-xl leading-relaxed text-muted-foreground">
              {subtitle}
            </p>

            <p className="max-w-lg text-base leading-[1.85] text-muted-foreground">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
            >
              {buttonText}
            </Link>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="space-y-4"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Map placeholder
            <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-muted/40 px-6 py-5">
              <p className="text-sm font-medium text-muted-foreground">
                lin
              </p>
            </div> */}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
