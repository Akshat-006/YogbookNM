"use client";

import { motion } from "framer-motion";
import { Video, Calendar, User } from "lucide-react";
import { ClassBooking } from "../types/dashboard.types";
import { formatDateTime } from "@/lib/formatTime";

interface Props {
    classes: ClassBooking[];
}

function paymentPill(status: string) {
  if (status === "paid") return "pill-success";
  if (status === "pending") return "pill-warning";
  return "pill-danger";
}

export function UpcomingClasses({

    classes,

}: Props) {

    if (!classes.length) {

        return (

            <div className="rounded-3xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">No upcoming classes booked.</p>
            </div>

        );

    }

    return (

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

            <h2 className="font-heading text-lg font-bold mb-5">

                My Classes

            </h2>

            <div className="space-y-4">

                {classes.map((item, i) => (

                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        className="group relative rounded-2xl border border-border bg-background/60 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary" />

                      <div className="pl-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold leading-tight">

                              {item.class_title}

                          </h3>
                          <span className={paymentPill(item.payment_status)}>
                            {item.payment_status}
                          </span>
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <User className="size-3.5 text-primary" />
                            {item.instructor_name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary" />
                            {formatDateTime(item.schedule_datetime)}
                          </span>
                        </div>

                        {item.meet_link && (

                            <a

                                href={item.meet_link}

                                target="_blank"

                                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"

                            >
                              <Video className="size-3.5" />
                              Join Meeting

                            </a>

                        )}
                      </div>
                    </motion.div>

                ))}

            </div>

        </div>

    );

}