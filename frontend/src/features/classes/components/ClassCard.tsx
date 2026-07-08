"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock3, IndianRupee, UserRound } from "lucide-react";

import { YogaClass } from "../types/class.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  yogaClass: YogaClass;
}

export function ClassCard({ yogaClass }: Props) {
  const date = new Date(yogaClass.schedule_datetime);
  const isRecurring = Boolean(yogaClass.recurring || yogaClass.series_id);

  return (
    <Link href={`/classes/${yogaClass._id}`}>
      <Card className="group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative h-56 overflow-hidden">
          <Image
            src="/images/classes/default-class.webp"
            // src={yogaClass.thumbnail ?? "/images/classes/default-class.webp"}
            alt={yogaClass.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <CardContent className="space-y-5 p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-semibold">{yogaClass.title}</h3>
              {isRecurring && (
                <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Recurring
                </span>
              )}
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {yogaClass.description}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Calendar className="size-4" />
              {date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              •
              {date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="size-4" />
              {yogaClass.duration} min
            </div>

            <div className="flex items-center gap-3">
              👥 {yogaClass.capacity} Seats
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t px-6 py-5">
          <div className="flex items-center text-xl font-bold">
            <IndianRupee className="size-5" />

            {yogaClass.price}
          </div>

          <Button asChild>
            <Link href={`/classes/${yogaClass._id}`}>Explore Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
