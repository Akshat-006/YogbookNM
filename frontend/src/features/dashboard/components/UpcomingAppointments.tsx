"use client";

import { motion } from "framer-motion";
import { Video, Calendar } from "lucide-react";
import { Appointment } from "../types/dashboard.types";
import { formatDateTime } from "@/lib/formatTime";

interface Props {

  appointments: Appointment[];

}

function statusPill(status: string) {
  if (status === "completed") return "pill-success";
  if (status === "booked") return "pill-info";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

export function UpcomingAppointments({

  appointments,

}: Props) {

  if (!appointments.length) {

    return (

      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No appointments booked.</p>
      </div>

    );

  }

  return (

    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

      <h2 className="font-heading text-lg font-bold mb-5">

        My Appointments

      </h2>

      <div className="space-y-4">

        {appointments.map((item, i) => (

          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="group relative rounded-2xl border border-border bg-background/60 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-blue-500" />

            <div className="pl-4">
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5 text-blue-500" />
                  {formatDateTime(item.appointment_datetime)}
                </span>
                <span className={statusPill(item.appointment_status)}>
                  {item.appointment_status}
                </span>
              </div>

              {item.meet_link && (

                <a

                  href={item.meet_link}

                  target="_blank"

                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"

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