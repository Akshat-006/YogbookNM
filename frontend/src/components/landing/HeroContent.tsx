"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

export function HeroContent() {
  const { data: heroContent } = useCMSContentByKey("hero");
  const title = heroContent?.title ?? "Transform Your\nMind, Body &\nInner Peace.";
  const subtitle =
    heroContent?.subtitle ??
    "Join expert-led yoga classes designed to improve flexibility, strength, mindfulness, and overall wellness.";
  const buttonText = heroContent?.button_text ?? "Start Your Journey";
  const buttonLink = heroContent?.button_link ?? "/classes";

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 backdrop-blur">

          <Sparkles className="size-4 text-primary" />

          <span className="text-sm font-medium">
            Yogbook - A holistic approach to wellness
          </span>

        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .1 }}
        className="max-w-xl whitespace-pre-line text-5xl font-extrabold leading-[1] tracking-tight lg:text-7xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .2 }}
        className="max-w-lg text-lg leading-8 text-muted-foreground"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="flex flex-wrap gap-4"
      >
        <Button asChild size="lg" className="rounded-full px-8 h-12">
          <a href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 h-12"
        >
          Explore Programs
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
        className="grid gap-3 pt-2"
      >

        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-primary" />

          <span>Personalized AI Yoga Guidance</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-primary" />

          <span>Certified Yoga Instructors</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-primary" />

          <span>Classes, Appointments & Wellness Tracking</span>
        </div>

      </motion.div>

    </div>
  );
}