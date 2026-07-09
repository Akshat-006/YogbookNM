"use client";

import Image from "next/image";
import { BrainCircuit, Star, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-center">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />

      {/* Main Image — Yoga photo */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[36px] shadow-premium glow-primary"
        style={{ border: "1px solid rgba(45,106,79,0.15)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=85&auto=format&fit=crop"
          alt="Woman doing yoga in a serene studio"
          width={500}
          height={500}
          priority
          className="h-auto w-full object-cover"
        />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* AI Card — top left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="glass absolute left-[-24px] top-12 rounded-2xl px-4 py-3 shadow-premium"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <BrainCircuit className="size-4.5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">AI Personalized</p>
            <p className="text-xs text-muted-foreground">Daily Wellness Plan</p>
          </div>
        </div>
      </motion.div>

      {/* Rating — right */}
      {/* <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="glass absolute right-[-20px] top-1/3 rounded-2xl px-4 py-3 shadow-premium"
      >
        <div className="flex items-center gap-2.5">
          <Star className="size-5 fill-amber-400 text-amber-400" />
          <div>
            <p className="text-sm font-bold leading-tight">4.9 Rating</p>
            <p className="text-xs text-muted-foreground">Trusted Community</p>
          </div>
        </div>
      </motion.div> */}

      {/* Members — bottom left */}
      {/* <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="glass absolute bottom-16 left-[-24px] rounded-2xl px-4 py-3 shadow-premium"
      >
        <div className="flex items-center gap-3">
          <Users className="size-4.5 text-primary" />
          <div>
            <p className="text-sm font-bold leading-tight">10K+ Yogis</p>
            <p className="text-xs text-muted-foreground">Active Members</p>
          </div>
        </div>
      </motion.div> */}

      {/* Sessions — bottom right */}
      {/* <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="glass absolute bottom-6 right-[-18px] rounded-2xl px-4 py-3 shadow-premium"
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="size-4.5 text-primary" />
          <div>
            <p className="text-sm font-bold leading-tight">500+ Sessions</p>
            <p className="text-xs text-muted-foreground">Live Classes</p>
          </div>
        </div>
      </motion.div> */}

    </div>
  );
}