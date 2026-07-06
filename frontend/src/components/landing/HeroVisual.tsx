"use client";

import Image from "next/image";
import { BrainCircuit, Star, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 blur-3xl" />

      {/* Main Image */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[32px] border bg-background shadow-2xl"
      >
        <Image
          src="/images/hero/hero-yoga.webp"
          alt="Yoga Practice"
          width={500}
          height={650}
          priority
          className="h-auto w-full object-cover"
        />
      </motion.div>

      {/* AI Card */}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute left-[-30px] top-10 rounded-2xl border bg-background/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <BrainCircuit className="size-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-semibold">
              AI Personalized
            </p>

            <p className="text-xs text-muted-foreground">
              Daily Wellness Plan
            </p>
          </div>
        </div>
      </motion.div>

      {/* Rating */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute right-[-20px] top-1/3 rounded-2xl border bg-background/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2">

          <Star className="size-5 fill-yellow-400 text-yellow-400" />

          <div>

            <p className="font-semibold">
              4.9 Rating
            </p>

            <p className="text-xs text-muted-foreground">
              Trusted Community
            </p>

          </div>

        </div>
      </motion.div>

      {/* Members */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 left-[-20px] rounded-2xl border bg-background/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-3">

          <Users className="size-5 text-primary" />

          <div>

            <p className="font-semibold">
              10K+ Yogis
            </p>

            <p className="text-xs text-muted-foreground">
              Active Members
            </p>

          </div>

        </div>
      </motion.div>

      {/* Sessions */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-5 right-[-25px] rounded-2xl border bg-background/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-3">

          <CalendarDays className="size-5 text-primary" />

          <div>

            <p className="font-semibold">
              500+
            </p>

            <p className="text-xs text-muted-foreground">
              Live Sessions
            </p>

          </div>

        </div>
      </motion.div>

    </div>
  );
}