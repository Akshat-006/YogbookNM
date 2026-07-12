"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HeroContent } from "./HeroContent";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";
import heroBg from "@/assets/images/hero/hero-yoga.webp";

export function Hero() {
  const { data: heroContent } = useCMSContentByKey("hero");
  const bgImage = heroContent?.image || heroBg;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Yoga Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Optional Green Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Container>
          <HeroContent />
        </Container>
      </div>
    </section>
  );
}