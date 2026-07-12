"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

export function CTA() {
  const { data: ctaContent } = useCMSContentByKey("cta");

  const title = ctaContent?.title ?? "Begin Your Yoga Journey Today";
  const description =
    ctaContent?.description ??
    "Discover personalized yoga programs, connect with expert instructors and take the first step toward a healthier lifestyle.";
  const buttonText = ctaContent?.button_text ?? "Get Started";
  const buttonLink = ctaContent?.button_link ?? "/classes";

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[40px] bg-primary px-8 py-20 text-center text-primary-foreground lg:px-20"
        >
          {/* Decorative orbs inside the CTA */}
          <div className="absolute left-[-8%] top-[-20%] h-[350px] w-[350px] rounded-full bg-white/8 blur-[80px]" />
          <div className="absolute right-[-5%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />

          {/* Dotted texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur">
              🌿 Start Today
            </span>

            <h2 className="font-heading mx-auto mt-8 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-full bg-white px-10 text-base font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-2xl"
              >
                <Link href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-13 rounded-full border border-white/30 px-10 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Link href="/appointments">Book Free Consult</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}