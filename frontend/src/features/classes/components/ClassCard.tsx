"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock3, IndianRupee, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import { YogaClass } from "../types/class.types";
import { Button } from "@/components/ui/button";

// Curated Unsplash yoga class images
const yogaImages = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80&auto=format&fit=crop",
];

interface Props {
  yogaClass: YogaClass;
  index?: number;
}

export function ClassCard({ yogaClass, index = 0 }: Props) {
  const date = new Date(yogaClass.schedule_datetime);
  const isRecurring = Boolean(yogaClass.recurring || yogaClass.series_id);
  const imageSrc = yogaImages[index % yogaImages.length];

  return (
    <Link href={`/classes/${yogaClass._id}`} className="block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group overflow-hidden rounded-[24px] border border-border bg-card shadow-sm transition-shadow hover:shadow-premium"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageSrc}
            alt={yogaClass.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Floating price badge */}
          <div className="absolute right-4 top-4 flex items-center gap-0.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-foreground shadow backdrop-blur">
            <IndianRupee className="size-3.5" />
            {yogaClass.price}
          </div>

          {/* Recurring pill */}
          {isRecurring && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                Recurring
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold leading-tight">{yogaClass.title}</h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {yogaClass.description}
          </p>

          {/* Meta */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5 shrink-0 text-primary" />
              <span>
                {date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {" · "}
                {date.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="size-3.5 shrink-0 text-primary" />
                {yogaClass.duration} min
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <UserRound className="size-3.5 shrink-0 text-primary" />
                {yogaClass.capacity} seats
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              className="w-full rounded-full bg-primary/10 text-primary font-semibold transition-all group-hover:bg-primary group-hover:text-primary-foreground"
              variant="ghost"
            >
              Explore Details
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
