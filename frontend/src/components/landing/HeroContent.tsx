"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroContent() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="rounded-full border bg-muted px-4 py-2 text-sm font-medium">
          🧘 Trusted by Modern Yoga Studios
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .1 }}
        className="text-5xl font-extrabold leading-tight lg:text-7xl"
      >
        Your Yoga
        <br />
        Journey,
        <br />
        Simplified.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .2 }}
        className="max-w-xl text-lg text-muted-foreground"
      >
        Book yoga classes, schedule appointments, manage payments
        and stay consistent—all from one beautifully designed
        platform.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
      >
        <Button size="lg" className="rounded-full">
          Book Class
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
        >
          Explore Classes
        </Button>
      </motion.div>

      <motion.div
        className="flex gap-10 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
      >
        <div>
          <h2 className="text-3xl font-bold">500+</h2>
          <p className="text-muted-foreground">Classes</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="text-muted-foreground">Instructors</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">10K+</h2>
          <p className="text-muted-foreground">Bookings</p>
        </div>
      </motion.div>
    </div>
  );
}