"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CreditCard,
  Users,
  Clock3,
} from "lucide-react";

import { Card } from "@/components/ui/card";

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .6 }}
      className="relative"
    >

      <Card className="rounded-[32px] border bg-background/80 p-8 shadow-2xl backdrop-blur">

        <div className="space-y-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Today's Class
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Morning Flow Yoga
              </h3>

            </div>

            <div className="rounded-2xl bg-primary/10 p-3">
              <CalendarDays className="size-6 text-primary" />
            </div>

          </div>

          <div className="rounded-2xl bg-muted p-5">

            <div className="flex items-center justify-between">

              <span>Next Session</span>

              <Clock3 className="size-5" />

            </div>

            <p className="mt-2 text-xl font-semibold">
              Tomorrow • 7:00 AM
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border p-5">

              <Users className="mb-4 size-5 text-primary" />

              <h4 className="text-2xl font-bold">
                248
              </h4>

              <p className="text-sm text-muted-foreground">
                Active Members
              </p>

            </div>

            <div className="rounded-2xl border p-5">

              <CreditCard className="mb-4 size-5 text-primary" />

              <h4 className="text-2xl font-bold">
                ₹42K
              </h4>

              <p className="text-sm text-muted-foreground">
                Monthly Revenue
              </p>

            </div>

          </div>

        </div>

      </Card>

      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute -left-8 top-10 rounded-2xl border bg-background px-5 py-4 shadow-xl"
      >
        🎉 Booking Confirmed
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute -right-8 bottom-10 rounded-2xl border bg-background px-5 py-4 shadow-xl"
      >
        💳 Payment Successful
      </motion.div>

    </motion.div>
  );
}