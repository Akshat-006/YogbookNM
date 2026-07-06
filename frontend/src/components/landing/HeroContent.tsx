"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroContent() {
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
        className="max-w-xl text-5xl font-extrabold tracking-tight leading-[1] lg:text-7xl"
      >
        Transform Your
        <br />

        Mind, Body &
        <br />

        Inner Peace.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .2 }}
        className="max-w-lg text-lg leading-8 text-muted-foreground"
      >
        Join expert-led yoga classes designed to improve flexibility,
        strength, mindfulness, and overall wellness.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="flex flex-wrap gap-4"
      >
        <Button
          size="lg"
          className="rounded-full px-8 h-12"
        >
          Start Your Journey

          <ArrowRight className="ml-2 size-4" />
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