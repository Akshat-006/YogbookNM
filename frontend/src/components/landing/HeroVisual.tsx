"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .6 }}
      className="relative"
    >
      <Card className="rounded-3xl border shadow-xl">
        <CardContent className="space-y-6 p-8">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Today's Session
              </p>

              <h3 className="text-xl font-semibold">
                Morning Flow Yoga
              </h3>
            </div>

            <CheckCircle2 className="text-green-500" />
          </div>

          <div className="rounded-2xl bg-muted p-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5" />
              <span>Tomorrow • 7:00 AM</span>
            </div>
          </div>

          <div className="rounded-2xl bg-muted p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="size-5" />
              <span>Payment Successful</span>
            </div>
          </div>

        </CardContent>
      </Card>

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute -right-6 top-8 rounded-2xl border bg-background p-4 shadow-xl"
      >
        ✅ Booking Confirmed
      </motion.div>
    </motion.div>
  );
}