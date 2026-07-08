"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Video } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

function statusPill(status: string) {
  if (status === "completed") return "pill-success";
  if (status === "booked") return "pill-info";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

export default function AppointmentsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Container className="py-24">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container className="py-24">
        <p className="text-center text-muted-foreground">Unable to load your appointments right now.</p>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Dashboard</p>
          <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">My Appointments</h1>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to overview
        </Link>
      </div>

      {data.appointments.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <CalendarDays className="mx-auto size-10 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">You have no appointments scheduled yet.</p>
          <Link
            href="/appointments"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary"
          >
            Book a Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data.appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium"
            >
              {/* Left accent */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-blue-500" />

              <div className="pl-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-heading text-base font-bold">Yoga Consultation</h2>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5 text-blue-500" />
                    {appointment.appointment_datetime
                      ? new Date(appointment.appointment_datetime).toLocaleString("en-IN")
                      : "Timing pending"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={statusPill(appointment.appointment_status ?? "")}>
                    {appointment.appointment_status ?? "Pending"}
                  </span>

                  {appointment.meet_link && (
                    <a
                      href={appointment.meet_link}
                      target="_blank"
                      className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
                    >
                      <Video className="size-3.5" />
                      Join
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
