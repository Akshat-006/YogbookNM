"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=2000&q=90&auto=format&fit=crop"
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