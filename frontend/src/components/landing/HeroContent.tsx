"use client";

import { motion, type MotionProps } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});


export function HeroContent() {
  const { data: heroContent } = useCMSContentByKey("hero");
  const title = heroContent?.title ?? "Transform Your\nMind, Body &\nInner Peace.";
  const subtitle =
    heroContent?.subtitle ??
    "Join expert-led yoga classes designed to improve flexibility, strength, mindfulness, and overall wellness.";
  const buttonText = heroContent?.button_text ?? "Start Your Journey";
  const buttonLink = heroContent?.button_link ?? "/classes";

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Badge */}
      <motion.div {...fadeUp(0)}>
        <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/8 px-5 py-2.5 backdrop-blur">
          <Sparkles className="size-4 text-primary" />
          <span className="font-heading text-sm font-semibold text-primary">
            Yogbook — A holistic approach to wellness
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-heading max-w-xl whitespace-pre-line text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl xl:text-[80px]"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="max-w-lg text-lg leading-[1.85] text-muted-foreground"
      >
        {subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="flex flex-wrap items-center gap-4"
      >
        <Button
          asChild
          size="lg"
          className="h-13 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl"
        >
          <a href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-13 rounded-full border-border px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          Explore Programs
        </Button>
      </motion.div>

      {/* Trust bullets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.44 }}
        className="grid gap-3 pt-2"
      >
        {[
          "Personalized AI Yoga Guidance",
          "Certified Yoga Instructors",
          "Classes, Appointments & Wellness Tracking",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-primary" />
            <span className="text-sm font-medium text-foreground/80">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}