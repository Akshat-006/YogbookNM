"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Calendar, User } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { formatDateTime } from "@/lib/formatTime";

function statusPill(status: string) {
  if (status === "booked") return "pill-info";
  if (status === "completed") return "pill-success";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

function paymentPill(status: string) {
  if (status === "paid") return "pill-success";
  if (status === "pending") return "pill-warning";
  if (status === "failed") return "pill-danger";
  return "pill-neutral";
}

export default function BookingsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Container className="py-24">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container className="py-24">
        <p className="text-center text-muted-foreground">Unable to load your bookings right now.</p>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Dashboard</p>
          <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">My Bookings</h1>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to overview
        </Link>
      </div>

      {data.bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <BookOpenCheck className="mx-auto size-10 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">You have not booked any classes yet.</p>
          <Link
            href="/classes"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data.bookings.map((booking) => (
            <div
              key={booking._id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium"
            >
              {/* Left accent */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-primary" />

              <div className="pl-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-heading text-lg font-bold">{booking.class_title ?? "Yoga class"}</h2>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="size-3.5 text-primary" />
                        {booking.instructor_name ?? "TBA"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-primary" />
                        {booking.schedule_datetime
                          ? formatDateTime(booking.schedule_datetime)
                          : "Schedule pending"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={statusPill(booking.booking_status ?? "")}>
                      {booking.booking_status ?? "Pending"}
                    </span>
                    <span className={paymentPill(booking.payment_status ?? "")}>
                      {booking.payment_status ?? "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
