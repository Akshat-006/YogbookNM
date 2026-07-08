"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

export function AboutSection() {
  const { data } = useCMSContentByKey("about");

  const title = data?.title ?? "About Yogbook";
  const subtitle = data?.subtitle ?? "A mindful yoga platform for every body.";
  const description =
    data?.description ??
    "Yogbook blends yoga classes, appointments, and wellness support into one beautifully simple experience for modern yogis.";
  const buttonText = data?.button_text ?? "View Classes";
  const buttonLink = data?.button_link ?? "/classes";
  const imageSrc = data?.image ?? "/images/hero/hero-yoga.webp";

  return (
    <section id="about" className="py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Why Yogbook?
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

            <Link href={buttonLink} className="inline-flex items-center gap-2 text-lg font-semibold text-primary transition hover:text-primary/80">
              {buttonText}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-border bg-background shadow-xl">
            <Image
              src={imageSrc}
              alt="About Yogbook"
              width={720}
              height={560}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
